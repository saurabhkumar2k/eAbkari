import React, { useState, useMemo } from "react";
import { 
  Download, 
  CheckCircle2, 
  FileText, 
  Layers, 
  RefreshCw, 
  ShieldCheck, 
  ScrollText,
  CheckSquare,
  Square,
  Search,
  UserCheck,
  X,
  ListOrdered,
  Inbox,
  Briefcase,
  RotateCcw,
  Check,
  Clock,
  Eye,
  Home,
  ChevronRight,
  Printer,
  Building,
  AlertCircle
} from "lucide-react";

import hqImage from "../../../Style/Image/hqImage.jpg";


const MOCK_Pull_DATA = {
  "License/Permit": [
    {
      id: "REF0000000",
      licenseName: "New License / Permit Grant Request",
      applicantName: "Delhi Beverage Logistics Pvt Ltd",
      district: "South Delhi (Okhla Depot)",
      submissionDate: "03/08/2026",
      status: "Unassigned Pull",
      liquorType: "Wholesale & Retail Permit",
      priority: "Normal",
      contactPerson: "Rajiv Sharma",
      phone: "+91 98112 34567"
    },
    {
      id: "REF0000001",
      licenseName: "New License / Permit Grant Request",
      applicantName: "Capital Spirits & Depot Corp",
      district: "North West Delhi (Pitampura)",
      submissionDate: "04/08/2026",
      status: "Unassigned Pull",
      liquorType: "Commercial Vending Permit",
      priority: "High",
      contactPerson: "Ananya Deshmukh",
      phone: "+91 98230 45678"
    },
    {
      id: "REF0000002",
      licenseName: "L-1 Wholesale License Grant",
      applicantName: "Himalayan Bottlers & Distillers",
      district: "Central Delhi (Connaught Place)",
      submissionDate: "05/08/2026",
      status: "Unassigned Pull",
      liquorType: "Indian Liquor Wholesale (L-1)",
      priority: "Urgent",
      contactPerson: "Virender Singh",
      phone: "+91 99100 88231"
    }
  ],
  "Permit": [
    {
      id: "APP-EX-2026-SCM-102",
      licenseName: "SCM Transit & Transport Permit",
      applicantName: "Imperial Wines & Imports Ltd",
      district: "New Delhi (Connaught Place)",
      submissionDate: "02/08/2026",
      status: "Unassigned Pull",
      liquorType: "Supply Chain Transit Permit",
      priority: "Normal",
      contactPerson: "Tarun Kapoor",
      phone: "+91 98101 22334"
    },
    {
      id: "APP-EX-2026-SCM-108",
      licenseName: "SCM Bulk Consignment Authorization",
      applicantName: "Global Cellars India Pvt Ltd",
      district: "South West Delhi (Vasant Kunj)",
      submissionDate: "04/08/2026",
      status: "Unassigned Pull",
      liquorType: "Import Stock Movement",
      priority: "High",
      contactPerson: "Pooja Hegde",
      phone: "+91 98711 55667"
    },
    {
      id: "APP-EX-2026-SCM-115",
      licenseName: "Inter-State Bonded Movement Pass",
      applicantName: "Northern Logistics & Warehousing",
      district: "West Delhi (Mayapuri)",
      submissionDate: "05/08/2026",
      status: "Unassigned Pull",
      liquorType: "Bonded Depot Movement",
      priority: "Normal",
      contactPerson: "Kunal Mehra",
      phone: "+91 98114 99882"
    }
  ],
  "License Document Revalidation": [
    {
      id: "APP-EX-2026-REV-201",
      licenseName: "License Document Revalidation",
      applicantName: "National Distilleries & Bottlers",
      district: "West Delhi (Mayapuri)",
      submissionDate: "01/08/2026",
      status: "Unassigned Pull",
      liquorType: "Document Verification & Renewal",
      priority: "Normal",
      contactPerson: "Sunil Bakshi",
      phone: "+91 98105 44321"
    },
    {
      id: "APP-EX-2026-REV-209",
      licenseName: "Annual Security Clearance Revalidation",
      applicantName: "Metropolitan Liquor Suppliers",
      district: "East Delhi (Patparganj)",
      submissionDate: "03/08/2026",
      status: "Unassigned Pull",
      liquorType: "Premises & Fire Clearance Revalidation",
      priority: "Urgent",
      contactPerson: "Arvind Saxena",
      phone: "+91 98188 12390"
    }
  ],
  "License Extension": [
    {
      id: "APP-EX-2026-EXT-311",
      licenseName: "Temporary License Tenure Extension",
      applicantName: "Grand Heritage Hospitality Ltd",
      district: "South Delhi (Aerocity)",
      submissionDate: "03/08/2026",
      status: "Unassigned Pull",
      liquorType: "Bar & Restaurant Tenure Extension",
      priority: "High",
      contactPerson: "Vikram Oberoi",
      phone: "+91 98102 77889"
    },
    {
      id: "APP-EX-2026-EXT-318",
      licenseName: "Event Liquor Service Temporary Permit",
      applicantName: "Sovereign Events & Banquets",
      district: "New Delhi (Chanakyapuri)",
      submissionDate: "04/08/2026",
      status: "Unassigned Pull",
      liquorType: "Special Event Liquor Extension",
      priority: "Urgent",
      contactPerson: "Rohan Malhotra",
      phone: "+91 98111 44556"
    }
  ],
  "HCR Edit License": [
    {
      id: "APP-EX-2026-HCR-402",
      licenseName: "Hotel / Club / Restaurant Amendment",
      applicantName: "Aura Lounges & Restrobar LLP",
      district: "South Delhi (Hauz Khas)",
      submissionDate: "02/08/2026",
      status: "Unassigned Pull",
      liquorType: "HCR Service Boundary Amendment",
      priority: "Normal",
      contactPerson: "Deepak Chawla",
      phone: "+91 98182 33445"
    }
  ],
  "Surrender License": [
    {
      id: "APP-EX-2026-SUR-501",
      licenseName: "Voluntary License Surrender Deed",
      applicantName: "Silverline Spirits Traders",
      district: "Central Delhi (Daryaganj)",
      submissionDate: "30/07/2026",
      status: "Unassigned Pull",
      liquorType: "Retail Vend Closure Surrender",
      priority: "Normal",
      contactPerson: "Manish Aggarwal",
      phone: "+91 98100 11223"
    }
  ],
  "License Transfer": [
    {
      id: "APP-EX-2026-TRF-604",
      licenseName: "Ownership / Partnership Reconstitution",
      applicantName: "Apex Hospitality Partners",
      district: "North Delhi (Civil Lines)",
      submissionDate: "01/08/2026",
      status: "Unassigned Pull",
      liquorType: "Legal Heir / Partner Transfer",
      priority: "High",
      contactPerson: "Siddharth Jain",
      phone: "+91 98119 88776"
    }
  ],
  "Site Details Change": [
    {
      id: "APP-EX-2026-STE-705",
      licenseName: "Premises Layout & Storage Alteration",
      applicantName: "Blue Ocean Breweries Pvt Ltd",
      district: "West Delhi (Kirti Nagar)",
      submissionDate: "04/08/2026",
      status: "Unassigned Pull",
      liquorType: "Microbrewery Capacity Shift",
      priority: "Normal",
      contactPerson: "Gaurav Sehgal",
      phone: "+91 98103 66554"
    }
  ]
};

export default function PullApplication({ onToast , userId  }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [pulledIds, setPulledIds] = useState([]);
const [gridData, setGridData] = useState([]);
const [selectedIds, setSelectedIds] = useState([]);
  // const handleFetchForm = (e) => {
  //   e.preventDefault();
  //   if (!selectedCategory) {
  //     if (onToast) onToast("info", "Please select an application category from the dropdown.");
  //     setFetchedData(null);
  //     setHasFetched(false);
  //     return;
  //   }

  //   const data = MOCK_POOL_DATA[selectedCategory] || [
  //     {
  //       id: `APP-EX-2026-${selectedCategory.slice(0, 3).toUpperCase()}-001`,
  //       licenseName: selectedCategory,
  //       applicantName: "Registered Excise Licensee",
  //       district: "Central Delhi",
  //       submissionDate: "05/08/2026",
  //       status: "Unassigned Pool",
  //       liquorType: "General Liquor Application"
  //     }
  //   ];
  //   setFetchedData(data);
  //   setHasFetched(true);
  //   if (onToast) {
  //     onToast("success", `Fetched ${data.length} pool records for ${selectedCategory}.`);
  //   }
  // };


const handleSelectApplication = (id) => {
  setSelectedIds((prev) => {
    if (prev.includes(id)) {
      return prev.filter((x) => x !== id);
    }

    return [...prev, id];
  });
};


const handleSelectAll = () => {
  const availableIds = fetchedData
    .filter((item) => !pulledIds.includes(item.id))
    .map((item) => item.id);

  if (selectedIds.length === availableIds.length) {
    setSelectedIds([]);
  } else {
    setSelectedIds(availableIds);
  }
};






const handlePullSelected = async () => {
  debugger;

  if (selectedIds.length === 0) {
    return;
  }

  const selectedApplications = fetchedData
    .filter(item => selectedIds.includes(item.id))
    .map(item => ({
      applicationIdNo: item.id,
      hierarchyID: item.hierarchyID,
      flowUpto: item.flowUpto
    }));

  const payload = {
    userId: localStorage.getItem("userId"),
    category: selectedCategory,
    permitType: "0",
    applications: selectedApplications
  };

  try {
    const response = await fetch(
      "http://localhost:5214/api/PLAPullApplication/PullApplications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

const responseText = await response.text();
debugger;
console.log("RESPONSE:", responseText);

if (!response.ok) {
  const errorResult = JSON.parse(responseText);

  if (onToast) {
    onToast(
      "error",
      errorResult.message || "Unable to pull application."
    );
  }

  return;
}

const result = JSON.parse(responseText);

if (!response.ok) {
  alert(result.message || "Unable to pull application.");
  return;
}

if (result.success) {
  alert(result.message || "Application(s) pulled successfully.");

  setSelectedIds([]);

  await handleFetchForm(null, false);
}

    setSelectedIds([]);

    // ✅ Refresh pool after successful pull
    await handleFetchForm();

  } catch (error) {
    console.error("Pull application error:", error);

    if (onToast) {
      onToast(
        "error",
        "Something went wrong while pulling application."
      );
    }
  }
};



  
  const handlePull = (app) => {
    if (pulledIds.includes(app.id)) return;

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-GB')} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newRecord = {
      id: app.id,
      licenseName: app.licenseName,
      applicantName: app.applicantName,
      district: app.district,
      category: selectedCategory || "License/Permit",
      assignedDate: formattedDate,
      status: "Pending Scrutiny",
      priority: app.priority || "Normal",
      liquorType: app.liquorType,
      contactPerson: app.contactPerson || "Authorized Signatory",
      assignedBy: "Pulled by Dealing Assistant",
      remarks: "Directly pulled from Central Excise Pull"
    };

    setPulledIds((prev) => [...prev, app.id]);
    setAssignedFiles((prev) => [newRecord, ...prev]);
    setSelectedPullIds((prev) => prev.filter((id) => id !== app.id));

    showNotification(
      "success",
      `Application ${app.id} (${app.licenseName}) successfully pulled to your DA Desk queue!`
    );
  };




const handleFetchForm = async (e, showToast = true) => {
  debugger;

  e?.preventDefault();

  if (!selectedCategory) {
    if (onToast) {
      onToast(
        "info",
        "Please select an application category from the dropdown."
      );
    }

    setFetchedData(null);
    setHasFetched(false);
    return;
  }

  const userId = localStorage.getItem("userId");

  console.log("USER ID FROM LOCAL STORAGE:", userId);

  try {
    const response = await fetch(
      "http://localhost:5214/api/PLAPullApplication/GetApplications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          userId: userId
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error("Failed to fetch applications.");
    }

    const data = await response.json();

    console.log("GET APPLICATIONS RESPONSE:", data);

    const mappedData = data.map((item) => ({
      id: item.applicationIdNo,
      licenseName: item.licenseeCatDesc,
      applicantName: item.siteName,

      hierarchyID: item.hierarchyID,
      flowUpto: item.flowUptoCode,

      userId: userId,

      submissionDate: item.applicationDate
        ? new Date(item.applicationDate).toLocaleDateString("en-GB")
        : "",

      status: "Unassigned Pool"
    }));

    setFetchedData(mappedData);
    setHasFetched(true);

 if (onToast && showToast) {
    onToast(
      "success",
      `Fetched ${mappedData.length} pool records for ${selectedCategory}.`
    );
  }

  } catch (error) {
    console.error("Error fetching applications:", error);

    setFetchedData(null);
    setHasFetched(false);

    if (onToast) {
      onToast("error", "Unable to fetch applications.");
    }
  }
};














  // Filtered & Sorted Assigned Files for the Registry
  const filteredAssignedFiles = useMemo(() => {
    return assignedFiles.filter((file) => {
      // Search filter
      if (assignedSearch.trim()) {
        const query = assignedSearch.toLowerCase();
        const matchId = file.id.toLowerCase().includes(query);
        const matchApplicant = file.applicantName.toLowerCase().includes(query);
        const matchLicense = file.licenseName.toLowerCase().includes(query);
        const matchDistrict = file.district.toLowerCase().includes(query);
        const matchType = (file.liquorType || "").toLowerCase().includes(query);
        if (!matchId && !matchApplicant && !matchLicense && !matchDistrict && !matchType) {
          return false;
        }
      }

      // Category filter
      if (assignedCategoryFilter !== "all") {
        if (file.category !== assignedCategoryFilter && !file.licenseName.toLowerCase().includes(assignedCategoryFilter.toLowerCase())) {
          return false;
        }
      }

      // Status filter
      if (assignedStatusFilter !== "all") {
        if (file.status !== assignedStatusFilter) {
          return false;
        }
      }

      // District filter
      if (assignedDistrictFilter !== "all") {
        if (!file.district.toLowerCase().includes(assignedDistrictFilter.toLowerCase())) {
          return false;
        }
      }

      // Priority filter
      if (assignedPriorityFilter !== "all") {
        if (file.priority !== assignedPriorityFilter) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (assignedSortBy === "date-desc") {
        return b.id.localeCompare(a.id);
      }
      if (assignedSortBy === "date-asc") {
        return a.id.localeCompare(b.id);
      }
      if (assignedSortBy === "id-asc") {
        return a.id.localeCompare(b.id);
      }
      if (assignedSortBy === "applicant-asc") {
        return a.applicantName.localeCompare(b.applicantName);
      }
      if (assignedSortBy === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
  }, [
    assignedFiles, 
    assignedSearch, 
    assignedCategoryFilter, 
    assignedStatusFilter, 
    assignedDistrictFilter, 
    assignedPriorityFilter,
    assignedSortBy
  ]);

  // Unique lists for filter dropdowns
  const uniqueDistricts = useMemo(() => {
    const districts = new Set();
    assignedFiles.forEach(f => {
      if (f.district) {
        const base = f.district.split("(")[0].trim();
        districts.add(base);
      }
    });
    return Array.from(districts);
  }, [assignedFiles]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set();
    assignedFiles.forEach(f => {
      if (f.category) cats.add(f.category);
    });
    return Array.from(cats);
  }, [assignedFiles]);

  // Metric counts
  const pendingCount = assignedFiles.filter(a => a.status === "Pending Scrutiny").length;
  const queryCount = assignedFiles.filter(a => a.status === "Query Raised").length;
  const forwardedCount = assignedFiles.filter(a => a.status === "Forwarded to AC").length;

  // Pagination calculation
  const totalPages = Math.ceil(filteredAssignedFiles.length / assignedPageSize) || 1;
  const paginatedAssignedFiles = useMemo(() => {
    const start = (assignedCurrentPage - 1) * assignedPageSize;
    return filteredAssignedFiles.slice(start, start + assignedPageSize);
  }, [filteredAssignedFiles, assignedCurrentPage, assignedPageSize]);

  // Reset Filters
  const handleResetFilters = () => {
    setAssignedSearch("");
    setAssignedCategoryFilter("all");
    setAssignedStatusFilter("all");
    setAssignedDistrictFilter("all");
    setAssignedPriorityFilter("all");
    setAssignedSortBy("date-desc");
    setAssignedCurrentPage(1);
  };

  // Quick preset pills
  const handleQuickPreset = (statusKey) => {
    setShowAssignedDesk(true);
    setAssignedStatusFilter(statusKey);
    setAssignedCurrentPage(1);
  };

  // Available Pull items calculation
  const availablePullItems = fetchedData ? fetchedData.filter(i => !pulledIds.includes(i.id)) : [];
  const areAllAvailablePullSelected = availablePullItems.length > 0 && availablePullItems.every(i => selectedPullIds.includes(i.id));

  return (
    <div className="pa-page-wrapper">
      {/* Local Notification Banner */}
      {localToast && (
        <div style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 99999,
          backgroundColor: localToast.type === "success" ? "#012a52" : localToast.type === "warning" ? "#b45309" : "#0284c7",
          color: "#ffffff",
          padding: "0.75rem 1.25rem",
          borderRadius: "0.5rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          fontWeight: 700,
          fontSize: "0.85rem",
          border: "1px solid rgba(255,255,255,0.2)"
        }}>
          <CheckCircle2 size={18} style={{ color: "#facc15" }} />
          <span>{localToast.message}</span>
          <button 
            type="button" 
            onClick={() => setLocalToast(null)}
            style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", marginLeft: "0.5rem" }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 1. Breadcrumb Bar (Matches about-breadcrumb-bar) */}
      <div className="pa-breadcrumb-bar">
        <div className="pa-container">
          <div className="pa-breadcrumb-inner">
            <div className="pa-breadcrumb">
              <button 
                type="button" 
                onClick={() => onNavigateHome ? onNavigateHome() : (window.location.href = "/")}
                className="pa-breadcrumb-link"
              >
                <Home style={{ width: "0.8125rem", height: "0.8125rem" }} />
                <span>Home</span>
              </button>
              <ChevronRight className="pa-breadcrumb-sep" />
              <button 
                type="button" 
                onClick={() => (window.location.href = "/dadashboard")}
                className="pa-breadcrumb-link"
              >
                Dealing Assistant Dashboard
              </button>
              <ChevronRight className="pa-breadcrumb-sep" />
              <span style={{ color: "#64748b", fontWeight: 500 }}>Licensing &amp; Permits</span>
              <ChevronRight className="pa-breadcrumb-sep" />
              <span className="pa-breadcrumb-current">Pull Application </span>
            </div>
            
            <div className="pa-emblem-badge">
              <span className="pa-emblem-dot" />
              <span>Department of Excise, GNCTD • Scrutiny &amp; Licensing Directorate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fetched Results Display */}
      







{hasFetched && (
  <div className="pa-results-panel">

    {/* ================= HEADER ================= */}
    <div className="pa-results-header">

      <h3 className="pa-results-title">
        <Layers
          style={{
            width: "1.25rem",
            height: "1.25rem",
            color: "#0284c7"
          }}
        />

        <span>
          Liquor Pool Applications ({selectedCategory})
        </span>

        <span className="pa-badge">
          {fetchedData ? fetchedData.length : 0} Available
        </span>
      </h3>

      <button
        onClick={handleFetchForm}
        style={{
          background: "none",
          border: "none",
          color: "#0284c7",
          cursor: "pointer",
          fontSize: "0.8rem",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: "0.35rem"
        }}
      >
        <RefreshCw
          style={{
            width: "0.9rem",
            height: "0.9rem"
          }}
        />

        Refresh Pool
      </button>

    </div>


    {/* ================= DATA AVAILABLE ================= */}
    {fetchedData && fetchedData.length > 0 ? (

      <>

        {/* ================= BULK ACTION ================= */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 0",
            borderBottom: "1px solid #e2e8f0"
          }}
        >

          {selectedIds.length > 0 && (
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#475569"
              }}
            >
              {selectedIds.length} application
              {selectedIds.length > 1 ? "s" : ""} selected
            </span>
          )}

          <button
            type="button"
            onClick={handlePullSelected}
            disabled={selectedIds.length === 0}
            className="pa-pull-action-btn"
            style={{
              opacity: selectedIds.length === 0 ? 0.5 : 1,
              cursor:
                selectedIds.length === 0
                  ? "not-allowed"
                  : "pointer"
            }}
          >
            <Download
              style={{
                width: "0.9rem",
                height: "0.9rem"
              }}
            />

            Pull Selected ({selectedIds.length})
          </button>

        </div>


        {/* ================= TABLE ================= */}
        <div className="pa-table-wrapper">

          <table className="pa-table">

            <thead>
              <tr>

                {/* SELECT ALL */}
                <th style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={
                      fetchedData.filter(
                        (item) =>
                          !pulledIds.includes(item.id)
                      ).length > 0 &&
                      selectedIds.length ===
                        fetchedData.filter(
                          (item) =>
                            !pulledIds.includes(item.id)
                        ).length
                    }
                    onChange={handleSelectAll}
                    style={{
                      width: "17px",
                      height: "17px",
                      cursor: "pointer"
                    }}
                    title="Select All"
                  />
                </th>

                <th>S.No.</th>

                <th>
                  Ref Application ID
                </th>

                <th>
                  License Desc
                </th>

                <th>
                  Applicant Name/Site Name
                </th>

                <th>
                  Date Filed
                </th>

                <th>
                  Status
                </th>

                {/* <th style={{ textAlign: "center" }}>
                  Select
                </th> */}

              </tr>
            </thead>


            <tbody>

              {fetchedData.map((item, index) => {

                const isPulled =
                  pulledIds.includes(item.id);

                const isSelected =
                  selectedIds.includes(item.id);


                return (
                  <tr key={item.id}>

                    {/* ================= CHECKBOX ================= */}
                    <td
                      style={{
                        textAlign: "center"
                      }}
                    >
                      {!isPulled ? (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            handleSelectApplication(
                              item.id
                            )
                          }
                          style={{
                            width: "17px",
                            height: "17px",
                            cursor: "pointer"
                          }}
                        />
                      ) : (
                        <CheckCircle2
                          style={{
                            width: "1rem",
                            height: "1rem",
                            color: "#16a34a"
                          }}
                        />
                      )}
                    </td>


                    {/* ================= S.NO ================= */}
                    <td>
                      {index + 1}
                    </td>


                    {/* ================= APPLICATION ID ================= */}
                    <td>
                      <span className="pa-app-id">
                        {item.id}
                      </span>
                    </td>


                    {/* ================= LICENSE ================= */}
                    <td>

                      <div
                        style={{
                          fontWeight: 700,
                          color: "#0f172a"
                        }}
                      >
                        {item.licenseName}
                      </div>

                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#64748b",
                          fontWeight: 500,
                          marginTop: "0.15rem"
                        }}
                      >
                      </div>

                    </td>


                    {/* ================= APPLICANT ================= */}
                    <td
                      style={{
                        fontWeight: 600
                      }}
                    >
                      {item.applicantName}
                    </td>


                    {/* ================= DATE ================= */}
                    <td
                      style={{
                        fontSize: "0.8rem",
                        color: "#475569"
                      }}
                    >
                      {item.submissionDate}
                    </td>


                    {/* ================= STATUS ================= */}
                    <td>

                      <span
                        style={{
                          backgroundColor: isPulled
                            ? "#dcfce7"
                            : "#fff7ed",

                          color: isPulled
                            ? "#15803d"
                            : "#c2410c",

                          padding: "0.25rem 0.6rem",

                          borderRadius: "4px",

                          fontSize: "0.725rem",

                          fontWeight: 800,

                          border: isPulled
                            ? "1px solid #86efac"
                            : "1px solid #ffedd5"
                        }}
                      >
                        {isPulled
                          ? "Pulled to Desk"
                          : "Pool - Unassigned"}
                      </span>

                    </td>


                    {/* ================= SELECT ================= */}
                    {/* <td
                      style={{
                        textAlign: "center"
                      }}
                    >

                      {!isPulled ? (

                        <label
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.4rem",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: isSelected
                              ? "#0284c7"
                              : "#64748b"
                          }}
                        >

                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              handleSelectApplication(
                                item.id
                              )
                            }
                            style={{
                              width: "17px",
                              height: "17px",
                              cursor: "pointer"
                            }}
                          />

                          {isSelected
                            ? "Selected"
                            : "Select"}

                        </label>

                      ) : (

                        <span
                          style={{
                            color: "#15803d",
                            fontSize: "0.75rem",
                            fontWeight: 700
                          }}
                        >
                          Assigned
                        </span>

                      )}

                    </td> */}

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </>

    ) : (

      /* ================= EMPTY STATE ================= */
      <div className="pa-empty-state">

        <FileText className="pa-empty-icon" />

        <p
          style={{
            fontWeight: 700,
            margin: 0,
            color: "#1e293b",
            fontSize: "0.95rem"
          }}
        >
          No pending unassigned applications in this category.
        </p>

        <p
          style={{
            fontSize: "0.825rem",
            color: "#64748b",
            marginTop: "0.25rem"
          }}
        >
          All applications for this category are either
          currently assigned or cleared.
        </p>

      </div>

    )}

  </div>
)}



















      {/* 2. Executive Hero Banner (Matches about-hero-section) */}
      <section className="pa-hero-section">
        <div className="pa-container">
          <div className="pa-hero-grid">
            {/* Left Column: Heading & Actions */}
            <div>
                            
              <h1 className="pa-hero-title">
                Pull Application 
              </h1>
              
              <p className="pa-hero-subtitle">
                Department of Excise, Entertainment &amp; Luxury Tax • Government of NCT of Delhi
              </p>

              <div className="pa-hero-tagline-box">
                <p className="pa-hero-tagline">
                  &ldquo;Official Dealing Assistant interface for pulling unassigned licensing, wholesale permit, and revalidation files from the central state excise Pull into your personal officer queue for statutory verification and scrutiny.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Floating Metric KPI Strip (Matches about-stats-section) */}
      <section className="pa-stats-section">
        <div className="pa-container">
          <div className="pa-stats-grid">
            {/* Stat 1: Total Assigned */}
            <div 
              className={`pa-stat-card ${showAssignedDesk && assignedStatusFilter === "all" ? "active-filter" : ""}`}
              style={{ borderTop: "3px solid #0284c7" }}
              onClick={() => handleQuickPreset("all")}
              title="Click to view all assigned files in DA Registry"
            >
              <div className="pa-stat-top">
                <div className="pa-stat-icon-wrap" style={{ backgroundColor: "#e0f2fe" }}>
                  <Briefcase style={{ width: "1.25rem", height: "1.25rem", color: "#0284c7" }} />
                </div>
                <span className="pa-stat-badge blue">Officer Queue</span>
              </div>
              <div>
                <div className="pa-stat-number">{assignedFiles.length}</div>
                <div className="pa-stat-label">Total Assigned to DA</div>
                <div className="pa-stat-note">Active files on dealing desk</div>
              </div>
            </div>

            {/* Stat 2: Pending Scrutiny */}
            <div 
              className={`pa-stat-card ${showAssignedDesk && assignedStatusFilter === "Pending Scrutiny" ? "active-filter" : ""}`}
              style={{ borderTop: "3px solid #d97706" }}
              onClick={() => handleQuickPreset("Pending Scrutiny")}
              title="Click to filter files pending scrutiny"
            >
              <div className="pa-stat-top">
                <div className="pa-stat-icon-wrap" style={{ backgroundColor: "#fffbeb" }}>
                  <Clock style={{ width: "1.25rem", height: "1.25rem", color: "#d97706" }} />
                </div>
                <span className="pa-stat-badge amber">Needs Review</span>
              </div>
              <div>
                <div className="pa-stat-number" style={{ color: "#d97706" }}>{pendingCount}</div>
                <div className="pa-stat-label">Pending Scrutiny</div>
                <div className="pa-stat-note">Initial docket verification</div>
              </div>
            </div>

            {/* Stat 3: Queries Raised */}
            <div 
              className={`pa-stat-card ${showAssignedDesk && assignedStatusFilter === "Query Raised" ? "active-filter" : ""}`}
              style={{ borderTop: "3px solid #7c3aed" }}
              onClick={() => handleQuickPreset("Query Raised")}
              title="Click to filter files with applicant queries"
            >
              <div className="pa-stat-top">
                <div className="pa-stat-icon-wrap" style={{ backgroundColor: "#f5f3ff" }}>
                  <AlertCircle style={{ width: "1.25rem", height: "1.25rem", color: "#7c3aed" }} />
                </div>
                <span className="pa-stat-badge purple">Applicant Reply</span>
              </div>
              <div>
                <div className="pa-stat-number" style={{ color: "#7c3aed" }}>{queryCount}</div>
                <div className="pa-stat-label">Queries Raised</div>
                <div className="pa-stat-note">Awaiting applicant documents</div>
              </div>
            </div>

            {/* Stat 4: Forwarded to AC */}
            <div 
              className={`pa-stat-card ${showAssignedDesk && assignedStatusFilter === "Forwarded to AC" ? "active-filter" : ""}`}
              style={{ borderTop: "3px solid #059669" }}
              onClick={() => handleQuickPreset("Forwarded to AC")}
              title="Click to filter files forwarded to Assistant Commissioner"
            >
              <div className="pa-stat-top">
                <div className="pa-stat-icon-wrap" style={{ backgroundColor: "#ecfdf5" }}>
                  <CheckCircle2 style={{ width: "1.25rem", height: "1.25rem", color: "#059669" }} />
                </div>
                <span className="pa-stat-badge emerald">Cleared by DA</span>
              </div>
              <div>
                <div className="pa-stat-number" style={{ color: "#059669" }}>{forwardedCount}</div>
                <div className="pa-stat-label">Forwarded to AC</div>
                <div className="pa-stat-note">Submitted for statutory approval</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Horizontal Tab Navigation Bar (Matches about-tabs-bar) */}
      <div className="pa-tabs-container">
        <div className="pa-container">
          <div className="pa-tabs-bar">
            <button
              type="button"
              onClick={() => setShowAssignedDesk(false)}
              className={`pa-tab-btn ${!showAssignedDesk ? "active" : ""}`}
            >
              <Download className="pa-tab-icon" />
              <span>Pull Application</span>
              <span className="pa-tab-count">
                {availablePullItems.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowAssignedDesk(true)}
              className={`pa-tab-btn ${showAssignedDesk ? "active" : ""}`}
            >
              <ListOrdered className="pa-tab-icon" />
              <span>Pull Application Assigned Registry</span>
              <span className="pa-tab-count">
                {assignedFiles.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Main Content Section */}
      <div className="pa-container">
        
        {/* VIEW 1: CENTRAL Pull & PULL ACTION */}
        {!showAssignedDesk && (
          <>
            {/* Category Selector Card */}
            <div className="pa-section-card">
              <div className="pa-section-header">
                <div>
                  <span className="pa-badge-tag">
                    <ScrollText style={{ width: "0.6875rem", height: "0.6875rem" }} />
                    <span>Statutory Liquor Pull Allocation</span>
                  </span>
                  <h2 className="pa-section-title">
                    Select Application Privilege Category
                  </h2>
                  <p className="pa-section-subtitle">
                    Choose the regulatory liquor licensing, transit permit, or revalidation category to display unassigned files from the state central queue.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.75rem", maxWidth: "600px" }}>
                <label className="pa-select-label">
                  Liquor / Permit Privilege Stream:
                </label>

                <select
                  className="pa-select-control"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">Please Select Privilege Category</option>
                  <option value="License/Permit">License/Permit (New Grant &amp; L-1/L-31)</option>
                  <option value="Permit">Permit (SCM Transit &amp; Consignment)</option>
                  <option value="License Document Revalidation">License Document Revalidation</option>
                  <option value="License Extension">License Extension</option>
                  <option value="HCR Edit License">HCR Edit License</option>
                  <option value="Surrender License">Surrender License</option>
                  <option value="License Transfer">License Transfer</option>
                  <option value="Site Details Change">Site Details Change</option>      
                </select>

                <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "0.25rem 0 0 0" }}>
                  Selected category: <strong style={{ color: "#012a52" }}>{selectedCategory || "None"}</strong> &bull; Showing all unassigned applicant submissions pending officer pull.
                </p>
              </div>
            </div>

            {/* Fetched Results Panel */}
            {hasFetched && (
              <div className="pa-section-card animate-fade">
                <div className="pa-section-header">
                  <div>
                    <span className="pa-badge-tag emerald">
                      <Layers style={{ width: "0.6875rem", height: "0.6875rem" }} />
                      <span>Available For Allocation</span>
                    </span>
                    <h3 className="pa-section-title">
                      <span>Central Pull Queue &bull; {selectedCategory}</span>
                      <span className="pa-badge" style={{ fontSize: "0.75rem", marginLeft: "0.5rem" }}>
                        {fetchedData ? fetchedData.length : 0} Total in Pull
                      </span>
                    </h3>
                    <p className="pa-section-subtitle">
                      Review filed applications and check the boxes below to pull them directly into your Dealing Assistant scrutiny ledger.
                    </p>
                  </div>

                  {selectedPullIds.length > 0 && (
                    <span className="pa-selected-counter-badge" style={{ fontSize: "0.8125rem", padding: "0.35rem 0.85rem" }}>
                      {selectedPullIds.length} File(s) Selected for Pull
                    </span>
                  )}
                </div>

                {fetchedData && fetchedData.length > 0 ? (
                  <div>
                    {/* Batch Selection Toolbar */}
                    <div className="pa-Pull-toolbar">
                      <div className="pa-Pull-toolbar-left">
                        <button
                          type="button"
                          onClick={handleSelectAllPull}
                          className="pa-select-all-btn"
                        >
                          {areAllAvailablePullSelected ? (
                            <>
                              <CheckSquare size={15} style={{ color: "#0284c7" }} />
                              <span>Deselect All Available ({availablePullItems.length})</span>
                            </>
                          ) : (
                            <>
                              <Square size={15} />
                              <span>Select All Available ({availablePullItems.length})</span>
                            </>
                          )}
                        </button>
                        <span className="pa-Pull-toolbar-hint">
                          Use checkboxes to batch pull multiple files simultaneously.
                        </span>
                      </div>

                      {selectedPullIds.length > 0 && (
                        <div className="pa-Pull-selected-pill">
                          {selectedPullIds.length} of {availablePullItems.length} available file(s) marked
                        </div>
                      )}
                    </div>

                    {/* Central Pull Table */}
                    <div className="pa-table-wrapper">
                      <table className="pa-table">
                        <thead>
                          <tr>
                            <th style={{ width: "45px", textAlign: "center" }}>
                              <input
                                type="checkbox"
                                checked={areAllAvailablePullSelected && availablePullItems.length > 0}
                                onChange={handleSelectAllPull}
                                disabled={availablePullItems.length === 0}
                                className="pa-custom-checkbox"
                                title="Select / Deselect all available files"
                              />
                            </th>
                            <th>Ref Application ID</th>
                            <th>Liquor / License Category</th>
                            <th>Applicant &amp; Authorized Premises</th>
                            <th>District / Depot Zone</th>
                            <th>Date Filed</th>
                            <th style={{ textAlign: "right" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fetchedData.map((item) => {
                            const isPulled = pulledIds.includes(item.id);
                            const isChecked = selectedPullIds.includes(item.id);

                            return (
                              <tr 
                                key={item.id}
                                className={isChecked ? "pa-table-row-selected" : isPulled ? "pa-table-row-pulled" : ""}
                              >
                                {/* Checkbox column */}
                                <td style={{ textAlign: "center" }}>
                                  {isPulled ? (
                                    <span className="pa-checkbox-pulled-check" title="Already assigned to DA">
                                      <Check size={13} />
                                    </span>
                                  ) : (
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleTogglePullCheckbox(item.id)}
                                      className="pa-custom-checkbox"
                                    />
                                  )}
                                </td>

                                {/* Ref ID */}
                                <td>
                                  <span className="pa-app-id">{item.id}</span>
                                </td>

                                {/* Category & Type */}
                                <td>
                                  <div style={{ fontWeight: 700, color: "#012a52" }}>{item.licenseName}</div>
                                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500, marginTop: "0.15rem" }}>
                                    {item.liquorType}
                                  </div>
                                </td>

                                {/* Applicant */}
                                <td>
                                  <div style={{ fontWeight: 700, color: "#1e293b" }}>{item.applicantName}</div>
                                  {item.contactPerson && (
                                    <div className="pa-app-applicant-sub">Contact: {item.contactPerson}</div>
                                  )}
                                </td>

                                {/* District */}
                                <td style={{ fontSize: "0.8125rem", color: "#334155" }}>{item.district}</td>

                                {/* Date */}
                                <td style={{ fontSize: "0.8rem", color: "#475569" }}>{item.submissionDate}</td>

                               {/* Action */}
                                <td style={{ textAlign: "right" }}>
                                  {isPulled ? (
                                    <span className="pa-pulled-badge">
                                      <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem" }} />
                                      <span>In DA Queue</span>
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleSinglePull(item)}
                                      className="pa-pull-action-btn"
                                      title="Pull single application to DA desk"
                                    >
                                      <Download style={{ width: "0.8125rem", height: "0.8125rem" }} />
                                      <span>Pull File</span>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom Action Bar (Pull Selected Files) */}
                    <div className="pa-bottom-action-bar">
                      <div className="pa-bottom-left-info">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span className="pa-bottom-select-badge">
                            {selectedPullIds.length}
                          </span>
                          <span className="pa-bottom-info-title">
                            Application File(s) Selected for Assignment
                          </span>
                        </div>
                        <p className="pa-bottom-info-sub">
                          Clicking &ldquo;Pull Application to DA&rdquo; assigns the selected files to your personal scrutiny queue.
                        </p>
                      </div>

                      <div className="pa-bottom-actions-right">
                        {selectedPullIds.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setSelectedPullIds([])}
                            className="pa-btn-ghost"
                          >
                            Clear Selection
                          </button>
                        )}

                        <button
                          type="button"
                          id="btn-pull-applications-bottom"
                          onClick={handlePullSelected}
                          disabled={selectedPullIds.length === 0}
                          className={`pa-bottom-pull-btn ${selectedPullIds.length === 0 ? "disabled" : ""}`}
                        >
                          <Download size={18} />
                          <span>
                            {selectedPullIds.length > 0
                              ? `Pull Application (${selectedPullIds.length} Selected) to DA`
                              : "Pull Application (Select Files Above)"}
                          </span>
                          {selectedPullIds.length > 0 && (
                            <span className="pa-pull-btn-badge">
                              {selectedPullIds.length}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pa-empty-state">
                    <FileText className="pa-empty-icon" />
                    <h3 style={{ fontWeight: 700, margin: 0, color: "#012a52", fontSize: "1rem" }}>
                      No pending unassigned applications in this category.
                    </h3>
                    <p style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.35rem" }}>
                      All applications for this category are currently allocated to officer desks or cleared.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* VIEW 2: DA ASSIGNED REGISTRY */}
        {showAssignedDesk && (
          <div className="pa-section-card animate-fade">
            <div className="pa-section-header">
              <div>
                <span className="pa-badge-tag amber">
                  <UserCheck style={{ width: "0.6875rem", height: "0.6875rem" }} />
                  <span>Dealing Assistant Desk Ledger</span>
                </span>
                <h2 className="pa-section-title">
                  <span>Assigned Application Files Registry</span>
                  <span className="pa-badge" style={{ fontSize: "0.75rem", marginLeft: "0.5rem" }}>
                    {filteredAssignedFiles.length} Records
                  </span>
                </h2>
                <p className="pa-section-subtitle">
                  Tabular overview of all application files pulled and assigned to your officer desk for statutory verification and scrutiny.
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="pa-btn-ghost"
                  title="Reset all search queries and filters"
                >
                  <RotateCcw size={14} />
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>

            {/* Advanced Filters Bar */}
            <div className="pa-filter-container">
              <div className="pa-filter-row-top">
                {/* Search */}
                <div className="pa-search-wrap">
                  <Search size={16} className="pa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search App ID, Applicant Name, License Type, District..."
                    value={assignedSearch}
                    onChange={(e) => {
                      setAssignedSearch(e.target.value);
                      setAssignedCurrentPage(1);
                    }}
                    className="pa-search-input"
                  />
                  {assignedSearch && (
                    <button 
                      type="button" 
                      onClick={() => setAssignedSearch("")} 
                      className="pa-search-clear"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="pa-filter-item">
                  <label className="pa-filter-label">Category</label>
                  <select
                    className="pa-filter-select"
                    value={assignedCategoryFilter}
                    onChange={(e) => {
                      setAssignedCategoryFilter(e.target.value);
                      setAssignedCurrentPage(1);
                    }}
                  >
                    <option value="all">All Categories</option>
                    {uniqueCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="pa-filter-item">
                  <label className="pa-filter-label">Status</label>
                  <select
                    className="pa-filter-select"
                    value={assignedStatusFilter}
                    onChange={(e) => {
                      setAssignedStatusFilter(e.target.value);
                      setAssignedCurrentPage(1);
                    }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending Scrutiny">Pending Scrutiny</option>
                    <option value="Query Raised">Query Raised</option>
                    <option value="Forwarded to AC">Forwarded to AC</option>
                  </select>
                </div>

                {/* District Filter */}
                <div className="pa-filter-item">
                  <label className="pa-filter-label">District / Zone</label>
                  <select
                    className="pa-filter-select"
                    value={assignedDistrictFilter}
                    onChange={(e) => {
                      setAssignedDistrictFilter(e.target.value);
                      setAssignedCurrentPage(1);
                    }}
                  >
                    <option value="all">All Districts</option>
                    {uniqueDistricts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                
                {/* Sort Order */}
                <div className="pa-filter-item">
                  <label className="pa-filter-label">Sort By</label>
                  <select
                    className="pa-filter-select"
                    value={assignedSortBy}
                    onChange={(e) => setAssignedSortBy(e.target.value)}
                  >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="id-asc">Application ID</option>
                    <option value="applicant-asc">Applicant Name (A-Z)</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>

              {/* Quick Preset Pills Row */}
              <div className="pa-filter-pills-row">
                <span className="pa-pills-title">Presets:</span>
                <button 
                  type="button" 
                  className={`pa-pill-btn ${assignedStatusFilter === "all" && !assignedSearch ? "active" : ""}`}
                  onClick={handleResetFilters}
                >
                  All Files ({assignedFiles.length})
                </button>
                <button 
                  type="button" 
                  className={`pa-pill-btn ${assignedStatusFilter === "Pending Scrutiny" ? "active" : ""}`}
                  onClick={() => handleQuickPreset("Pending Scrutiny")}
                >
                  Pending Scrutiny ({pendingCount})
                </button>
                <button 
                  type="button" 
                  className={`pa-pill-btn ${assignedStatusFilter === "Query Raised" ? "active" : ""}`}
                  onClick={() => handleQuickPreset("Query Raised")}
                >
                  Queries Raised ({queryCount})
                </button>
                <button 
                  type="button" 
                  className={`pa-pill-btn ${assignedStatusFilter === "Forwarded to AC" ? "active" : ""}`}
                  onClick={() => handleQuickPreset("Forwarded to AC")}
                >
                  Forwarded to AC ({forwardedCount})
                </button>
                <button 
                  type="button" 
                  className={`pa-pill-btn ${assignedPriorityFilter === "Urgent" ? "active" : ""}`}
                  onClick={() => {
                    setAssignedPriorityFilter("Urgent");
                    setAssignedCurrentPage(1);
                  }}
                >
                  Urgent Priority ({assignedFiles.filter(a => a.priority === "Urgent").length})
                </button>

                <div style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
                  Showing {paginatedAssignedFiles.length} of {filteredAssignedFiles.length} files
                </div>
              </div>
            </div>

            {/* Assigned Files Table */}
            {filteredAssignedFiles.length > 0 ? (
              <div className="pa-table-wrapper">
                <table className="pa-table">
                  <thead>
                    <tr>
                      <th style={{ width: "120px" }}>Ref App ID</th>
                      <th>Category &amp; License Stream</th>
                      <th>Applicant / Premises Entity</th>
                      <th>District Zone</th>
                      <th>Assigned Timestamp</th>
                      <th style={{ textAlign: "center" }}>Priority</th>
                      <th style={{ textAlign: "center" }}>Current Status</th>
                      <th style={{ textAlign: "right" }}>Scrutiny Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAssignedFiles.map((file) => (
                      <tr key={file.id}>
                        <td>
                          <span className="pa-app-id">{file.id}</span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: "#012a52" }}>{file.licenseName}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.15rem" }}>
                            {file.liquorType || file.category}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: "#1e293b" }}>{file.applicantName}</div>
                          {file.contactPerson && (
                            <div className="pa-app-applicant-sub">Officer Contact: {file.contactPerson}</div>
                          )}
                        </td>
                        <td style={{ fontSize: "0.8125rem", color: "#334155" }}>{file.district}</td>
                        <td style={{ fontSize: "0.78125rem", color: "#64748b", fontFamily: "monospace" }}>
                          {file.assignedDate}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <span className={`pa-priority-badge priority-${(file.priority || "normal").toLowerCase()}`}>
                            {file.priority || "Normal"}
                          </span>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <span className={`pa-status-pill ${
                            file.status === "Forwarded to AC" ? "status-forwarded" :
                            file.status === "Query Raised" ? "status-query" : "status-pending"
                          }`}>
                            {file.status === "Forwarded to AC" && <CheckCircle2 size={12} />}
                            {file.status}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            type="button"
                            onClick={() => setSelectedAssignedApp(file)}
                            className="pa-row-inspect-btn"
                            title="Inspect application details and documents"
                          >
                            <Eye size={13} />
                            <span>Inspect File</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="pa-empty-state">
                <Inbox className="pa-empty-icon" />
                <h3 style={{ fontWeight: 700, margin: 0, color: "#012a52", fontSize: "1rem" }}>
                  No assigned files match the selected filter criteria.
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.35rem" }}>
                  Try adjusting your search query, status, or category filter to view records.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="pa-btn-primary"
                  style={{ marginTop: "1rem" }}
                >
                  <RotateCcw size={14} /> Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {filteredAssignedFiles.length > 0 && (
              <div className="pa-assigned-footer">
                <div className="pa-count-info-text">
                  Page {assignedCurrentPage} of {totalPages} &bull; Total {filteredAssignedFiles.length} file(s)
                </div>

                <div className="pa-pagination">
                  <div style={{ display: "flex", alignItems: "center", marginRight: "0.75rem" }}>
                    <span className="pa-count-info-text">Rows per page:</span>
                    <select
                      className="pa-page-select"
                      value={assignedPageSize}
                      onChange={(e) => {
                        setAssignedPageSize(Number(e.target.value));
                        setAssignedCurrentPage(1);
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    disabled={assignedCurrentPage === 1}
                    onClick={() => setAssignedCurrentPage(prev => Math.max(1, prev - 1))}
                    className="pa-page-btn"
                  >
                    Previous
                  </button>
                  <span className="pa-page-indicator">
                    {assignedCurrentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={assignedCurrentPage >= totalPages}
                    onClick={() => setAssignedCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="pa-page-btn"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* 6. Application Details Inspection Modal (Matches about-modal) */}
      {selectedAssignedApp && (
        <div className="pa-modal-overlay" onClick={() => setSelectedAssignedApp(null)}>
          <div className="pa-modal-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
            
            <div className="pa-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div className="pa-modal-icon-box">
                  <FileText size={20} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="pa-app-id">{selectedAssignedApp.id}</span>
                    <span className={`pa-priority-badge priority-${(selectedAssignedApp.priority || "normal").toLowerCase()}`}>
                      {selectedAssignedApp.priority || "Normal"}
                    </span>
                  </div>
                  <h3 className="pa-modal-title">{selectedAssignedApp.licenseName}</h3>
                </div>
              </div>

              <button
                type="button"
                className="pa-modal-close"
                onClick={() => setSelectedAssignedApp(null)}
                title="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="pa-modal-body">
              <div className="pa-modal-grid-2">
                <div className="pa-modal-field">
                  <span className="pa-modal-field-lbl">Applicant / Entity Name</span>
                  <span className="pa-modal-field-val" style={{ fontWeight: 700, color: "#012a52" }}>
                    {selectedAssignedApp.applicantName}
                  </span>
                </div>
                <div className="pa-modal-field">
                  <span className="pa-modal-field-lbl">Liquor / Permit Type</span>
                  <span className="pa-modal-field-val">
                    {selectedAssignedApp.liquorType || selectedAssignedApp.category}
                  </span>
                </div>
                <div className="pa-modal-field">
                  <span className="pa-modal-field-lbl">District &amp; Depot Zone</span>
                  <span className="pa-modal-field-val">{selectedAssignedApp.district}</span>
                </div>
                <div className="pa-modal-field">
                  <span className="pa-modal-field-lbl">Assigned Timestamp</span>
                  <span className="pa-modal-field-val" style={{ fontFamily: "monospace" }}>
                    {selectedAssignedApp.assignedDate}
                  </span>
                </div>
                <div className="pa-modal-field">
                  <span className="pa-modal-field-lbl">Current Scrutiny Status</span>
                  <span className="pa-modal-field-val">
                    <span className={`pa-status-pill ${
                      selectedAssignedApp.status === "Forwarded to AC" ? "status-forwarded" :
                      selectedAssignedApp.status === "Query Raised" ? "status-query" : "status-pending"
                    }`}>
                      {selectedAssignedApp.status}
                    </span>
                  </span>
                </div>
                <div className="pa-modal-field">
                  <span className="pa-modal-field-lbl">Assigned Officer</span>
                  <span className="pa-modal-field-val">Dealing Assistant (DA Desk)</span>
                </div>
              </div>

              {selectedAssignedApp.remarks && (
                <div className="pa-modal-remarks-box">
                  <span className="pa-modal-remarks-lbl">Officer / Docket Remarks:</span>
                  <p className="pa-modal-remarks-text">{selectedAssignedApp.remarks}</p>
                </div>
              )}

              {/* Document Checklist preview */}
              <div className="pa-modal-docs-wrap">
                <span className="pa-modal-docs-title">
                  Enclosed Statutory Docket Documents:
                </span>
                <div className="pa-modal-docs-list">
                  <div className="pa-modal-doc-item">
                    <span className="pa-modal-doc-name">1. Excise Security Bond &amp; Bank Guarantee</span>
                    <span className="pa-modal-doc-status">
                      <CheckCircle2 size={13} /> Verified &amp; Attached
                    </span>
                  </div>
                  <div className="pa-modal-doc-item">
                    <span className="pa-modal-doc-name">2. Delhi Fire Safety &amp; NOC Certificate</span>
                    <span className="pa-modal-doc-status">
                      <CheckCircle2 size={13} /> Valid Through 2027
                    </span>
                  </div>
                  <div className="pa-modal-doc-item">
                    <span className="pa-modal-doc-name">3. Premises Ownership / Lease Deed</span>
                    <span className="pa-modal-doc-status">
                      <CheckCircle2 size={13} /> Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pa-modal-footer">
              <button
                type="button"
                className="pa-btn-ghost"
                onClick={() => setSelectedAssignedApp(null)}
              >
                Close Window
              </button>
              <button
                type="button"
                className="pa-btn-primary"
                onClick={() => {
                  showNotification("info", `Initiated scrutiny verification file for ${selectedAssignedApp.id}`);
                  setSelectedAssignedApp(null);
                }}
              >
                <Eye size={14} />
                <span>Open Full Scrutiny File</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
