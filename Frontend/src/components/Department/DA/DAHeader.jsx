import React, { useState } from "react";
import { ArrowLeft, UserCheck, ChevronRight, LogOut } from "lucide-react";
import { 
  HomeSvg, 
  FolderSvg, 
  TicketSvg, 
  TagSvg, 
  PieChartSvg, 
  SettingsSvg,
  LogOutSvg
} from "./globalicons.jsx";

export default function DAHeader({ activeMenu, onSelectMenu, onLogout, onNavigateHome }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuConfig = [
    {
      id: "home",
      label: "Home",
      icon: <HomeSvg className="dept-nav-icon" />
    },
    {
      id: "permit_pass",
      label: "Permit/Pass",
      icon: <TicketSvg className="dept-nav-icon" />,
      hasDropdown: true,
      items: [
        { id: "import_permit", label: "Import Permit Scrutiny" },
        { id: "transport_pass", label: "Transport Pass Verification" },
        { id: "export_noc", label: "Export NoC Review" },
        {
          id: "ip_pl",
          label: "IP-PL",
          hasSideMenu: true,
          sideItems: [
            { id: "act_on_ip_revalidation", label: "Act on IP Revalidation" }
          ]
        }
      ]
    },
    {
      id: "licensing",
      label: "Licensing",
      icon: <FolderSvg className="dept-nav-icon" />,
      hasDropdown: true,
      items: [
        { id: "penalty_other_payments", label: "Penalty/Other Payments" },
        { id: "director_change", label: "Director Change" },
        {
          id: "new_license_transaction",
          label: "New License-Transaction",
          hasSideMenu: true,
          sideItems: [
            { id: "pull_application", label: "Pull Application" }
          ]
        }
      ]
    },
    {
      id: "label_regn",
      label: "Label Regn.",
      icon: <TagSvg className="dept-nav-icon" />,
      hasDropdown: true,
      items: [
        { id: "label_verification", label: "Label Verification Requests" },
        { id: "fl_validity", label: "Packaged FL Validity" },
        { id: "spirit_bottling", label: "Bulk Spirit Master" }
      ]
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: <TicketSvg className="dept-nav-icon" />
    },
    {
      id: "mis",
      label: "MIS",
      icon: <PieChartSvg className="dept-nav-icon" />,
      hasDropdown: true,
      items: [
        { id: "daily_clearance", label: "Daily Scrutiny Clearance Log" },
        { id: "pendency_report", label: "Pendency Analysis Statement" },
        { id: "district_summary", label: "District-wise Scrutiny Summary" }
      ]
    },
    {
      id: "house_keeping",
      label: "House Keeping",
      icon: <SettingsSvg className="dept-nav-icon" />,
      hasDropdown: true,
      items: [
        {
          id: "user_maintenance",
          label: "User Maintenance",
          hasSideMenu: true,
          sideItems: [
            { id: "user_profile", label: "User Profile" }
          ]
        }
      ]
    },
    {
      id: "logout",
      label: "Logout",
      icon: <LogOutSvg className="dept-nav-icon" />,
      isLogout: true
    }
  ];

  const handleItemClick = (menuId, subItemId) => {
    setOpenDropdown(null);
    if (onSelectMenu) {
      onSelectMenu(menuId, subItemId);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = "/departmentlogin";
    }
  };

  return (
    <div className="admin-header-wrapper da-header-wrapper">
      {/* Top Branding Bar */}
      <header className="dept-dash-header da-top-header">
        <div className="dept-dash-container da-header-container">
          <div className="dept-dash-brand-row da-header-brand-row">
            <div className="dept-dash-logo-block da-header-logo-block">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="Emblem of India"
                className="dept-emblem da-emblem-img"
              />
              <div className="dept-dash-titles da-header-title-group">
                <h1 className="dept-main-title da-header-dept-title caps">DEPARTMENT OF EXCISE</h1>
                <p className="dept-sub-title da-header-dept-sub semibold">OFFICE OF THE EXCISE COMMISSIONER</p>
                <p className="dept-sub-title da-header-dept-sub semibold">GOVERNMENT OF NCT OF DELHI</p>
              </div>
            </div>

            <div className="dept-dash-right-actions da-header-user-info">
              <div className="dept-user-profile-pill da-user-badge-box">
                <div className="dept-user-avatar">
                  <UserCheck size={16} className="da-user-icon" />
                </div>
                <div className="dept-user-info-text">
                  <span className="dept-user-role da-user-role-tag">LOGGED IN AS</span>
                  <span className="dept-user-name da-user-name">Dealing Assistant (DA)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Blue Navigation Bar (Identical to Department Dashboard) */}
      <nav className="dept-dash-nav da-navbar">
        <div className="dept-dash-container da-header-container">
          <ul className="dept-nav-list da-menu-list">
            {menuConfig.map((item, idx) => {
              const hasDropdown = Array.isArray(item.items) && item.items.length > 0;
              const isActive = activeMenu === item.id;

              return (
                <li 
                  key={item.id || idx} 
                  className={`dept-nav-item da-menu-item ${isActive ? 'is-active' : ''} ${hasDropdown ? 'has-dropdown' : ''}`}
                >
                  <a 
                    href="#" 
                    className={`dept-nav-link da-menu-btn ${item.isLogout ? 'hover:bg-red-700/40 hover:text-red-200 text-rose-300' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.isLogout) {
                        handleLogout();
                      } else if (!hasDropdown) {
                        handleItemClick(item.id, item.id);
                      }
                    }}
                    title={item.label}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>

                  {hasDropdown && (
                    <div className="dept-dropdown-menu da-dropdown-menu">
                      {item.items.map((subItem, sIdx) => {
                        const hasSideMenu = Array.isArray(subItem.sideItems) && subItem.sideItems.length > 0;
                        
                        return (
                          <div key={subItem.id || sIdx} className={`dept-dropdown-item da-dropdown-item ${hasSideMenu ? 'has-side-menu has-side' : ''}`}>
                            <a 
                              href="#" 
                              className="dept-dropdown-link da-dropdown-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                if (!hasSideMenu) handleItemClick(item.id, subItem.id);
                              }}
                            >
                              <span>{subItem.label}</span>
                              {hasSideMenu && (
                                <ChevronRight className="dash-icon-xxs ml-auto da-side-arrow" style={{ width: '0.85rem', height: '0.85rem' }} />
                              )}
                            </a>

                            {hasSideMenu && (
                              <div className="dept-side-menu da-side-menu">
                                {subItem.sideItems.map((sideItem, ssIdx) => (
                                  <a 
                                    key={sideItem.id || ssIdx} 
                                    href="#" 
                                    className="dept-side-link da-side-btn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleItemClick(item.id, sideItem.id);
                                    }}
                                  >
                                    {sideItem.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

