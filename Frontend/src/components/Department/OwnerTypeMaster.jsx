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

const INITIAL_OWNER_TYPES = [
  { serial: 1, name: "Individual(s)" },
  { serial: 2, name: "Company" },
  { serial: 4, name: "Cooperative Society" },
  { serial: 5, name: "Military Unit" },
  { serial: 6, name: "CSD" },
  { serial: 7, name: "Para Military Unit" },
  { serial: 8, name: "Other Designated Officer" },
  { serial: 9, name: "Special Section" },
  { serial: 10, name: "Nursing Home/Private Hospital" },
  { serial: 11, name: "Govt. Hospital" },
  { serial: 12, name: "Chemist and Druggist Shop" },
  { serial: 13, name: "Educational Institutions" },
  { serial: 14, name: "Individual Medical Practitioners" },
  { serial: 15, name: "Charitable Dispensary" },
  { serial: 16, name: "Partnership Firm" },
  { serial: 17, name: "LLP" },
  { serial: 18, name: "Proprietorship" },
  { serial: 19, name: "Other Entity" }
];

export default function OwnerTypeMaster({ onBack }) {
  const [toast, setToast] = useState(null);
  
  // Search, filter, sorting state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("serial");
  const [sortDirection, setSortDirection] = useState("asc");

  // Selection/Editing state
  const [selectedSerial, setSelectedSerial] = useState("");
  const [licenseDescription, setLicenseDescription] = useState("");
  const [newSerialValue, setNewSerialValue] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [ownerTypes, setOwnerTypes] = useState(() => {
    const saved = localStorage.getItem("dept_owner_types");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_OWNER_TYPES;
  });

  useEffect(() => {
    localStorage.setItem("dept_owner_types", JSON.stringify(ownerTypes));
  }, [ownerTypes]);

  // Sync selected serial edit fields
  useEffect(() => {
    if (selectedSerial === "") {
      setLicenseDescription("");
      setNewSerialValue("");
    } else {
      const found = ownerTypes.find(ot => ot.serial === parseInt(selectedSerial));
      if (found) {
        setLicenseDescription(found.name);
      }
    }
  }, [selectedSerial, ownerTypes]);

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

  const handleCancelOwnerType = () => {
    setSelectedSerial("");
    setLicenseDescription("");
    setNewSerialValue("");
    setFormErrors({});
    showToastMsg("Form cleared.", "info");
  };

  const handleSaveOwnerType = (e) => {
    e.preventDefault();
    const errors = {};
    if (!licenseDescription.trim()) {
      errors.licenseDescription = "License description is required";
    }

    if (selectedSerial === "" && newSerialValue.trim()) {
      const serialNum = parseInt(newSerialValue);
      if (isNaN(serialNum) || serialNum <= 0) {
        errors.newSerialValue = "Serial must be a positive number";
      } else if (ownerTypes.some(ot => ot.serial === serialNum)) {
        errors.newSerialValue = "Serial Number already exists";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToastMsg("Please correct form errors.", "error");
      return;
    }

    if (selectedSerial !== "") {
      // Edit mode
      const serialNum = parseInt(selectedSerial);
      setOwnerTypes(prev => prev.map(ot => ot.serial === serialNum ? { ...ot, name: licenseDescription.trim() } : ot));
      showToastMsg("License type updated successfully!");
    } else {
      // Add mode
      let serialNum;
      if (newSerialValue.trim()) {
        serialNum = parseInt(newSerialValue);
      } else {
        const maxSerial = ownerTypes.length > 0 ? Math.max(...ownerTypes.map(ot => ot.serial)) : 0;
        serialNum = maxSerial + 1;
      }

      const newRecord = { serial: serialNum, name: licenseDescription.trim() };
      setOwnerTypes(prev => [...prev, newRecord].sort((a, b) => a.serial - b.serial));
      showToastMsg("New license type added successfully!");
    }

    // Reset Form
    setSelectedSerial("");
    setLicenseDescription("");
    setNewSerialValue("");
    setFormErrors({});
  };

  const handleDeleteOwnerType = (serial) => {
    if (window.confirm(`Are you sure you want to delete Owner Type with Serial ${serial}?`)) {
      setOwnerTypes(prev => prev.filter(ot => ot.serial !== serial));
      showToastMsg("Owner type deleted successfully.", "info");
      if (parseInt(selectedSerial) === serial) {
        setSelectedSerial("");
      }
    }
  };

  const loadDefaultSamples = () => {
    setOwnerTypes(INITIAL_OWNER_TYPES);
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

  const processedOwnerTypes = useMemo(() => {
    let filtered = ownerTypes;

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
  }, [ownerTypes, searchTerm, sortColumn, sortDirection]);

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
            <span className="owner-type-wizard-title-text">Owner Type Master</span>
            <div className="owner-type-wizard-title-arrow"></div>
          </div>
        </div>

        {/* Back and Title section */}
        <div className="owner-type-wizard-section">
          <button 
            onClick={handleGoBack}
            className="owner-type-back-button"
          >
            <ChevronLeft className="owner-type-back-icon" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="owner-type-title">
            <UserCheck className="owner-type-title-icon" />
            <span>Owner Type Directory</span>
          </h1>
          <p className="owner-type-directory-description">
            Configure and maintain master records of excise license owner types, cooperative societies, and legal structures.
          </p>
        </div>

        {/* Form area in double-column layout */}
        <form onSubmit={handleSaveOwnerType} className="owner-type-form">
          <div className="owner-type-form-grid">
            
            {/* Serial Number Selector */}
            <div className="owner-type-form-col-4 owner-type-form-row">
              <label className="owner-type-label">
                Serial Number <span className="required">*</span>
              </label>
              <select
                value={selectedSerial}
                onChange={(e) => setSelectedSerial(e.target.value)}
                className="owner-type-select"
              >
                <option value="">--Select Existing to Edit--</option>
                {ownerTypes.map((ot) => (
                  <option key={ot.serial} value={ot.serial}>
                    Serial {ot.serial} - {ot.name}
                  </option>
                ))}
              </select>
              
              {selectedSerial === "" && (
                <div className="owner-type-form-row" style={{ marginTop: "0.25rem" }}>
                  <input
                    type="number"
                    placeholder="Or enter new custom Serial No."
                    value={newSerialValue}
                    onChange={(e) => handleInputChange("newSerialValue", e.target.value)}
                    className={`owner-type-input ${formErrors.newSerialValue ? "owner-type-form-input-error" : ""}`}
                  />
                  {formErrors.newSerialValue && (
                    <span className="text-xs text-rose-500 font-semibold">{formErrors.newSerialValue}</span>
                  )}
                </div>
              )}

              {selectedSerial !== "" && (
                <span className="text-xs text-[#2b9ec3] font-bold bg-[rgba(43,158,195,0.05)] px-2.5 py-1 rounded border border-[rgba(43,158,195,0.2)]">
                  Editing Mode (Serial: {selectedSerial})
                </span>
              )}
            </div>

            {/* License Type Description Row/Col */}
            <div className="owner-type-form-col-8 owner-type-form-row">
              <label className="owner-type-label">
                License Type Description <span className="required">*</span>
              </label>
              <textarea
                value={licenseDescription}
                onChange={(e) => handleInputChange("licenseDescription", e.target.value)}
                className={`owner-type-textarea ${formErrors.licenseDescription ? "owner-type-form-input-error" : ""}`}
                placeholder="Enter License Type description, legal entity description, or structure details..."
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
              onClick={handleCancelOwnerType}
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
              <span>Owner Type Directory</span>
              <span className="owner-type-total-badge">
                {ownerTypes.length} Total
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
        {processedOwnerTypes.length === 0 ? (
          <div className="owner-type-table-empty-state">
            <div className="owner-type-table-empty-icon-wrapper">
              <Sliders className="owner-type-table-empty-icon" />
            </div>
            <p className="owner-type-table-empty-title">No matching owner type records found</p>
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
                    Owner Type Description {sortColumn === "name" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th className="owner-type-table-header-action" style={{ width: "120px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="owner-type-table-body">
                {processedOwnerTypes.map((ot) => {
                  const isSelected = selectedSerial === String(ot.serial);
                  return (
                    <tr
                      key={ot.serial}
                      className={`owner-type-table-row ${isSelected ? "owner-type-table-row-selected" : ""}`}
                      onClick={() => setSelectedSerial(String(ot.serial))}
                      title="Click to edit this record"
                    >
                      <td className="owner-type-td-id">
                        {ot.serial}
                      </td>
                      <td className="owner-type-td-info">
                        <div className="owner-type-record-name">{ot.name}</div>
                        <div className="owner-type-record-meta">ID: {ot.serial} • EXCISE_MASTER</div>
                      </td>
                      <td className="owner-type-td-action">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setSelectedSerial(String(ot.serial))}
                            className="owner-type-table-delete-button"
                            style={{ color: "#2563eb" }}
                            title="Edit Record"
                          >
                            <Edit2 className="owner-type-table-delete-icon" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteOwnerType(ot.serial)}
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
