import React from "react";
import RestaurantDetailsRow from "./RestaurantDetailsRow";

import "../Style/ApplyLicense.css";
import "../Style/Restaurant.css";

const RestaurantDetailsL16 = ({ RestaurantDetails, onChange, onAdd, onDelete, ConstitutionType, hoursOfSaleList, errors }) => {
  return (
    <div className="restaurants-section">
      {/* Section Title */}
      {/* <div className="restaurant-header-box">
        <h3 className="restaurant-heading">
          restaurant / Partners / Proprietors
        </h3>
        <p className="restaurant-subheading">
          As per MCA Portal (Companies Act 2013)
        </p>
      </div> */}
      <div className="restaurants-header">
        <div>
          <h2>Restaurant Details</h2>
          <p className="restaurant-subheading">
            As per MCA Portal (Companies Act 2013)
          </p>
        </div>
      </div>

      {/* restaurants List */}
      <div className="restaurants-wrapper">
        {RestaurantDetails.length === 0 ? (
          <div className="restaurants-empty-state">
            <p className="empty-message">No Restaurant Details added yet. Click "Add Restaurant Details" to start.</p>
          </div>
        ) : (
          RestaurantDetails.map((detail, index) => (
            <RestaurantDetailsRow
              key={index}
              RestaurantDetail={detail}
              index={index}
              onChange={onChange}
              onDelete={onDelete}
              ConstitutionType={ConstitutionType}
              disableDelete={false}
              hoursOfSaleList={hoursOfSaleList}
              errors={errors?.[index]}
            />
          ))
        )}
      </div>

      {/* Add Button */}
      {/* <div className="restaurant-action-bar">
        <button
          type="button"
          onClick={onAdd}
          className="btn-add-director"
        >
          + Add Director
        </button>
        {restaurant.length > 0 && (
          <span className="restaurant-count">
            {restaurant.length} director{restaurant.length !== 1 ? 's' : ''} added
          </span>
        )}
      </div> */}
      <div className="restaurants-action-bar">
        <button
          type="button"
          onClick={onAdd}
          className="btn-add-director"
        >
          + Add Restaurant Details
        </button>

        {RestaurantDetails.length > 0 && (
          <span className="restaurants-count">
            {RestaurantDetails.length} restaurant detail{RestaurantDetails.length !== 1 ? "s" : ""} added
          </span>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsL16;





