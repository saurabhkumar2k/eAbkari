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
  errors
}) {
  // console.log("DirectorsList:", applicant?.constitutionType);
  console.log("DirectorsList:", ConstitutionType);
  console.log("DirectorRow:", ConstitutionType);
  console.log("ConstitutionType:", ConstitutionType); // 👈 ADD HERE
  console.log("DirectorRow ConstitutionType:", ConstitutionType);
  console.log(RestaurantDetail);
  return (
    <div className="restaurant-container">
      {/* Restaurant List */}
      <div className="restaurant-list">
        <div className="restaurant-section">
          {/* Restaurant Header */}
          <div className="restaurant-header">
            <h3>Restaurant Details #{index + 1}</h3>

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
          <div className="restaurant-grid">
            {/* 1. Restaurant Name */}
            <div className="restaurant-field">
              <label> Restaurant/Bar Name <span>*</span> </label>
              <div className="input-wrapper">
                <User size={16} />
                <input
                  type="text"
                  value={RestaurantDetail.NameOfAdditionalRestaurant || ""}
                  onChange={(e) => onChange(index, "NameOfAdditionalRestaurant", e.target.value)}
                />
              </div>
              {errors?.NameOfAdditionalRestaurantErr &&  (
                <span className="error-text">{errors.NameOfAdditionalRestaurantErr}</span>
              )}
            </div>

            {/* 2. No. of Seat Covers */}
            <div className="restaurant-field">
              <label> No of Seat Covers <span>*</span> </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={RestaurantDetail.NumberOfSeatCovers || ""}
                  onChange={(e) => onChange(index, "NumberOfSeatCovers", e.target.value)}
                  maxLength={3}
                />
              </div>
              {errors?.NumberOfSeatCoversErr && (
                <span className="error-text">{errors.NumberOfSeatCoversErr}</span>
              )}
            </div>

            {/* 3. No. of Dispensing Counter */}
            <div className="restaurant-field">
              <label> Number Of DisPensing Counter <span>*</span> </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={RestaurantDetail.NumberOfCounter || ""}
                  onChange={(e) => onChange(index, "NumberOfCounter", e.target.value)}
                  maxLength={3}
                />
              </div>
              {errors?.NumberOfCounterErr && (
                <span className="error-text">{errors.NumberOfCounterErr}</span>
              )}

            </div>

            {/* 4. Hour of Sale */}
            <div className="restaurant-field">
              <label> Hours of Sale <span>*</span> </label>
              <select
                value={RestaurantDetail.HoursofSale || "0"}
                onChange={(e) => onChange(index, "HoursofSale", e.target.value)}
                className="input-box"
              >
                <option value="">--Select--</option>
                <option value="1">11 AM - 1 AM</option>
                <option value="2">11 AM - 11 AM</option>
                {hoursOfSaleList.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
              <div className="error-text-container">
                {errors?.HoursofSaleErr && (
                  <span className="error-text-all">{errors?.HoursofSaleErr}</span>
                )}
              </div>
            </div>

            {/* 5. Additional Area */}
            <div className="restaurant-field">
              <label> Additional Area <span>*</span> </label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name={`AddtionalArea-${index}`}
                    value="1"
                    checked={RestaurantDetail.AddtionalArea === "1"}
                    onChange={() => onChange(index, "AddtionalArea", "1")}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`AddtionalArea-${index}`}
                    value="0"
                    checked={RestaurantDetail.AddtionalArea === "0"}
                    onChange={() => onChange(index, "AddtionalArea", "0")}
                  /> No
                </label>
              </div>
              {errors?.AddtionalAreaErr && (
                <span className="error-text">{errors.AddtionalAreaErr}</span>
              )}
            </div>

            {/* 6. Hour of Sale Additional Area */}

            {RestaurantDetail.AddtionalArea === "1" && (
              <div className="restaurant-field">
                <label> Hours of Sale Additional Area <span>*</span> </label>
                <select
                  value={RestaurantDetail.HoursofSaleAddtionalArea || "0"}
                  onChange={(e) => onChange(index, "HoursofSaleAddtionalArea", e.target.value)}
                  className="input-box"
                >
                  <option value="">--Select--</option>
                  <option value="1">11 AM - 1 AM</option>
                  <option value="2">11 AM - 8 PM</option>
                  {hoursOfSaleList.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
                <div className="error-text-container">
                  {errors?.HoursofSaleAddtionalAreaErr && (
                    <span className="error-text-all">{errors?.HoursofSaleAddtionalAreaErr}</span>
                  )}
                </div>
              </div>
            )}

            {/* 7. Foreign Liquor */}
            <div className="restaurant-field">
              <label> Foreign Liquor <span>*</span> </label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name={`ForeignLiquor-${index}`}
                    value="1"
                    checked={RestaurantDetail.ForeignLiquor === "1"}
                    onChange={() => onChange(index, "ForeignLiquor", "1")}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`ForeignLiquor-${index}`}
                    value="0"
                    checked={RestaurantDetail.ForeignLiquor === "0"}
                    onChange={() => onChange(index, "ForeignLiquor", "0")}
                  /> No
                </label>
              </div>
              {errors?.ForeignLiquorErr && (
                <span className="error-text">{errors.ForeignLiquorErr}</span>
              )}
            </div>

            {/* 8. Area in Sq.Mtr */}
            <div className="restaurant-field">
              <label> Area in Sq.Mtr <span>*</span> </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={RestaurantDetail.AreaSqMtr || ""}
                  onChange={(e) => onChange(index, "AreaSqMtr", e.target.value)}
                  maxLength={3}
                />
              </div>
              {errors?.AreaSqMtrErr && (
                <span className="error-text">{errors.AreaSqMtrErr}</span>
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
