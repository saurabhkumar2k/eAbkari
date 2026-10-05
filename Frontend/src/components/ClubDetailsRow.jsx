import React from "react";

import "../Style/ApplyLicense.css";
import {allowOnlyNumbers} from '../areas/applicant/HCR/validation'

import {
  User,
  Trash2,
} from "lucide-react";

export default function ClubDetailsRow({
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
            <h3>Bar Details #{index + 1}</h3>

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
          <div className="club-grid">
            {/* 1. Restaurant Name */}
            <div className="restaurant-field">
              <label>
                {" "}
                Restaurant/Bar Name <span>*</span>{" "}
              </label>
              <div className="input-wrapper">
                <User size={16} />
                <input
                  type="text"
                  value={ClubDetail.NameOfAdditionalRestaurant || ""}
                  onChange={(e) =>
                    onChange(
                      index,
                      "NameOfAdditionalRestaurant",
                      e.target.value,
                    )
                  }
                />
              </div>
              {errors?.NameOfAdditionalRestaurantErr && (
                <span className="error-text">
                  {errors.NameOfAdditionalRestaurantErr}
                </span>
              )}
            </div>



            {/* 3. No. of Dispensing Counter */}
            <div className="restaurant-field">
              <label>
                {" "}
                Number Of DisPensing Counter <span>*</span>{" "}
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  inputMode="numeric"
                  value={ClubDetail.NumberOfCounter || ""}
                  onChange={(e) => onChange(index, "NumberOfCounter", allowOnlyNumbers(e.target.value))}
                  maxLength={3}
                />
              </div>
              {errors?.NumberOfCounterErr && (
                <span className="error-text">{errors.NumberOfCounterErr}</span>
              )}
            </div>



            {/* 5. Additional Area */}
            <div className="restaurant-field">
              <label>
                {" "}
                Additional Area <span>*</span>{" "}
              </label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name={`AddtionalArea-${index}`}
                    value="1"
                    checked={ClubDetail.AddtionalArea === "1"}
                    onChange={() => onChange(index, "AddtionalArea", "1")}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`AddtionalArea-${index}`}
                    value="0"
                    checked={ClubDetail.AddtionalArea === "0"}
                    onChange={() => onChange(index, "AddtionalArea", "0")}
                  />{" "}
                  No
                </label>
              </div>
              {errors?.AddtionalAreaErr && (
                <span className="error-text">{errors.AddtionalAreaErr}</span>
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
