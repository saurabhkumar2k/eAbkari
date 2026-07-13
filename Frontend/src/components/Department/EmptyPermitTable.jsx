import React, { useState } from 'react';
import { 
  FileSearch,
  ChevronLeft, 
  ChevronRight, 
  Search,
  Filter,
  Activity
} from 'lucide-react';

const EmptyPermitTable = ({ rows, onEdit, onDelete, onRefresh }) => {
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState('');
  const pageSize = 10;

  const headers = [
    "State Name",
    "State Code",
    "IP Issue Days",
    "EO Issue Days",
    "IP Receipt Days",
    "EO Required",
    "Actions"
  ];

  const filteredRows = (Array.isArray(rows) ? rows : []).filter((row) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      String(row.stateName || '').toLowerCase().includes(q) ||
      String(row.stateCode || '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(activePage, totalPages);
  const start = (safePage - 1) * pageSize;
  const pagedRows = filteredRows.slice(start, start + pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="modern-table-card glass-card animate-up delay-200">
      {/* Table Toolbar */}
      <div className="table-toolbar">
        <div className="toolbar-left">
          <div className="search-box-modern">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search state..."
              className="search-input"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActivePage(1);
              }}
            />
          </div>
          <button className="btn-toolbar-icon">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
        <div className="toolbar-right">
          <button className="btn-print-styled" onClick={onRefresh}>
            <Activity size={18} />
            <span>Refresh</span>
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
            {pagedRows.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="empty-state-cell">
                  <div className="empty-state-content">
                    <div className="empty-illustration">
                      <div className="pulse-circle">
                        <FileSearch size={64} className="empty-icon" />
                      </div>
                    </div>
                    <h3 className="empty-title">No Records Found</h3>
                    <p className="empty-message">Try adjusting your search terms.</p>
                  </div>
                </td>
              </tr>
            ) : (
              pagedRows.map((row) => (
                <tr key={row.stateCode}>
                  <td>{row.stateName}</td>
                  <td>{row.stateCode}</td>
                  <td>{row.daysIpValidity}</td>
                  <td>{row.daysIpValidityEoIssue}</td>
                  <td>{row.daysIpValidityIpRecv}</td>
                  <td>{row.eoRequired === 'Y' ? 'EO Required' : 'EO Not Required'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn-toolbar-icon" onClick={() => onEdit(row)}>Edit</button>
                      <button className="btn-toolbar-icon" onClick={() => onDelete(row.stateCode)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modern Pagination */}
      <div className="modern-pagination-container">
        <div className="pagination-info">
          Showing <span className="fw-bold">{filteredRows.length === 0 ? 0 : start + 1}</span> to <span className="fw-bold">{Math.min(start + pageSize, filteredRows.length)}</span> of <span className="fw-bold">{filteredRows.length}</span> entries
        </div>
        <div className="pagination-controls">
          <button className="pagination-nav-btn prev" disabled={safePage <= 1} onClick={() => setActivePage((p) => Math.max(1, p - 1))}>
            <ChevronLeft size={20} />
          </button>
          <div className="pagination-pages">
            {pages.map((page) => (
              <button 
                key={page}
                className={`pagination-page-btn ${safePage === page ? 'active' : ''}`}
                onClick={() => setActivePage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="pagination-nav-btn next" disabled={safePage >= totalPages} onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyPermitTable;
