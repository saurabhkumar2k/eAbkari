import React, { useState } from "react";
import { 
  X, 
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
    category: "Licensing & Registration",
    icon: Wine,
    badge: "360+ Licenses",
    services: [
      {
        title: "Wholesale Licenses (L-1 / L-1F)",
        desc: "End-to-end online grant, renewal, and management for Indian Made Foreign Liquor (IMFL) and Foreign Imported Liquor wholesale vends.",
        tags: ["L-1 IMFL", "L-1F BIO", "Wholesale", "Renewal"],
        action: "/login"
      },
      {
        title: "Distillery & Bottling Vats (L-3 / L-5)",
        desc: "Licensing for spirit distillation plants, bottling plants, and bulk wholesale spirit storage vats across Delhi NCT.",
        tags: ["Bottling Plant", "Vats", "Distillery"],
        action: "/login"
      },
      {
        title: "Hotel, Club & Restaurant Bars (L-15 / L-16)",
        desc: "Commercial bar licenses for 5-star hotels, heritage resorts, registered clubs, and fine-dining restaurants.",
        tags: ["HCR", "Hotel Bar", "Club License"],
        action: "/login"
      },
      {
        title: "Premise Registration & Wizard",
        desc: "Step-by-step premise mapping, hall details verification, owner type declaration, and site compliance check.",
        tags: ["Premise Wizard", "Site Verification"],
        action: "/login"
      }
    ]
  },
  {
    category: "Permits, Passes & SCM",
    icon: Truck,
    badge: "Real-time Tracking",
    services: [
      {
        title: "Import Permit Cum Pass (IP-PL)",
        desc: "Digital application, duty payment, and automated issuance of transit import permits for packaged liquor consignments.",
        tags: ["IP-PL", "Transit Pass", "Import Permit"],
        action: "/importpermitpass"
      },
      {
        title: "Transport Bulk Spirit Permit",
        desc: "Authorization for intra-state and inter-state movement of un-denatured ethanol and bulk neutral spirit.",
        tags: ["Bulk Spirit", "Tanker Pass", "Transport"],
        action: "/transportbulkspirit"
      },
      {
        title: "P-10 & Temporary Bar Permits",
        desc: "Instant single-day permit issuance for private events, weddings, banquets, and commercial exhibitions (L-28 / P-10).",
        tags: ["P-10 Permit", "Event Bar", "Temporary"],
        action: "/login"
      },
      {
        title: "Import Packaged FL Validity",
        desc: "Verification and clearance portal for imported packaged foreign liquor shipments arriving at Delhi ports.",
        tags: ["Packaged FL", "Customs Clearance"],
        action: "/importpackaged"
      }
    ]
  },
  {
    category: "Brand & Label Management",
    icon: Award,
    badge: "Automated Approval",
    services: [
      {
        title: "Liquor Brand Registration",
        desc: "Online submission, duty assessment, and approval for new liquor brands, variants, and bottle capacities.",
        tags: ["Brand Master", "Label Approval"],
        action: "/liquorbrand"
      },
      {
        title: "Bottler Master & Brand Owners",
        desc: "Centralized repository for bottling plant credentials, brand ownership assignments, and tie-up manufacturing contracts.",
        tags: ["Bottler Master", "Brand Owner"],
        action: "/bottlermaster"
      },
      {
        title: "Official Brand Price List Search",
        desc: "Publicly accessible search tool for verified Maximum Retail Price (MRP), measure size, and liquor categories.",
        tags: ["MRP Search", "Public Price List"],
        action: "PRICE_LIST"
      }
    ]
  },
  {
    category: "Departmental Workflow & DA Desk",
    icon: Shield,
    badge: "Official Portal",
    services: [
      {
        title: "DA Officer Dashboard & Pool",
        desc: "Role-based officer desk for reviewing submitted applications, pulling pending applications from central pool, and issuing clearances.",
        tags: ["DA Desk", "Application Pool", "Verification"],
        action: "/departmentdashboard"
      },
      {
        title: "Penalty & Other Payments",
        desc: "Integrated online challan generation and penalty verification for compounding fees and compliance dues.",
        tags: ["E-Challan", "Penalty Payment"],
        action: "/departmentdashboard"
      },
      {
        title: "Director Change & License Transfer",
        desc: "Workflow for approving corporate director changes, firm restructuring, site relocation, and license transfers.",
        tags: ["Director Change", "License Transfer"],
        action: "/departmentdashboard"
      }
    ]
  },
  {
    category: "Public Transparency & Reports",
    icon: BarChart3,
    badge: "Open Data",
    services: [
      {
        title: "Stock & Inventory Reports",
        desc: "Real-time tracking of wholesale depot stocks, retail shop inventories, and daily dispatch ledgers.",
        tags: ["Stock Ledger", "Supply Chain"],
        action: "/departmentdashboard"
      },
      {
        title: "Notice Board & Circulars",
        desc: "Official government notifications, excise policy guidelines, tenders, and downloadable circular PDFs.",
        tags: ["Notices", "Circulars", "Policies"],
        action: "NOTICE_BOARD"
      },
      {
        title: "Department Overview & Directory",
        desc: "Organizational hierarchy, staff contact directories, Excise Commissioner profile, and departmental mandates.",
        tags: ["About Us", "Staff Directory"],
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
