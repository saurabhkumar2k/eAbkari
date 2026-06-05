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
          id: "L-1",
          code: "L-1",
          title: "Wholesale Vend of Indian Liquor",
          description: "License for Wholesale Vend of Indian Liquor. Authorizes bulk inventory management and supply to authorized retailers or hotel-club bars.",
          badge: "IMFL Distribution",
          icon: Package
        },
        {
          id: "L-31",
          code: "L-31",
          title: "Warehouse for storage of Indian Liquor",
          description: "License for Warehouse for storage of Indian Liquor. Mandated of bulk traders requiring specialized bonded safety storage facility guidelines.",
          badge: "Bonded Storage",
          icon: Warehouse
        },
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
    <div className="select-license-type-step text-left animate-fade">
      
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
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Select Wholesale License Type
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            Category Selected: <span className="text-purple-700 font-extrabold">Wholesale (Distribution & Supply)</span>
          </p>
        </div>

        {/* Note Notification Card */}
        <div className="flex items-start gap-3 bg-purple-50/70 border border-purple-100 p-4 rounded-2xl max-w-md w-full">
          <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">Note</h4>
            <p className="text-[11px] text-slate-600 font-semibold leading-relaxed mt-0.5">
              Please opt for either the direct Wholesale Vend license or the associated Bonded Warehouse storage privilege card to proceed.
            </p>
          </div>
        </div>
      </div>

      {/* Grouped Cards Sections */}
      <div className="space-y-8">
        {licenseGroups.map((group, gIdx) => {
          const groupHeaderColors = 
            group.color === "blue" ? "text-blue-800 bg-blue-50/60 border-blue-100" :
            group.color === "purple" ? "text-purple-800 bg-purple-50/60 border-purple-100" :
            "text-amber-800 bg-amber-50/60 border-amber-100";

          return (
            <div key={gIdx} className="space-y-4">
              <div className={`px-4 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider ${groupHeaderColors} flex items-center gap-2 max-w-max`}>
                <Boxes className="w-4 h-4" />
                <span>{group.groupName}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.items.map((card) => {
                  const isSelected = selectedType === card.id;
                  const IconComp = card.icon;

                  // Dynamic styles
                  const iconStyles = 
                    group.color === "blue" ? "bg-blue-50 text-blue-600" :
                    group.color === "purple" ? "bg-purple-50 text-purple-600" :
                    "bg-amber-50 text-amber-600";

                  const badgeStyles = 
                    group.color === "blue" ? "bg-blue-50 text-blue-700 border-blue-100" :
                    group.color === "purple" ? "bg-purple-50 text-purple-700 border-purple-100" :
                    "bg-amber-50 text-amber-700 border-amber-100";

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => onSelectType(card.id)}
                      className={`text-left p-5 bg-white border rounded-2xl transition-all duration-300 relative flex flex-col justify-between h-full group cursor-pointer ${
                        isSelected 
                          ? "border-purple-600 ring-4 ring-purple-50 text-slate-900 shadow-md card-selected-bg" 
                          : "border-slate-200 hover:border-purple-300 hover:shadow-md text-slate-800"
                      }`}
                    >
                      {/* Radio selection circle */}
                      <div className="absolute top-4 right-4 flex items-center justify-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                          isSelected 
                            ? "bg-purple-600 border-purple-600 text-white" 
                            : "border-slate-300 group-hover:border-purple-400 bg-white"
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div>
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition overflow-hidden shrink-0 ${iconStyles} ${
                          isSelected ? "scale-105" : "group-hover:scale-105"
                        }`}>
                          <IconComp className="w-6 h-6 stroke-[2]" />
                        </div>

                        {/* Code label */}
                        <span className="text-[12px] font-extrabold text-purple-700 font-mono tracking-wide">
                          {card.code} Privileges
                        </span>

                        {/* Title */}
                        <h3 className="text-sm font-extrabold text-slate-900 mt-1.5 leading-snug group-hover:text-purple-700 transition">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-2">
                          {card.description}
                        </p>
                      </div>

                      {/* Bottom row */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between w-full">
                        <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-md border tracking-wider shrink-0 ${badgeStyles}`}>
                          {card.badge}
                        </span>
                        
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition duration-200" />
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
