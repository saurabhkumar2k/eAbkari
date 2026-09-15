import React from "react";
import RestaurantAdditionalDetails from "../../../components/RestaurantAdditionalDetails";

export default function HcrAdditionalStep({
  additionalFrom,
  hoursOfSaleList,
  constitutionType,
  questions,
  errors,
  onChange,
  onQuestionsChange,
  onDirectorChange,
  onAddDirector,
  onDeleteDirector,
  onBack,
  onContinue,
  CatCode,
  starCategoryRating,
  starCategory,
  ondeleteRestaurantDetail,
  onAddRestaurantDetail,
  onRestaurantDetailChange
}) {
  return (
    <div className="form-group full-width ">
      <div className="hcr-step-header">
        <div>
          <h2 className="hcr-step-title">Step 3: Restaurant Additional Details</h2>
          <p className="hcr-step-description">
            Specify layout dimensions, local authority compliance, staffing, and operational requirements.
          </p>
        </div>
      </div>
      <div className="hcr-license-card">
        <RestaurantAdditionalDetails
          additionalFrom={additionalFrom}
          hoursOfSaleList={hoursOfSaleList}
          constitutionType={constitutionType}
          questions={questions}
          onChange={onChange}
          onQuestionsChange={onQuestionsChange}
          onDirectorChange={onDirectorChange}
          onAddDirector={onAddDirector}
          onDeleteDirector={onDeleteDirector}
          onBack={onBack}
          onContinue={onContinue}
          errors={errors}
          CatCode={CatCode}
          starCategory={starCategory}
          starCategoryRating={starCategoryRating}
          ondeleteRestaurantDetail={ondeleteRestaurantDetail}
          onAddRestaurantDetail={onAddRestaurantDetail}
          onRestaurantDetailChange={onRestaurantDetailChange}
        />
      </div>
    </div >
  );
}