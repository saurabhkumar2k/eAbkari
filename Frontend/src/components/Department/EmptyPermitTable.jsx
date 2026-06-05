import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  FileSearch, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Filter,
  MoreVertical,
  Activity
} from 'lucide-react';

const EmptyPermitTable = () => {
  const [activePage, setActivePage] = useState(1);

  const headers = [
    "State Name",
    "Registration ID",
    "Applicant Name",
    "Bulk Spirit Type",
    "Permit Issue Date",
    "Validity Period",
    "Status",
    "Actions"
  ];

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="modern-table-card glass-card animate-up delay-200">
      {/* Table Toolbar */}
      <div className="table-toolbar">
        <div className="toolbar-left">
          <div className="search-box-modern">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search permits..." className="search-input" />
          </div>
          <button className="btn-toolbar-icon">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
        <div className="toolbar-right">
          <button className="btn-export-gradient">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button className="btn-print-styled">
            <Printer size={18} />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="modern-table-container">
        <table className="modern-data-table sticky-header">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Empty State Row */}
            <tr>
              <td colSpan={headers.length} className="empty-state-cell">
                <div className="empty-state-content">
                  <div className="empty-illustration">
                    <div className="pulse-circle">
                      <FileSearch size={64} className="empty-icon" />
                    </div>
                    <div className="floating-elements">
                      <div className="float-dot dot-1" />
                      <div className="float-dot dot-2" />
                      <div className="float-dot dot-3" />
                    </div>
                  </div>
                  <h3 className="empty-title">No Records Found</h3>
                  <p className="empty-message">
                    We couldn't find any permit records for the selected criteria.<br />
                    Try adjusting your filters or search terms.
                  </p>
                  <div className="empty-actions">
                    <button className="btn-refresh-data">
                      <Activity size={16} />
                      Refresh Data
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modern Pagination */}
      <div className="modern-pagination-container">
        <div className="pagination-info">
          Showing <span className="fw-bold">0</span> to <span className="fw-bold">0</span> of <span className="fw-bold">0</span> entries
        </div>
        <div className="pagination-controls">
          <button className="pagination-nav-btn prev" disabled>
            <ChevronLeft size={20} />
          </button>
          <div className="pagination-pages">
            {pages.map((page) => (
              <button 
                key={page}
                className={`pagination-page-btn ${activePage === page ? 'active' : ''}`}
                onClick={() => setActivePage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="pagination-nav-btn next">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyPermitTable;
