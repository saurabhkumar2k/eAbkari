import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './src/components/Header';
import Footer from './src/components/Footer';
import StockReports from './src/components/StockReports';
import Registration from './src/areas/auth/Registration';
import Login from './src/areas/auth/Login';
import ApplicantDashboard from './src/areas/applicant/applicantdashboard.jsx';
import DepartmentDashboard from './src/areas/dashboard/DepartmentDashboard.jsx';
import ImportPermitPass from './src/components/Department/Pages/ImportPermitPass.jsx';
import EmptyPermitTable from './src/components/Department/EmptyPermitTable.jsx';
import PermitForm from './src/components/Department/PermitForm.jsx';
import DepartmentLogin from './src/components/Department/DepartmentLogin.jsx';
import DepartmentHeader from './src/components/DepartmentHeader.jsx';
import AdminHeader from './src/components/AdminHeader.jsx';
import LiquorBrand from './src/areas/admin/master_data/LiquorBrand.jsx';
import BottlerMaster from './src/areas/admin/master_data/BottlerMaster.jsx';
import BrandOwner from './src/areas/admin/master_data/BrandOwner.jsx';

import {
  ChevronDownSvg,
  FileEditSvg,
  ShieldSvg,
  TimerSvg,
  BarChart3Svg,
  HeadphonesSvg,
  BellSvg,
  DownloadSvg,
  ChevronLeftSvg,
  ChevronRightSvg,
  LayoutGridSvg,
  BuildingSvg,
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
  SettingsSvg,
  LogOutSvg
} from "./src/components/icons/GlobalIcons";

import { ArrowRightSvg } from './src/Style/images/Icons';

export default function App() {
  const handleAdminNavigate = (view) => {
    console.log("Navigation:", view);

    switch (view?.trim()) {
      case "Bottle":
      case "BOTTLE":
        window.location.href = "/liquorbrand";
        break;

      case "Bottler":
      case "BOTTLER":
        window.location.href = "/bottlermaster";
        break;

      case "Brand Owner":
      case "BRAND OWNER":
      case "BrandOwner":
      case "BRANDOWNER":
        window.location.href = "/brandowner";
        break;

      case "IMPORT : BULK SPIRIT":
        window.location.href = "/importpermitpass";
        break;

      case "Home":
        window.location.href = "/departmentdashboard";
        break;
case "LOGOUT":
  window.location.href = "/";
  break;

      default:
        console.log("Unknown route:", view);
        break;
    }
  };
return (
  <BrowserRouter>
    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <main>{renderHomeContent()}</main>
            <Footer />
          </>
        }
      />

      {/* Applicant Login */}
      <Route
        path="/login"
        element={
          <Login
            onNavigateToRegister={() =>
              (window.location.href = "/registration")
            }
            onNavigateHome={() =>
              (window.location.href = "/")
            }
            onLoginSuccess={() =>
              (window.location.href = "/applicantdashboard")
            }
          />
        }
      />

      {/* Registration */}
      <Route
        path="/registration"
        element={<Registration />}
      />

      {/* Applicant Dashboard */}
      <Route
        path="/applicantdashboard"
        element={
          <ApplicantDashboard
            onLogout={() =>
              (window.location.href = "/")
            }
            onNavigateToHome={() =>
              (window.location.href = "/")
            }
          />
        }
      />

      {/* Department Login */}
      <Route
        path="/departmentlogin"
        element={
          <DepartmentLogin
            onNavigateHome={() =>
              (window.location.href = "/")
            }
            onLoginSuccess={() =>
              (window.location.href = "/departmentdashboard")
            }
          />
        }
      />

      {/* Department Dashboard */}
      <Route
        path="/departmentdashboard"
        element={
          <div className="admin-app-layout flex-grow flex flex-col">
            <AdminHeader
              navItems={navItems}
              currentView="DEPARTMENT_DASHBOARD"
              onNavigate={handleAdminNavigate}
            />

            <DepartmentDashboard
              onLogout={() =>
                (window.location.href = "/")
              }
              onNavigateHome={() =>
                (window.location.href = "/")
              }
            />
          </div>
        }
      />

      {/* Import Permit */}
      <Route
        path="/importpermitpass"
        element={
          <div className="admin-app-layout flex-grow flex flex-col">
            <AdminHeader
              navItems={navItems}
              currentView="IMPORT_PERMIT_PASS"
              onNavigate={handleAdminNavigate}
            />

            <ImportPermitPass />
          </div>
        }
      />

      {/* Liquor Brand */}
      <Route
  path="/liquorbrand"
  element={
    <div className="admin-app-layout flex-grow flex flex-col">
      <AdminHeader
        navItems={navItems}
        currentView="LIQUOR_BRAND"
        onNavigate={handleAdminNavigate}
      />

      <LiquorBrand
        onBack={() => window.location.href = "/departmentdashboard"}
      />
    </div>
  }
/>
<Route
  path="/bottlermaster"
  element={
    <div className="admin-app-layout flex-grow flex flex-col">
      <AdminHeader
        navItems={navItems}
        currentView="BOTTLER_MASTER"
        onNavigate={handleAdminNavigate}
      />

      <BottlerMaster
        onBack={() => (window.location.href = "/departmentdashboard")}
      />
    </div>
  }
/>
<Route
  path="/brandowner"
  element={
    <div className="admin-app-layout flex-grow flex flex-col">
      <AdminHeader
        navItems={navItems}
        currentView="BRAND_OWNER"
        onNavigate={handleAdminNavigate}
      />
      <BrandOwner
        onBack={() => (window.location.href = "/departmentdashboard")}
      />
    </div>
  }
/>
</Routes>
  </BrowserRouter>
);
}

// Navigation menu configuration
const navItems = [
  { label: "Home", icon: <HomeSvg className="dept-nav-icon" /> },

  { label: "Directory Data", icon: <FolderSvg className="dept-nav-icon" />, hasDropdown: true },

  {
    label: "Master Data",
    icon: <DatabaseSvg className="dept-nav-icon" />,
    hasDropdown: true,
    items: [
      { label: "Packaged Liquor",
        hasSideMenu: true,
        sideItems: [
          "Bottle",
          "Bottler",
          "Brand Owner"
        ],
      },
      {
        label: "Permit/Pass Validity",
        hasSideMenu: true,
        sideItems: [
          "Import : Bulk Spirit",
          "Import : Packaged FL",
          "Export : Packaged FL",
          "Transport : Bulk Spirit",
          "Transport : Packaged FL",
          "Export : Bulk Spirit",
        ],
      },
      { label: "Misc. Case" },
      { label: "Fee/Duty Rate" },
      { label: "Export : Packaged Liquor" },
      { label: "Others" },
      { label: "M&TP" },
    ],
  },

  {
    label: "Permit/Pass",
    icon: <TicketSvg className="dept-nav-icon" />,
    hasDropdown: true,
  },

  {
    label: "Licensee Data",
    icon: <FileTextSvg className="dept-nav-icon" />,
    hasDropdown: true,
  },

  {
    label: "Wallet",
    icon: <WalletSvg className="dept-nav-icon" />,
    hasDropdown: true,
  },

  {
    label: "Stationary Management",
    icon: <PenToolSvg className="dept-nav-icon" />,
    hasDropdown: true,
  },

  { label: "Label Regn.", icon: <TagSvg className="dept-nav-icon" /> },

  { label: "Feedback", icon: <MessageSquareSvg className="dept-nav-icon" /> },

  { label: "MIS", icon: <PieChartSvg className="dept-nav-icon" /> },

  {
    label: "House Keeping",
    icon: <SettingsSvg className="dept-nav-icon" />,
    hasDropdown: true,
  },
  { label: 'Logout', icon: <LogOutSvg className="dept-nav-icon" />, isLogout: true }
];

  const renderHomeContent = () => (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-gradient" />
        
        <div className="hero-divider-line" />
        <div className="hero-accent-shape" />

        <div className="container hero-content">
          <div className="hero-layout-grid">
            <div className="hero-text-block">
              <h2 className="hero-heading animate-fade-in-left">
                Delhi <span>eABKARI</span>
              </h2>
              <div className="hero-subheading animate-fade-in-left delay-100">
                Workflow Based eServices
              </div>
              <p className="hero-text animate-fade-in-left delay-200">
                A unified digital platform for Excise Licenses, Brands, Permits & Passes with transparent and efficient workflow.
              </p>
              <button className="btn-explore-services animate-fade-in-up delay-300">
                <LayoutGridSvg className="icon-sm" />
                EXPLORE SERVICES
              </button>
            </div>

            <div className="hero-card-block">
              <div className="hero-stats-card animate-scale-in delay-400">
                <FileEditSvg className="stats-icon-box" />
                <div className="stats-number-display">360+</div>
                <div className="stats-label stats-label-gold">LICENSES, BRANDS,</div>
                <div className="stats-label">PERMITS, PASSES</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pills */}
      <section className="features-section-box">
        <div className="container features-content">
          <div className="features-grid-list">
            {[
              { icon: <FileEditSvg className="icon-md" />, title: 'Digital Workflow', desc: 'End-to-end online application processing' },
              { icon: <ShieldSvg className="icon-md" />, title: 'Transparent & Secure', desc: 'Secure, role-based access with full transparency' },
              { icon: <TimerSvg className="icon-md" />, title: 'Faster Processing', desc: 'Reduced turnaround time and improved efficiency' },
              { icon: <BarChart3Svg className="icon-md" />, title: 'Data Driven Insights', desc: 'Real-time dashboards and actionable reports' },
              { icon: <HeadphonesSvg className="icon-md" />, title: 'Help & Support', desc: 'Dedicated support for all stakeholders' }
            ].map((f, i) => (
              <div key={i} className="feature-card-item">
                <div className="feature-icon-wrapper">
                  {f.icon}
                </div>
                <h3 className="feature-card-title">{f.title}</h3>
                <p className="feature-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container notice-board-container">
        <div className="card-wrapper">
          <div className="notice-board-header-row">
            <div className="icon-box-header">
              <BellSvg className="icon-md" />
            </div>
            <div>
              <h2 className="notice-title-main">NOTICE <span>BOARD</span></h2>
              <p className="card-subtitle">Stay informed with the latest official notices and updates.</p>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead className="table-thead">
                <tr>
                  <th className="table-cell-center col-sno">Sl.No.</th>
                  <th className="col-date">Date</th>
                  <th>Title</th>
                  <th className="table-cell-right">Download</th>
                </tr>
              </thead>
              <tbody className="table-tbody">
                {[
                  { id: 1, date: '28/03/2026', title: 'Public notice and Terms and conditions for grant..' },
                  { id: 2, date: '15/01/2025', title: 'Dry Day on account of Delhi Election Notification..' },
                  { id: 3, date: '03/10/2024', title: 'THE DELHI EXCISE ACT, 2009..' },
                  { id: 4, date: '03/10/2024', title: 'Circular..' },
                  { id: 5, date: '03/10/2024', title: 'THE DELHI EXCISE RULES, 2010..' }
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="table-cell-center text-muted no-wrap-cell">{row.id}</td>
                    <td className="text-body-muted fw-bold no-wrap-cell">{row.date}</td>
                    <td className="text-body-dark fw-bold">{row.title}</td>
                    <td className="table-cell-right">
                      <button className="btn-download no-wrap-cell">
                        <DownloadSvg className="icon-xs" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer-action">
            <button className="btn-orange">
              <LayoutGridSvg className="icon-xs" />
              ALL NOTICE
            </button>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="container info-section-grid">
          <div className="info-card info-card-flex">
            <div className="info-header-row">
              <div className="icon-box-header">
                <BuildingSvg className="icon-md" />
              </div>
              <h2 className="card-title-sm">About Us</h2>
            </div>
            <p className="about-text">
              The Department of Excise, NCT of Delhi is committed to efficient administration, transparent processes and maximizing revenue for the welfare of the society. Through digital transformation, we aim to deliver seamless services and building a trusted ecosystem for stakeholders.
            </p>
            <button className="btn-outline-blue btn-w-auto">
              Read More
              <ArrowRightSvg className="icon-xs" />
            </button>
          </div>

          <div className="info-card">
            <div className="info-header-row announcement-header">
              <div className="icon-box-header">
                <BellSvg className="icon-md icon-bell-rotate" />
              </div>
              <h2 className="card-title-sm">Latest Announcements</h2>
            </div>
            <ul className="announcement-list">
              {[
                "System maintenance scheduled on 01/06/2025 from 11 PM to 2 AM.",
                "New user manual for online license application is now available.",
                "Special drive against illicit liquor from 15th May to 31st May 2025.",
                "Update your profile to continue receiving important notifications."
              ].map((ann, i) => (
                <li key={i} className="announcement-item">
                  <div className="bullet-blue" />
                  <span>{ann}</span>
                </li>
              ))}
            </ul>
            <div className="announcement-footer">
              <button className="btn-link">
                View All <ArrowRightSvg className="icon-xs" />
              </button>
            </div>
          </div>
      </section>

      {/* Stock Reports (Vends) Dashboard */}
      <StockReports />

      {/* Price List (Brands) */}
      <section className="container section-mb-large">
        <div className="card-wrapper">
          <div className="price-brand-banner">
            <h2 className="price-brand-title">Price List (Brands)</h2>
          </div>
          
          <div className="price-list-content">
            <div className="price-filter-wrapper">
              <div className="filter-group">
                <label className="filter-label">Brand Name</label>
                <div className="select-box-wrapper">
                  <select className="custom-select">
                    <option>Select Brand Name</option>
                  </select>
                  <ChevronDownSvg className="select-arrow" />
                </div>
              </div>
              <div className="filter-group">
                <label className="filter-label">Brand Category</label>
                <div className="select-box-wrapper">
                  <select className="custom-select">
                    <option>Select Brand Category</option>
                  </select>
                  <ChevronDownSvg className="select-arrow" />
                </div>
              </div>
              <div className="filter-group">
                <label className="filter-label">Size (ML)</label>
                <div className="select-box-wrapper">
                  <select className="custom-select">
                    <option>Select Size</option>
                  </select>
                  <ChevronDownSvg className="select-arrow" />
                </div>
              </div>
            </div>

            <div className="price-table-container">
              <table className="price-table-element">
                <thead className="price-table-head">
                  <tr>
                    <th className="table-cell-center col-sno">S.No.</th>
                    <th>Brand Name</th>
                    <th className="table-cell-center">Liquor Type</th>
                    <th className="table-cell-center">Financial Year</th>
                    <th className="table-cell-center">Measure</th>
                    <th className="table-cell-center">MRP</th>
                  </tr>
                </thead>
                <tbody className="table-tbody">
                  {[
                    { sno: 1, name: 'NIKKA MIYAGIKYO SINGLE MALT WHISKY', type: 'Whisky', year: '2026-2027', measure: '700 Ml.', mrp: '11,330' },
                    { sno: 2, name: '100 STROKES REGAL WHISKY', type: 'Whisky', year: '2026-2027', measure: '180 Ml.', mrp: '100' },
                    { sno: 3, name: '100 STROKES REGAL WHISKY', type: 'Whisky', year: '2026-2027', measure: '375 Ml.', mrp: '205' },
                    { sno: 4, name: '100 STROKES REGAL WHISKY', type: 'Whisky', year: '2026-2027', measure: '60 Ml.', mrp: '35' },
                    { sno: 5, name: '100 STROKES REGAL WHISKY', type: 'Whisky', year: '2026-2027', measure: '750 Ml.', mrp: '410' },
                    { sno: 6, name: '100 STROKES REGAL WHISKY', type: 'Whisky', year: '2026-2027', measure: '90 Ml.', mrp: '50' },
                    { sno: 7, name: '100 STROKES REGAL WHISKY', type: 'Whisky', year: '2026-2027', measure: '375 Ml.', mrp: '205' },
                    { sno: 8, name: '100 STROKES REGAL WHISKY', type: 'Whisky', year: '2026-2027', measure: '180 Ml.', mrp: '100' },
                  ].map((row, i) => (
                    <tr key={i} className="price-table-row">
                      <td className="table-cell-center text-muted-small">{row.sno}</td>
                      <td className="price-table-cell price-table-cell-bold">{row.name}</td>
                      <td className="table-cell-center price-table-cell">{row.type}</td>
                      <td className="table-cell-center price-table-cell">{row.year}</td>
                      <td className="table-cell-center price-table-cell">{row.measure}</td>
                      <td className="table-cell-center price-table-cell price-table-cell-bold">₹ {row.mrp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination-item-select">
                <span>Items per page:</span>
                <div className="select-box-wrapper">
                  <select className="mini-select">
                    <option>50</option>
                  </select>
                  <ChevronDownSvg className="select-arrow select-arrow-right" />
                </div>
              </div>
              <div className="pagination-info-box">
                <span>1 – 50 of 1749</span>
                <div className="pagination-arrows">
                  <button className="btn-pagination-prev">
                    <ChevronLeftSvg className="icon-md" />
                  </button>
                  <button className="btn-pagination-next">
                    <ChevronRightSvg className="icon-md" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

