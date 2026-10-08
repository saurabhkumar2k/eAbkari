import React from "react";
import { useState } from "react";
import "../Style/ApplyLicense.css";
import { allowOnlyNumbers } from "../areas/applicant/HCR/validation";

import { User, Trash2 } from "lucide-react";

export default function TrainRouteDetailsRow({
  TrainRouteDetail,
  index,
  onChange,
  onDelete,
  disableDelete,
  ConstitutionType,
  errors,
  count,
}) {
  // console.log("DirectorsList:", applicant?.constitutionType);
  console.log("DirectorsList:", ConstitutionType);
  console.log("DirectorRow:", ConstitutionType);
  console.log("ConstitutionType:", ConstitutionType); // 👈 ADD HERE
  console.log("DirectorRow ConstitutionType:", ConstitutionType);
  console.log(TrainRouteDetail);

  // const [count, setCount] = useState(0);

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

          {/* 2 × 2 Grid */}
          <div
            className="train-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "80px minmax(0, 1fr)",
              width: "100%",
            }}
          >
            {/* Sl No */}
            <div className="restaurant-field">
              <label>
                SlNo <span>*</span>
              </label>

              <div>{count}</div>
            </div>

            {/* Route */}
            <div className="restaurant-field">
              <label>
                Enter Route of the Train <span>*</span>
              </label>

              <div className="input-wrapper">
                <User size={16} />

                <input
                  type="text"
                  value={TrainRouteDetail.RouteDescription || ""}
                  onChange={(e) =>
                    onChange(index, "RouteDescription", e.target.value)
                  }
                />
              </div>

              {errors?.RouteDescriptionErr && (
                <span className="error-text">{errors.RouteDescriptionErr}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
