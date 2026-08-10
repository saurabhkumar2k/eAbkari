import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  Search, 
  CheckCircle2, 
  Info, 
  X, 
  Printer, 
  FileText,
  Layers,
  Save,
  RotateCcw,
  Edit2,
  Trash2,
  AlertCircle
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

  // Trigger notification toast
  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

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
    triggerToast('Form cleared.', 'info');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      triggerToast('Please enter or select a License Title Description.', 'error');
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
      triggerToast(`License Title "${selectedCode}" updated successfully!`, 'success');
    } else {
      // Add new item
      setTitles(prev => [description.trim(), ...prev]);
      triggerToast('New License Title added successfully!', 'success');
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
    
    // Scroll to form editor smooth
    const formElement = document.getElementById("license-title-editor-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Delete row handler
  const handleDelete = (titleStr) => {
    const commaIdx = titleStr.indexOf(',');
    const code = commaIdx !== -1 ? titleStr.substring(0, commaIdx).trim() : titleStr.trim();
    if (window.confirm(`Are you sure you want to delete license title "${code}"?`)) {
      setTitles(prev => prev.filter(t => t !== titleStr));
      if (selectedCode === code) {
        setSelectedCode('');
        setDescription('');
      }
      triggerToast(`Deleted license title "${code}"`, 'success');
    }
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
    <div className="tbs-container">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`tbs-toast tbs-toast-${toast.type || 'info'}`}>
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
          <span>{toast.message}</span>
          <button 
            type="button" 
            onClick={() => setToast(null)}
            className="tbs-toast-close"
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: 'auto' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Dashboard Card */}
      <div className="tbs-card">
        
        {/* Dynamic Government Header with Authentic Arrow Ribbon */}
        <div className="tbs-header-section">
          <div className="tbs-header-row">
            
            <div className="tbs-brand-block">
              <div className="tbs-icon-wrapper">
                <FileText />
              </div>
              <div className="tbs-title-block">
                <h1>License Title Master Dashboard</h1>
                <p>Configure and manage official license title codes, descriptions, and category classifications for Excise Licensing.</p>
              </div>
            </div>

            {/* Light blue ribbon styled exactly like transport pass validity page */}
            <div className="tbs-ribbon-wrapper">
              <div className="tbs-ribbon-container">
                <div className="tbs-ribbon-arrow"></div>
                <div className="tbs-ribbon-body">
                  <Layers />
                  License Title Master
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Statistics Panel */}
        <div className="tbs-stats-panel">
          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-sky">
              <FileText />
            </div>
            <div>
              <div className="tbs-stat-label">Total Title Records</div>
              <div className="tbs-stat-value">{titles.length} Titles</div>
            </div>
          </div>

          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-blue">
              <Search />
            </div>
            <div>
              <div className="tbs-stat-label">Filtered Results</div>
              <div className="tbs-stat-value">{filteredTitles.length} Titles</div>
            </div>
          </div>

          <div className="tbs-stat-card">
            <div className="tbs-stat-icon-wrapper tbs-stat-icon-indigo">
              <CheckCircle2 />
            </div>
            <div>
              <div className="tbs-stat-label">Selected Title Code</div>
              <div className="tbs-stat-value">{selectedCode || "New Item"}</div>
            </div>
          </div>
        </div>

        {/* Configuration Editor Panel */}
        <div id="license-title-editor-section" className="tbs-editor-section">
          <form onSubmit={handleSave}>
            
            <div className="tbs-form-row">
              <h2 className="tbs-form-row-title">
                <Edit2 className="w-4 h-4" />
                <span>{selectedCode ? `Edit License Title [${selectedCode}]` : "Add or Select License Title"}</span>
              </h2>

              <div className="tbs-form-grid">
                <div className="tbs-field-group">
                  <label className="tbs-label">
                    License Title Code
                  </label>
                  <select 
                    className="tbs-select"
                    value={selectedCode}
                    onChange={handleSelectCode}
                  >
                    <option value="">-Select Existing Title Code to Edit or Add New-</option>
                    {dropdownOptions.map((opt, idx) => (
                      <option key={idx} value={opt.code}>
                        {opt.code}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="tbs-field-group">
                  <label className="tbs-label">
                    License Title Description <span>*</span>
                  </label>
                  <textarea 
                    className="tbs-select"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter complete license title description..."
                    style={{ minHeight: '60px', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div className="tbs-actions-row" style={{ marginTop: '1.25rem' }}>
                <button 
                  type="submit" 
                  className="tbs-btn tbs-btn-sky"
                >
                  <Save className="w-4 h-4" />
                  <span>{selectedCode ? "Update License Title" : "Save New License Title"}</span>
                </button>
                <button 
                  type="button" 
                  className="tbs-btn tbs-btn-slate"
                  onClick={handleCancel}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear Form</span>
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Directory / Table Section */}
        <div className="tbs-directory-section">
          <div className="tbs-directory-header">
            <div>
              <h2 className="tbs-directory-title">Official License Titles Directory</h2>
              <p className="tbs-directory-subtitle">Registered excise license category titles and authorization definitions.</p>
            </div>

            <div className="tbs-directory-actions">
              <button 
                type="button" 
                className="tbs-btn tbs-btn-sm tbs-btn-outline-green"
                onClick={handlePrint}
                title="Print or export grid as PDF"
              >
                <Printer className="w-4 h-4" />
                <span>Print Grid / Export PDF</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="tbs-search-box">
            <div className="tbs-search-icon">
              <Search />
            </div>
            <input 
              type="text" 
              className="tbs-search-input"
              placeholder="Search by title code or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchTerm && (
              <button 
                type="button"
                className="tbs-search-clear"
                onClick={() => setSearchTerm('')}
              >
                <X />
              </button>
            )}
          </div>

          {/* Table Container */}
          <div className="tbs-table-wrapper">
            <table className="tbs-table">
              <thead>
                <tr>
                  <th style={{ width: '80px', textAlign: 'center' }}>Sl. No.</th>
                  <th style={{ width: '180px' }}>Title Code</th>
                  <th>License Title Description</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Action</th>
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
                        className={isSelected ? 'tbs-row-editing' : ''}
                      >
                        <td style={{ textAlign: 'center', fontWeight: '700', color: '#64748b' }}>
                          {globalIndex}
                        </td>
                        <td className="tbs-cell-bold">
                          <span className="inline-block px-2.5 py-1 bg-sky-100 text-sky-800 rounded-md font-bold text-xs border border-sky-200">
                            {code}
                          </span>
                        </td>
                        <td style={{ fontWeight: '500', color: '#1e293b' }}>
                          {item}
                        </td>
                        <td className="tbs-cell-actions">
                          <button
                            type="button"
                            onClick={() => handleSelectRow(item)}
                            className="tbs-icon-btn tbs-icon-btn-edit"
                            title="Edit / Select Title"
                          >
                            <Edit2 />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="tbs-icon-btn tbs-icon-btn-delete"
                            title="Delete Title"
                          >
                            <Trash2 />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="tbs-no-records">
                      <FileText />
                      <p>No matching license titles found</p>
                      <span>Try clearing or refining your search filter</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', padding: '0.5rem 0' }}>
              <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
                Showing page <span style={{ fontWeight: '700', color: '#0f172a' }}>{currentPage}</span> of <span style={{ fontWeight: '700', color: '#0f172a' }}>{totalPages}</span> ({filteredTitles.length} total items)
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <button 
                  type="button" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  className="tbs-btn-sm tbs-btn-slate"
                  style={{ borderRadius: '0.375rem', opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 3 + i;
                    if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                  }
                  const isActive = currentPage === pageNum;
                  return (
                    <button 
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`tbs-btn-sm ${isActive ? 'tbs-btn-sky' : 'tbs-btn-slate'}`}
                      style={{ borderRadius: '0.375rem', minWidth: '2rem', textAlign: 'center' }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button 
                  type="button" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  className="tbs-btn-sm tbs-btn-slate"
                  style={{ borderRadius: '0.375rem', opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default LicenseTitleMaster;
