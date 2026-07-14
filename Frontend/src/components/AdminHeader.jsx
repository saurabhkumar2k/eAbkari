import React from 'react';
import { ChevronRight } from 'lucide-react';
import { 
  HomeSvg, 
  FolderSvg, 
  DatabaseSvg, 
  TicketSvg, 
  FileTextSvg, 
  WalletSvg, 
  PenToolSvg, 
  TagSvg, 
  MessageSquareSvg, 
  PieChartSvg, 
  SettingsSvg
} from '../components/icons/GlobalIcons';

const AdminHeader = ({ navItems, currentView, onNavigate }) => {
  return (
    <div className="admin-header-wrapper">
      <header className="dept-dash-header">
        <div className="dept-dash-container">
          <div className="dept-dash-brand-row">
            <div className="dept-dash-logo-block">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Emblem" 
                className="dept-emblem"
              />
              <div className="dept-dash-titles">
                <h1 className="dept-main-title caps">DEPARTMENT OF EXCISE</h1>
                <p className="dept-sub-title semibold">OFFICE OF THE EXCISE COMMISSIONER</p>
                <p className="dept-sub-title semibold">GOVERNMENT OF NCT OF DELHI</p>
              </div>
            </div>
            
            <div className="dept-dash-right-actions">
              {/* Profile icons could go here */}
            </div>
          </div>
        </div>
      </header>

      <nav className="dept-dash-nav">
        <div className="dept-dash-container">
          <ul className="dept-nav-list">
            {navItems.map((item, idx) => (
              <li 
                key={idx} 
                className={`dept-nav-item ${item.active ? 'is-active' : ''} ${item.items ? 'has-dropdown' : ''}`}
              >
                <a 
                  href="#" 
                  className={`dept-nav-link ${item.isLogout ? 'hover:bg-red-700/40 hover:text-red-200 text-rose-300 transition-colors duration-200' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!item.hasDropdown) onNavigate(item.label.toUpperCase());
                  }}
                  title={item.label}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
                {item.items && (
                  <div className="dept-dropdown-menu">
                    {item.items.map((subItem, sIdx) => {
                      const isObject = typeof subItem === 'object';
                      const label = isObject ? subItem.label : subItem;
                      const hasSideMenu = isObject && subItem.hasSideMenu;
                      
                      return (
                        <div key={sIdx} className={`dept-dropdown-item ${hasSideMenu ? 'has-side-menu' : ''}`}>
                          <a 
                            href="#" 
                            className="dept-dropdown-link"
                            onClick={(e) => {
                              e.preventDefault();
                              if (!hasSideMenu) onNavigate(label.toUpperCase());
                            }}
                          >
                            <span>{label}</span>
                            {hasSideMenu && (
                              <ChevronRight className="dash-icon-xxs ml-auto" />
                            )}
                          </a>
                          {hasSideMenu && (
                            <div className="dept-side-menu">
                              {subItem.sideItems.map((sideItem, ssIdx) => (
                                <a 
                                  key={ssIdx} 
                                  href="#" 
                                  className="dept-side-link"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate(sideItem.toUpperCase());
                                  }}
                                >
                                  {sideItem}
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
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminHeader;
