import React from "react";
import ClubDetailsRow from "./ClubDetailsRow";
import TrainRouteDetailsRow from "./TrainRouteDetailsRow";

import "../Style/ApplyLicense.css";
//import "../Style/Restaurant.css";
import "../Style/Train.css"

const TrainRute = ({ routes, onChange, onAdd, onDelete, ConstitutionType, errors }) => {
  return (
    <div className="restaurants-section">
      {/* Section Title */}
     
      <div className="restaurants-header">
        <div>
          <h2>Train Route Details</h2>
          {/* <p className="restaurant-subheading">
            As per MCA Portal (Companies Act 2013)
          </p> */}
        </div>
      </div>

      {/* restaurants List */}
      <div className="restaurants-wrapper">
        {routes.length === 0 ? (
          <div className="restaurants-empty-state">
            <p className="empty-message">No Train Route Details added yet. Click "Add Train Details" to start.</p>
          </div>
        ) : (
          routes.map((detail, index) => (
            <TrainRouteDetailsRow
              key={index}
              TrainRouteDetail={detail}
              index={index}
              onChange={onChange}
              onDelete={onDelete}
              ConstitutionType={ConstitutionType}
              disableDelete={false}            
              errors={errors?.[index]}
            />
          ))
        )}
      </div>

      <div className="restaurants-action-bar">
        <button
          type="button"
          onClick={onAdd}
          className="btn-add-director"
        >
          + Add Train Route Details
        </button>

        {routes.length > 0 && (
          <span className="restaurants-count">
            {routes.length} train route detail{routes.length !== 1 ? "s" : ""} added
          </span>
        )}
      </div>
    </div>
  );
};

export default TrainRute;





