import React, { useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5214";

import {
  Building,
  Check,
  ChevronRight,
  Info,
  ArrowRight,
  ArrowLeft,
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
  constitutionTypes = []
}) {
  const [wizardActive, setWizardActive] = useState(false);
  const [activeStep, setActiveStep] = useState(2);

  const [internalSelectedType, setInternalSelectedType] =
    useState(selectedType || "L-30");

  const [internalOwnerType, setInternalOwnerType] =
    useState(applicant?.ownerType || "INDIVIDUAL");

  const [applicantForm, setApplicantForm] = useState({
    applicantName: applicant?.applicantName || "",
    dob: applicant?.dob || "",
    fatherName: applicant?.fatherName || "",
    occupation: applicant?.occupation || "",
    panNo: applicant?.panNo || "",
    address1: applicant?.address1 || "",
    address2: applicant?.address2 || "",
    state: applicant?.state || "",
    district: applicant?.district || "",
    subDivision: applicant?.subDivision || "",
    pin: applicant?.pin || "",
    mobile: applicant?.mobile || "",
    email: applicant?.email || "",
    landline: applicant?.landline || "",
    fax: applicant?.fax || ""
  });

  const [homeDetails, setHomeDetails] = useState({
    exciseYear: "2026-2027",
    categoryApplied:
      "L30 (Licence for possession of liquor at home in excess of individual possession limit)",
    homeName: "",
    homeAddress1: "",
    homeAddress2: "",
    stateId: "",
    districtCode: "",
    homeSubDivisionCode: "",
    psCode: "",
    homePin: "",
    homeConstituency: "",
    homeWardName: "",
    homeEmail: "",
    homeMobile: ""
  });

  const [additionalDetails, setAdditionalDetails] = useState({
    validFor: "5",
    commercialActivity: "N"
  });

  const [undertakingAccept, setUndertakingAccept] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savingSiteDetails, setSavingSiteDetails] = useState(false);
  const [siteSaveError, setSiteSaveError] = useState("");
  const [siteSaveSuccess, setSiteSaveSuccess] = useState("");
  const [siteDetailsSaved, setSiteDetailsSaved] = useState(false);

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
      code: "L-30",
      title: "Liquor at Home in Excess of Individual Possession Limit",
      description:
        "Service and storage of Indian and Foreign Liquor at home in excess of individual possession limit.",
      category: "Home",
      icon: Building
    }
  ];

  const defaultOwnerTypes =
    ownerTypes.length > 0
      ? ownerTypes
      : [
          {
            id: 1,
            otid: "INDIVIDUAL",
            ownerTypeName: "Individual / Resident"
          },
          {
            id: 2,
            otid: "PROPRIETOR",
            ownerTypeName: "Sole Proprietorship"
          },
          {
            id: 3,
            otid: "PARTNERSHIP",
            ownerTypeName: "Partnership Firm"
          },
          {
            id: 4,
            otid: "PVT_LTD",
            ownerTypeName: "Private Limited Company"
          }
        ];

  const handleSelectType = (code) => {
    setInternalSelectedType(code);

    if (onSelectType) {
      onSelectType(code);
    }

    localStorage.setItem(
      "selectedLicense",
      JSON.stringify({ code, id: code })
    );

    if (code === "L-30") {
      localStorage.setItem("catCode", "30");
    }
  };

  const handleOwnerTypeChange = (value) => {
    setInternalOwnerType(value);

    if (onChange) {
      onChange("ownerType", value);
    }
  };

  const handleHomeFieldChange = (field, value) => {
    setHomeDetails((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const currentSelected = selectedType || internalSelectedType;
  const currentOwner = applicant?.ownerType || internalOwnerType;

  const handleStartWizard = () => {
    setWizardActive(true);
    setActiveStep(2);
  };

  const handleSaveAdditionalDetails = async () => {
    setSiteSaveError("");
    setSiteSaveSuccess("");

    const requiredFields = [
      ["homeName", "Home Name"],
      ["homeAddress1", "Home Address 1"],
      ["homeAddress2", "Home Address 2"],
      ["stateId", "Home State"],
      ["districtCode", "Home District"],
      ["homeSubDivisionCode", "Home Sub Division"],
      ["psCode", "Home Police Station"],
      ["homePin", "Home PIN"],
      ["homeEmail", "Home Email"],
      ["homeMobile", "Home Mobile"]
    ];

    const missing = requiredFields.find(([key]) => {
      return !String(homeDetails[key] || "").trim();
    });

    if (missing) {
      setSiteSaveError(
        `Please enter/select ${missing[1]} before saving.`
      );
      setActiveStep(2);
      return;
    }

    setSavingSiteDetails(true);

    try {
      let applicationIdNo =
        localStorage.getItem("applicationIdNo") ||
        localStorage.getItem("applicationId") ||
        "";

      const regId = localStorage.getItem("regId") || "";

      let catCode = localStorage.getItem("catCode") || "30";

      if (["L-30", "L30"].includes(catCode.toUpperCase())) {
        catCode = "30";
      }

      if (!applicationIdNo && regId) {
        const pendingResponse = await fetch(
          `${API_BASE}/api/CommonLicense/GetPendingApplicationIds?catCode=${encodeURIComponent(
            catCode
          )}&regID=${encodeURIComponent(regId)}`
        );

        if (pendingResponse.ok) {
          const pendingData = await pendingResponse.json();

          applicationIdNo =
            pendingData?.data?.applicationIdNo ||
            pendingData?.data?.ApplicationIdNo ||
            pendingData?.applicationIdNo ||
            pendingData?.ApplicationIdNo ||
            "";

          if (applicationIdNo) {
            localStorage.setItem(
              "applicationIdNo",
              applicationIdNo
            );

            localStorage.setItem(
              "applicationId",
              applicationIdNo
            );
          }
        }
      }

      if (!applicationIdNo) {
        throw new Error(
          "No Application ID was found. Open or create the L-30 " +
          "application first so the portal can provide an application ID."
        );
      }

      if (!regId) {
        throw new Error(
          "Registration ID (regId) was not found in localStorage. " +
          "Please sign in again and reopen the L-30 application."
        );
      }

      const payload = {
        Regnumber: regId,
        ApplicationIdNo: applicationIdNo,
        FinYear: homeDetails.exciseYear || "2026-2027",
        CatCode: catCode,

        SiteName: homeDetails.homeName.trim(),
        SiteAddress: homeDetails.homeAddress1.trim(),
        SiteAddress2: homeDetails.homeAddress2.trim(),

        State: homeDetails.stateId,
        DistrictCode: homeDetails.districtCode,
        SubDivisionCode: homeDetails.homeSubDivisionCode,
        PoliceStationCode: homeDetails.psCode,

        SitePin: homeDetails.homePin.trim(),
        SiteAssembly: homeDetails.homeConstituency || "",
        SiteWard: homeDetails.homeWardName || "",

        SiteEmail: homeDetails.homeEmail.trim(),
        SiteMobile: homeDetails.homeMobile.trim(),

        SiteLandline: "",
        SiteFax: "",
        SitePan: applicantForm.panNo || "",

        LicenseValidFor: String(
          additionalDetails.validFor || "5"
        ),

        IsCommercialActivity:
          additionalDetails.commercialActivity || "N"
      };

      const response = await fetch(
        `${API_BASE}/api/Individual/SaveSiteDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const responseText = await response.text();

      let responseData = {};

      try {
        responseData = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        responseData = {
          message: responseText
        };
      }

      if (!response.ok) {
        const detail =
          responseData?.message ||
          responseData?.title ||
          responseText;

        throw new Error(
          `Save failed (${response.status}): ${
            detail || "API rejected the request."
          }`
        );
      }

      setSiteDetailsSaved(true);

      setSiteSaveSuccess(
        "Home and additional details saved successfully."
      );

      setActiveStep(4);
    } catch (error) {
      console.error("L-30 SaveSiteDetails error:", error);

      setSiteSaveError(
        error.message || "Unable to save L-30 site details."
      );
    } finally {
      setSavingSiteDetails(false);
    }
  };

  const handleFinalSubmit = () => {
    if (!siteDetailsSaved) {
      setSiteSaveError(
        "Please save Home and Additional Details before continuing."
      );

      setActiveStep(3);
      return;
    }

    // Actual document upload and final submission APIs
    // must be connected before the application can be submitted.
    setSubmitted(true);
  };

  if (wizardActive) {
    return (
      <div className="l30-container l30-wizard-wrapper animate-fade">
        <button
          type="button"
          onClick={() => setWizardActive(false)}
          className="l30-back-btn"
        >
          <ArrowLeft className="l30-back-btn-icon" />
          <span>BACK TO LICENSE SELECTION</span>
        </button>

        <div className="l30-skew-bar">
          {wizardSteps.map((step) => {
            const isActive = activeStep === step.num;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`l30-skew-tab ${
                  isActive ? "active" : ""
                }`}
              >
                <div className="l30-skew-tab-inner">
                  <div className="l30-skew-num-box">
                    <span className="l30-skew-num">
                      {step.num}
                    </span>
                  </div>

                  <div className="l30-skew-texts">
                    <span className="l30-skew-label">
                      {step.label}
                    </span>

                    <span className="l30-skew-sub">
                      {step.sub}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activeStep === 1 && (
          <div className="w-full">
            <div className="l30-grey-header">
              Applicant Details
            </div>

            <div className="l30-form-card">
              <ApplicantDetails
                formData={applicantForm}
                onChange={(key, value) =>
                  setApplicantForm((previous) => ({
                    ...previous,
                    [key]: value
                  }))
                }
                title="Pre-filed Registered Profile Information"
                description="These applicant details are loaded automatically from your online registry records. Review and verify the information."
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

        {activeStep === 2 && (
          <L30HomeDetails
            formData={homeDetails}
            onChange={handleHomeFieldChange}
            onNext={() => {
              setSiteSaveError("");
              setSiteSaveSuccess("");
              setActiveStep(3);
            }}
            onPrevious={() => setActiveStep(1)}
          />
        )}

        {activeStep === 3 && (
          <L30AdditionalDetails
            formData={{
              ...additionalDetails,
              exciseYear: homeDetails.exciseYear
            }}
            onChange={(field, value) =>
              setAdditionalDetails((previous) => ({
                ...previous,
                [field]: value
              }))
            }
            onNext={handleSaveAdditionalDetails}
            onPrevious={() => setActiveStep(2)}
            saving={savingSiteDetails}
            saveError={siteSaveError}
            saveSuccess={siteSaveSuccess}
          />
        )}

        {activeStep === 4 && (
          <div className="w-full">
            <div className="l30-grey-header">
              Personal Document
            </div>

            <div className="l30-form-card text-left">
              <p className="text-xs text-slate-500 mb-6">
                Upload clear scanned copies of identity and address
                verification documents for the L-30 applicant.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Aadhaar Card / ID Proof",
                  "PAN Card Copy",
                  "Applicant Passport Size Photo",
                  "Residential Address Proof"
                ].map((label) => (
                  <div
                    key={label}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <div className="font-semibold text-xs text-slate-800">
                      {label}
                    </div>

                    <div className="text-[11px] text-amber-700 mt-2">
                      Document upload is not connected yet.
                    </div>
                  </div>
                ))}
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

        {activeStep === 5 && (
          <div className="w-full">
            <div className="l30-grey-header">
              Site Document
            </div>

            <div className="l30-form-card text-left">
              <p className="text-xs text-slate-500 mb-6">
                Upload the documents required for the residential site.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Property Ownership Deed / Lease",
                  "Residence Layout / Key Plan",
                  "Local Police Station Verification NOC"
                ].map((label) => (
                  <div
                    key={label}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <div className="font-semibold text-xs text-slate-800">
                      {label}
                    </div>

                    <div className="text-[11px] text-amber-700 mt-2">
                      Document upload is not connected yet.
                    </div>
                  </div>
                ))}
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

        {activeStep === 6 && (
          <div className="w-full">
            <div className="l30-grey-header">
              Declaration
            </div>

            <div className="l30-form-card text-left">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
                <h4 className="text-xs font-bold text-amber-900 mb-1 uppercase tracking-wider">
                  Regulatory Undertaking
                </h4>

                <p className="text-xs text-amber-800 leading-relaxed">
                  I hereby declare that all information furnished
                  in this L-30 license application is true, accurate,
                  and complete. Liquor stored under this permit shall
                  strictly be used for private domestic consumption
                  and not for commercial resale or prohibited
                  distribution.
                </p>
              </div>

              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  id="l30Accept"
                  checked={undertakingAccept}
                  onChange={(e) =>
                    setUndertakingAccept(e.target.checked)
                  }
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300"
                />

                <label
                  htmlFor="l30Accept"
                  className="text-xs font-medium text-slate-800 cursor-pointer select-none"
                >
                  I accept and agree to all terms, conditions, and
                  statutory provisions governing L-30 liquor
                  possession at residence.
                </label>
              </div>

              {submitted && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-semibold mb-6">
                  L-30 site details are saved. Final application
                  submission and document upload are not connected
                  to the backend; no submission reference has been
                  generated.
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
                  className={`l30-btn-next ${
                    !undertakingAccept
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Confirm Declaration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="l30-container">
      <button
        type="button"
        onClick={onBack}
        className="l30-back-btn"
      >
        <ArrowLeft className="l30-back-btn-icon" />
        <span>BACK TO CATEGORY</span>
      </button>

      <div className="l30-banner-card">
        <Info className="l30-banner-icon" />
        <span className="l30-banner-text">
          Select L-30 License Type
        </span>
      </div>

      <div className="l30-owner-row">
        <label className="l30-owner-label-inline">
          Owner Type <span className="l30-required-star">*</span>
        </label>

        <select
          value={currentOwner}
          onChange={(e) =>
            handleOwnerTypeChange(e.target.value)
          }
          className="l30-owner-select-inline"
        >
          <option value="">Select Owner Type</option>

          {defaultOwnerTypes.map((item) => (
            <option
              key={item.id || item.otid}
              value={item.otid}
            >
              {item.ownerTypeName}
            </option>
          ))}
        </select>
      </div>

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
                  className={`l30-card ${
                    isSelected ? "selected" : ""
                  }`}
                >
                  <div className="l30-card-top">
                    <div className="l30-icon-wrap">
                      <IconComp className="l30-card-icon" />
                    </div>

                    <div
                      className={`l30-radio-circle ${
                        isSelected ? "selected" : ""
                      }`}
                    >
                      {isSelected && (
                        <Check className="l30-radio-icon" />
                      )}
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
              <ArrowRight
                style={{ width: 16, height: 16 }}
              />
            </button>
          </div>
        </>
      ) : (
        <div className="w-full max-w-xl mx-auto p-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center text-slate-500 font-medium text-xs">
          Please select an Owner Type above to view available
          L-30 License Types.
        </div>
      )}
    </div>
  );
}