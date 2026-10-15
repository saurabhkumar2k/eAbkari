import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  Info, 
  X, 
  Printer, 
  FileText 
} from 'lucide-react';

const INITIAL_LICENSE_TITLES = [
  "AP, Authorisation Permit",
  "DD-10, Licence for possession and sale of manufactured drugs otherwise than on prescription.",
  "DD-11, Chemist licence for sale, on prescription of manufactured drugs or preparations containing the manufactured drugs for medical purposes.",
  "DD-5, Licence for possession and transport of manufactured drugs by an approved practitioner for “use in his practice”.",
  "DD-9, Licence granted for possession of manufactured drugs for manufacture of the medicinal preparations containing manufactured drugs and for sale of",
  "DL, Licence For Dealer",
  "L-1 (M&TP), Licence to manufacture medicinal and toilet preparations containing alcohol, opium, Indian hemp and other narcotic drugs and narcotics und",
  "L-1, Licence for wholesale supply of Indian Liquor",
  "L-1A, Licence for wholesale supply of Foreign Liquor",
  "L-2, Licence for retail vend of Indian Liquor in vends",
  "L-3, Licence for retail vend of Foreign Liquor in Hotels",
  "L-4, Licence for wholesale supply of Denatured Spirit / Special Denatured Spirit",
  "L-5, Licence for retail vend of Denatured Spirit",
  "L-6, Licence for retail vend of Indian Liquor / Foreign Liquor in Government Vends",
  "L-7, Licence for retail vend of Foreign Liquor in Shopping Malls",
  "L-8, Licence for retail vend of Country Liquor",
  "L-9, Licence for retail vend of Foreign Liquor in Duty Free Shops",
  "L-10, Licence for retail vend of Indian Liquor in Departmental Stores",
  "L-11, Licence for wholesale vend of Country Liquor",
  "L-12, Licence for possession and sale of Rectified Spirit",
  "L-13, Licence for possession and sale of Absolute Alcohol",
  "L-14, Licence for retail vend of Country Liquor in rural areas",
  "L-15, Licence for retail vend in Star Classified Hotels",
  "L-16, Licence for retail vend in Heritage Hotels",
  "L-17, Licence for retail vend in Independent Restaurants",
  "L-18, Licence for retail vend of Wine and Beer in Restaurants",
  "L-19, Licence for retail vend of Foreign Liquor in Clubs",
  "L-20, Licence for retail vend of Foreign Liquor in Messes / Canteens",
  "L-21, Licence for retail vend of Foreign Liquor in Commercial Airports",
  "L-22, Licence for retail vend in Railway Refreshment Rooms",
  "L-23, Licence for retail vend of Foreign Liquor in Microbreweries",
  "L-24, Licence for possession and sale of Sacramental Wine",
  "L-25, Licence for possession and use of Alcohol in Research Institutions",
  "L-26, Licence for possession and sale of Medicinal Preparations",
  "L-27, Licence for manufacture of Country Liquor",
  "L-28, Licence for temporary bar permit for special events and functions",
  "L-29, Licence for temporary bar permit for club events",
  "L-30, Licence for possession and sale of Industrial Alcohol",
  "L-31, Licence for wholesale supply of Bio-Ethanol",
  "L-32, Licence for retail vend of draught beer",
  "L-33, Licence for bottling of Indian Liquor",
  "L-34, Licence for distillery / brewery operations",
  "L-35, Licence for supply of draught beer to licensed premises",
  "M&TP-1, Licence to manufacture medicinal preparations containing alcohol",
  "M&TP-2, Licence to manufacture toilet preparations containing alcohol",
  "M&TP-3, Licence to possess and use rectified spirit in M&TP units",
  "M&TP-4, Licence to export medicinal and toilet preparations",
  "M&TP-5, Licence for bonded warehouse of M&TP products",
  "P-10, Permit for service of liquor at private functions / parties",
  "P-11, Permit for possession of liquor beyond prescribed limit",
  "P-13, Permit for transport of bulk spirit within state",
  "P-14, Permit for import of bulk spirit from other states",
  "P-15, Permit for export of bulk spirit to other states",
  "B-1, Licence for establishment of new Brewery",
  "D-1, Licence for establishment of new Distillery",
  "W-1, Licence for establishment of new Winery",
  "FL-1, Licence for wholesale of Foreign Liquor (Imported)",
  "FL-2, Licence for bonded warehouse of Imported Foreign Liquor",
  "FL-3, Licence for retail vend of Imported Foreign Liquor",
  "CL-1, Licence for wholesale supply of Country Liquor",
  "CL-2, Licence for retail vend of Country Liquor in urban areas",
  "RS-1, Licence for storage and bulk distribution of Rectified Spirit",
  "DS-1, Licence for wholesale supply of Denatured Spirit",
  "DS-2, Licence for industrial use of Denatured Spirit",
  "E-1, Licence for production of Fuel Ethanol",
  "E-2, Licence for storage and blending of Fuel Ethanol",
  "S-1, Licence for manufacture of Special Denatured Spirit",
  "S-2, Licence for chemical lab use of Special Denatured Spirit",
  "MB-1, Licence for Microbrewery setup and operation",
  "MB-2, Licence for sale of craft beer at microbrewery outlet",
  "T-1, Temporary Permit for commercial liquor tasting events",
  "T-2, Temporary Permit for international trade fair bar counter",
  "C-1, Licence for Canteen Stores Department (CSD) wholesale",
  "C-2, Licence for CSD retail canteens",
  "M-1, Licence for Para-Military forces unit mess",
  "M-2, Licence for Armed Forces Officers Mess",
  "R-1, Licence for Railway Catering Service"
];

const LicenseTitleMaster = ({ onBack }) => {
  const [toast, setToast] = useState(null);
  
  // State for license titles list
  const [titles, setTitles] = useState(() => {
    const saved = localStorage.getItem('dept_license_titles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_LICENSE_TITLES;
  });

  useEffect(() => {
    localStorage.setItem('dept_license_titles', JSON.stringify(titles));
  }, [titles]);

  // Form states
  const [selectedCode, setSelectedCode] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Option list for dropdown derived from titles
  const dropdownOptions = useMemo(() => {
    return titles.map((title) => {
      const commaIdx = title.indexOf(',');
      const code = commaIdx !== -1 ? title.substring(0, commaIdx).trim() : title.trim();
      return { code, fullTitle: title };
    });
  }, [titles]);

  // When dropdown selection changes
  const handleSelectCode = (e) => {
    const val = e.target.value;
    setSelectedCode(val);
    if (val === '') {
      setDescription('');
    } else {
      const found = titles.find(t => {
        const commaIdx = t.indexOf(',');
        const code = commaIdx !== -1 ? t.substring(0, commaIdx).trim() : t.trim();
        return code === val;
      });
      if (found) {
        setDescription(found);
      }
    }
  };

  const handleCancel = () => {
    setSelectedCode('');
    setDescription('');
    setToast({ type: 'info', message: 'Form cleared.' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setToast({ type: 'error', message: 'Please enter or select a License Title Description.' });
      return;
    }

    if (selectedCode) {
      // Update existing item
      setTitles(prev => prev.map(t => {
        const commaIdx = t.indexOf(',');
        const code = commaIdx !== -1 ? t.substring(0, commaIdx).trim() : t.trim();
        if (code === selectedCode) {
          return description.trim();
        }
        return t;
      }));
      setToast({ type: 'success', message: `License Title "${selectedCode}" updated successfully!` });
    } else {
      // Add new item
      setTitles(prev => [description.trim(), ...prev]);
      setToast({ type: 'success', message: 'New License Title added successfully!' });
      setSelectedCode('');
      setDescription('');
    }
  };

  // Row selection handler
  const handleSelectRow = (titleStr) => {
    const commaIdx = titleStr.indexOf(',');
    const code = commaIdx !== -1 ? titleStr.substring(0, commaIdx).trim() : titleStr.trim();
    setSelectedCode(code);
    setDescription(titleStr);
  };

  // Search filter
  const filteredTitles = useMemo(() => {
    if (!searchTerm.trim()) return titles;
    return titles.filter(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [titles, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredTitles.length / itemsPerPage) || 1;
  const paginatedTitles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTitles.slice(start, start + itemsPerPage);
  }, [filteredTitles, currentPage]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="license-title-container">
      
      {/* Toast Notification */}
      {toast && (
        <div className="license-title-toast">
          {toast.type === 'success' && <CheckCircle2 style={{ color: '#4ade80' }} size={18} />}
          {toast.type === 'error' && <X style={{ color: '#f87171' }} size={18} />}
          {toast.type === 'info' && <Info style={{ color: '#38bdf8' }} size={18} />}
          <span>{toast.message}</span>
          <button 
            type="button" 
            onClick={() => setToast(null)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: 'auto' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="license-title-back-bar">
        <button 
          type="button" 
          className="license-title-back-btn"
          onClick={onBack || (() => window.location.href = '/departmentdashboard')}
        >
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Ribbon Banner Top Header */}
      <div className="license-title-ribbon-wrapper">
        <div className="license-title-ribbon-banner">
          <div className="license-title-ribbon-arrow" />
          <span>License Title</span>
        </div>
      </div>

      {/* Form Panel Container (Grey Panel) */}
      <div className="license-title-form-panel">
        <form onSubmit={handleSave}>
          
          {/* Row 1: License Title Code */}
          <div className="license-title-form-row">
            <label className="license-title-label">
              License Title Code
            </label>
            <div className="license-title-control-wrap">
              <select 
                className="license-title-select"
                value={selectedCode}
                onChange={handleSelectCode}
              >
                <option value="">--Select--</option>
                {dropdownOptions.map((opt, idx) => (
                  <option key={idx} value={opt.code}>
                    {opt.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: License Title Description */}
          <div className="license-title-form-row">
            <label className="license-title-label">
              License Title Description
            </label>
            <div className="license-title-control-wrap">
              <textarea 
                className="license-title-textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter or view license title description..."
              />
            </div>
          </div>

          {/* Row 3: Buttons */}
          <div className="license-title-actions-row">
            <button 
              type="submit" 
              className="license-title-btn license-title-btn-primary"
            >
              Save
            </button>
            <button 
              type="button" 
              className="license-title-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Mid Bar: Total Records & Print Grid As PDF */}
      <div className="license-title-mid-bar">
        <div className="license-title-records-count">
          Total Records : {titles.length}
        </div>
        <div className="license-title-print-wrap">
          <span className="license-title-print-label">Print Grid As :</span>
          <button 
            type="button" 
            className="license-title-pdf-btn"
            onClick={handlePrint}
            title="Print or export grid as PDF"
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="28" height="28" rx="4" fill="#E53935" />
              <path d="M9 11H15C16.1 11 17 11.9 17 13V15C17 16.1 16.1 17 15 17H11V21H9V11ZM11 13V15H15V13H11Z" fill="white" />
              <path d="M18 11H21C22.7 11 24 12.3 24 14V18C24 19.7 22.7 21 21 21H18V11ZM20 13V19H21C21.6 19 22 18.6 22 18V14C22 13.4 21.6 13 21 13H20Z" fill="white" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="license-title-search-row">
        <div className="license-title-search-input-wrap">
          <Search className="license-title-search-icon" />
          <input 
            type="text" 
            className="license-title-search-input"
            placeholder="Search by title code or description..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
          Showing {paginatedTitles.length} of {filteredTitles.length} filtered items
        </div>
      </div>

      {/* Data Table Grid */}
      <div className="license-title-table-container">
        <table className="license-title-table">
          <thead>
            <tr>
              <th className="col-sr">
                Sl.<br />No.
              </th>
              <th>
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTitles.length > 0 ? (
              paginatedTitles.map((item, idx) => {
                const globalIndex = (currentPage - 1) * itemsPerPage + idx + 1;
                const commaIdx = item.indexOf(',');
                const code = commaIdx !== -1 ? item.substring(0, commaIdx).trim() : item.trim();
                const isSelected = selectedCode === code;

                return (
                  <tr 
                    key={globalIndex}
                    className={isSelected ? 'selected-row' : ''}
                    onClick={() => handleSelectRow(item)}
                  >
                    <td className="cell-sr">
                      {globalIndex}
                    </td>
                    <td>
                      {item}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={2} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                  No matching license titles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="license-title-pagination">
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className="license-title-page-btns">
            <button 
              type="button" 
              className="license-title-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 3 + i;
                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
              }
              return (
                <button 
                  key={pageNum}
                  type="button"
                  className={`license-title-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button 
              type="button" 
              className="license-title-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default LicenseTitleMaster;
