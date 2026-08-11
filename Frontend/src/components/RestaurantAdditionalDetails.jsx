import React from "react";
import { Building, ChevronLeft, ChevronRight } from "lucide-react";
import DirectorsList from "./DirectorsList";
//import AdditionalDetailsCSS from "../Style/RestaurantAdditionalDetails.css";

export default function RestaurantAdditionalDetails({
  additionalFrom,
  hoursOfSaleList,
  constitutionType,
  onChange,
  onDirectorChange,
  onAddDirector,
  onDeleteDirector,
  onBack,
  onContinue,
  onSubmit,
}) {
  return (
<div className="hcr-additional-details hcr-step-card animate-fade">
  <div className="hcr-step-card-header">
    <h3 className="hcr-step-card-title">
      <Building className="hcr-step-card-icon" />
      <span className="font-sans">
        Step 6: Resturant Additional Details
      </span>
    </h3>
    <p className="hcr-step-card-description font-sans">
      Specify layout dimensions, local authorities compliance.
    </p>
  </div>

  <form
    onSubmit={onSubmit}
    className="hcr-premises-form"
  >
    <div className="hcr-form-grid">
      {/* Restaurant Area */}
      <div className="form-group">
        <label className="hcr-form-label">
          Restaurant Area (in Sq mtr.)
          <span className="required">*</span>
        </label>

        <input
          type="text"
          placeholder="Restaurant Area"
          value={additionalFrom.restaurantArea}
          onChange={(e) => {
            const value = e.target.value;

            // Allow numbers with decimal
             if (/^\d*\.?\d*$/.test(value)) {
              onChange("restaurantArea", value);
            }
          }}
          maxLength={10}
          className="input-box"
        />
      </div>

      {/* No. of Seat Covers */}
      <div className="form-group">
        <label className="hcr-form-label">
          No. of Seat Covers
          <span className="required">*</span>
        </label>

        <input
          type="text"
          placeholder="No. of Seat Covers"
          value={additionalFrom.numberOfSeatCovers}
          onChange={(e) => {
            const value = e.target.value;

            // Allow numbers only
            if (/^\d*$/.test(value)) {
              onChange("numberOfSeatCovers", value);
            }
          }}
          maxLength={10}
          className="input-box"
        />
      </div>

      {/* No. of Dispensing Counter */}
      <div className="form-group">
        <label className="hcr-form-label">
          No. of Dispensing Counter
          <span className="required">*</span>
        </label>

        <input
          type="text"
          placeholder="No. of Dispensing Counter"
          value={additionalFrom.numberOfDispensingCounter}
          onChange={(e) => {
            const value = e.target.value;

            // Allow numbers only
            if (/^\d*$/.test(value)) {
              onChange("numberOfDispensingCounter", value);
            }
          }}
          maxLength={10}
          className="input-box"
        />
      </div>

      {/* Additional Area */}
      <div className="form-group">
        <label className="hcr-form-label">
          Additional Area
          <span className="required">*</span>
        </label>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="additionalArea"
              value="1"
              checked={additionalFrom.additionalArea === "1"}
              onChange={(e) =>
                onChange("additionalArea", e.target.value)
              }
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              name="additionalArea"
              value="0"
              checked={additionalFrom.additionalArea === "0"}
              onChange={(e) =>
                onChange("additionalArea", e.target.value)
              }
            />
            No
          </label>
        </div>
      </div>

      {/* Additional Area */}

      {/* No. of Managers */}
      <div className="form-group">
        <label className="hcr-form-label">
          No. of Managers
          <span className="required">*</span>
        </label>

        <input
          type="text"
          placeholder="No. of Managers"
          value={additionalFrom.numberOfManagers}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*$/.test(value)) {
              onChange("numberOfManagers", value);
            }
          }}
          maxLength={10}
          className="input-box"
        />
      </div>

      {/* No. of Kitchen Staff */}
      <div className="form-group">
        <label className="hcr-form-label">
          No. of Kitchen Staff
          <span className="required">*</span>
        </label>

        <input
          type="text"
          placeholder="No. of Kitchen Staff"
          value={additionalFrom.numberOfKitchenStaff}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*$/.test(value)) {
              onChange("numberOfKitchenStaff", value);
            }
          }}
          maxLength={10}
          className="input-box"
        />
      </div>

      {/* Utility Employees */}
      <div className="form-group">
        <label className="hcr-form-label">
          Utility Employees
          <span className="required">*</span>
        </label>

        <input
          type="text"
          placeholder="Utility Employees"
          value={additionalFrom.numberOfUtlityEmployees}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*$/.test(value)) {
              onChange("numberOfUtlityEmployees", value);
            }
          }}
          maxLength={10}
          className="input-box"
        />
      </div>

      {/* No. of Restaurant Attendent */}
      <div className="form-group">
        <label className="hcr-form-label">
          No. of Restaurant Attendent
          <span className="required">*</span>
        </label>

        <input
          type="text"
          placeholder="No. of Restaurant Attendent"
          value={additionalFrom.numberOfBarAttendent}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*$/.test(value)) {
              onChange("numberOfBarAttendent", value);
            }
          }}
          maxLength={10}
          className="input-box"
        />
      </div>

      {/* Educational Institution Distance */}
      <div className="form-group">
        <label className="hcr-form-label">
          Distance of Nearest Educational Institutions (Meters)
          <span className="required">*</span>
        </label>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="eduInsDistance"
              value="Less than 100 Meters"
              checked={
                additionalFrom.educationalInsDist ===
                "Less than 100 Meters"
              }
              onChange={(e) =>
                onChange("educationalInsDist", e.target.value)
              }
            />
            Less than 100 Meters
          </label>

          <label>
            <input
              type="radio"
              name="eduInsDistance"
              value="Above 100 Meters"
              checked={
                additionalFrom.educationalInsDist ===
                "Above 100 Meters"
              }
              onChange={(e) =>
                onChange("educationalInsDist", e.target.value)
              }
            />
            Above 100 Meters
          </label>
        </div>
      </div>

      {/* Religious Place Distance */}
      <div className="form-group">
        <label className="hcr-form-label">
          Distance of Nearest Religious Places (Meters)
          <span className="required">*</span>
        </label>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="religiousPlaceDistance"
              value="Less than 100 Meters"
              checked={
                additionalFrom.religiousPlaceDist ===
                "Less than 100 Meters"
              }
              onChange={(e) =>
                onChange("religiousPlaceDist", e.target.value)
              }
            />
            Less than 100 Meters
          </label>

          <label>
            <input
              type="radio"
              name="religiousPlaceDistance"
              value="Above 100 Meters"
              checked={
                additionalFrom.religiousPlaceDist ===
                "Above 100 Meters"
              }
              onChange={(e) =>
                onChange("religiousPlaceDist", e.target.value)
              }
            />
            Above 100 Meters
          </label>
        </div>
      </div>

      {/* Hour of Sale */}
      <div className="form-group">
        <label className="hcr-form-label">
          Hour of Sale
          <span className="required">*</span>
        </label>

        <select
          value={additionalFrom.hourOfSale}
          onChange={(e) =>
            onChange("hourOfSale", e.target.value)
          }
          className="input-box"
        >
          <option value="0">Select Hour of Sale</option>
          <option value="1">11 AM - 1 AM</option>
          <option value="2">11 AM - 1 AM</option>
          {hoursOfSaleList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* <div className="form-group full-width">
        <HcrQuestionList
          questions={questions}
          onChange={handleQuestions}
        />
      </div> */}

      <div className="form-group full-width">
        <DirectorsList
          directors={additionalFrom.directors || []}
          ConstitutionType={constitutionType}
          onChange={onDirectorChange}
          onAdd={onAddDirector}
          onDelete={onDeleteDirector}
        />
      </div>
    </div>

    {/* Back and Continue */}
    <div className="hcr-step-navigation">
      <button
        type="button"
        onClick={onBack}
        className="btn btn-secondary"
      >
        <ChevronLeft className="hcr-nav-icon hcr-nav-icon-left" />
        <span>Go Back</span>
      </button>

      <button
        type="button"
        onClick={onContinue}
        className="btn btn-primary"
      >
        <span>Proceed to Documents</span>
        <ChevronRight className="hcr-nav-icon hcr-nav-icon-right" />
      </button>
    </div>
  </form>
</div>
  );
}
