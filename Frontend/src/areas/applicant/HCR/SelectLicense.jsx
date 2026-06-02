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
        className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wider mb-4 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Category</span>
      </button>

      {/* Main Title Banner & Note card side-by-side */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Select License Type
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            Category Selected: <span className="text-blue-700 font-extrabold">HCR (Hotel, Club & Restaurant)</span>
          </p>
        </div>

        {/* Note Notification Card matching screenshot */}
        <div className="flex items-start gap-3 bg-blue-50/70 border border-blue-100 p-4 rounded-2xl max-w-md w-full">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">Note</h4>
            <p className="text-[11px] text-slate-600 font-semibold leading-relaxed mt-0.5">
              Please select the appropriate license type to continue with the application process.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectType(card.id)}
              className={`text-left p-5 bg-white border rounded-2xl transition-all duration-300 relative flex flex-col justify-between h-full group cursor-pointer ${
                isSelected 
                  ? "border-blue-600 ring-4 ring-blue-50 text-slate-900 shadow-md card-selected-bg" 
                  : "border-slate-200 hover:border-blue-300 hover:shadow-md text-slate-800"
              }`}
            >
              
              {/* Radio selection circle at the top-right */}
              <div className="absolute top-4 right-4 flex items-center justify-center">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                  isSelected 
                    ? "bg-blue-600 border-blue-600 text-white" 
                    : "border-slate-300 group-hover:border-blue-400 bg-white"
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div>
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition overflow-hidden shrink-0 ${iconStyles} ${
                  isSelected ? "scale-105" : "group-hover:scale-105"
                }`}>
                  <IconComp className="w-6 h-6 stroke-[2]" />
                </div>

                {/* License Code */}
                <span className="text-[12px] font-extrabold text-blue-700 font-mono tracking-wide">
                  {card.code}
                </span>

                {/* License Title */}
                <h3 className="text-sm font-extrabold text-slate-900 mt-1.5 leading-snug group-hover:text-blue-700 transition">
                  {card.title}
                </h3>

                {/* License Description */}
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-2">
                  {card.description}
                </p>
              </div>

              {/* Bottom Badge Tag */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-md border tracking-wider shrink-0 ${badgeStyles}`}>
                  {card.category}
                </span>
                
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition duration-200" />
              </div>

            </button>
          );
        })}
      </div>

    </div>
  );
}
