import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DirectorsList from "./DirectorsList";
import HcrQuestionList from "./HCRQuestionList";
import HCRBasicFieldsL17 from "./HcrBasicFieldsL17";
import HCRBasicFieldsL16 from "./HcrBasicFieldsL16";
import RestaurantDetailsL16 from "./RestaurantDetailsL16";

export default function RestaurantAdditionalDetails({
  additionalFrom,
  hoursOfSaleList,
  constitutionType,
  onChange,
  onQuestionsChange,
  questions,
  onDirectorChange,
  onAddDirector,
  onDeleteDirector,
  errors,
  onBack,
  onContinue,
  onSubmit,
  CatCode,
  starCategoryRating,
  starCategory,
  ondeleteRestaurantDetail,
  onAddRestaurantDetail,
  onRestaurantDetailChange
}) {

  console.log("RestaurantAdditionalDetails - errors  ", errors)
  return (
    <div className="hcr-form-section animate-fade">
      {/* <div className="hcr-step-header">
        <div>
          <h2 className="hcr-step-title">Step 3: Restaurant Additional Details</h2>
          <p className="hcr-step-description">
            Specify layout dimensions, local authority compliance, staffing, and operational requirements.
          </p>
        </div>
      </div> */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
        <form onSubmit={onSubmit} className="hcr-premises-form">
          <div className="hcr-form-grid">
            {(CatCode === "04" || CatCode === "30") && (
              <HCRBasicFieldsL16
                additionalFrom={additionalFrom}
                onChange={onChange}
                starCategory={starCategory}
                starCategoryRating={starCategoryRating}
              />
<<<<<<< HEAD
            )}

            {/* <div className="form-group full-width">
              <div className="hcr-form-grid">
                <HCRBasicFieldsL17
                  additionalFrom={additionalFrom}
                  hoursOfSaleList={hoursOfSaleList}
                  onChange={onChange}
                />
              </div>
            </div> */}
=======
              {errors.restaurantArea && (
                <p className="error-text">{errors.restaurantArea}</p>
              )}
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

                  if (/^\d*$/.test(value)) {
                    onChange("numberOfSeatCovers", value);
                  }
                }}
                maxLength={10}
                className="input-box"
              />
              {errors.numberOfSeatCovers && (
                <p className="error-text">{errors.numberOfSeatCovers}</p>
              )}
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

                  if (/^\d*$/.test(value)) {
                    onChange("numberOfDispensingCounter", value);
                  }
                }}
                maxLength={10}
                className="input-box"
              />
              {errors.numberOfDispensingCounter && (
                <p className="error-text">{errors.numberOfDispensingCounter}</p>
              )}
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
                    onChange={(e) => onChange("additionalArea", e.target.value)}
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    name="additionalArea"
                    value="0"
                    checked={additionalFrom.additionalArea === "0"}
                    onChange={(e) => onChange("additionalArea", e.target.value)}
                  />
                  No
                </label>
              </div>
              {errors.additionalArea && (
                <p className="error-text">{errors.additionalArea}</p>
              )}
            </div>
>>>>>>> 9a8c79fa (add validation ,change css and icon 17092026)

            {(CatCode === '05' || CatCode === '31') && (
              <HCRBasicFieldsL17
                additionalFrom={additionalFrom}
                hoursOfSaleList={hoursOfSaleList}
                onChange={onChange}
              />
<<<<<<< HEAD
            )}

            <div className="form-group full-width">
              <HcrQuestionList
                questions={questions}
                onChange={onQuestionsChange}
              />
=======
              {errors.numberOfManagers && (
                <p className="error-text">{errors.numberOfManagers}</p>
              )}
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
              {errors.numberOfKitchenStaff && (
                <p className="error-text">{errors.numberOfKitchenStaff}</p>
              )}
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
              {errors.numberOfUtlityEmployees && (
                <p className="error-text">{errors.numberOfUtlityEmployees}</p>
              )}
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
              {errors.numberOfBarAttendent && (
                <p className="error-text">{errors.numberOfBarAttendent}</p>
              )}
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
                    checked={additionalFrom.educationalInsDist === "Less than 100 Meters"}
                    onChange={(e) => onChange("educationalInsDist", e.target.value)}
                  />
                  Less than 100 Meters
                </label>

                <label>
                  <input
                    type="radio"
                    name="eduInsDistance"
                    value="Above 100 Meters"
                    checked={additionalFrom.educationalInsDist === "Above 100 Meters"}
                    onChange={(e) => onChange("educationalInsDist", e.target.value)}
                  />
                  Above 100 Meters
                </label>
              </div>
              {errors.educationalInsDist && (
                <p className="error-text">{errors.educationalInsDist}</p>
              )}
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
                    checked={additionalFrom.religiousPlaceDist === "Less than 100 Meters"}
                    onChange={(e) => onChange("religiousPlaceDist", e.target.value)}
                  />
                  Less than 100 Meters
                </label>

                <label>
                  <input
                    type="radio"
                    name="religiousPlaceDistance"
                    value="Above 100 Meters"
                    checked={additionalFrom.religiousPlaceDist === "Above 100 Meters"}
                    onChange={(e) => onChange("religiousPlaceDist", e.target.value)}
                  />
                  Above 100 Meters
                </label>
              </div>
              {errors.religiousPlaceDist && (
                <p className="error-text">{errors.religiousPlaceDist}</p>
              )}
            </div>

            {/* Hour of Sale */}
            <div className="form-group">
              <label className="hcr-form-label">
                Hour of Sale
                <span className="required">*</span>
              </label>

              <select
                value={additionalFrom.hourOfSale}
                onChange={(e) => onChange("hourOfSale", e.target.value)}
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
              {errors.hourOfSale && (
                <p className="error-text">{errors.hourOfSale}</p>
              )}
            </div>

            <div className="form-group full-width">
              <HcrQuestionList questions={questions} onChange={onQuestionsChange} error={errors.answer} />
>>>>>>> 9a8c79fa (add validation ,change css and icon 17092026)
            </div>

            <div className="form-group full-width">
              <DirectorsList
                directors={additionalFrom.directors || []}
                ConstitutionType={constitutionType}
                onChange={onDirectorChange}
                onAdd={onAddDirector}
                onDelete={onDeleteDirector}
                directorsError={errors.directors}
              />
              <div className="error-text-container">
                {errors.directors?.globalError && <span className="error-text-all">{errors.directors.globalError}</span>}
              </div>
            </div>

<<<<<<< HEAD
            <div className="form-group full-width">
            {(CatCode === "04" || CatCode === "30") && (
              <RestaurantDetailsL16
                RestaurantDetails={additionalFrom.restaurantDetails || []}
                ConstitutionType={constitutionType}
                onChange={onRestaurantDetailChange}
                onAdd={onAddRestaurantDetail}
                onDelete={ondeleteRestaurantDetail}
                hoursOfSaleList={hoursOfSaleList}
              />
            )}
            </div>

=======
>>>>>>> 9a8c79fa (add validation ,change css and icon 17092026)
          </div>
        </form>
      </div>

      <div className="hcr-wizard">
        <button type="button" onClick={onBack} className="btn btn-secondary">
          <ChevronLeft className="w-5 h-5" />
          Go Back
        </button>

        <button type="button" onClick={onContinue} className="btn btn-primary">
          Proceed to Documents
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
