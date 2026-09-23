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
                errors={errors}
              />

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
            {(CatCode === '05' || CatCode === '31') && (
              <HCRBasicFieldsL17
                additionalFrom={additionalFrom}
                hoursOfSaleList={hoursOfSaleList}
                onChange={onChange}
                errors={errors}
              />
            )}

            {/* Hcr Question List */}
            <div className="form-group full-width">
              <HcrQuestionList questions={questions} onChange={onQuestionsChange} error={errors?.answer} />
            </div>

            <div className="form-group full-width">
              <DirectorsList
                directors={additionalFrom?.directors || []}
                ConstitutionType={constitutionType}
                onChange={onDirectorChange}
                onAdd={onAddDirector}
                onDelete={onDeleteDirector}
                directorsError={errors?.directors}
              />
              <div className="error-text-container">
                {errors?.directors?.globalError && <span className="error-text-all">{errors?.directors?.globalError}</span>}
              </div>
            </div>

            <div className="form-group full-width">
              {(CatCode === "04" || CatCode === "30") && (
                <RestaurantDetailsL16
                  RestaurantDetails={additionalFrom?.restaurantDetails || []}
                  ConstitutionType={constitutionType}
                  onChange={onRestaurantDetailChange}
                  onAdd={onAddRestaurantDetail}
                  onDelete={ondeleteRestaurantDetail}
                  hoursOfSaleList={hoursOfSaleList}
                  errors={errors?.restaurantError}
                />
                
              )}
              <div className="error-text-container">
                {errors?.restaurantGlobalError && <span className="error-text-all">{errors?.restaurantGlobalError}</span>}
              </div>
            </div>
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
