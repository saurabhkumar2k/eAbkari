import React, { useState, useRef } from "react";
import { 
  FileText, 
  Trash2, 
  Eye, 
  Check, 
  AlertCircle, 
  Upload,
  Info 
} from "lucide-react";

export default function IdentityDetailsPage({ formData, onChange, errors = {}, showToast }) {
  const fileInputRef = useRef(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Fallback defaults
  const currentIdProof = formData.idProofType || "";
  const currentIdNumber = formData.idNumber || "";
  const uploadedFileName = formData.idProofFileName || "";

  // Standard official Identification items
  const ID_PROOF_OPTIONS = [
    { value: "Aadhaar Card", label: "Aadhaar Card (UIDAI)" },
    { value: "Voter ID Card", label: "Voter ID / Election Card" },
    { value: "PAN Card", label: "Income Tax PAN Card" },
    { value: "Passport", label: "Indian Passport" },
    { value: "Driving License", label: "Driving License (RTO)" }
  ];

  // Handles standard file upload trigger
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        if (showToast) {
          showToast("File size expands over the 2MB limit. Please upload a smaller file.", "error");
        } else {
          alert("File size exceeds 2MB limit");
        }
        return;
      }
      onChange("idProofFileName", file.name);
      // Give a dummy content URL for mock viewing
      onChange("idProofFileUrl", URL.createObjectURL(file) || "#");
      if (showToast) showToast(`Successfully uploaded: ${file.name}`, "success");
    }
  };

  const handleDeleteFile = () => {
    onChange("idProofFileName", "");
    onChange("idProofFileUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (showToast) showToast("Uploaded document removed", "success");
  };

  const triggerUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveDoc = () => {
    if (!currentIdProof) {
      if (showToast) showToast("Please select a valid ID Proof type", "error");
      return;
    }
    if (!currentIdNumber.trim()) {
      if (showToast) showToast("Please enter a valid ID Number", "error");
      return;
    }
    if (!uploadedFileName) {
      if (showToast) showToast("Please choose & upload your ID Proof Document first", "error");
      return;
    }
    if (showToast) showToast("Identity details saved successfully!", "success");
  };

  return (
    <div className="space-y-6 animate-fade">
      {/* Centered blue heading banner perfectly mirroring the Event Details structure */}
      <div className="w-full bg-[#0a3861] text-white py-2.5 px-4 text-center text-sm font-black rounded-lg select-none uppercase tracking-wider mb-2">
        Identity Details
      </div>

      <div className="space-y-6 text-left">
        {/* Row 1: ID Proof Dropdown & ID Number Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Id Proof Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              Id Proof <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={currentIdProof}
                onChange={(e) => onChange("idProofType", e.target.value)}
                className={`w-full bg-slate-50/50 border rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition cursor-pointer ${
                  errors.idProofType ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                }`}
              >
                <option value="">--Select--</option>
                {ID_PROOF_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.idProofType && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.idProofType}</p>
            )}
          </div>

          {/* Id Number Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Id Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Identification Ref number"
              className={`w-full bg-slate-50/50 border rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition ${
                errors.idNumber ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
              }`}
              value={currentIdNumber}
              onChange={(e) => onChange("idNumber", e.target.value.toUpperCase())}
            />
            {errors.idNumber && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.idNumber}</p>
            )}
          </div>
        </div>

        {/* Action Table matching the Blueprint screenshot */}
        <div className="border border-slate-300 rounded-xl overflow-hidden shadow-xs bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1b75bc] text-white">
                <th colSpan="2" className="py-2.5 px-4 font-bold text-[12px] uppercase text-center border-r border-[#15609c]">
                  Applicant's Document
                </th>
                <th className="py-2.5 px-4 font-bold text-[12px] uppercase text-center w-[180px]">
                  Click To
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-300 text-slate-700 text-xs font-medium">
                {/* ID Proof Doc Label Cell */}
                <td className="py-5 px-4 font-bold text-slate-800 w-[180px] border-r border-slate-300 bg-slate-50/30 text-center">
                  ID Proof Doc
                </td>

                {/* File Uploader Cell */}
                <td className="py-5 px-4 border-r border-slate-300 text-center">
                  <div className="inline-flex flex-col items-center justify-center space-y-1.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={triggerUploadClick}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-350 text-slate-800 rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Upload className="w-3 h-3 text-slate-750" />
                        Choose File
                      </button>
                      <span className="text-slate-600 text-xs font-bold italic">
                        {uploadedFileName || "No file chosen"}
                      </span>
                    </div>
                    {/* Size and specs feedback notice */}
                    <p className="text-[10px] text-red-600 font-black">
                      (.pdf,.JPG/.JPEG) Max Size: 2MB
                    </p>
                  </div>
                  {/* Hidden input element */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {errors.idProofFileName && (
                    <p className="text-[11px] text-red-600 font-bold mt-1 text-center">{errors.idProofFileName}</p>
                  )}
                </td>

                {/* Action View/Delete Cell */}
                <td className="py-5 px-4 text-center">
                  <div className="flex items-center justify-center gap-4 text-xs font-bold">
                    {/* View Document */}
                    {uploadedFileName ? (
                      <button
                        type="button"
                        onClick={() => setPreviewModalOpen(true)}
                        className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1 cursor-pointer"
                        title="View Document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 cursor-not-allowed flex items-center gap-1 select-none">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </span>
                    )}

                    {/* Delete Document */}
                    {uploadedFileName ? (
                      <button
                        type="button"
                        onClick={handleDeleteFile}
                        className="text-red-600 hover:text-red-800 transition flex items-center gap-1 cursor-pointer"
                        title="Delete Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 cursor-not-allowed flex items-center gap-1 select-none">
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Blue Save Button at standard left spot of the form */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSaveDoc}
            className="px-5 py-2.5 bg-[#007bff] hover:bg-blue-600 text-white font-extrabold text-xs rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center justify-center uppercase cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>

      {/* Styled File preview Modal popup */}
      {previewModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-200 animate-scale">
            {/* Modal Title bar */}
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                ID Proof Verification Preview
              </h4>
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="text-slate-300 hover:text-white transition font-sans text-xs uppercase"
              >
                Close (✖)
              </button>
            </div>
            {/* Modal Body Info and preview canvas */}
            <div className="p-6 space-y-4 text-center">
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl p-3 inline-flex items-center gap-2 mx-auto justify-center">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold">Document Active & Approved</span>
              </div>
              <div className="border border-slate-200 rounded-xl bg-slate-50 p-4 flex flex-col justify-center items-center h-[200px] gap-2">
                <FileText className="w-16 h-16 text-[#0a3861]" />
                <p className="text-xs text-slate-800 font-extrabold">{uploadedFileName}</p>
                <p className="text-[10px] text-slate-400 font-bold font-mono">
                  TYPE: PDF/IMAGE • SIZE: MOCK VERIFIED • REGISTERED PASS
                </p>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Official PDF/JPEG layout verification is approved instantly. In case of discrepancies during physical inspection, the licensee stays personally liable under the Delhi Excise Act, 2009.
              </p>
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="w-full bg-[#1b75bc] text-white py-2.5 rounded-lg text-xs font-bold hover:bg-[#15609c] transition uppercase"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
