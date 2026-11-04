import React from "react";
import "../../../Style/ApplyLicense.css"
import { allowOnlyNumbers } from "../../../areas/applicant/HCR/validation"


import {
  Eye,
  X,
  RotateCw,
  User,
  Percent,
  CreditCard,
  BadgeCheck,
  Upload,
  FileText,
  RefreshCcw,
  Trash2,
} from "lucide-react";

export default function EmployeeRow({
  director,
  index,
  onChange,
  onDelete,
  disableDelete,
  ConstitutionType,
  directorsError,
}) {
  // console.log("DirectorsList:", applicant?.constitutionType);
  // console.log("DirectorsList:", ConstitutionType);
  // console.log("DirectorRow:", ConstitutionType);
  // console.log("ConstitutionType:", ConstitutionType); // 👈 ADD HERE
  // console.log("DirectorRow ConstitutionType:", ConstitutionType);
  // console.log(director);
  console.log("DirectorRow - directorsError  ", directorsError);
  return (
    <div className="directors-container">
      {/* Director List */}
      <div className="directors-list">
        <div className="director-section">
          {/* Director Header */}
          <div className="director-header">
            <h3>Employee #{index + 1}</h3>

            <button
              type="button"
              className="bt-dir-del"
              onClick={() => onDelete(index)}
              disabled={disableDelete}
            >
              {/* 🗑 Delete */}
              <Trash2 size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* 3 × 2 Grid */}
          <div className="director-grid">
            {/* Name */}
            <div className="director-field">
              <label>
                Employee Name <span>*</span>
              </label>

              <div className="input-wrapper">
                <User size={16} />
                <input
                  value={director.PName || ""}
                  onChange={(e) => onChange(index, "PName", e.target.value)}
                />
              </div>
              {directorsError?.PNameErr && (
                <span className="error-text">{directorsError.PNameErr}</span>
              )}
            </div>

            {/* Share */}
              <div className="director-field">
              <label>
                Qualification <span>*</span>
              </label>

              <div className="input-wrapper">               
                <input
                  value={director.PName || ""}
                  onChange={(e) => onChange(index, "PName", e.target.value)}
                />
              </div>
              {directorsError?.PNameErr && (
                <span className="error-text">{directorsError.PNameErr}</span>
              )}
            </div>


            {/* PAN Proof */}
            <div className="director-field">
              <label>PAN Proof</label>

              {!director.panFile ? (
                <label className="upload-button">
                  📄 Upload PAN Proof
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      onChange(index, "panFile", e.target.files?.[0] || null)
                    }
                  />
                </label>
              ) : (
                <div className="uploaded-file">
                  <span title={director.panFile.name}>
                    {director.panFile.name}
                  </span>

                  <div className="file-actions">
                    <button
                      type="button"
                      className="file-view"
                      onClick={() =>
                        window.open(
                          URL.createObjectURL(director.panFile),
                          "_blank",
                        )
                      }
                    >
                      <Eye size={16} strokeWidth={2.5} />
                    </button>

                    <div className="file-replace">
                      <label className="file-replace">
                        <RotateCw size={16} strokeWidth={2.5} />
                        <input
                          type="file"
                          hidden
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) =>
                            onChange(
                              index,
                              "panFile",
                              e.target.files?.[0] || null,
                            )
                          }
                        />
                      </label>
                    </div>

                    <button
                      type="button"
                      className="file-remove"
                      onClick={() => onChange(index, "panFile", null)}
                    >
                      <X size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              )}
              {directorsError?.panFileErr && (
                <span className="error-text">{directorsError.panFileErr}</span>
              )}
            </div>


          </div>

          {/* DIN - only when required */}
          {ConstitutionType === "01" && (
            <div className="din-row">
              <div className="din-field">
                <label>DIN No</label>

                <div className="input-wrapper">
                  <BadgeCheck size={16} />

                  <input
                    value={director.DINNo || ""}
                    onChange={(e) => onChange(index, "DINNo", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

