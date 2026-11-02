import React from "react";

import "../../../Style/Retail.css";
import { allowOnlyNumbers } from "../../../areas/applicant/HCR/validation";

import { User, Trash2 } from "lucide-react";

export default function RetailDirectorRow({
  ClubDetail,
  index,
  onChange,
  onDelete,
  disableDelete,
  ConstitutionType,
  errors,
}) {
  // console.log("DirectorsList:", applicant?.constitutionType);
  console.log("DirectorsList:", ConstitutionType);
  console.log("DirectorRow:", ConstitutionType);
  console.log("ConstitutionType:", ConstitutionType); // 👈 ADD HERE
  console.log("DirectorRow ConstitutionType:", ConstitutionType);
  console.log(ClubDetail);
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
            {/* <div className="restaurant-field">
              <label>
                {" "}
                Name of the <span>*</span>{" "}
              </label>
              <div className="input-wrapper">
                <User size={16} />
                <input
                  type="text"
                  value={ClubDetail.NameOfthe || ""}
                  onChange={(e) =>
                    onChange(
                      index,
                      "NameOfthe",
                      e.target.value,
                    )
                  }
                />
              </div>
              {errors?.NameOftheErr && (
                <span className="error-text">
                  {errors.NameOftheErr}
                </span>
              )}
            </div> */}

            <div className="restaurant-field">
              <label>
                Name of the <span>*</span>
              </label>

              <div className="input-wrapper">
                <User size={16} />

                <select
                  value={ClubDetail.NameOfthe || "0"}
                  onChange={(e) => onChange(index, "NameOfthe", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1">Company Directors</option>
                  <option value="2">Proprietors</option>
                  <option value="3">Partners</option>
                  <option value="4">Cooperative Society</option>
                  <option value="5">LLP</option>
                </select>
              </div>

              {errors?.NameOftheErr && (
                <span className="error-text">{errors.NameOftheErr}</span>
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
                  value={ClubDetail.Name || ""}
                  onChange={(e) => onChange(index, "Name", e.target.value)}
                  maxLength={20}
                />
              </div>
              {errors?.NameErr && (
                <span className="error-text">{errors.NameErr}</span>
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
