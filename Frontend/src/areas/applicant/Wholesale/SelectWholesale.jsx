import React from "react";
import { ArrowLeft, Info } from "lucide-react";

const SelectWholesaleType = ({
  applicant,
  onChange,
  ownerTypes = [],
  licenseGroups = [],
  selectedType,
  onSelectType,
  setCurrentStep,
  onBack,
  applications = [],
  setSelectedLicense = [],
  constitutionTypes = [],
}) => {

  console.log("Applicant:", applicant);
  console.log("Owner Types:", ownerTypes);
  console.log("Applications:", applications);

  return (
    <div className="license-selection-container text-left animate-fade">

      {/* ============================= */}
      {/* BACK BUTTON */}
      {/* ============================= */}

      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wider mb-4 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Category</span>
      </button>


      {/* ============================= */}
      {/* TITLE */}
      {/* ============================= */}

      <div className="license-note mb-6">
        <Info className="w-5 h-5 text-purple-600" />
        <span>Select Wholesale License Type</span>
      </div>


      {/* ============================= */}
      {/* OWNER TYPE */}
      {/* ============================= */}

      <div className="owner-type-wrapper">

        <label className="owner-type-label">
          Owner Type <span>*</span>
        </label>

        <select
          value={applicant?.ownerType || ""}
          onChange={(e) =>
            onChange("ownerType", e.target.value)
          }
        >

          <option value="">
            Select Owner Type
          </option>

          {ownerTypes.map((item) => (
            <option
              key={item.id}
              value={item.otid}
            >
              {item.ownerTypeName}
            </option>
          ))}

        </select>

      </div>


      {/* ============================= */}
      {/* LICENSE CARDS */}
      {/* ============================= */}
{applicant?.ownerType && (
  <div className="license-grid">
    {licenseGroups.map((item) => {
      const application = applications?.find(
        (app) =>
          app.licenseeCatDesc?.trim() === item.licenseeCatDesc?.trim()
      );

      const isDraft =
        application?.applicationStatus?.trim() === "P";

      return (
        <div
          key={item.licenseeCatCode}
          className={`license-card ${
            selectedType === item.licenseeCatCode ? "selected" : ""
          }`}
          style={{ position: "relative", cursor: "pointer" }}
onClick={() => {
  localStorage.setItem(
    "selectedLicense",
    JSON.stringify(item)
  );


  if (isDraft) {
    localStorage.setItem(
      "applicationId",
      application.applicationIdNo
    );
  } else {
    localStorage.removeItem("applicationId");
  }

 
  onSelectType(item.licenseeCatCode);
}}

        >
          {isDraft && (
            <div className="draft-ribbon">
              📝 <span>Draft Saved</span>
            </div>
          )}

        
          <h3 className="card-title">
            {item.licenseeCatDesc}
          </h3>

       
    {isDraft && (
  <div className="draft-details">
    <div className="draft-item">
      <span>Application No.</span>
      <strong>{application.applicationIdNo}</strong>
    </div>

    <div className="draft-item">
      <span>Last Updated</span>
      <strong>
        {new Date(application.applicationDate).toLocaleDateString("en-GB")}
      </strong>
    </div>

    <div className="draft-message">
      Your application is saved as Draft.
    </div>
  </div>
)}

          {/* Footer */}
 <div className="card-footer">
  <span className="card-badge">
    WHOLESALE
  </span>
</div>
        </div>
      );
    })}
  </div>
)}
    </div>
  );
};

export default SelectWholesaleType;