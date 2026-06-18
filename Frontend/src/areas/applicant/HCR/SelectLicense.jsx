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

export default function SelectLicenseType({ selectedType, onSelectType, onBack, onContinue }) {
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
  className="back-category-btn"
>
  <ArrowLeft className="back-category-icon" />
  <span>Back to Category</span>
</button>

      {/* Main Title Banner & Note card side-by-side */}
    <div className="hcr-header">
  <div className="hcr-header-content">
    <h2 className="hcr-title">
      Select License Type
    </h2>

    <p className="hcr-subtitle">
      Category Selected:
      <span className="hcr-category">
        HCR (Hotel, Club & Restaurant)
      </span>
    </p>
  </div>
</div>

        {/* Note Notification Card matching screenshot */}
        <div className="hcr-note-card">
  <Info className="hcr-note-icon" />

  <div className="hcr-note-content">
    <h4 className="hcr-note-title">
      Note
    </h4>

    <p className="hcr-note-text">
      Please select the appropriate license type to continue with the application process.
    </p>
  </div>
</div>

      {/* Cards Grid */}
      <div className="hcr-grid">
        {licenseTypeCards.map((card) => {
          const isSelected = selectedType === card.id;
          const IconComp = card.icon;
          
          // Badge Color Styles
          const badgeStyles = 
            card.category === "Hotel" ? "bg-blue-50 text-blue-700 border-blue-100" :
            card.category === "Restaurant" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
            "bg-pink-50 text-pink-700 border-pink-100";

          // Icon Color Styles
          const iconStyles = 
            card.color === "blue" ? "bg-blue-50 text-blue-600" :
            card.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
            card.color === "amber" ? "bg-amber-50 text-amber-600" :
            card.color === "purple" ? "bg-purple-50 text-purple-600" :
            card.color === "cyan" ? "bg-cyan-50 text-cyan-600" :
            card.color === "pink" ? "bg-pink-50 text-pink-600" :
            "bg-indigo-50 text-indigo-600";

          return (
          <button key={card.id} type="button" onClick={() => onSelectType(card.id)}
          className={`hcr-card ${ isSelected ? "hcr-card-selected" : "hcr-card-default"
          }`}
          >
              
              {/* Radio selection circle at the top-right */}
              <div className="hcr-card-check">
                <div className={`selection-indicator ${
                  isSelected 
                    ? "selection-indicator-selected"
                    : "selection-indicator-default"
                }`}>
                  {isSelected && <Check className="selection-check-icon" />}
                </div>
              </div>

              <div>
                {/* Icon wrapper */}
                <div className={`hcr-icon-wrapper ${iconStyles} ${
                  isSelected    ? "hcr-icon-selected" : "hcr-icon-hover"
                }`}>
                  <IconComp className="hcr-icon" />
                </div>

                {/* License Code */}
                <span className="hcr-code">
                  {card.code}
                </span>

                {/* License Title */}
                <h3 className="hcr-card-title">
                  {card.title}
                </h3>

                {/* License Description */}
                 <p className="hcr-card-description">
                  {card.description}
                </p>
              </div>

              {/* Bottom Badge Tag */}
              <div className="hcr-card-footer">
                 <span className={`hcr-badge ${badgeStyles}`}>
                  {card.category}
                </span>
                
                 <span className={`hcr-badge ${badgeStyles}`}></span>
              </div>

            </button>
          );
        })}
      </div>

    </div>
  );
}
