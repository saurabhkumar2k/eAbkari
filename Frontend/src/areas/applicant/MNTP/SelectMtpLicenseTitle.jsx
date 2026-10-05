import React, { useState } from "react";
import {
  Factory,
  FlaskConical,
  Building2,
  Package,
  FileText,
  Search,
  Check,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Award,
  Info,
  ExternalLink,
  BookOpen,
  FileDown,
  RefreshCw,
  HelpCircle,
  X,
  Lock,
  Layers
} from "lucide-react";
import { MTP_CATEGORIES, MTP_LICENSES_DATA } from "./MtpLicensesData.jsx";

export function SelectMtpLicenseType({
  selectedType = "L-1 (M&TP)",
  onSelectType = () => {},
  onBack = () => {},
  onContinue = () => {}
}) {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'manufacturing' | 'spirit' | 'bhang' | 'drugs' | 'permits'
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'renewal' | 'new' | 'permits'
  const [activeQuickTab, setActiveQuickTab] = useState("overview"); // 'overview' | 'renewal' | 'eligibility' | 'docs' | 'fees' | 'status' | 'forms'
  const [detailsModalLicense, setDetailsModalLicense] = useState(null);

  // Filter licenses based on tab, category, search, and status
  const filteredLicenses = MTP_LICENSES_DATA.filter((lic) => {
    // Tab filter
    const matchesTab = activeTab === "all" || lic.category === activeTab;

    // Search filter
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      lic.code.toLowerCase().includes(q) ||
      lic.title.toLowerCase().includes(q) ||
      lic.description.toLowerCase().includes(q) ||
      lic.fullTitle.toLowerCase().includes(q) ||
      lic.categoryLabel.toLowerCase().includes(q);

    // Status filter
    let matchesStatus = true;
    if (statusFilter === "renewal") {
      matchesStatus = lic.status.includes("Renewal") || lic.validity.includes("Renewable");
    } else if (statusFilter === "new") {
      matchesStatus = lic.status.includes("Grant of New");
    } else if (statusFilter === "permits") {
      matchesStatus = lic.isPermit;
    }

    return matchesTab && matchesSearch && matchesStatus;
  });

  // Selected object
  const selectedObj =
    MTP_LICENSES_DATA.find(
      (l) =>
        l.id === selectedType ||
        l.code === selectedType ||
        l.shortCode === selectedType
    ) || MTP_LICENSES_DATA[0];

  const getCategoryCount = (catId) => {
    if (catId === "all") return MTP_LICENSES_DATA.length;
    return MTP_LICENSES_DATA.filter((l) => l.category === catId).length;
  };

  return (
    <div className="mtp-container">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="mtp-top-bar">
        <button
          type="button"
          onClick={onBack}
          className="mtp-back-btn"
        >
          <ArrowLeft />
          <span>Back to License Categories</span>
        </button>
      </div>

      {/* Main Statutory Header Banner */}
      <div className="mtp-header-banner">
        <div className="mtp-header-overlay"></div>
        <div className="mtp-header-content">
          <h2 className="mtp-header-title">
           M&TP Branch
          </h2>
          <p className="mtp-header-desc">
            The M&TP Branch of the Department of Excise handles the grant and renewal of licences relating to medicinal and toilet preparations containing alcohol and specified narcotic substances, along with licences and permits concerning rectified spirit, denatured spirit, intoxicating spirituous preparations and certain manufactured drugs.
          </p>
        </div>
      </div>

     {/* Main Category Tabs: [ Manufacturing ] [ Spirit ] [ Bhang ] [ Drugs ] [ Permits ] */}
      <div className="mtp-main-tabs-wrap">
        <div className="mtp-main-tabs-header">
          <span className="mtp-tabs-eyebrow">M&TP LICENCE DIVISIONS</span>
          <span className="text-xs text-slate-500 font-medium">Showing {filteredLicenses.length} Licences & Permits</span>
        </div>

        <div className="mtp-category-tabs-bar">
          {MTP_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const count = getCategoryCount(cat.id);
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`mtp-cat-tab-btn ${isActive ? "active" : ""}`}
              >
                <Icon />
                <span>{cat.label}</span>
                <span className="mtp-cat-count-pill">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of All Categorized Licences & Permits */}
      <div className="mtp-cards-catalog-grid">
        {filteredLicenses.map((lic) => {
          const isSelected = selectedType === lic.id || selectedObj.id === lic.id;

          let CategoryIcon = Factory;
          if (lic.category === "manufacturing") CategoryIcon = Factory;
          else if (lic.category === "spirit") CategoryIcon = FlaskConical;
          else if (lic.category === "bhang") CategoryIcon = Package;
          else if (lic.category === "drugs") CategoryIcon = Building2;
          else if (lic.category === "permits") CategoryIcon = FileText;

          return (
            <div
              key={lic.id}
              onClick={() => onSelectType(lic.id)}
              className={`mtp-catalog-card ${isSelected ? "selected" : ""}`}
            >
              {/* Card Top Pill & Category */}
              <div className="mtp-card-top-row">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="mtp-badge-code">{lic.code}</span>
                  <span className="mtp-badge-category">
                    <CategoryIcon className="w-3 h-3" />
                    {lic.badge}
                  </span>
                </div>

                <div
                  className={`mtp-check-circle ${isSelected ? "checked" : ""}`}
                  title={isSelected ? "Currently Selected" : "Click to select"}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              {/* Title & Statutory Definition */}
              <div className="mtp-card-headline-wrap">
                <h4 className="mtp-card-headline">{lic.title}</h4>
                <p className="mtp-card-legal-clause">{lic.fullTitle}</p>
              </div>

              {/* Functional Description */}
              <p className="mtp-card-body-text">{lic.description}</p>

            
              {/* Card Action Footer */}
              <div className="mtp-card-action-bar">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectType(lic.id);
                    if (onContinue) onContinue(lic.id);
                  }}
                  className={`mtp-btn-apply-card ${isSelected ? "primary" : "secondary"}`}
                >
                  <span>{isSelected ? "Proceed" : "Apply Online"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLicenses.length === 0 && (
        <div className="mtp-empty-state">
          <Info className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h4 className="text-base font-bold text-slate-700">No Licences or Permits match your filter</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Try resetting the search terms or change the tab filter to view all 26 official M&TP licences and permits.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveTab("all");
              setStatusFilter("all");
              setSearchQuery("");
            }}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      
      {/* Statutory Details Modal Dialog */}
      {detailsModalLicense && (
        <div className="mtp-modal-backdrop" onClick={() => setDetailsModalLicense(null)}>
          <div
            className="mtp-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mtp-modal-header">
              <div className="flex items-center gap-2">
                <span className="mtp-badge-code text-sm">
                  {detailsModalLicense.code}
                </span>
                <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  {detailsModalLicense.categoryLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDetailsModalLicense(null)}
                className="mtp-modal-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mtp-modal-body">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {detailsModalLicense.title}
              </h3>
              <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed">
                {detailsModalLicense.fullTitle}
              </p>

              <div className="mtp-modal-spec-grid">
                <div className="mtp-modal-spec-card">
                  <span className="mtp-spec-lbl">Statutory Fee</span>
                  <span className="text-sm font-bold text-blue-700 font-mono">{detailsModalLicense.feeFormatted}</span>
                </div>
                <div className="mtp-modal-spec-card">
                  <span className="mtp-spec-lbl">Security Deposit / Bond</span>
                  <span className="text-sm font-bold text-slate-700 font-mono">{detailsModalLicense.bondFormatted}</span>
                </div>
                <div className="mtp-modal-spec-card">
                  <span className="mtp-spec-lbl">Validity & Licensing Year</span>
                  <span className="text-sm font-bold text-emerald-700">{detailsModalLicense.validity}</span>
                </div>
                <div className="mtp-modal-spec-card">
                  <span className="mtp-spec-lbl">Sanctioning Authority</span>
                  <span className="text-xs font-bold text-slate-700">{detailsModalLicense.authority}</span>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div>
                  <h5 className="text-xs font-extrabold uppercase text-slate-800 tracking-wider flex items-center gap-1.5 mb-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Eligibility & Statutory Prerequisites
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    {detailsModalLicense.eligibility}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-extrabold uppercase text-slate-800 tracking-wider flex items-center gap-1.5 mb-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    Required Dossier & Mandatory Documents
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {detailsModalLicense.requiredDocs.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mtp-modal-footer">
              <button
                type="button"
                onClick={() => setDetailsModalLicense(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-lg text-xs hover:bg-slate-100"
              >
                Close Window
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectType(detailsModalLicense.id);
                  setDetailsModalLicense(null);
                  if (onContinue) onContinue(detailsModalLicense.id);
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>Select & Continue Application</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectMtpLicenseType;
