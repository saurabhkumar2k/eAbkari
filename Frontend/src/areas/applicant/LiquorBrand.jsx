import React from "react";
import {
  LayoutGrid,
  Hotel,
  Factory,
  ShoppingCart,
  Package,
  ChevronRight,
} from "lucide-react";

export default function LicenseCategory({
  newLicData,
  setNewLicData,
  showToast,
}) {
  const categories = [
    {
      id: "HCR",
      title: "HCR",
      subtitle: "Hotel, Club & Restaurant",
      desc: "Licenses for hotels, clubs, restaurants, bars and catering establishments.",
      icon: Hotel,
      licenseType: "L-15 (Hotel Bar - Star Classified)",
      defaultSub: "L-15 (A) Star Classified Hotel Bar Service",
    },
    {
      id: "MTP",
      title: "M&TP",
      subtitle: "Manufacturing, Transport & Permit",
      desc: "Licenses for manufacturing units, transport vehicles, import/export and permits.",
      icon: Factory,
      licenseType: "M&TP (Manufacturing & Toilet Preparations)",
      defaultSub: "M&TP-1 Bulk Formulation Industrial License",
    },
    {
      id: "Retail",
      title: "Retail",
      subtitle: "Retail Sale of Liquor",
      desc: "Licenses for retail sale of liquor in shops, vends and authorised outlets.",
      icon: ShoppingCart,
      licenseType: "L-10 (Retail Departmental Store)",
      defaultSub: "L-10 (A) General Departmental Retail Vend",
    },
    {
      id: "Wholesale",
      title: "Wholesale",
      subtitle: "Wholesale Distribution & Supply",
      desc: "Licenses for wholesale distribution, bulk supply and bonded warehouses.",
      icon: Package,
      licenseType: "L-1 (Wholesale Vend of Indian Liquor)",
      defaultSub: "L-1 (A) Domestic Registered Indian Spirits Wholesale",
    },
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
            Choose the category under which you want to apply for a new
            license.
          </p>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((cat) => {
          const IconComponent = cat.icon;

          const isActive =
            newLicData?.selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setNewLicData({
                  ...newLicData,

                  selectedCategory: cat.id,

                  licenseType: cat.licenseType,

                  selectedSubLicense: cat.defaultSub,
                });

                showToast(
                  `Selected Division: ${cat.subtitle}`
                );
              }}
              className={`category-card ${
                isActive ? "active" : ""
              }`}
            >
              <div className="category-icon">
                <IconComponent className="stroke-[2]" />
              </div>

              <h4 className="category-title">
                {cat.title}
              </h4>

              <p className="category-subtitle">
                {cat.subtitle}
              </p>

              <div className="category-divider" />

              <p className="category-description">
                {cat.desc}
              </p>

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