import React from "react";
import {
  User,
  Calendar,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  FileText,
  Building,
  Hash,
  Compass
} from "lucide-react";

export default function ApplicantDetails({ formData, onChange, errors = {} }) {
  return (
    <div className="space-y-8 animate-fade">
      {/* Informational banner reflecting registered status */}
      <div className="bg-blue-50/70 border border-blue-200/60 rounded-2xl p-4 flex gap-4 text-left">
        <div className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-900">Pre-filled Registered Profile Information</h4>
          <p className="text-xs text-blue-700/85 mt-0.5 leading-relaxed">
            These applicant details are loaded automatically from your online user registry record. You can review and verify the demographic, residential, and verification fields.
          </p>
        </div>
      </div>

      {/* Section 1: Personal Details */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6 text-left">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              1
            </span>
            Personal Details
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Your legal credentials used during Delhi Excise Portal profile registration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Applicant Name */}
          <div className="reg-field">
            <label className="reg-label">
              Applicant Name <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="Enter applicant name"
                className={`reg-input uppercase font-bold text-slate-800 ${
                  errors.applicantName ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.applicantName || ""}
                onChange={(e) => onChange("applicantName", e.target.value.toUpperCase())}
              />
            </div>
            {errors.applicantName && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.applicantName}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="reg-field">
            <label className="reg-label">
              Date of Birth <span className="text-red-400">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="date"
                className={`reg-input font-bold text-slate-800 ${
                  errors.dob ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.dob || ""}
                onChange={(e) => onChange("dob", e.target.value)}
              />
            </div>
            {errors.dob && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Father's Name */}
          <div className="reg-field">
            <label className="reg-label">Father / Husband Name</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="Father's / Husband's Name"
                className="reg-input uppercase font-bold text-slate-800"
                value={formData.fatherName || ""}
                onChange={(e) => onChange("fatherName", e.target.value.toUpperCase())}
              />
            </div>
          </div>

          {/* Occupation */}
          <div className="reg-field">
            <label className="reg-label">
              Occupation <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="E.g. BUSINESS"
                className={`reg-input uppercase font-bold text-slate-800 ${
                  errors.occupation ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.occupation || ""}
                onChange={(e) => onChange("occupation", e.target.value.toUpperCase())}
              />
            </div>
            {errors.occupation && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.occupation}</p>
            )}
          </div>

          {/* PAN No */}
          <div className="reg-field">
            <label className="reg-label">
              PAN Number <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                maxLength={10}
                placeholder="ABCDE1234F"
                className={`reg-input uppercase font-mono font-bold text-slate-800 ${
                  errors.panNo ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.panNo || ""}
                onChange={(e) => onChange("panNo", e.target.value.toUpperCase())}
              />
            </div>
            {errors.panNo && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.panNo}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Address Details */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6 text-left">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              2
            </span>
            Residential Address Details
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Your permanent address coordinates for official licensing records
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Address 1 */}
          <div className="reg-field md:col-span-2 lg:col-span-3">
            <label className="reg-label">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="HOUSE / PLOT NO, BUILDING, STREET"
                className={`reg-input font-bold text-slate-800 ${
                  errors.address1 ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.address1 || ""}
                onChange={(e) => onChange("address1", e.target.value)}
              />
            </div>
            {errors.address1 && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.address1}</p>
            )}
          </div>

          {/* Address 2 */}
          <div className="reg-field md:col-span-2 lg:col-span-3">
            <label className="reg-label">Address Line 2</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="LOCALITY, AREA, NEAREST LANDMARK"
                className="reg-input font-bold text-slate-800"
                value={formData.address2 || ""}
                onChange={(e) => onChange("address2", e.target.value)}
              />
            </div>
          </div>

          {/* State */}
          <div className="reg-field">
            <label className="reg-label">
              State <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Compass className="w-4 h-4 text-blue-600" />
              </div>
              <select
                className="reg-select font-bold text-slate-800 cursor-pointer pl-12 pr-4 bg-[#fbfbfc] border border-slate-200"
                value={formData.state || "Delhi"}
                onChange={(e) => onChange("state", e.target.value)}
              >
                <option value="Delhi">Delhi</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>
          </div>

          {/* District */}
          <div className="reg-field">
            <label className="reg-label">
              District <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Building className="w-4 h-4 text-blue-600" />
              </div>
              <select
                className="reg-select font-bold text-slate-800 cursor-pointer pl-12 pr-4 bg-[#fbfbfc] border border-slate-200"
                value={formData.district || "South"}
                onChange={(e) => onChange("district", e.target.value)}
              >
                <option value="South">South</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Central">Central</option>
                <option value="North">North</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
          </div>

          {/* Sub Division */}
          <div className="reg-field">
            <label className="reg-label">
              Sub Division <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Building className="w-4 h-4 text-blue-600" />
              </div>
              <select
                className="reg-select font-bold text-slate-800 cursor-pointer pl-12 pr-4 bg-[#fbfbfc] border border-slate-200"
                value={formData.subDivision || "Saket"}
                onChange={(e) => onChange("subDivision", e.target.value)}
              >
                <option value="Saket">Saket</option>
                <option value="Vasant Vihar">Vasant Vihar</option>
                <option value="Hauz Khas">Hauz Khas</option>
                <option value="Mehrauli">Mehrauli</option>
                <option value="Kalkaji">Kalkaji</option>
              </select>
            </div>
          </div>

          {/* PIN */}
          <div className="reg-field">
            <label className="reg-label">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Hash className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                maxLength={6}
                placeholder="110017"
                className={`reg-input font-mono font-bold text-slate-800 ${
                  errors.pin ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.pin || ""}
                onChange={(e) => onChange("pin", e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {errors.pin && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.pin}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Contact & Access */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6 text-left">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-sm font-black text-[#012a52] uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              3
            </span>
            Contact Details
          </h3>
          <p className="text-[11px] text-slate-440 mt-0.5">
            Active contact information for receiving validation tokens, OTPs, and permit PDF email notifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mobile */}
          <div className="reg-field">
            <label className="reg-label">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                maxLength={10}
                placeholder="Enter 10-digit mobile"
                className={`reg-input font-mono font-bold text-slate-800 ${
                  errors.mobile ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.mobile || ""}
                onChange={(e) => onChange("mobile", e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {errors.mobile && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div className="reg-field">
            <label className="reg-label">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="email"
                placeholder="Enter email address"
                className={`reg-input font-bold text-slate-800 ${
                  errors.email ? "border-red-500 bg-red-50/10" : ""
                }`}
                value={formData.email || ""}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.email}</p>
            )}
          </div>

          {/* Landline */}
          <div className="reg-field">
            <label className="reg-label">Landline Number</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="Landline number (Optional)"
                className="reg-input font-bold text-slate-800"
                value={formData.landline || ""}
                onChange={(e) => onChange("landline", e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>

          {/* FAX */}
          <div className="reg-field">
            <label className="reg-label">FAX Number</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="FAX number (Optional)"
                className="reg-input font-bold text-slate-800"
                value={formData.fax || ""}
                onChange={(e) => onChange("fax", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
