import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  Search,
  RefreshCw,
  Sliders,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Info,
  UserCheck,
  X
} from "lucide-react";

const INITIAL_SELF_DECLARATION = [
  { serial: 1, name: "Sl. No" },
    { serial: 2, name: "Requisition Type" },
    { serial: 3, name: "Certification Serial" }
];

export default function SelfDeclaration({ onBack }) {
  const [toast, setToast] = useState(null);
  
  // Search, filter, sorting state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("serial");
  const [sortDirection, setSortDirection] = useState("asc");

  // Selection/Editing state
  const [selectedRequisitionSerial, setSelectedRequisitionSerial] = useState("");
  const [licenseDescription, setLicenseDescription] = useState("");
  const [newSerialValue, setNewSerialValue] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [selfDeclaration, setSelfDeclaration] = useState(() => {
    const saved = localStorage.getItem("dept_self_declaration");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SELF_DECLARATION;
  });

  useEffect(() => {
    localStorage.setItem("dept_self_declaration", JSON.stringify(selfDeclaration));
  }, [selfDeclaration]);

  // Sync selected serial edit fields
  useEffect(() => {
    if (selectedRequisitionSerial === "") {
      setLicenseDescription("");
      setNewSerialValue("");
    } else {
      const found = selfDeclaration.find(ot => ot.serial === parseInt(selectedRequisitionSerial));
      if (found) {
        setLicenseDescription(found.name);
      }
    }
  }, [selectedRequisitionSerial, selfDeclaration]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToastMsg = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleInputChange = (field, value) => {
    if (field === "licenseDescription") {
      setLicenseDescription(value);
    } else if (field === "newSerialValue") {
      setNewSerialValue(value);
    }
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleCancelSelfDeclaration = () => {
    setSelectedRequisitionSerial("");
    setLicenseDescription("");
    setNewSerialValue("");
    setFormErrors({});
    showToastMsg("Form cleared.", "info");
  };

  const handleSaveSelfDeclaration = (e) => {
    e.preventDefault();
    const errors = {};
    if (!licenseDescription.trim()) {
      errors.licenseDescription = "License description is required";
    }

    if (selectedRequisitionSerial === "" && newSerialValue.trim()) {
      const serialNum = parseInt(newSerialValue);
      if (isNaN(serialNum) || serialNum <= 0) {
        errors.newSerialValue = "Serial must be a positive number";
      } else if (selfDeclaration.some(ot => ot.serial === serialNum)) {
        errors.newSerialValue = "Serial Number already exists";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToastMsg("Please correct form errors.", "error");
      return;
    }

    if (selectedRequisitionSerial !== "") {
      // Edit mode
      const serialNum = parseInt(selectedRequisitionSerial);
      setSelfDeclaration(prev => prev.map(ot => ot.serial === serialNum ? { ...ot, name: licenseDescription.trim() } : ot));
      showToastMsg("License type updated successfully!");
    } else {
      // Add mode
      let serialNum;
      if (newSerialValue.trim()) {
        serialNum = parseInt(newSerialValue);
      } else {
        const maxSerial = selfDeclaration.length > 0 ? Math.max(...selfDeclaration.map(ot => ot.serial)) : 0;
        serialNum = maxSerial + 1;
      }

      const newRecord = { serial: serialNum, name: licenseDescription.trim() };
      setSelfDeclaration(prev => [...prev, newRecord].sort((a, b) => a.serial - b.serial));
      showToastMsg("New license type added successfully!");
    }

    // Reset Form
    setSelectedRequisitionSerial("");
    setLicenseDescription("");
    setNewSerialValue("");
    setFormErrors({});
  };

  const handleDeleteSelfDeclaration = (serial) => {
    if (window.confirm(`Are you sure you want to delete Self Declaration with Serial ${serial}?`)) {
      setSelfDeclaration(prev => prev.filter(ot => ot.serial !== serial));
      showToastMsg("Self Declaration deleted successfully.", "info");
      if (parseInt(selectedRequisitionSerial) === serial) {
        setSelectedRequisitionSerial("");
      }
    }
  };

  const loadDefaultSamples = () => {
    setSelfDeclaration(INITIAL_SELF_DECLARATION);
    showToastMsg("Default sample dataset reloaded successfully!", "info");
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const processedSelfDeclaration = useMemo(() => {
    let filtered = selfDeclaration;

    if (searchTerm.trim() !== "") {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(ot => 
        ot.name.toLowerCase().includes(query) ||
        String(ot.serial).includes(query)
      );
    }

    return [...filtered].sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [selfDeclaration, searchTerm, sortColumn, sortDirection]);

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/departmentdashboard";
    }
  };

  return (
    <div className="owner-type-master-container animate-fade">
      {/* Toast Notification Container */}
      {toast && (
        <div className="owner-type-toast-container">
          <div className={`toast-notification ${
            toast.type === "success" ? "toast-success" :
            toast.type === "error" ? "toast-error" :
            "toast-default"
          }`} style={{ position: "static", transform: "none", animation: "none" }}>
            {toast.type === "success" && <CheckCircle2 className="toast-success-icon" />}
            {toast.type === "error" && <AlertCircle className="toast-error-icon" />}
            {toast.type === "info" && <Info className="toast-info-icon" />}
            <span className="toast-message">{toast.message}</span>
            <button onClick={() => setToast(null)} className="toast-close-btn">
              <X className="toast-close-icon" />
            </button>
          </div>
        </div>
      )}

      {/* Ribbon header container */}
      <div className="owner-type-wizard-container">
        
        {/* Ribbon element precisely styled */}
        <div className="owner-type-wizard-header-actions">
          <div className="owner-type-wizard-title-banner" style={{ minWidth: "220px" }}>
            <span className="owner-type-wizard-title-text">Self Declaration</span>
            <div className="owner-type-wizard-title-arrow"></div>
          </div>
        </div>

        {/* Back and Title section */}
        {/* <div className="owner-type-wizard-section">
          <button 
            onClick={handleGoBack}
            className="owner-type-back-button"
          >
            <ChevronLeft className="owner-type-back-icon" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="owner-type-title">
            <UserCheck className="owner-type-title-icon" />
            <span>Self Declaration</span>
          </h1>
          <p className="owner-type-directory-description">
            Configure and maintain master records of excise license owner types, cooperative societies, and legal structures.
          </p>
        </div> */}

        {/* Form area in double-column layout */}
        <form onSubmit={handleSaveSelfDeclaration} className="owner-type-form">
          <div className="owner-type-form-grid">
            
            {/* Requisition Type Selector */}
            <div className="owner-type-form-col-4 owner-type-form-row">
              <label className="owner-type-label">
                Requisition Type <span className="required">*</span>
              </label>
              <select
                value={selectedRequisitionSerial}
                onChange={(e) => setSelectedRequisitionSerial(e.target.value)}
                className="owner-type-select"
              >
                <option value="">--Select Existing to Edit--</option>
                {processedSelfDeclaration.map((ot) => (
                  <option key={ot.serial} value={ot.serial}>
                    Requisition Type {ot.serial} - {ot.name}
                  </option>
                ))}
              </select>
              
              {selectedRequisitionSerial === "" && (
                <div className="owner-type-form-row" style={{ marginTop: "0.25rem" }}>
                  <input
                    type="number"
                    placeholder="Or enter new custom Requisition Type."
                    value={newSerialValue}
                    onChange={(e) => handleInputChange("newSerialValue", e.target.value)}
                    className={`owner-type-input ${formErrors.newSerialValue ? "owner-type-form-input-error" : ""}`}
                  />
                  {formErrors.newSerialValue && (
                    <span className="text-xs text-rose-500 font-semibold">{formErrors.newSerialValue}</span>
                  )}
                </div>
              )}

              {selectedRequisitionSerial !== "" && (
                <span className="text-xs text-[#2b9ec3] font-bold bg-[rgba(43,158,195,0.05)] px-2.5 py-1 rounded border border-[rgba(43,158,195,0.2)]">
                  Editing Mode (Requisition Type: {selectedRequisitionSerial})
                </span>
              )}
            </div>

                 {/* Certification Serial Selector */}
            <div className="owner-type-form-col-4 owner-type-form-row">
              <label className="owner-type-label">
                Certification Serial <span className="required">*</span>
              </label>
              <select
                value={selectedRequisitionSerial}
                onChange={(e) => setSelectedRequisitionSerial(e.target.value)}
                className="owner-type-select"
              >
                <option value="">--Select Existing to Edit--</option>
                {selfDeclaration.map((ot) => (
                  <option key={ot.serial} value={ot.serial}>
                    Certification Serial {ot.serial} - {ot.name}
                  </option>
                ))}
              </select>
              
              {selectedRequisitionSerial === "" && (
                <div className="owner-type-form-row" style={{ marginTop: "0.25rem" }}>
                  <input
                    type="number"
                    placeholder="Or enter new custom Certification Serial."
                    value={newSerialValue}
                    onChange={(e) => handleInputChange("newSerialValue", e.target.value)}
                    className={`owner-type-input ${formErrors.newSerialValue ? "owner-type-form-input-error" : ""}`}
                  />
                  {formErrors.newSerialValue && (
                    <span className="text-xs text-rose-500 font-semibold">{formErrors.newSerialValue}</span>
                  )}
                </div>
              )}

              {selectedRequisitionSerial !== "" && (
                <span className="text-xs text-[#2b9ec3] font-bold bg-[rgba(43,158,195,0.05)] px-2.5 py-1 rounded border border-[rgba(43,158,195,0.2)]">
                  Editing Mode (Certification Serial: {selectedRequisitionSerial})
                </span>
              )}
            </div>

            {/* License Type Description Row/Col */}
            <div className="owner-type-form-col-8 owner-type-form-row">
              <label className="owner-type-label">
                Certification Details <span className="required">*</span>
              </label>
              <textarea
                value={licenseDescription}
                onChange={(e) => handleInputChange("licenseDescription", e.target.value)}
                className={`owner-type-textarea ${formErrors.licenseDescription ? "owner-type-form-input-error" : ""}`}
                placeholder="Enter Certification details, legal entity description, or structure details..."
              />
              {formErrors.licenseDescription && (
                <span className="text-xs text-rose-500 font-semibold">{formErrors.licenseDescription}</span>
              )}
            </div>

          </div>

          {/* Form Actions */}
          <div className="owner-type-form-actions">
            <button
              type="button"
              onClick={handleCancelSelfDeclaration}
              className="owner-type-action-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="owner-type-action-button owner-type-action-button-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Database Registered Listings Directory Card */}
      <div className="owner-type-directory-card">
        <div className="owner-type-directory-header">
          <div>
            <h2 className="owner-type-directory-title">
              <span>Self Declaration Directory</span>
              <span className="owner-type-total-badge">
                {selfDeclaration.length} Total
              </span>
            </h2>
            <p className="owner-type-directory-subtitle">Filter, search, and manage current database entries.</p>
          </div>

          {/* Toolbar containing search, reset, print */}
          <div className="owner-type-table-toolbar">
            <div className="owner-type-table-search-wrapper">
              <Search className="owner-type-table-search-icon" />
              <input
                type="text"
                placeholder="Search description, serial..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="owner-type-table-search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="owner-type-table-search-clear"
                >
                  <X className="owner-type-table-search-clear-icon" />
                </button>
              )}
            </div>

            <button
              onClick={loadDefaultSamples}
              className="owner-type-table-reset-button"
              title="Reload default sample database"
            >
              <RefreshCw className="owner-type-table-refresh-icon" />
              <span>Reset to Sample Data</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="owner-type-pdf-btn"
              title="Print current list"
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#dc2626",
                color: "#ffffff",
                padding: "1px 4px",
                borderRadius: "2px",
                fontSize: "8px",
                fontWeight: "900",
                marginRight: "4px",
                lineHeight: 1
              }}>
                PDF
              </span>
              <span className="owner-type-pdf-text">PDF</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        {processedSelfDeclaration.length === 0 ? (
          <div className="owner-type-table-empty-state">
            <div className="owner-type-table-empty-icon-wrapper">
              <Sliders className="owner-type-table-empty-icon" />
            </div>
            <p className="owner-type-table-empty-title">No matching self declaration records found</p>
            <p className="owner-type-table-empty-subtitle">Try refining your search keyword or reload the sample dataset.</p>
          </div>
        ) : (
          <div className="owner-type-table-container">
            <table className="owner-type-table">
              <thead>
                <tr className="owner-type-table-header-row">
                  <th 
                    className="owner-type-table-header-cell" 
                    onClick={() => handleSort("serial")}
                    style={{ width: "120px" }}
                  >
                    Serial Number {sortColumn === "serial" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th 
                    className="owner-type-table-header-cell" 
                    onClick={() => handleSort("name")}
                  >
                    Self Declaration Description {sortColumn === "name" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th className="owner-type-table-header-action" style={{ width: "120px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="owner-type-table-body">
                {processedSelfDeclaration.map((ot) => {
                  const isSelected = selectedRequisitionSerial === String(ot.serial);
                  return (
                    <tr
                      key={ot.serial}
                      className={`owner-type-table-row ${isSelected ? "owner-type-table-row-selected" : ""}`}
                      onClick={() => setSelectedRequisitionSerial(String(ot.serial))}
                      title="Click to edit this record"
                    >
                      <td className="owner-type-td-id">
                        {ot.serial}
                      </td>
                      <td className="owner-type-td-info">
                        <div className="owner-type-record-name">{ot.name}</div>
                        <div className="owner-type-record-meta">ID: {ot.serial} • SELF_DECLARATION</div>
                      </td>
                      <td className="owner-type-td-action">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setSelectedRequisitionSerial(String(ot.serial))}
                            className="owner-type-table-delete-button"
                            style={{ color: "#2563eb" }}
                            title="Edit Record"
                          >
                            <Edit2 className="owner-type-table-delete-icon" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSelfDeclaration(ot.serial)}
                            className="owner-type-table-delete-button"
                            title="Delete Record"
                          >
                            <Trash2 className="owner-type-table-delete-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
