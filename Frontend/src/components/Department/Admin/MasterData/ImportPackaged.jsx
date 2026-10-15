import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  RotateCcw,
  FileSpreadsheet,
  ChevronLeft,
  Calendar,
  Layers,
  Clock,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from "lucide-react";

// The exact list of states and values from the screenshot
const INITIAL_VAL_DATA = [
  { id: "1", state: "Andaman And Nicobar", ipDays: 25, exportDays: 9 },
  { id: "2", state: "ANDHRA PRADESH", ipDays: 25, exportDays: 8 },
  { id: "3", state: "ARUNACHAL PRADESH", ipDays: 18, exportDays: 6 },
  { id: "4", state: "ASSAM", ipDays: 18, exportDays: 6 },
  { id: "5", state: "Bhutan", ipDays: 15, exportDays: 5 },
  { id: "6", state: "BIHAR", ipDays: 15, exportDays: 5 },
  { id: "7", state: "CHANDIGARH", ipDays: 18, exportDays: 7 },
  { id: "8", state: "CHATTISGARH", ipDays: 21, exportDays: 8 },
  { id: "9", state: "DADRA & NAGAR HAVELI", ipDays: 25, exportDays: 9 },
  { id: "10", state: "DAMAN & DIU", ipDays: 25, exportDays: 9 },
  { id: "11", state: "Delhi", ipDays: 25, exportDays: 9 },
  { id: "12", state: "GOA", ipDays: 25, exportDays: 9 },
  { id: "13", state: "GUJARAT", ipDays: 25, exportDays: 9 },
  { id: "14", state: "HARYANA", ipDays: 21, exportDays: 7 },
  { id: "15", state: "HIMACHAL PRADESH", ipDays: 25, exportDays: 9 },
  { id: "16", state: "JAMMU AND KASHMIR", ipDays: 25, exportDays: 9 },
  { id: "17", state: "JHARKHAND", ipDays: 15, exportDays: 4 },
  { id: "18", state: "KARNATAKA", ipDays: 25, exportDays: 9 },
  { id: "19", state: "KERALA", ipDays: 25, exportDays: 9 },
  { id: "20", state: "LAKSHADWEEP", ipDays: 25, exportDays: 9 },
  { id: "21", state: "MADHYA PRADESH", ipDays: 18, exportDays: 6 },
  { id: "22", state: "Maharashtra", ipDays: 25, exportDays: 9 },
  { id: "23", state: "MANIPUR", ipDays: 18, exportDays: 6 },
  { id: "24", state: "MEGHALAYA", ipDays: 18, exportDays: 6 },
  { id: "25", state: "MIZORAM", ipDays: 18, exportDays: 6 },
  { id: "26", state: "NAGALAND", ipDays: 18, exportDays: 6 },
  { id: "27", state: "NEPAL", ipDays: 15, exportDays: 5 },
  { id: "28", state: "ORISSA", ipDays: 15, exportDays: 4 },
  { id: "29", state: "Outside India", ipDays: 25, exportDays: 9 },
  { id: "30", state: "PONDICHERRY", ipDays: 25, exportDays: 9 },
  { id: "31", state: "PUNJAB", ipDays: 30, exportDays: 15 },
  { id: "32", state: "RAJASTHAN", ipDays: 25, exportDays: 9 },
  { id: "33", state: "SIKKIM", ipDays: 15, exportDays: 4 },
  { id: "34", state: "TAMIL NADU", ipDays: 25, exportDays: 9 },
  { id: "35", state: "TELANGANA", ipDays: 25, exportDays: 9 },
  { id: "36", state: "TRIPURA", ipDays: 18, exportDays: 6 },
  { id: "37", state: "Uttar Pradesh", ipDays: 18, exportDays: 6 },
  { id: "38", state: "UTTRAKHAND", ipDays: 20, exportDays: 6 },
  { id: "39", state: "WEST BENGAL", ipDays: 30, exportDays: 30 }
];

export default function ImportPackagedFlValidity({ onNavigateHome }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("excise_packaged_fl_validity_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_VAL_DATA;
      }
    }
    return INITIAL_VAL_DATA;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ state: "", ipDays: 0, exportDays: 0 });
  const [toast, setToast] = useState(null);
  const [sortField, setSortField] = useState("state");
  const [sortDirection, setSortDirection] = useState("asc");

  // Add rule state
  const [isAdding, setIsAdding] = useState(false);
  const [newRule, setNewRule] = useState({ state: "", ipDays: 15, exportDays: 5 });

  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveToLocalStorage = (updatedData) => {
    localStorage.setItem("excise_packaged_fl_validity_v1", JSON.stringify(updatedData));
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setEditForm({ state: row.state, ipDays: row.ipDays, exportDays: row.exportDays });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id) => {
    if (!editForm.state.trim()) {
      triggerToast("State name is required", "error");
      return;
    }
    if (editForm.ipDays < 1 || editForm.exportDays < 1) {
      triggerToast("Validity days must be at least 1", "error");
      return;
    }

    const updated = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          state: editForm.state,
          ipDays: parseInt(editForm.ipDays) || 0,
          exportDays: parseInt(editForm.exportDays) || 0
        };
      }
      return item;
    });

    setData(updated);
    handleSaveToLocalStorage(updated);
    setEditingId(null);
    triggerToast("Validity configuration updated successfully!");
  };

  const deleteRule = (id, stateName) => {
    if (window.confirm(`Are you sure you want to remove the validity configuration for "${stateName}"?`)) {
      const updated = data.filter((item) => item.id !== id);
      setData(updated);
      handleSaveToLocalStorage(updated);
      triggerToast(`Removed configuration for ${stateName}`, "info");
    }
  };

  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to restore the original government master data rules? This will overwrite your custom modifications.")) {
      setData(INITIAL_VAL_DATA);
      handleSaveToLocalStorage(INITIAL_VAL_DATA);
      triggerToast("Master rules restored to default values successfully!", "info");
    }
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRule.state.trim()) {
      triggerToast("Please enter a valid State/Origin Name", "error");
      return;
    }

    const stateExists = data.some(
      (item) => item.state.toLowerCase() === newRule.state.trim().toLowerCase()
    );

    if (stateExists) {
      triggerToast(`A configuration already exists for "${newRule.state}"`, "error");
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      state: newRule.state.trim(),
      ipDays: parseInt(newRule.ipDays) || 15,
      exportDays: parseInt(newRule.exportDays) || 5
    };

    const updated = [...data, newEntry];
    setData(updated);
    handleSaveToLocalStorage(updated);
    setIsAdding(false);
    setNewRule({ state: "", ipDays: 15, exportDays: 5 });
    triggerToast(`Added new validity configuration for ${newEntry.state}!`);
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort
  const processedData = useMemo(() => {
    let result = data;
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      result = result.filter((item) => item.state.toLowerCase().includes(q));
    }

    return [...result].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
    });
  }, [data, searchTerm, sortField, sortDirection]);

  // Calculations for summary stats
  const stats = useMemo(() => {
    if (data.length === 0) return { total: 0, maxIp: 0, minIp: 0, avgIp: 0 };
    const ipDaysArr = data.map((d) => d.ipDays);
    const total = data.length;
    const maxIp = Math.max(...ipDaysArr);
    const minIp = Math.min(...ipDaysArr);
    const avgIp = Math.round(ipDaysArr.reduce((sum, current) => sum + current, 0) / total);
    return { total, maxIp, minIp, avgIp };
  }, [data]);

  const exportCSV = () => {
    const headers = ["State Name", "Max No. of days from the Date of Issue of IP", "Max No. of days from the Date of Issue of Export Pass"];
    const rows = data.map((item) => [item.state, item.ipDays, item.exportDays]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Import_Packaged_FL_Validity_Rules.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Data exported successfully as CSV!");
  };

  return (
    <div className="pfl-container">
      
      {/* Toast */}
      {toast && (
        <div className={`pfl-toast pfl-toast-${toast.type}`}>
          {toast.type === "success" && <CheckCircle2 className="w-5 h-5" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
          {toast.type === "info" && <RotateCcw className="w-5 h-5 animate-spin" />}
          <span className="toast-message">{toast.message}</span>
          <button onClick={() => setToast(null)} className="pfl-toast-close">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Breadcrumb / Back Button */}
      {/* <div className="pfl-top-bar" id="pfl-top-bar-id">
        <button
          onClick={onNavigateHome}
          className="pfl-back-btn"
          id="pfl-back-btn-id"
        >
          <ChevronLeft />
          <span>Back to Department Dashboard</span>
        </button>

        <div className="pfl-breadcrumb" id="pfl-breadcrumb-id">
          <span>Master Data</span>
          <span>/</span>
          <span>Permit/Pass Validity</span>
          <span>/</span>
          <span className="pfl-breadcrumb-active">Import : Packaged FL</span>
        </div>
      </div> */}

      {/* Main Content Card Wrapper */}
      <div className="pfl-card" id="pfl-card-container-id">
        
        {/* Header Block with Original Government Style Ribbon */}
        <div className="pfl-header-section" id="pfl-header-section-id">
          
          <div className="pfl-header-row">
            <div>
              <div className="pfl-brand-block">
                <div className="pfl-icon-wrapper">
                  <Calendar />
                </div>
                <div className="pfl-title-block">
                  <h1 id="pfl-main-title">
                    Import Permit/Pass Validity (Packaged FL)
                  </h1>
                  <p>
                    Configure official timelines and maximum validity durations for importing Packaged Foreign Liquor (PFL).
                  </p>
                </div>
              </div>
            </div>

            {/* Custom styled government ribbon modeled from user image */}
            <div className="pfl-ribbon-wrapper" id="pfl-ribbon-wrapper-id">
              <div className="pfl-ribbon-container">
                {/* Arrow head effect on the left of the ribbon */}
                <div className="pfl-ribbon-arrow"></div>
                <div className="pfl-ribbon-body">
                  <Layers />
                  Validity of IP(PFL)
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Statistics Cards Panel */}
        <div className="pfl-stats-panel" id="pfl-stats-panel-id">
          <div className="pfl-stat-card">
            <div className="pfl-stat-icon-wrapper pfl-stat-icon-blue">
              <Layers />
            </div>
            <div>
              <div className="pfl-stat-label">Total Regions</div>
              <div className="pfl-stat-value">{stats.total} States</div>
            </div>
          </div>

          <div className="pfl-stat-card">
            <div className="pfl-stat-icon-wrapper pfl-stat-icon-teal">
              <Clock />
            </div>
            <div>
              <div className="pfl-stat-label">Max IP Validity</div>
              <div className="pfl-stat-value">{stats.maxIp} Days</div>
            </div>
          </div>

          <div className="pfl-stat-card">
            <div className="pfl-stat-icon-wrapper pfl-stat-icon-amber">
              <Clock />
            </div>
            <div>
              <div className="pfl-stat-label">Min IP Validity</div>
              <div className="pfl-stat-value">{stats.minIp} Days</div>
            </div>
          </div>

          <div className="pfl-stat-card">
            <div className="pfl-stat-icon-wrapper pfl-stat-icon-purple">
              <ArrowUpDown />
            </div>
            <div>
              <div className="pfl-stat-label">Avg IP Validity</div>
              <div className="pfl-stat-value">{stats.avgIp} Days</div>
            </div>
          </div>
        </div>

        {/* Table Toolbar controls */}
        <div className="pfl-toolbar" id="pfl-toolbar-id">
          
          {/* Search Bar */}
          <div className="pfl-search-box">
            <span className="pfl-search-icon">
              <Search />
            </span>
            <input
              type="text"
              placeholder="Search by state or origin region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pfl-search-input"
              id="pfl-search-input-id"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="pfl-search-clear"
              >
                <X />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pfl-actions-row">
            
            {/* Add Rule Button */}
            <button
              onClick={() => setIsAdding(!isAdding)}
              className={isAdding ? "pfl-btn pfl-btn-gray" : "pfl-btn pfl-btn-blue"}
              id="pfl-toggle-add-btn"
            >
              {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isAdding ? "Close Add Form" : "Add New State"}</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={exportCSV}
              className="pfl-btn pfl-btn-gray"
              title="Download table data as CSV spreadsheet"
              id="pfl-export-csv-btn"
            >
              <FileSpreadsheet className="w-4 h-4" style={{ color: "#10b981" }} />
              <span>Export CSV</span>
            </button>

            {/* Reset Defaults */}
            <button
              onClick={resetToDefaults}
              className="pfl-btn pfl-btn-rose"
              title="Restore standard government values"
              id="pfl-reset-defaults-btn"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore Defaults</span>
            </button>

          </div>
        </div>

        {/* Add New Rule Form Panel */}
        {isAdding && (
          <div className="pfl-add-form" id="pfl-add-form-id">
            <h3 className="pfl-add-title">
              <Plus className="w-5 h-5" />
              <span>Add New State Validity Configuration</span>
            </h3>

            <form onSubmit={handleAddRule} className="pfl-form-grid">
              <div className="pfl-form-group">
                <label className="pfl-form-label">
                  State / Origin Name <span>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Goa, Uttar Pradesh, Scotland"
                  value={newRule.state}
                  onChange={(e) => setNewRule({ ...newRule, state: e.target.value })}
                  className="pfl-form-input"
                />
              </div>

              <div className="pfl-form-group">
                <label className="pfl-form-label">
                  Max Days from Date of Issue of IP <span>*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="365"
                  value={newRule.ipDays}
                  onChange={(e) => setNewRule({ ...newRule, ipDays: parseInt(e.target.value) || "" })}
                  className="pfl-form-input"
                />
              </div>

              <div className="pfl-form-submit-row">
                <div className="pfl-form-group">
                  <label className="pfl-form-label">
                    Max Days from Date of Export Pass <span>*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="365"
                    value={newRule.exportDays}
                    onChange={(e) => setNewRule({ ...newRule, exportDays: parseInt(e.target.value) || "" })}
                    className="pfl-form-input"
                  />
                </div>
                
                <button
                  type="submit"
                  className="pfl-form-btn"
                >
                  <Check className="w-4 h-4 mr-1.5" />
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Interactive Data Table matching original style */}
        <div className="pfl-table-responsive" id="pfl-table-responsive-id">
          {processedData.length === 0 ? (
            <div className="pfl-empty-state">
              <div className="pfl-empty-icon">
                <Search />
              </div>
              <p className="pfl-empty-title">No validity rules match your search</p>
              <p className="pfl-empty-text">Try clearing the search query or adding a new record config.</p>
            </div>
          ) : (
            <table className="pfl-table" id="pfl-rules-table-id">
              <thead>
                <tr>
                  {/* Left Column State */}
                  <th 
                    onClick={() => toggleSort("state")}
                    className="pfl-table th-sortable"
                  >
                    <div className="pfl-th-content">
                      <span>State Name</span>
                      <ArrowUpDown />
                    </div>
                  </th>

                  {/* Middle Column Max IP Days */}
                  <th 
                    onClick={() => toggleSort("ipDays")}
                    className="pfl-table th-sortable pfl-th-right"
                  >
                    <div className="pfl-th-content-right">
                      <span>Max No. of days from the Date of Issue of IP</span>
                      <ArrowUpDown />
                    </div>
                  </th>

                  {/* Right Column Max Export Pass Days */}
                  <th 
                    onClick={() => toggleSort("exportDays")}
                    className="pfl-table th-sortable pfl-th-right"
                  >
                    <div className="pfl-th-content-right">
                      <span>Max No. of days from the Date of Issue of Export Pass</span>
                      <ArrowUpDown />
                    </div>
                  </th>

                  {/* Admin Actions */}
                  <th className="pfl-cell-center" style={{ width: "150px" }}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {processedData.map((row, idx) => {
                  const isEditing = editingId === row.id;
                  
                  return (
                    <tr 
                      key={row.id}
                      className={`pfl-tr ${idx % 2 === 1 ? "pfl-tr-even" : ""}`}
                    >
                      {/* State column */}
                      <td className="pfl-state-name">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.state}
                            onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                            className="pfl-table-input"
                          />
                        ) : (
                          <span>{row.state}</span>
                        )}
                      </td>

                      {/* IP days column */}
                      <td className="pfl-cell-right">
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={editForm.ipDays}
                            onChange={(e) => setEditForm({ ...editForm, ipDays: parseInt(e.target.value) || "" })}
                            className="pfl-table-input-right"
                          />
                        ) : (
                          <span className="pfl-days-badge">
                            {row.ipDays}
                          </span>
                        )}
                      </td>

                      {/* Export pass days column */}
                      <td className="pfl-cell-right">
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={editForm.exportDays}
                            onChange={(e) => setEditForm({ ...editForm, exportDays: parseInt(e.target.value) || "" })}
                            className="pfl-table-input-right"
                          />
                        ) : (
                          <span className="pfl-days-badge">
                            {row.exportDays}
                          </span>
                        )}
                      </td>

                      {/* Actions Column */}
                      <td>
                        <div className="pfl-actions-cell">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => saveEdit(row.id)}
                                className="pfl-btn-save"
                                title="Save Changes"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="pfl-btn-cancel"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(row)}
                                className="pfl-action-icon-btn pfl-btn-edit"
                                title="Edit Configuration"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteRule(row.id, row.state)}
                                className="pfl-action-icon-btn pfl-btn-delete"
                                title="Remove Config"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Authentic Government Delhi Excise footer from user's image */}
        <div className="pfl-gov-footer" id="pfl-gov-footer-id">
          <div className="pfl-gov-footer-content">
            <p>
              Contents provided by the <span>Department of Excise</span>, Government of NCT of Delhi. Site Designed, hosted and maintained by <span>National Informatics Centre</span>
            </p>
            <p className="pfl-gov-footer-subtext">
              Best viewed in Internet Explorer 8.0 / Firefox 3.6 or later. <a href="#">Legal Disclaimer</a>
            </p>
          </div>
        </div>

      </div>

      {/* Helpful info callout */}
      <div className="pfl-callout" id="pfl-callout-id">
        <div className="pfl-callout-icon">
          <HelpCircle />
        </div>
        <div className="pfl-callout-content">
          <div className="pfl-callout-title">About IP(PFL) Validity Durations</div>
          <p className="pfl-callout-text">
            The values configured in this master data block dictate the exact expiration counters computed on active permit pipelines. 
            Changing the "Date of Issue of IP" days or "Date of Issue of Export Pass" days updates active calculations on newly created licenses immediately. 
            Custom values can be overwritten at any time back to the Delhi Excise standard by clicking <strong>Restore Defaults</strong>.
          </p>
        </div>
      </div>

    </div>
  );
}
