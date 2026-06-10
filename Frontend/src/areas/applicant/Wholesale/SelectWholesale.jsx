import React from "react";
import { 
  Package, 
  Warehouse, 
  Wine, 
  Activity, 
  Check, 
  ChevronRight, 
  Info,
  ArrowLeft,
  Boxes
} from "lucide-react";

export default function SelectWholesaleType({ selectedType, onSelectType, onBack }) {
  const licenseGroups = [
    {
      groupName: "Wholesale-IMFL (Indian Made Foreign Liquor)",
      color: "blue",
      items: [
        {
          id: "L-1-L-31",
          code: "L-1 & L-31",
          title: "Joint L1 & L31 Fast-Track License",
          description: "Integrated dual application for (L-1) Wholesale Vend of Indian Liquor AND (L-31) Warehouse storage of Indian Liquor (as shown in attached specification sheet). Synchronized West Delhi audits.",
          badge: "Joint Dual Filing (Recommended)",
          icon: Warehouse
        }
      ]
    },
    {
      groupName: "Wholesale-IMFL (Foreign Liquor / L-1F Group)",
      color: "purple",
      items: [
        {
          id: "L-1F",
          code: "L-1F",
          title: "Wholesale Vend of Foreign Liquor",
          description: "License for Wholesale Vend of Foreign Liquor (Imported FL). Ideal for customs clearance, direct trade, and high-end hotel supply registers.",
          badge: "Foreign Liquor",
          icon: Wine
        },
        
        {
          id: "L-32",
          code: "L-32",
          title: "Warehouse for storage of Foreign Liquor",
          description: "License for Warehouse for storage of Foreign Liquor. Bonded terminal storage authorization for luxury malts, champagnes, and imported spirits.",
          badge: "Foreign Storage",
          icon: Warehouse
        }
      ]
    },
    {
      groupName: "Wholesale-CL (Country Liquor / L-3 / L-33 Group)",
      color: "amber",
      items: [
        {
          id: "L-3",
          code: "L-3",
          title: "Wholesale Vend of Country Liquor",
          description: "License for Wholesale Vend of Country Liquor. For regulatory distribution channels of domestic spirit variants in state borders.",
          badge: "Country Liquor",
          icon: Package
        },
        {
          id: "L-33",
          code: "L-33",
          title: "Warehouse for storage of Country Liquor",
          description: "License for Warehouse for storage of Country Liquor. Designated depot structures ensuring standard security checkpoints for indigenous spirits.",
          badge: "CL Storage",
          icon: Warehouse
        }
      ]
    }
  ];

  return (
    <div className="license-selection-container text-left animate-fade">
      
      {/* Top Breadcrumb action */}
      <button 
        onClick={onBack}
        className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wider mb-4 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Category</span>
      </button>

      {/* Main Title Banner & Note card side-by-side */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
        <div>
          <h2 className="license-page-title">
            Select Wholesale License Type
          </h2>
          <p className="license-page-subtitle">
            Category Selected: <span className="text-purple-700 font-extrabold">Wholesale (Distribution & Supply)</span>
          </p>
        </div>

        {/* Note Notification Card */}
        <div className="license-note">
          <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="license-note-title">Note</h4>
            <p className="license-note-text">
              Please opt for either the direct Wholesale Vend license or the associated Bonded Warehouse storage privilege card to proceed.
            </p>
          </div>
        </div>
      </div>

      {/* Grouped Cards Sections */}
      <div className="space-y-8">
        {licenseGroups.map((group, gIdx) => {
          return (
            <div key={gIdx} className="space-y-4">
              <div className="license-group-title">
                <Boxes className="w-5 h-5" />
                <span>{group.groupName}</span>
              </div>

              <div className="license-grid">
                {group.items.map((card) => {
                  const isSelected = selectedType === card.id;
                  const IconComp = card.icon;

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => onSelectType(card.id)}
                      className={`license-card ${isSelected ? "selected" : ""}`}
                    >
                      <div className="card-header">
                        <div className="card-icon">
                          <IconComp />
                        </div>
                        <div className={`card-radio ${isSelected ? "active" : ""}`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </div>
                      </div>

                      <div>
                        <div className="card-code">
                          {card.code} Privileges
                        </div>

                        <h3 className="card-title">
                          {card.title}
                        </h3>

                        <p className="card-description">
                          {card.description}
                        </p>
                      </div>

                      <div className="card-footer">
                        <span className="card-badge">
                          {card.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
