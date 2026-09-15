import React from "react";
import DirectorRow from "./DirectorRow";
import RestaurantDetailsRow from "./RestaurantDetailsRow";

import "../Style/ApplyLicense.css";
import "../Style/DirectorsList.css";

const RestaurantDetailsL16 = ({ RestaurantDetails, onChange, onAdd, onDelete, ConstitutionType, hoursOfSaleList }) => {
  return (
    <div className="directors-section">
      {/* Section Title */}
      {/* <div className="directors-header-box">
        <h3 className="directors-heading">
          Directors / Partners / Proprietors
        </h3>
        <p className="directors-subheading">
          As per MCA Portal (Companies Act 2013)
        </p>
      </div> */}
      <div className="directors-header">
        <div>
          <h2>Restaurant Details</h2>
          {/* <p>As per MCA Portal (Companies Act 2013)</p> */}
        </div>
      </div>

      {/* Directors List */}
      <div className="directors-wrapper">
        {RestaurantDetails.length === 0 ? (
          <div className="directors-empty-state">
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
            />
          ))
        )}
      </div>

      {/* Add Button */}
      {/* <div className="directors-action-bar">
        <button
          type="button"
          onClick={onAdd}
          className="btn-add-director"
        >
          + Add Director
        </button>
        {directors.length > 0 && (
          <span className="directors-count">
            {directors.length} director{directors.length !== 1 ? 's' : ''} added
          </span>
        )}
      </div> */}
      <div className="directors-action-bar">
        <button
          type="button"
          onClick={onAdd}
          className="btn-add-director"
        >
          + Add Restaurant Details
        </button>

        {RestaurantDetails.length > 0 && (
          <span className="directors-count">
            {RestaurantDetails.length} restaurant detail{RestaurantDetails.length !== 1 ? "s" : ""} added
          </span>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsL16;





