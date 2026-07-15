import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Info } from "lucide-react";





const SelectWholesaleType = ({
  applicant,
  onChange,
  ownerTypes=[],
  licenseGroups = [],
  selectedType,
  onSelectType,
  onBack,
  setSelectedLicense=[],
  constitutionTypes=[],
}) => {

console.log(applicant);
console.log(ownerTypes);


return (
  <div className="license-selection-container text-left animate-fade">

    {/* Back Button - Hamesha Top Par */}
    <button
      onClick={onBack}
      className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wider mb-4 transition"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back to Category</span>
    </button>

    {/* Title */}
    <div className="license-note mb-6">
      <Info className="w-5 h-5 text-purple-600" />
      <span>Select Wholesale License Type</span>
    </div>

    {/* Owner Type - Sirf Ek Baar */}
<div className="owner-type-wrapper">
  <label className="owner-type-label">
    Owner Type <span>*</span>
  </label>

{/* <select
  value={applicant?.ownerType || ""}
  onChange={(e) => onChange("ownerType", e.target.value)}
>
    <option value="">Select Owner Type</option>
    <option value="I">Individual</option>
    <option value="C">Company</option>
    <option value="P">Partnership Firm</option>
    <option value="L">LLP</option>
    <option value="S">Cooperative Society</option>
    <option value="R">Proprietorship</option>
    <option value="O">Other Entity</option>
  </select> */}

<select
  value={applicant.ownerType || ""}
  onChange={(e) => onChange("ownerType", e.target.value)}
>
  <option value="">Select Owner Type</option>

  {ownerTypes.map((item) => (
    <option key={item.id} value={item.otid}>
      {item.ownerTypeName}
    </option>
  ))}
</select>



</div>

    {/* License Cards */}

{applicant?.ownerType && (
    <div className="license-grid">
      {licenseGroups.map((item) => (
        <button
          key={item.licenseeCatCode}
          type="button"
          // onClick={() => onSelectType(item.licenseeCatCode)}
onClick={() => {
  localStorage.setItem(
    "selectedLicense",
    JSON.stringify(item)
  );

  onSelectType(item.licenseeCatCode);
}}


          className={`license-card ${
            selectedType === item.licenseeCatCode ? "selected" : ""
          }`}
        >
          {/* <div className="card-code">
            {item.licenseeCatCode}
          </div> */}

          <h3 className="card-title">
            {item.licenseeCatDesc}
          </h3>

          <div className="card-footer">
            <span className="card-badge">
              WHOLESALE
            </span>
          </div>
        </button>
      ))}
    </div>
)}






  </div>
);
};

export default SelectWholesaleType;