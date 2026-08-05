import React, { useState } from "react";
import {
  ChevronLeft,
  GitFork,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Printer,
  Save,
  Eye
} from "lucide-react";

const DEFAULT_HIERARCHY_DATA = {
  "Hierarchy - 1": [
    { hierarchyId: "1", userCategory: "DA (Wholesale)", userList: "da1.ws" },
    { hierarchyId: "1", userCategory: "SO (Wholesale)", userList: "so1.ws" },
    { hierarchyId: "1", userCategory: "ACX (Wholesale)", userList: "acx1.ws" },
    { hierarchyId: "1", userCategory: "DCX (Excise)", userList: "dcx.excise" },
    { hierarchyId: "1", userCategory: "E.C.", userList: "EX.COM" }
  ],
  "Hierarchy - 2": [
    { hierarchyId: "2", userCategory: "DA (Retail)", userList: "da2.rt" },
    { hierarchyId: "2", userCategory: "SO (Retail)", userList: "so2.rt" },
    { hierarchyId: "2", userCategory: "ACX (Retail)", userList: "acx2.rt" },
    { hierarchyId: "2", userCategory: "DCX (Excise)", userList: "dcx.excise" },
    { hierarchyId: "2", userCategory: "E.C.", userList: "EX.COM" }
  ],
  "Hierarchy - 3": [
    { hierarchyId: "3", userCategory: "DA (Hotel/HCR)", userList: "da3.hcr" },
    { hierarchyId: "3", userCategory: "SO (Hotel/HCR)", userList: "so3.hcr" },
    { hierarchyId: "3", userCategory: "ACX (Hotel)", userList: "acx3.hcr" },
    { hierarchyId: "3", userCategory: "DCX (Excise)", userList: "dcx.excise" },
    { hierarchyId: "3", userCategory: "E.C.", userList: "EX.COM" }
  ]
};

const USER_OPTIONS = {
  "DA (Wholesale)": ["-Please Select-", "da1.ws", "da2.ws", "da3.ws", "da_north.ws"],
  "SO (Wholesale)": ["-Please Select-", "so1.ws", "so2.ws", "so_east.ws"],
  "ACX (Wholesale)": ["-Please Select-", "acx1.ws", "acx2.ws", "acx_hq.ws"],
  "DCX (Excise)": ["-Please Select-", "dcx.excise", "dcx_admin.excise"],
  "E.C.": ["-Please Select-", "EX.COM", "EX.COMMISSIONER"]
};

export default function FlowHierarchyMapping({ onBack }) {
  const [toast, setToast] = useState(null);

  // Form selections
  const [categoryType, setCategoryType] = useState("License");
  const [flowType, setFlowType] = useState("Process Flow for Wholesale Vend of Draught Beer - L2(30)");
  const [selectedHierarchy, setSelectedHierarchy] = useState("Hierarchy - 1");

  // Licensee Category Mapping selections
  const [categoryMappings, setCategoryMappings] = useState({
    "DA (Wholesale)": "-Please Select-",
    "SO (Wholesale)": "-Please Select-",
    "ACX (Wholesale)": "-Please Select-",
    "DCX (Excise)": "-Please Select-",
    "E.C.": "-Please Select-"
  });

  // Saved Hierarchies
  const [hierarchyData, setHierarchyData] = useState(DEFAULT_HIERARCHY_DATA);

  // Report modal state
  const [showReportModal, setShowReportModal] = useState(false);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleMappingChange = (category, value) => {
    setCategoryMappings((prev) => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmitMapping = (e) => {
    e.preventDefault();

    const selectedCount = Object.values(categoryMappings).filter(
      (v) => v !== "-Please Select-"
    ).length;

    if (selectedCount === 0) {
      showToast("error", "Please select at least one officer for the flow mapping!");
      return;
    }

    const currentId = selectedHierarchy.replace("Hierarchy - ", "").trim();

    const newItems = Object.entries(categoryMappings)
      .filter(([_, val]) => val !== "-Please Select-")
      .map(([cat, val]) => ({
        hierarchyId: currentId,
        userCategory: cat,
        userList: val
      }));

    setHierarchyData((prev) => ({
      ...prev,
      [selectedHierarchy]: newItems
    }));

    showToast("success", `Flow Hierarchy Mapping updated successfully for ${selectedHierarchy}!`);
  };

  const currentHierarchyList = hierarchyData[selectedHierarchy] || [];

  return (
    <div className="user-creation-container">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-md shadow-lg border text-sm font-semibold transition-all duration-200 ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-auto text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Bar Navigation & Breadcrumb */}
      <div className="user-creation-top-bar">
        <button
          type="button"
          onClick={onBack || (() => (window.location.href = "/departmentdashboard"))}
          className="user-creation-back-btn"
        >
          <ChevronLeft />
          <span>Back to Department Dashboard</span>
        </button>

        <div className="user-creation-breadcrumb">
          <span>House Keeping</span>
          <span>/</span>
          <span>User Maintenance</span>
          <span>/</span>
          <span className="user-creation-breadcrumb-active">Flow Hierarchy Mapping</span>
        </div>
      </div>

      {/* Main Card Wrapper */}
      <div className="user-creation-card">
        {/* Dynamic Header Section with Ribbon */}
        <div className="user-creation-header-section">
          <div className="user-creation-header-row">
            <div className="user-creation-brand-block">
              <div className="user-creation-icon-wrapper">
                <GitFork className="w-6 h-6 text-sky-600" />
              </div>
              <div className="user-creation-title-block">
                <h1>Flow Hierarchy Mapping</h1>
                <p>Define approval workflow hierarchies and assign officer levels for excise licenses and permits.</p>
              </div>
            </div>

            {/* Transport Page Styled Arrow Ribbon */}
            <div className="user-creation-ribbon-wrapper">
              <div className="user-creation-ribbon-container">
                <div className="user-creation-ribbon-arrow"></div>
                <div className="user-creation-ribbon-body">Flow Hierarchy Mapping</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="user-creation-body">
          {/* FIELDSET 1: Category & Flow Type Selection */}
          <fieldset className="user-creation-fieldset">
            <legend className="user-creation-legend">Workflow & Category Selection</legend>

            <div className="user-creation-form-grid">
              <div className="user-creation-form-group">
                <label className="user-creation-label">
                  Category Type <span className="user-creation-req">*</span>
                </label>
                <div className="user-creation-input-wrap">
                  <select
                    value={categoryType}
                    onChange={(e) => setCategoryType(e.target.value)}
                    className="user-creation-input"
                  >
                    <option value="License">License</option>
                    <option value="Permit">Permit</option>
                    <option value="Brand Registration">Brand Registration</option>
                    <option value="Label Revalidation">Label Revalidation</option>
                  </select>
                </div>
              </div>

              <div className="user-creation-form-group">
                <label className="user-creation-label">
                  Flow Type <span className="user-creation-req">*</span>
                </label>
                <div className="user-creation-input-wrap" style={{ maxWidth: "560px" }}>
                  <select
                    value={flowType}
                    onChange={(e) => setFlowType(e.target.value)}
                    className="user-creation-input"
                  >
                    <option value="Process Flow for Wholesale Vend of Draught Beer - L2(30)">
                      Process Flow for Wholesale Vend of Draught Beer - L2(30)
                    </option>
                    <option value="Process Flow for L-1 Wholesale Vend of Indian Liquor">
                      Process Flow for L-1 Wholesale Vend of Indian Liquor
                    </option>
                    <option value="Process Flow for L-1F Wholesale Vend of Foreign Liquor">
                      Process Flow for L-1F Wholesale Vend of Foreign Liquor
                    </option>
                    <option value="Process Flow for L-3/L-5 Bottling & Wholesale Privilege">
                      Process Flow for L-3/L-5 Bottling & Wholesale Privilege
                    </option>
                    <option value="Process Flow for L-15/L-16 Hotel & Restaurant Bar">
                      Process Flow for L-15/L-16 Hotel & Restaurant Bar
                    </option>
                    <option value="Process Flow for Import Permit (IP-PL) Revalidation">
                      Process Flow for Import Permit (IP-PL) Revalidation
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>

          {/* FIELDSET 2: Licensee Category Mapping */}
          <fieldset className="user-creation-fieldset">
            <legend className="user-creation-legend">
              Licensee Category Mapping — L2 (Licence for Wholesale Vend of Draught Beer)
            </legend>

            <form onSubmit={handleSubmitMapping}>
              <div className="user-creation-table-wrapper mb-4">
                <table className="user-creation-table">
                  <thead>
                    <tr>
                      <th style={{ width: "45%" }}>User category</th>
                      <th style={{ width: "55%" }}>User List</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(USER_OPTIONS).map((userCat) => (
                      <tr key={userCat}>
                        <td className="font-semibold text-slate-800">{userCat}</td>
                        <td>
                          <select
                            value={categoryMappings[userCat] || "-Please Select-"}
                            onChange={(e) => handleMappingChange(userCat, e.target.value)}
                            className="user-creation-input user-creation-input-short"
                            style={{ width: "220px" }}
                          >
                            {USER_OPTIONS[userCat].map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="user-creation-actions" style={{ justifyContent: "center", marginTop: "1rem" }}>
                <button type="submit" className="user-creation-btn-save">
                  <Save className="w-4 h-4" />
                  Submit Mapping
                </button>
              </div>
            </form>
          </fieldset>

          {/* FIELDSET 3: Hierarchy Selection & View Report */}
          <fieldset className="user-creation-fieldset">
            <legend className="user-creation-legend">Active Hierarchy Overview</legend>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-sky-50 border border-sky-200 rounded-md mb-4">
              <div className="flex items-center gap-3">
                <label className="font-bold text-sky-800 text-sm">Select Hierarchy:</label>
                <select
                  value={selectedHierarchy}
                  onChange={(e) => setSelectedHierarchy(e.target.value)}
                  className="user-creation-input"
                  style={{ width: "180px" }}
                >
                  <option value="Hierarchy - 1">Hierarchy - 1</option>
                  <option value="Hierarchy - 2">Hierarchy - 2</option>
                  <option value="Hierarchy - 3">Hierarchy - 3</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowReportModal(true)}
                className="user-creation-btn-cancel flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4 text-sky-600" />
                View Hierarchy Report
              </button>
            </div>

            <div className="user-creation-table-wrapper">
              <table className="user-creation-table">
                <thead>
                  <tr>
                    <th style={{ width: "20%", textAlign: "center" }}>Hierarchy ID</th>
                    <th style={{ width: "40%" }}>User category</th>
                    <th style={{ width: "40%" }}>User List</th>
                  </tr>
                </thead>
                <tbody>
                  {currentHierarchyList.length > 0 ? (
                    currentHierarchyList.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: "center", fontWeight: "bold" }}>
                          {row.hierarchyId}
                        </td>
                        <td className="font-semibold text-slate-800">{row.userCategory}</td>
                        <td className="font-mono text-sky-700 font-bold">{row.userList}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center", padding: "1.5rem", color: "#64748b" }}>
                        No hierarchy mapping found for {selectedHierarchy}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Modal: View Hierarchy Report */}
      {showReportModal && (
        <div className="fhm-modal-backdrop" onClick={() => setShowReportModal(false)}>
          <div className="fhm-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="fhm-modal-header">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-slate-800 text-lg">
                  Flow Hierarchy Report — {selectedHierarchy}
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1 hover:bg-slate-200 rounded text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="fhm-modal-body">
              <div className="bg-sky-50 border border-sky-200 rounded-md p-3 mb-4">
                <div className="text-xs font-bold text-sky-800 uppercase tracking-wide">
                  Category: {categoryType}
                </div>
                <div className="text-sm font-semibold text-sky-900 mt-1">{flowType}</div>
              </div>

              <h4 className="font-bold text-slate-700 mb-2 text-sm uppercase">
                Active Approval Chain:
              </h4>

              <div className="space-y-2 mb-6">
                {currentHierarchyList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-lg"
                  >
                    <div className="w-7 h-7 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 font-semibold">{item.userCategory}</div>
                      <div className="text-sm font-mono font-bold text-slate-800">{item.userList}</div>
                    </div>
                    <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Level {idx + 1} Approver
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fhm-modal-footer">
              <button
                onClick={() => window.print()}
                className="user-creation-btn-cancel flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Report</span>
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="user-creation-btn-save"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
