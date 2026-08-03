import React, { useState } from "react";
import {
  Building,
  Check,
  ChevronRight,
  Info,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  FileText,
  Upload,
  CheckCircle2
} from "lucide-react";
import ApplicantDetails from "./L30ApplicantDetails.jsx";
import L30HomeDetails from "./L30HomeDetails";
import L30AdditionalDetails from "./L30AdditionalDetails";

export default function L30SelectLicense({
  applicant = {},
  onChange,
  ownerTypes = [],
  licenseGroups = [],
  selectedType,
  onSelectType,
  onBack,
  onContinue,
  setSelectedLicense,
  constitutionTypes = [],
}) {
  const [wizardActive, setWizardActive] = useState(false);
  const [activeStep, setActiveStep] = useState(2); // Default to Step 2 Home Details as requested

  const [internalSelectedType, setInternalSelectedType] = useState(selectedType || "L-30");
  const [internalOwnerType, setInternalOwnerType] = useState(applicant?.ownerType || "INDIVIDUAL");

  // Applicant details state for Step 1
  const [applicantForm, setApplicantForm] = useState({
    applicantName: applicant?.applicantName || "RAMESH KUMAR",
    dob: applicant?.dob || "1985-05-15",
    fatherName: applicant?.fatherName || "SURESH KUMAR",
    occupation: applicant?.occupation || "SERVICE",
    panNo: applicant?.panNo || "ABCDE1234F",
    address1: applicant?.address1 || "HOUSE NO 12, BLOCK C, PASCHIM VIHAR",
    address2: applicant?.address2 || "NEAR METRO STATION",
    state: applicant?.state || "Delhi",
    district: applicant?.district || "West",
    subDivision: applicant?.subDivision || "Punjabi Bagh",
    pin: applicant?.pin || "110063",
    mobile: applicant?.mobile || "9876543210",
    email: applicant?.email || "ramesh.kumar@gmail.com",
    landline: applicant?.landline || "",
    fax: applicant?.fax || ""
  });

  // Home Details state for Step 2 (Exact match to user screenshot)
  const [homeDetails, setHomeDetails] = useState({
    exciseYear: "2026-2027",
    categoryApplied: "L30 (Licence for possession of liquor at home in excess of individual possession limit)",
    homeName: "home name",
    homeAddress1: "Home Address 1",
    homeAddress2: "Home Address 2",
    homeState: "Delhi",
    homeDistrict: "NEW DELHI",
    homeSubDivision: "Chanakya Puri",
    homePoliceStation: "PARLIAMENT STREET",
    homePin: "110768",
    homeConstituency: "Delhi Cantonment",
    homeWardName: "DWARKA C WARD NAME",
    homeEmail: "gjm@gmail.com",
    homeMobile: "6897554353"
  });

  // Additional Details state for Step 3
  const [additionalDetails, setAdditionalDetails] = useState({
    possessionLimitRequested: "In excess of prescribed limit (Up to 18 Litres)",
    storageAreaType: "Dedicated Locked Storage Cabinet / Wine Cellar",
    residenceOwnership: "Owned",
    occupantsCount: "4",
    cctvInstalled: "Yes",
    priorExciseCases: "No"
  });

  // Documents state for Step 4 & 5
  const [personalDocs, setPersonalDocs] = useState({
    aadhaarUploaded: true,
    panUploaded: true,
    photoUploaded: true,
    residenceProofUploaded: true
  });

  const [siteDocs, setSiteDocs] = useState({
    ownershipDeedUploaded: true,
    layoutPlanUploaded: true,
    policeNocUploaded: true
  });

  // Declaration state for Step 6
  const [undertakingAccept, setUndertakingAccept] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const wizardSteps = [
    { num: 1, label: "Step-1", sub: "Applicant Details" },
    { num: 2, label: "Step-2", sub: "Home Details" },
    { num: 3, label: "Step-3", sub: "Additional Details" },
    { num: 4, label: "Step-4", sub: "Personal Document" },
    { num: 5, label: "Step-5", sub: "Site Document" },
    { num: 6, label: "Step-6", sub: "Declaration" }
  ];

  const licenseTypeCards = [
    {
      id: "L-30",
      code: "L-30 / L-30F",
      title: "Liquor at Home in Excess of Individual Possession Limit",
      description: "Service & storage of Indian and Foreign Liquor at home in excess of individual possession limit.",
      category: "Home",
      icon: Building,
      color: "pink"
    },
    {
      id: "L-30A",
      code: "L-30 (A)",
      title: "Registered User of Liquor at Home",
      description: "Permit for individuals storing Indian Made Foreign Liquor / Foreign Liquor at private residence beyond prescribed limit.",
      category: "Home",
      icon: Building,
      color: "purple"
    }
  ];

  const defaultOwnerTypes = ownerTypes.length > 0 ? ownerTypes : [
    { id: 1, otid: "INDIVIDUAL", ownerTypeName: "Individual / Resident" },
    { id: 2, otid: "PROPRIETOR", ownerTypeName: "Sole Proprietorship" },
    { id: 3, otid: "PARTNERSHIP", ownerTypeName: "Partnership Firm" },
    { id: 4, otid: "PVT_LTD", ownerTypeName: "Private Limited Company" }
  ];

  const handleSelectType = (code) => {
    setInternalSelectedType(code);
    if (onSelectType) onSelectType(code);
    localStorage.setItem("selectedLicense", JSON.stringify({ code, id: code }));
  };

  const handleOwnerTypeChange = (val) => {
    setInternalOwnerType(val);
    if (onChange) onChange("ownerType", val);
  };

  const handleHomeFieldChange = (field, val) => {
    setHomeDetails((prev) => ({ ...prev, [field]: val }));
  };

  const currentSelected = selectedType || internalSelectedType;
  const currentOwner = applicant?.ownerType || internalOwnerType;

  const handleStartWizard = () => {
    setWizardActive(true);
    setActiveStep(2); // Directly show Step 2 Home Details
  };

  const handleFinalSubmit = () => {
    setSubmitted(true);
    if (onContinue) onContinue();
  };

  // If in wizard mode, render the 6-step wizard!
  if (wizardActive) {
    return (
      <div className="l30-container l30-wizard-wrapper animate-fade">
        {/* Back to Selection button */}
        <button
          type="button"
          onClick={() => setWizardActive(false)}
          className="l30-back-btn"
        >
          <ArrowLeft className="l30-back-btn-icon" />
          <span>BACK TO LICENSE SELECTION</span>
        </button>

        {/* 6 Skewed Steps Header Bar - Matching Excise Portal Design */}
        <div className="l30-skew-bar">
          {wizardSteps.map((st) => {
            const isActive = activeStep === st.num;
            return (
              <div
                key={st.num}
                onClick={() => setActiveStep(st.num)}
                className={`l30-skew-tab ${isActive ? "active" : ""}`}
              >
                <div className="l30-skew-tab-inner">
                  <div className="l30-skew-num-box">
                    <span className="l30-skew-num">{st.num}</span>
                  </div>
                  <div className="l30-skew-texts">
                    <span className="l30-skew-label">{st.label}</span>
                    <span className="l30-skew-sub">{st.sub}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* STEP 1: APPLICANT DETAILS */}
        {activeStep === 1 && (
          <div className="w-full">
            <div className="l30-grey-header">Applicant Details</div>
            <div className="l30-form-card">
              <ApplicantDetails
                formData={applicantForm}
                onChange={(key, val) => setApplicantForm((prev) => ({ ...prev, [key]: val }))}
                title="Pre-filed Registered Profile Information"
                description="These applicant details are loaded automatically from your online registry records. You can review and verify the demographic, residential, and verification fields."
              />
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="l30-btn-next"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: HOME DETAILS (EXACT MATCH TO USER SCREENSHOT) */}
        {activeStep === 2 && (
          <L30HomeDetails
            formData={homeDetails}
            onChange={(field, val) => handleHomeFieldChange(field, val)}
            onNext={() => setActiveStep(3)}
            onPrevious={() => setActiveStep(1)}
          />
        )}

        {/* STEP 3: ADDITIONAL DETAILS */}
        {activeStep === 3 && (
          <L30AdditionalDetails
            formData={additionalDetails}
            onChange={(field, val) => setAdditionalDetails((prev) => ({ ...prev, [field]: val }))}
            onNext={() => setActiveStep(4)}
            onPrevious={() => setActiveStep(2)}
          />
        )}

        {/* STEP 4: PERSONAL DOCUMENT */}
        {activeStep === 4 && (
          <div className="w-full">
            <div className="l30-grey-header">Personal Document</div>
            <div className="l30-form-card text-left">
              <p className="text-xs text-slate-500 mb-6">
                Please upload clear scanned copies of identity and address verification documents for L-30 applicant.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-slate-800">Aadhaar Card / ID Proof</div>
                    <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Scanned_Aadhaar.pdf (Attached)
                    </div>
                  </div>
                  <button type="button" className="text-xs text-blue-600 font-bold hover:underline">Re-upload</button>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-slate-800">PAN Card Copy</div>
                    <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> PAN_Card_Verified.pdf (Attached)
                    </div>
                  </div>
                  <button type="button" className="text-xs text-blue-600 font-bold hover:underline">Re-upload</button>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-slate-800">Applicant Passport Size Photo</div>
                    <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passport_Photo.jpg (Attached)
                    </div>
                  </div>
                  <button type="button" className="text-xs text-blue-600 font-bold hover:underline">Re-upload</button>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-slate-800">Residential Address Proof</div>
                    <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Electricity_Bill.pdf (Attached)
                    </div>
                  </div>
                  <button type="button" className="text-xs text-blue-600 font-bold hover:underline">Re-upload</button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="l30-btn-prev"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(5)}
                  className="l30-btn-next"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: SITE DOCUMENT */}
        {activeStep === 5 && (
          <div className="w-full">
            <div className="l30-grey-header">Site Document</div>
            <div className="l30-form-card text-left">
              <p className="text-xs text-slate-500 mb-6">
                Please attach residential layout plans and site verification NOCs for liquor storage.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-slate-800">Property Ownership Deed / Lease</div>
                    <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Property_Deed.pdf (Attached)
                    </div>
                  </div>
                  <button type="button" className="text-xs text-blue-600 font-bold hover:underline">Re-upload</button>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-slate-800">Residence Layout / Key Plan</div>
                    <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Layout_Plan.pdf (Attached)
                    </div>
                  </div>
                  <button type="button" className="text-xs text-blue-600 font-bold hover:underline">Re-upload</button>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-slate-800">Local Police Station Verification NOC</div>
                    <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Police_NOC.pdf (Attached)
                    </div>
                  </div>
                  <button type="button" className="text-xs text-blue-600 font-bold hover:underline">Re-upload</button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveStep(4)}
                  className="l30-btn-prev"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(6)}
                  className="l30-btn-next"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: DECLARATION */}
        {activeStep === 6 && (
          <div className="w-full">
            <div className="l30-grey-header">Declaration</div>
            <div className="l30-form-card text-left">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
                <h4 className="text-xs font-bold text-amber-900 mb-1 uppercase tracking-wider">Regulatory Undertaking</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  I hereby declare that all information furnished in this L-30 license application is true, accurate, and complete. Liquor stored under this permit shall strictly be used for private domestic consumption and not for commercial resale or prohibited distribution.
                </p>
              </div>

              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  id="l30Accept"
                  checked={undertakingAccept}
                  onChange={(e) => setUndertakingAccept(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300"
                />
                <label htmlFor="l30Accept" className="text-xs font-medium text-slate-800 cursor-pointer select-none">
                  I accept and agree to all terms, conditions, and statutory provisions governing L-30 liquor possession at residence.
                </label>
              </div>

              {submitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold mb-6">
                  Application docket submitted successfully! Reference ID: L30-DEL-2026-889021
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveStep(5)}
                  className="l30-btn-prev"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={!undertakingAccept}
                  className={`l30-btn-next ${!undertakingAccept ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // DEFAULT VIEW: Owner Type & License Card Selection
  return (
    <div className="l30-container">
      {/* Top Breadcrumb action */}
      <button
        type="button"
        onClick={onBack}
        className="l30-back-btn"
      >
        <ArrowLeft className="l30-back-btn-icon" />
        <span>BACK TO CATEGORY</span>
      </button>

      {/* Banner Card */}
      <div className="l30-banner-card">
        <Info className="l30-banner-icon" />
        <span className="l30-banner-text">Select L-30 License Type</span>
      </div>

      {/* Owner Type Inline Field */}
      <div className="l30-owner-row">
        <label className="l30-owner-label-inline">
          Owner Type <span className="l30-required-star">*</span>
        </label>

        <select
          value={currentOwner}
          onChange={(e) => handleOwnerTypeChange(e.target.value)}
          className="l30-owner-select-inline"
        >
          <option value="">Select Owner Type</option>
          {defaultOwnerTypes.map((item) => (
            <option key={item.id || item.otid} value={item.otid}>
              {item.ownerTypeName}
            </option>
          ))}
        </select>
      </div>

      {/* License Cards Grid */}
      {currentOwner ? (
        <>
          <div className="l30-cards-grid">
            {licenseTypeCards.map((card) => {
              const isSelected = currentSelected === card.id;
              const IconComp = card.icon;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleSelectType(card.id)}
                  className={`l30-card ${isSelected ? "selected" : ""}`}
                >
                  {/* Radio Selection Marker & Icon */}
                  <div className="l30-card-top">
                    <div className="l30-icon-wrap">
                      <IconComp className="l30-card-icon" />
                    </div>
                    <div className={`l30-radio-circle ${isSelected ? "selected" : ""}`}>
                      {isSelected && <Check className="l30-radio-icon" />}
                    </div>
                  </div>

                  <div>
                    <span className="l30-code-badge">
                      {card.code}
                    </span>
                    <h3 className="l30-card-title">
                      {card.title}
                    </h3>
                    <p className="l30-card-desc">
                      {card.description}
                    </p>
                  </div>

                  <div className="l30-card-footer">
                    <span className="l30-cat-badge">
                      {card.category}
                    </span>
                    <ChevronRight className="l30-arrow-icon" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="l30-actions">
            <button
              type="button"
              onClick={handleStartWizard}
              className="l30-continue-btn"
            >
              <span>Continue Application</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </>
      ) : (
        <div className="w-full max-w-xl mx-auto p-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center text-slate-500 font-medium text-xs">
          Please select an Owner Type above to view available L-30 License Types.
        </div>
      )}
    </div>
  );
}
