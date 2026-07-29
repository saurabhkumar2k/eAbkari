import React from "react";
import {
  Building,
  Utensils,
  GlassWater,
  Plane,
  Train,
  Users,
  ShieldCheck,
  Check,
  ChevronRight,
  Info,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export default function SelectLicenseType({ applicant, onChange, ownerTypes = [], licenseGroups = [], selectedType, onSelectType, onBack, onContinue,setSelectedLicense=[],
  constitutionTypes=[], }) {




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
        <span>Select HCR License Type</span>
      </div>

      {/* Owner Type - Sirf Ek Baar */}
      <div className="owner-type-wrapper">
        <label className="owner-type-label">
          Owner Type <span>*</span>
        </label>

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


              className={`license-card ${selectedType === item.licenseeCatCode ? "selected" : ""
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
                  HCR
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );


  const licenseTypeCards = [
    {
      id: "L-15",
      code: "L-15 / L-15F",
      title: "Hotel Room Service License",
      description: "Service of Indian and Foreign Liquor in a hotel or guest house to residents in their rooms.",
      category: "Hotel",
      icon: Building,
      color: "blue"
    },
    {
      id: "L-16",
      code: "L-16 / L-16F",
      title: "Hotel Restaurant Bar License",
      description: "Service of Indian and Foreign Liquor in a bar or restaurant attached to a hotel.",
      category: "Restaurant",
      icon: Utensils,
      color: "emerald"
    },
    {
      id: "L-17",
      code: "L-17 / L-17F",
      title: "Independent Restaurant License",
      description: "Service of Indian and Foreign Liquor in independent restaurant.",
      category: "Restaurant",
      icon: Utensils,
      color: "amber"
    },
    {
      id: "L-18",
      code: "L-18 / L-18F",
      title: "Wine, Beer & Alcopop License",
      description: "Service of Indian and Foreign Wine, Beer and Alcopop in independent restaurant.",
      category: "Restaurant",
      icon: GlassWater,
      color: "purple"
    },
    {
      id: "L-19",
      code: "L-19 / L-19F",
      title: "Airport Restaurant License",
      description: "Round the clock service of Indian and Foreign Liquor in independent restaurant located either in arrival or departure area of International Airport.",
      category: "Restaurant",
      icon: Plane,
      color: "cyan"
    },
    {
      id: "L-20",
      code: "L-20 / L-20F",
      title: "Luxury Train Bar License",
      description: "Service of Indian Liquor & Foreign Liquor in a bar/dining car in a luxury train.",
      category: "Restaurant",
      icon: Train,
      color: "blue"
    },
    {
      id: "L-28",
      code: "L-28 / L-28F",
      title: "Club Liquor License",
      description: "Service of Indian and Foreign Liquor in a Club.",
      category: "Club",
      icon: Users,
      color: "pink"
    },
    {
      id: "L-29",
      code: "L-29 / L-29F",
      title: "Government Club/Mess License",
      description: "Service of Indian and Foreign Liquor at a Club/Mess whose membership is exclusively for Govt. servants/retired Govt. servants and the Club/Mess is not run on commercial lines.",
      category: "Club",
      icon: ShieldCheck,
      color: "indigo"
    }
  ];

  return (
    <div className="select-license-type-step text-left animate-fade">

      {/* Top Breadcrumb action */}
      <button
        onClick={onBack}
        className="hcr-back-btn"
      >
        <ArrowLeft className="hcr-back-btn-icon" />
        <span>Back to Category</span>
      </button>

      {/* Main Title Banner & Note card side-by-side */}
      <div className="hcr-license-header">
        <div>
          <h2 className="hcr-license-title">
            Select License Type
          </h2>

          <p className="hcr-license-subtitle">
            Category Selected:
            <span className="hcr-license-category-highlight">
              HCR (Hotel, Club & Restaurant)
            </span>
          </p>
        </div>

        {/* Note Notification Card */}
        <div className="hcr-note-card">
          <Info className="hcr-note-icon" />

          <div>
            <h4 className="hcr-note-title">
              Note
            </h4>

            <p className="hcr-note-description">
              Please select the appropriate license type to continue with the
              application process.
            </p>
          </div>
        </div>
      </div>
      {/* Cards Grid */}
      <div className="hcr-license-grid">
        {licenseTypeCards.map((card) => {
          const isSelected = selectedType === card.id;
          const IconComp = card.icon;

          // Badge Color Styles
          const badgeStyles =
            card.category === "Hotel"
              ? "hcr-badge-hotel"
              : card.category === "Restaurant"
                ? "hcr-badge-restaurant"
                : "hcr-badge-club";

          const iconStyles =
            card.color === "blue"
              ? "hcr-icon-blue"
              : card.color === "emerald"
                ? "hcr-icon-emerald"
                : card.color === "amber"
                  ? "hcr-icon-amber"
                  : card.color === "purple"
                    ? "hcr-icon-purple"
                    : card.color === "cyan"
                      ? "hcr-icon-cyan"
                      : card.color === "pink"
                        ? "hcr-icon-pink"
                        : "hcr-icon-indigo";

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectType(card.id)}
              className={`hcr-license-card ${isSelected
                ? "hcr-license-card-selected"
                : "hcr-license-card-default"
                }`}
            >
              {/* Radio selection circle at the top-right */}
              <div className="hcr-card-radio-wrapper">
                <div
                  className={`hcr-card-radio ${isSelected
                    ? "hcr-card-radio-selected"
                    : "hcr-card-radio-default"
                    }`}
                >
                  {isSelected && <Check className="hcr-card-radio-icon" />}
                </div>
              </div>

              <div>
                {/* Icon wrapper */}
                <div className={`hcr-license-icon-wrapper ${iconStyles} ${isSelected
                  ? "hcr-license-icon-selected"
                  : "hcr-license-icon-hover"
                  }`}>
                  <IconComp className="hcr-license-icon" />
                </div>

                {/* License Code */}
                <span className="hcr-license-code">
                  {card.code}
                </span>

                {/* License Title */}
                <h3 className="text-sm font-extrabold text-slate-900 mt-1.5 leading-snug group-hover:text-blue-700 transition">
                  {card.title}
                </h3>

                {/* License Description */}
                <p className="hcr-license-card-description">
                  {card.description}
                </p>
              </div>

              {/* Bottom Badge Tag */}
              <div className="hcr-license-card-footer">
                <span className={`hcr-license-badge ${badgeStyles}`}>
                  {card.category}
                </span>

                <ChevronRight className="hcr-license-arrow" />
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
