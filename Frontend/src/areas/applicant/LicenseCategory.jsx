import React from "react";
import {
  LayoutGrid,
  Hotel,
  Factory,
  ShoppingCart,
  Package,
  ChevronRight
} from "lucide-react";

export default function LicenseCategory({ newLicData, setNewLicData, showToast, getActiveCategory }) {
  const categories = [
    {
      id: "HCR",
      title: "HCR",
      subtitle: "Hotel, Club & Restaurant",
      desc: "Licenses for hotels, clubs, restaurants, bars and catering establishments.",
      icon: Hotel,
      colorStyle: {
        bgBadge: "bg-blue-50 text-blue-600 border border-blue-100",
        activeBorder: "border-blue-600 bg-blue-50/10 shadow-lg ring-4 ring-blue-50",
        unselectedBorder: "border-slate-200 hover:border-blue-300 hover:bg-slate-50/20",
        arrow: "bg-blue-50 text-blue-600 border border-blue-200 group-hover:bg-blue-100/80"
      },
      licenseType: "L-15 (Hotel Bar - Star Classified)",
      defaultSub: "L-15 (A) Star Classified Hotel Bar Service"
    },
    {
      id: "MTP",
      title: "M&TP",
      subtitle: "Manufacturing, Transport & Permit",
      desc: "Licenses for manufacturing units, transport vehicles, import/export and permits.",
      icon: Factory,
      colorStyle: {
        bgBadge: "bg-emerald-50 text-emerald-600 border border-emerald-100",
        activeBorder: "border-emerald-600 bg-emerald-50/10 shadow-lg ring-4 ring-emerald-50",
        unselectedBorder: "border-slate-200 hover:border-emerald-300 hover:bg-slate-50/20",
        arrow: "bg-emerald-50 text-emerald-600 border border-emerald-200 group-hover:bg-emerald-100/80"
      },
      licenseType: "M&TP (Manufacturing & Toilet Preparations)",
      defaultSub: "M&TP-1 Bulk Formulation Industrial License"
    },
    {
      id: "Retail",
      title: "Retail",
      subtitle: "Retail Sale of Liquor",
      desc: "Licenses for retail sale of liquor in shops, vends and authorised outlets.",
      icon: ShoppingCart,
      colorStyle: {
        bgBadge: "bg-amber-50 text-amber-600 border border-amber-100",
        activeBorder: "border-amber-600 bg-amber-50/10 shadow-lg ring-4 ring-amber-50",
        unselectedBorder: "border-slate-200 hover:border-amber-300 hover:bg-slate-50/20",
        arrow: "bg-amber-50 text-amber-600 border border-amber-200 group-hover:bg-amber-100/80"
      },
      licenseType: "L-10 (Retail Departmental Store)",
      defaultSub: "L-10 (A) General Departmental Retail Vend"
    },
    {
      id: "Wholesale",
      title: "Wholesale",
      subtitle: "Wholesale Distribution & Supply",
      desc: "Licenses for wholesale distribution, bulk supply and bonded warehouses.",
      icon: Package,
      colorStyle: {
        bgBadge: "bg-purple-50 text-purple-600 border border-purple-100",
        activeBorder: "border-purple-600 bg-purple-50/10 shadow-lg ring-4 ring-purple-50",
        unselectedBorder: "border-slate-200 hover:border-purple-300 hover:bg-slate-50/20",
        arrow: "bg-purple-50 text-purple-600 border border-purple-200 group-hover:bg-purple-100/80"
      },
      licenseType: "L-1 (Wholesale Vend of Indian Liquor)",
      defaultSub: "L-1 (A) Domestic Registered Indian Spirits Wholesale"
    }
  ];

  return (
    <div className="basic-details-card animate-fade">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
          <LayoutGrid className="w-5 h-5" />
        </div>
        <div>
          <h3 className="under-blue-accent">
            Select License Category
          </h3>
          <p className="text-xs mt-1 font-semibold">
            Choose the category under which you want to apply for a new license.
          </p>
        </div>
      </div>

      {/* Four selective category cards matching screenshot with user-defined CSS classes */}
      <div className="category-grid">
        {categories.map((cat) => {
          const isActive = getActiveCategory() === cat.id;
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setNewLicData({
                  ...newLicData,
                  licenseType: cat.licenseType,
                  selectedSubLicense: cat.defaultSub
                });
                showToast(`Selected Division: ${cat.subtitle}`);
              }}
              className={`category-card ${isActive ? "active" : ""}`}
            >
              <div className="category-icon">
                <IconComponent className="stroke-[2]" />
              </div>
              <h4 className="category-title">{cat.title}</h4>
              <p className="category-subtitle">{cat.subtitle}</p>
              <div className="category-divider" />
              <p className="category-description">{cat.desc}</p>
              <div className="category-arrow">
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
