import React from "react";

import "../Style/ApplyLicense.css";

import {
  User,
  Percent,
  CreditCard,
  BadgeCheck,
  Upload,
  FileText,
  Eye,
  RefreshCcw,
  Trash2,
} from "lucide-react";

export default function RestaurantDetailsRow({
  RestaurantDetail,
  index,
  onChange,
  onDelete,
  disableDelete,
  ConstitutionType,
  hoursOfSaleList,
}) {
  // console.log("DirectorsList:", applicant?.constitutionType);
  console.log("DirectorsList:", ConstitutionType);
  console.log("DirectorRow:", ConstitutionType);
  console.log("ConstitutionType:", ConstitutionType); // 👈 ADD HERE
  console.log("DirectorRow ConstitutionType:", ConstitutionType);
  console.log(RestaurantDetail);
  return (
    <div className="directors-container">
      {/* Director List */}
      <div className="directors-list">
        <div className="director-section">
          {/* Director Header */}
          <div className="director-header">
            <h3>Restaurant Details #{index + 1}</h3>

            <button
              type="button"
              className="bt-dir-del"
              onClick={() => onDelete(index)}
              disabled={disableDelete}
            >
              🗑 Delete
            </button>
          </div>

          {/* 3 × 2 Grid */}
          <div className="director-grid">
            {/* Restaurant Name */}
            <div className="director-field">
              <label>
                Restaurant/Bar Name <span>*</span>
              </label>

              <div className="input-wrapper">
                <User size={16} />
                <input
                  type="text"
                  value={RestaurantDetail.NameOfAdditionalRestaurant || ""}
                  onChange={(e) =>
                    onChange(
                      index,
                      "NameOfAdditionalRestaurant",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>

            {/* No. of Seat Covers */}
            <div className="director-field">
              <label>
                No of Seat Covers <span>*</span>
              </label>

              <div className="input-wrapper">
                <input
                  type="text"
                  value={RestaurantDetail.NumberOfSeatCovers || ""}
                  onChange={(e) =>
                    onChange(index, "NumberOfSeatCovers", e.target.value)
                  }
                  maxLength={3}
                />
              </div>
            </div>

            {/* No. of Dispensing Counter */}
            <div className="director-field">
              <label>
                Number Of DisPensing Counter <span>*</span>
              </label>

              <div className="input-wrapper">
                <input
                  type="text"
                  value={RestaurantDetail.NumberOfCounter || ""}
                  onChange={(e) =>
                    onChange(index, "NumberOfCounter", e.target.value)
                  }
                  maxLength={3}
                />
              </div>
            </div>

            {/* Hour of Sale */}
            <div className="director-field">
              <label>
                Hours of Sale <span>*</span>
              </label>

              <select
                value={RestaurantDetail.HoursofSale || "0"}
                onChange={(e) => onChange(index, "HoursofSale", e.target.value)}
                className="input-box"
              >
                <option value="0">--Select-- </option>

                <option value="1">11 AM - 1 AM</option>
                <option value="2">11 AM - 11 AM</option>

                {hoursOfSaleList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Area */}
            <div className="director-field">
              <label>
                Additional Area <span>*</span>
              </label>

              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="AddtionalArea"
                    value="1"
                    checked={RestaurantDetail.AddtionalArea === "1"}
                    onChange={(e) => onChange(index, "AddtionalArea", "1")}
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    name="AddtionalArea"
                    value="0"
                    checked={RestaurantDetail.AddtionalArea === "0"}
                    onChange={(e) => onChange(index, "AddtionalArea", "0")}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Hour of Sale Additional Area */}
            <div className="director-field">
              <label>
                Hours of Sale Additional Area <span>*</span>
              </label>

              <select
                value={RestaurantDetail.HoursofSaleAddtionalArea || "0"}
                onChange={(e) =>
                  onChange(index, "HoursofSaleAddtionalArea", e.target.value)
                }
                className="input-box"
              >
                <option value="0">--Select-- </option>

                <option value="1">11 AM - 1 AM</option>
                <option value="2">11 AM - 8 PM</option>

                {hoursOfSaleList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Foreign Liquor */}
            <div className="director-field">
              <label>
                Foreign Liquor <span>*</span>
              </label>

              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="ForeignLiquor"
                    value="1"
                    checked={RestaurantDetail.ForeignLiquor === "1"}
                    onChange={(e) => onChange(index, "ForeignLiquor", "1")}
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    name="ForeignLiquor"
                    value="0"
                    checked={RestaurantDetail.ForeignLiquor === "0"}
                    onChange={(e) => onChange(index, "ForeignLiquor", "0")}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Area in Sq.Mtr */}
            <div className="director-field">
              <label>
                Area in Sq.Mtr <span>*</span>
              </label>

              <div className="input-wrapper">
                <input
                  type="text"
                  value={RestaurantDetail.AreaSqMtr || ""}
                  onChange={(e) => onChange(index, "AreaSqMtr", e.target.value)}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
