import React, { useState } from "react";
import { 
  X, 
  User,
  Search, 
  FileText, 
  Shield, 
  Building2, 
  Wine, 
  Award, 
  Layers, 
  Truck, 
  UserCheck, 
  BarChart3, 
  Bell, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  HelpCircle,
  Clock,
  CheckCircle2
} from "lucide-react";

const SERVICES_DATA = [
  {
    category: "Applicant Services",
    icon: User,
    badge: "360+ Licenses",
    services: [
      {
        title: "Applicant Registration & Profile",
        desc: "Create an account to access online Excise services.",
        tags: ["Applicanet Details"],
        action: "/login"
      },
      {
        title: "Licence Application",
        desc: "Apply for new liquor-related licences online.",
        tags: ["Applicant Details", "Premise Wizard", "Site Verification"],
        action: "/login"
      },
      {
        title: "Application Tracking",
        desc: "Track application progress and approval status.",
        tags: ["HCR", "Hotel", "Club", "Restaurant"],
        action: "/login"
      },
      {
        title: "Document Submission",
        desc: "Upload and manage required application documents.",
        tags: ["Premise Wizard", "Site Verification"],
        action: "/login"
      },
      {
        title: "Document Revalidation",
        desc: "Revalidate documents associated with an application.",
        tags: ["Premise Wizard", "Site Verification"],
        action: "/login"
      },
      {
        title: "Fee Payment",
        desc: "View and pay applicable licence and service fees.",
        tags: ["Premise Wizard", "Site Verification"],
        action: "/login"
      },
      {
        title: "Profile Management",
        desc: "Manage applicant information and account details.",
        tags: ["Premise Wizard", "Site Verification"],
        action: "/login"
      }
    ]
  },
  {
    category: "M&TP & Transport Services",
    icon: Truck,
    badge: "Real-time Tracking",
    services: [
      {
        title: "M&TP Licence",
        desc: " Apply for and manage applicable M&TP licences.",
        tags: ["M&TP"],
        action: "/importpermitpass"
      },
      {
        title: "Transport Permission",
        desc: "Manage permissions related to liquor transportation.",
        tags: ["Manage", "Transport"],
        action: "/transportbulkspirit"
      },
      {
        title: "Movement Details",
        desc: "Submit and track authorized liquor movement information.",
        tags: ["Tracking", "Movement"],
        action: "/login"
      },
      {
        title: "Permit Status",
        desc: "Check the status of transport and related permits.",
        tags: ["Permit", "Status"],
        action: "/importpackaged"
      }
    ]
  },
  {
    category: " HCR & Establishment Services",
    icon: Award,
    badge: "Automated Approval",
    services: [
      {
        title: "HCR Licence",
        desc: "Apply for and manage licences for Hotels, Clubs and Restaurants.",
        tags: ["Brand Master", "Label Approval"],
        action: "/liquorbrand"
      },
      {
        title: "Licence Renewal",
        desc: " Renew existing establishment licences.",
        tags: ["Bottler Master", "Brand Owner"],
        action: "/bottlermaster"
      },
      {
        title: "Licence Transfer",
        desc: "Apply for transfer of an existing licence.",
        tags: ["MRP Search", "Public Price List"],
        action: "PRICE_LIST"
      },
      {
        title: "Licence Status",
        desc: "Check license validity and current status.",
        tags: ["MRP Search", "Public Price List"],
        action: "PRICE_LIST"
      },
      {
        title: "Inspection & Verification",
        desc: "Manage establishment inspections and verification reports.",
        tags: ["MRP Search", "Public Price List"],
        action: "PRICE_LIST"
      }
    ]
  },
  {
    category: "Brand & Product Services",
    icon: Shield,
    badge: "Official Portal",
    services: [
      {
        title: "Brand Registartion",
        desc: "Register new liquor brands with the authority (Excise Department).",
        tags: ["Brand Master", "Label Approval"],
        action: "/departmentdashboard"
      },
      {
        title: "Brand Approval",
        desc: "Track brand approval and departmental verification.",
        tags: ["Brand Master", "Label Approval"],
        action: "/departmentdashboard"
      },
      {
        title: "Product Details",
        desc: "Manage liquor category, measure size, packaging, and related details.",
        tags: ["Product Information", "Label Details"],
        action: "/departmentdashboard"
      },
      {
        title: "Registered Brand List",
        desc: "View and manage information about registered liquor brands.",
        tags: ["Brand Information", "Label Details"],
        action: "/departmentdashboard"
      },
      {
        title: "Brand Status",
        desc: "Check the current approval or registration status of a brand.",
        tags: ["Brand Information", "Label Details"],
        action: "/departmentdashboard"
      }
    ]
  }
];

export default function ExploreServicesModal({ isOpen, onClose, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  if (!isOpen) return null;

  const handleAction = (target) => {
    onClose();
    if (onNavigate) {
      if (target === "PRICE_LIST") {
        const el = document.querySelector(".price-brand-banner");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (target === "NOTICE_BOARD") {
        const el = document.querySelector(".notice-board-container");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        onNavigate(target);
      }
    }
  };

  const filteredServices = SERVICES_DATA.map((cat) => {
    if (activeTab !== "ALL" && cat.category !== activeTab) {
      return { ...cat, services: [] };
    }

    const matches = cat.services.filter(
      (s) =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return { ...cat, services: matches };
  }).filter((cat) => cat.services.length > 0);

  return (
    <div className="esm-backdrop" onClick={onClose}>
      <div 
        className="esm-modal-window" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Window Header Bar */}
        <div className="esm-window-header">
          <div className="esm-header-left">
            <div className="esm-window-badge">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Delhi eABKARI Platform Services</span>
            </div>
            <h2 className="esm-window-title">
              Complete Website Services & Portal Directory
            </h2>
          </div>

          <div className="esm-header-controls">
            <button 
              onClick={onClose}
              className="esm-close-btn"
              title="Close Floating Window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-Header Bar with Search & Filters */}
        <div className="esm-sub-header">
          <div className="esm-search-box">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search e-Services, Licenses, Permits, Brand Masters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="esm-search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")} 
                className="esm-clear-search"
              >
                Clear
              </button>
            )}
          </div>

          <div className="esm-tabs-bar">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`esm-tab-chip ${activeTab === "ALL" ? "active" : ""}`}
            >
              All Services
            </button>
            {SERVICES_DATA.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveTab(cat.category)}
                className={`esm-tab-chip ${activeTab === cat.category ? "active" : ""}`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Body Content Scrollable Area */}
        <div className="esm-body-content">
          {/* Top Info Notice Strip */}
          <div className="esm-info-banner">
            <div className="esm-info-icon">
              <Shield className="w-5 h-5 text-sky-600" />
            </div>
            <div className="esm-info-text">
              <strong>Department of Excise, Entertainment & Luxury Tax</strong>
              <p>
                Government of NCT of Delhi • Single-window portal for online submission, automated license issuance, permit tracking, brand registration, and departmental approvals.
              </p>
            </div>
          </div>

          {filteredServices.length > 0 ? (
            filteredServices.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <div key={cat.category} className="esm-category-section">
                  <div className="esm-category-header">
                    <div className="esm-cat-title-group">
                      <div className="esm-cat-icon">
                        <CatIcon className="w-5 h-5 text-sky-700" />
                      </div>
                      <h3>{cat.category}</h3>
                    </div>
                    <span className="esm-cat-badge">{cat.badge}</span>
                  </div>

                  <div className="esm-services-grid">
                    {cat.services.map((service, idx) => (
                      <div key={idx} className="esm-service-card">
                        <div className="esm-card-header">
                          <h4>{service.title}</h4>
                        </div>
                        <p className="esm-card-desc">{service.desc}</p>
                        <div className="esm-card-tags">
                          {service.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="esm-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="esm-empty-state">
              <HelpCircle className="w-12 h-12 text-slate-300 mb-2" />
              <h4>No matching services found</h4>
              <p>Try searching with a different term or select "All Services".</p>
            </div>
          )}
        </div>

        {/* Modal Window Footer */}
        <div className="esm-window-footer">
          <div className="esm-footer-left">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Official Portal • Govt of NCT of Delhi</span>
          </div>
          <button onClick={onClose} className="esm-footer-close-btn">
            Close Guide Window
          </button>
        </div>
      </div>
    </div>
  );
}
