import React from "react";

import "../../../Style/Retail.css";
import { allowOnlyNumbers } from "../validation";

import { User, Trash2 } from "lucide-react";

export default function RetailDirectorRow({
  RetailPropDetails,
  index,
  onChange,
  onDelete,
  disableDelete,
  ConstitutionType,
  errors,
}) {
  // console.log("DirectorsList:", applicant?.constitutionType);
  // console.log("DirectorsList:", ConstitutionType);
  // console.log("DirectorRow:", ConstitutionType);
  // console.log("ConstitutionType:", ConstitutionType); // 👈 ADD HERE
  // console.log("DirectorRow ConstitutionType:", ConstitutionType);
  console.log("RetailDirectorRow ------ ",RetailPropDetails);
  return (
    <div className="restaurant-container">
      {/* Restaurant List */}
      <div className="restaurant-list">
        <div className="restaurant-section">
          {/* Restaurant Header */}
          <div className="restaurant-header">
            <h3>Name of Company Directors/Proprietors/Partners #{index + 1}</h3>

            <button
              type="button"
              className="bt-dir-del"
              onClick={() => onDelete(index)}
              disabled={disableDelete}
            >
              {/* 🗑 Delete */}
              <Trash2 size={16} />
            </button>
          </div>

          {/* 3 × 3 Grid */}
          <div className="director-fields">
            {/* 1. Director type */}
            <div className="restaurant-field">
              <label>
                Name of the <span>*</span>
              </label>

              <div className="input-wrapper">
                <User size={16} />

                <select
                  value={RetailPropDetails.addtionalDesigTypeValue || "0"}
                  onChange={(e) => onChange(index, "addtionalDesigTypeValue", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1">Company Directors</option>
                  <option value="2">Proprietors</option>
                  <option value="3">Partners</option>
                  <option value="4">Cooperative Society</option>
                  <option value="5">LLP</option>
                </select>
              </div>

              {errors?.addtionalDesigTypeValueErr && (
                <span className="error-text">{errors.addtionalDesigTypeValueErr}</span>
              )}
            </div>

            {/* Name */}
            <div className="restaurant-field">
              <label>
                {" "}
                Name <span>*</span>{" "}
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={RetailPropDetails.name || ""}
                  onChange={(e) => onChange(index, "name", e.target.value)}
                  maxLength={20}
                />
              </div>
              {errors?.nameErr && (
                <span className="error-text">{errors.nameErr}</span>
              )}
            </div>

            {/* 9. Grid Placeholder (Replace this div when you add your 9th field) */}
            <div className="restaurant-field empty-placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
