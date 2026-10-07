import React from "react";

import "../Style/ApplyLicense.css";
import {allowOnlyNumbers} from '../areas/applicant/HCR/validation'

import {
  User,
  Trash2,
} from "lucide-react";

export default function TrainRouteDetailsRow({
  TrainRouteDetail,
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
  console.log(TrainRouteDetail);
  return (
    <div className="restaurant-container">
      {/* Restaurant List */}
      <div className="restaurant-list">
        <div className="restaurant-section">
          {/* Restaurant Header */}
          <div className="restaurant-header">
            <h3>Train Route Details #{index + 1}</h3>

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
                Enter Route of the Train <span>*</span>{" "}
              </label>
              <div className="input-wrapper">
                <User size={16} />
                <input
                  type="text"
                  value={TrainRouteDetail.RouteDescription || ""}
                  onChange={(e) =>
                    onChange(
                      index,
                      "RouteDescription",
                      e.target.value,
                    )
                  }
                />
              </div>
              {errors?.RouteDescriptionErr && (
                <span className="error-text">
                  {errors.RouteDescriptionErr}
                </span>
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
