import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
//import DirectorsList from "./DirectorsList";
//mport HcrQuestionList from "./HCRQuestionList";
//import HCRBasicFieldsL17 from "./HcrBasicFieldsL17";
//import HCRBasicFieldsL16 from "./HcrBasicFieldsL16";
//import HCRBasicFieldsL15 from "./HCRBasicFieldsL15";
//import HCRBasicFieldsL28 from "./HCRBasicFieldsL28";
//import RestaurantDetailsL16 from "./RestaurantDetailsL16";
//import ClubDetailsL2829 from "./ClubDetailsL2829";
import RetailBasicFields from "./RetailBasicFields"
//import { Cat_Label } from "../areas/applicant/HCR/validation";

export default function PremiseAdditionalDetails({
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
  onRestaurantDetailChange,
  ConstitutionType,
  onClubDetailChange,
  onAddClubDetail,
  ondeleteClubDetail,
}) {
  console.log("RestaurantAdditionalDetails - errors  ", errors);
  /* */
  const HcrQuestionListCategories = [
    "04",
    "05",
    "06",
    "30",
    "31",
    "32",
    "07",
    "34",
  ];
  /* */
  const HCRBasicFieldsCategories = ["02", "11", "25", "39", "40", "41", "46", "83", "34"];
  const HCRClubAdditionalCategories = ["01", "35", "08", "36"]
  return (
    <div className="hcr-form-section animate-fade">
      
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
        <form onSubmit={onSubmit} className="hcr-premises-form">
          <div className="hcr-form-grid">
            

            {(CatCode === "11" || CatCode === "35" || CatCode === "08" || CatCode === "36") && (
              <RetailBasicFields
                additionalFrom={additionalFrom}
                onChange={onChange}
                hoursOfSaleList={hoursOfSaleList}
                errors={errors}
                ConstitutionType={ConstitutionType}
              />
            )}


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
