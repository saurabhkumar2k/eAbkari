import React, { useState } from 'react';
import { 
  FileTextSvg, 
  CalendarSvg, 
  DownloadSvg, 
  ChevronDownSvg, 
  RotateCcwSvg, 
  StoreSvg, 
  PackageSvg, 
  WineSvg, 
  Building2Svg, 
  BeerSvg, 
  StarSvg 
} from '../Style/images/Icons';

// Local SVG icons specific to this dashboard
const MoreVerticalSvg = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
);
const TagSvg = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
);
const FileBoxSvg = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1.5"/><path d="M21 12H3"/><path d="M3 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M9 7.5V12"/><path d="M15 7.5V12"/><path d="M9 16.5v1"/><path d="M15 16.5v1"/></svg>
);

const ENTITY_DATA = [
  { name: 'DCCWS', value: 10.42, percentage: 24.8, color: '#8b5cf6' },
  { name: 'DSCSC', value: 9.71, percentage: 23.2, color: '#f43f5e' },
  { name: 'DSIIDC', value: 10.94, percentage: 26.1, color: '#0ea5e9' },
  { name: 'DTTDC', value: 10.97, percentage: 25.8, color: '#f97316' }
];

const BOTTLE_DATA = [
  { name: 'DCCWS', value: 2.64, percentage: 23.1, color: '#8b5cf6' },
  { name: 'DSCSC', value: 2.73, percentage: 23.9, color: '#f43f5e' },
  { name: 'DSIIDC', value: 3.03, percentage: 26.5, color: '#0ea5e9' },
  { name: 'DTTDC', value: 3.02, percentage: 26.5, color: '#f97316' }
];

const Sparkline = ({ color }) => {
  return (
    <div className="sparkline-container" style={{ '--sparkline-color': color }}>
      <svg width="100%" height="100%" viewBox="0 0 100 40">
        <path
          className="sparkline-path"
          d="M0,30 Q10,10 20,25 T40,15 T60,35 T80,10 L100,5"
        />
        <circle className="sparkline-dot" cx="100" cy="5" r="3" />
      </svg>
    </div>
  );
};

const SegmentedBar = ({ percentage, color }) => {
  const segments = Array.from({ length: 20 });
  const activeSegments = Math.round((percentage / 100) * 20);
  
  return (
    <div className="segmented-bar" style={{ '--segment-active-color': color }}>
      {segments.map((_, i) => (
        <div 
          key={i} 
          className={`segment ${i < activeSegments ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

export default function StockReports() {
  const [filters, setFilters] = useState({
    entityType: 'All',
    liquorKind: 'All',
    liquorType: 'All',
    vendName: 'All',
    brand: 'All'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleReset = () => {
    setFilters({
      entityType: 'All',
      liquorKind: 'All',
      liquorType: 'All',
      vendName: 'All',
      brand: 'All'
    });
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      alert('Report exported successfully!');
      setIsExporting(false);
    }, 1000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      alert('Full report downloaded!');
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <section className="container dashboard-section">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header-area">
          <div className="dashboard-heading-box">
            <h2 className="dashboard-main-title">DASHBOARD</h2>
            <p className="dashboard-subtitle">Smart overview of stock across vends ✨</p>
          </div>
          
          <div className="dashboard-header-actions">
            <div className="date-range-selector" onClick={() => alert('Date range selection opened')}>
              <CalendarSvg className="icon-sm text-muted-color" />
              <span className="text-body-dark fw-600">01 May 2024 - 31 May 2024</span>
              <ChevronDownSvg className="icon-sm text-muted-color" />
            </div>
            <button 
              className="btn-export" 
              onClick={handleExport}
              disabled={isExporting}
            >
              <DownloadSvg className={isExporting ? "icon-sm animate-bounce-custom" : "icon-sm"} />
              {isExporting ? 'Exporting...' : 'Export'}
              <ChevronDownSvg className="icon-sm icon-opaque" />
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="dashboard-filters-box">
          <div className="dashboard-filters-grid">
            {[
              { label: 'Entity Type', key: 'entityType', icon: <Building2Svg className="icon-xs" />, iconColor: 'blue' },
              { label: 'Liquor Kind', key: 'liquorKind', icon: <BeerSvg className="icon-xs" />, iconColor: 'purple' },
              { label: 'Liquor Type', key: 'liquorType', icon: <TagSvg className="icon-xs" />, iconColor: 'indigo' },
              { label: 'Vend Name', key: 'vendName', icon: <StoreSvg className="icon-xs" />, iconColor: 'store' },
              { label: 'Brand', key: 'brand', icon: <StarSvg className="icon-xs" />, iconColor: 'star' }
            ].map((f) => (
              <div key={f.key} className="dashboard-filter-group">
                <label className="dashboard-filter-label">{f.label}</label>
                <div className="dashboard-select-wrapper">
                  <div className={`filter-icon-box ${f.iconColor}`}>
                    {f.icon}
                  </div>
                  <select 
                    className="dashboard-select"
                    value={filters[f.key]}
                    onChange={(e) => setFilters({...filters, [f.key]: e.target.value})}
                  >
                    <option>All</option>
                  </select>
                  <ChevronDownSvg className="dashboard-select-arrow" />
                </div>
              </div>
            ))}
            <div className="dashboard-filter-btn-group">
              <button className="btn-reset btn-flexible" onClick={handleReset}>
                <RotateCcwSvg className="icon-sm" />
                Reset
              </button>
              <button className="btn-apply btn-flexible" onClick={() => alert('Filters applied')}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="dashboard-summary-grid">
          <div className="summary-card vends-card">
            <div className="summary-card-inner">
              <div className="summary-card-icon-box blue">
                <StoreSvg className="icon-md" />
              </div>
              <div>
                <div className="summary-card-value blue">811</div>
                <div className="summary-card-label">Vends</div>
                <div className="summary-card-sublabel">Total Active Vends</div>
              </div>
            </div>
            <Sparkline color="#4f46e5" />
          </div>

          <div className="summary-card cases-card">
            <div className="summary-card-inner">
              <div className="summary-card-icon-box green">
                <PackageSvg className="icon-md" />
              </div>
              <div>
                <div className="summary-card-value green">42.05 <span className="stat-unit">Lakhs</span></div>
                <div className="summary-card-label">Total Case Stock</div>
                <div className="summary-card-sublabel">As on today</div>
              </div>
            </div>
            <Sparkline color="#10b981" />
          </div>

          <div className="summary-card bottles-card">
            <div className="summary-card-inner">
              <div className="summary-card-icon-box purple">
                <WineSvg className="icon-md" />
              </div>
              <div>
                <div className="summary-card-value purple">11.42 <span className="stat-unit">Cr</span></div>
                <div className="summary-card-label">Total Bottle Stock</div>
                <div className="summary-card-sublabel">As on today</div>
              </div>
            </div>
            <Sparkline color="#e11d48" />
          </div>
        </div>

        {/* Charts Row */}
        <div className="dashboard-charts-grid">
          {/* Entity Wise Case */}
          <div className="chart-card">
            <div className="chart-card-header">
              <div className="chart-header-title-box">
                <h3 className="chart-card-title">Entity Wise Case</h3>
                <span className="badge-unit">In Lakhs</span>
              </div>
              <button className="icon-btn-ghost"><MoreVerticalSvg className="icon-sm" /></button>
            </div>
            
            <div className="chart-table-header scroll-nowrap">
              <span>Entity</span>
              <span></span>
              <span className="row-value">Stock (Lakhs)</span>
              <span className="text-center">Share</span>
            </div>

            <div className="chart-rows-container scroll-auto">
              {ENTITY_DATA.map((item, idx) => (
                <div key={idx} className="chart-row">
                  <div className="entity-info min-w-label">
                    <div className="entity-icon" style={{ '--entity-color': item.color }}>
                      {item.name.charAt(0)}
                    </div>
                    <span className="entity-name">{item.name}</span>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill" 
                      style={{ '--fill-color': item.color, '--fill-width': `${item.percentage}%` }} 
                    />
                  </div>
                  <div className="row-value">{item.value}</div>
                  <div className="row-share" style={{ '--share-color': item.color }}>{item.percentage}%</div>
                </div>
              ))}
            </div>

            <div className="chart-total-row">
              <span className="total-label">Total</span>
              <div className="total-value-box">
                <span className="total-value">42.05 Lakhs</span>
                <button className="total-icon-btn"><FileBoxSvg className="icon-xs" /></button>
              </div>
            </div>
          </div>

          {/* Entity Wise Bottle Stock */}
          <div className="chart-card">
            <div className="chart-card-header">
              <div className="chart-header-title-box">
                <h3 className="chart-card-title">Entity Wise Bottle Stock</h3>
                <span className="badge-unit">In Cr</span>
              </div>
              <button className="icon-btn-ghost"><MoreVerticalSvg className="icon-sm" /></button>
            </div>

            <div className="chart-table-header scroll-nowrap">
              <span>Entity</span>
              <span></span>
              <span className="row-value">Stock (Cr)</span>
              <span className="text-center">Share</span>
            </div>

            <div className="chart-rows-container scroll-auto">
              {BOTTLE_DATA.map((item, idx) => (
                <div key={idx} className="chart-row">
                  <div className="entity-info min-w-label">
                    <div className="entity-icon" style={{ background: item.color }}>
                      {item.name.charAt(0)}
                    </div>
                    <span className="entity-name">{item.name}</span>
                  </div>
                  <div className="progress-bar-container">
                    <SegmentedBar percentage={item.percentage} color={item.color} />
                  </div>
                  <div className="row-value">{item.value}</div>
                  <div className="row-share" style={{ background: `${item.color}15`, color: item.color }}>{item.percentage}%</div>
                </div>
              ))}
            </div>

            <div className="chart-total-row">
              <span className="total-label total-label-red">Total</span>
              <div className="total-value-box">
                <span className="total-value total-value-red">11.42 Cr</span>
                <button className="total-icon-btn total-icon-btn-red">
                  <FileBoxSvg className="icon-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="dashboard-footer-status-bar">
          <div className="footer-status-info">
            <CalendarSvg className="icon-xs" />
            <span>Data as on : 25 May 2025, 10:30 AM</span>
          </div>
          <button 
            className="btn-download-primary" 
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <DownloadSvg className={isDownloading ? "icon-sm animate-spin-custom" : "icon-sm"} />
            {isDownloading ? 'Downloading...' : 'Download Report'}
          </button>
        </div>
      </div>
    </section>
  );
}

