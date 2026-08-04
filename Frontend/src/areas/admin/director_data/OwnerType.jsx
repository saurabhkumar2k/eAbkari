import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5214";
const LG_API = `${API_BASE_URL}/api/LGDiretory`;

export default function OwnerTypeMaster({ onBack }) {
  const [toast, setToast] = useState(null);
  const [selectedCode, setSelectedCode] = useState("");
  const [mode, setMode] = useState("");
  const [licenseDescription, setLicenseDescription] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [licenseTypes, setLicenseTypes] = useState([]);

  useEffect(() => {
    const loadOwnerTypes = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await axios.get(`${LG_API}/GetOwnerTypes`);
        const mappedData = (Array.isArray(response.data) ? response.data : []).map((item) => ({
          code: String(item.OTID ?? item.otid ?? item.code ?? "").trim(),
          description: String(item.OwnerTypeName ?? item.ownerTypeName ?? item.description ?? "").trim()
        })).filter((item) => item.code || item.description);

        setLicenseTypes(mappedData);
      } catch (error) {
        console.error("Failed to load owner types", error);
        setLoadError("Unable to load owner type data from the backend.");
        setLicenseTypes([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOwnerTypes();
  }, []);

  useEffect(() => {
    if (selectedCode === "") {
      setLicenseDescription("");
      setMode("");
      return;
    }

    if (selectedCode === "New") {
      setMode("I");
      setLicenseDescription("");
    } else {
      const found = licenseTypes.find((item) => item.code === selectedCode);
      if (found) {
        setMode("U");
        setLicenseDescription(found.description);
      }
    }
  }, [selectedCode, licenseTypes]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToastMsg = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleInputChange = (value) => {
    setLicenseDescription(value);
    setFormErrors((prev) => ({ ...prev, licenseDescription: "" }));
  };

  const handleCancelOwnerType = () => {
    setSelectedCode("");
    setMode("");
    setLicenseDescription("");
    setFormErrors({});
    showToastMsg("Form cleared.", "info");
  };

  const handleSaveOwnerType = (e) => {
    e.preventDefault();
    const errors = {};

    if (selectedCode === "" || selectedCode === "--Select--") {
      errors.selectedCode = "Please Select Type Code";
    }

    if (!licenseDescription.trim()) {
      errors.licenseDescription = "Please Enter Type Description";
    }

    const normalizedDescription = licenseDescription.trim().toLowerCase();
    const duplicate = licenseTypes.find((item) => {
      if (mode === "U" && item.code === selectedCode) {
        return false;
      }
      return item.description.trim().toLowerCase() === normalizedDescription;
    });

    if (duplicate) {
      errors.duplicate = "Data Already Exist....";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToastMsg(errors.duplicate || errors.selectedCode || errors.licenseDescription || "Please correct form errors.", "error");
      return;
    }

    if (mode === "U") {
      setLicenseTypes((prev) =>
        prev.map((item) =>
          item.code === selectedCode ? { ...item, description: licenseDescription.trim() } : item
        )
      );
      showToastMsg("Update Record Successfully!");
    } else {
      const maxCode = licenseTypes.reduce((max, item) => {
        const numericCode = parseInt(item.code, 10);
        return Number.isFinite(numericCode) && numericCode > max ? numericCode : max;
      }, 0);
      const generatedCode = String(maxCode + 1);

      setLicenseTypes((prev) =>
        [...prev, { code: generatedCode, description: licenseDescription.trim() }].sort((a, b) => {
          const aNum = parseInt(a.code, 10);
          const bNum = parseInt(b.code, 10);
          return aNum - bNum;
        })
      );
      showToastMsg("Record Inserted Successfully");
    }

    setSelectedCode("");
    setMode("");
    setLicenseDescription("");
    setFormErrors({});
  };

  const handleDeleteOwnerType = (code) => {
    if (window.confirm(`Are you sure you want to delete License Type with Code ${code}?`)) {
      setLicenseTypes((prev) => prev.filter((item) => item.code !== code));
      showToastMsg("Delete Record Successfully", "info");
      if (selectedCode === code) {
        setSelectedCode("");
        setMode("");
        setLicenseDescription("");
      }
    }
  };

  const loadDefaultSamples = () => {
    setIsLoading(true);
    setLoadError("");

    axios.get(`${LG_API}/GetOwnerTypes`)
      .then((response) => {
        const mappedData = (Array.isArray(response.data) ? response.data : []).map((item) => ({
          code: String(item.OTID ?? item.otid ?? item.code ?? "").trim(),
          description: String(item.OwnerTypeName ?? item.ownerTypeName ?? item.description ?? "").trim()
        })).filter((item) => item.code || item.description);

        setLicenseTypes(mappedData);
        showToastMsg("Owner type data reloaded from backend.", "info");
      })
      .catch((error) => {
        console.error("Failed to reload owner types", error);
        setLoadError("Unable to reload owner type data from the backend.");
        showToastMsg("Unable to reload owner type data.", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleExport = (format) => {
    const rows = licenseTypes.map((item) => [item.code, item.description]);
    const htmlTable = `
      <table border="1" cellspacing="0" cellpadding="6">
        <thead>
          <tr><th>Type Code</th><th>Type Description</th></tr>
        </thead>
        <tbody>
          ${rows.map(([code, description]) => `<tr><td>${code}</td><td>${description}</td></tr>`).join("")}
        </tbody>
      </table>
    `;

    if (format === "pdf") {
      window.print();
      return;
    }

    const mimeType = format === "excel"
      ? "application/vnd.ms-excel"
      : "application/msword";
    const extension = format === "excel" ? "xls" : "doc";
    const blob = new Blob([htmlTable], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `license-type.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const processedLicenseTypes = useMemo(() => licenseTypes, [licenseTypes]);

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
        <div className="owner-type-wizard-header-actions">
          <div className="owner-type-wizard-title-banner" style={{ minWidth: "220px" }}>
            <span className="owner-type-wizard-title-text">License Type Master</span>
            <div className="owner-type-wizard-title-arrow"></div>
          </div>
        </div>

        <div className="owner-type-wizard-section">
          <button
            onClick={handleGoBack}
            className="owner-type-back-button"
            type="button"
          >
            <ChevronLeft className="owner-type-back-icon" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="owner-type-title">
            <UserCheck className="owner-type-title-icon" />
            <span>License Type Directory</span>
          </h1>
          <p className="owner-type-directory-description">
            Configure and maintain master records loaded from the database query.
          </p>
        </div>

        <form onSubmit={handleSaveOwnerType} className="owner-type-form">
          <div className="owner-type-form-grid">
            <div className="owner-type-form-col-4 owner-type-form-row">
              <label className="owner-type-label">
                Type Code <span className="required">*</span>
              </label>
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="owner-type-select"
              >
                <option value="">--Select--</option>
                <option value="New">New</option>
                {licenseTypes.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code}
                  </option>
                ))}
              </select>

              {formErrors.selectedCode && (
                <span className="text-xs text-rose-500 font-semibold">{formErrors.selectedCode}</span>
              )}

              {mode === "U" && (
                <span className="text-xs text-[#2b9ec3] font-bold bg-[rgba(43,158,195,0.05)] px-2.5 py-1 rounded border border-[rgba(43,158,195,0.2)]">
                  Editing Mode (Code: {selectedCode})
                </span>
              )}
            </div>

            <div className="owner-type-form-col-8 owner-type-form-row">
              <label className="owner-type-label">
                Type Description <span className="required">*</span>
              </label>
              <textarea
                value={licenseDescription}
                onChange={(e) => handleInputChange(e.target.value)}
                className={`owner-type-textarea ${formErrors.licenseDescription ? "owner-type-form-input-error" : ""}`}
                placeholder="Enter Type Description"
              />
              {formErrors.licenseDescription && (
                <span className="text-xs text-rose-500 font-semibold">{formErrors.licenseDescription}</span>
              )}
            </div>

          </div>

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

      <div className="owner-type-directory-card">
        <div className="owner-type-directory-header">
          <div>
            <h2 className="owner-type-directory-title">
              <span>License Type Directory</span>
              <span className="owner-type-total-badge">
                {licenseTypes.length} Total
              </span>
            </h2>
            <p className="owner-type-directory-subtitle">Filter, manage, export, and maintain current master entries.</p>
          </div>

          <div className="owner-type-table-toolbar">
            <button
              type="button"
              onClick={loadDefaultSamples}
              className="owner-type-table-reset-button"
              title="Reload owner types from backend"
            >
              <RefreshCw className="owner-type-table-refresh-icon" />
              <span>Reload from Database</span>
            </button>

            <button
              type="button"
              onClick={() => handleExport("doc")}
              className="owner-type-pdf-btn"
              title="Export current list to Word"
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "1px 4px",
                borderRadius: "2px",
                fontSize: "8px",
                fontWeight: "900",
                marginRight: "4px",
                lineHeight: 1
              }}>
                DOC
              </span>
              <span className="owner-type-pdf-text">DOC</span>
            </button>

            <button
              type="button"
              onClick={() => handleExport("excel")}
              className="owner-type-pdf-btn"
              title="Export current list to Excel"
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#15803d",
                color: "#ffffff",
                padding: "1px 4px",
                borderRadius: "2px",
                fontSize: "8px",
                fontWeight: "900",
                marginRight: "4px",
                lineHeight: 1
              }}>
                XLS
              </span>
              <span className="owner-type-pdf-text">EXCEL</span>
            </button>

            <button
              type="button"
              onClick={() => handleExport("pdf")}
              className="owner-type-pdf-btn"
              title="Export current list to PDF"
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

        {processedLicenseTypes.length === 0 ? (
          <div className="owner-type-table-empty-state">
            <div className="owner-type-table-empty-icon-wrapper">
              <Sliders className="owner-type-table-empty-icon" />
            </div>
            <p className="owner-type-table-empty-title">{isLoading ? "Loading owner type records..." : "No matching license type records found"}</p>
            <p className="owner-type-table-empty-subtitle">
              {loadError || (isLoading ? "Please wait while the backend data is loaded." : "Reload the database data or add a new record.")}
            </p>
          </div>
        ) : (
          <div className="owner-type-table-container">
            <table className="owner-type-table">
              <thead>
                <tr className="owner-type-table-header-row">
                  <th className="owner-type-table-header-cell" style={{ width: "120px" }}>Type Code</th>
                  <th className="owner-type-table-header-cell">Type Description</th>
                  <th className="owner-type-table-header-action" style={{ width: "120px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="owner-type-table-body">
                {processedLicenseTypes.map((item) => {
                  const isSelected = selectedCode === item.code;
                  return (
                    <tr
                      key={item.code}
                      className={`owner-type-table-row ${isSelected ? "owner-type-table-row-selected" : ""}`}
                      onClick={() => setSelectedCode(String(item.code))}
                      title="Click to edit this record"
                    >
                      <td className="owner-type-td-id">
                        {item.code}
                      </td>
                      <td className="owner-type-td-info">
                        <div className="owner-type-record-name">{item.description}</div>
                        <div className="owner-type-record-meta">ID: {item.code} • LIC_TYPE_MASTER</div>
                      </td>
                      <td className="owner-type-td-action">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setSelectedCode(String(item.code))}
                            className="owner-type-table-delete-button"
                            style={{ color: "#2563eb" }}
                            title="Edit Record"
                          >
                            <Edit2 className="owner-type-table-delete-icon" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteOwnerType(item.code)}
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
