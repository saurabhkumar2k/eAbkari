import React from "react";
import { Route } from "react-router-dom";

export default function DepartmentRoutes({ C, navItems, handleAdminNavigate }) {
  const UserHierarchyComponent = C.UserHierarchy || C.FlowHierarchyMapping;

  return (
    <React.Fragment key="department-routes">
      {/* DA Dashboard */}
      <Route
        path="/dadashboard"
        element={
          <div className="admin-app-layout ">
            <C.DADashbord
              onLogout={() => (window.location.href = "/")}
              onNavigateHome={() => (window.location.href = "/")}
            />
          </div>
        }
      />

      <Route
        path="/dadashbord"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="DEPARTMENT_DASHBOARD"
              onNavigate={handleAdminNavigate}
            />
            <C.DADashbord
              onLogout={() => (window.location.href = "/departmentlogin")}
              onNavigateHome={() => (window.location.href = "/")}
            />
          </div>
        }
      />

      {/* Department Dashboard */}
      <Route
        path="/departmentdashboard"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="DEPARTMENT_DASHBOARD"
              onNavigate={handleAdminNavigate}
            />
            <C.DepartmentDashboard
              onLogout={() => (window.location.href = "/departmentlogin")}
              onNavigateHome={() => (window.location.href = "/")}
            />
          </div>
        }
      />

      {/* Transport Packaged FL */}
      <Route
        path="/TransportPackagedFL"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="TRANSPORT_PACKAGED_FL_VALIDITY"
              onNavigate={handleAdminNavigate}
            />
            <C.TransportPackagedFL />
          </div>
        }
      />

      {/* Import Permit */}
      <Route
        path="/importpermitpass"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="IMPORT_PERMIT_PASS"
              onNavigate={handleAdminNavigate}
            />
            <C.ImportPermitPass />
          </div>
        }
      />

      {/* Import Packaged */}
      <Route
        path="/importpackaged"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="IMPORT_PACKAGED"
              onNavigate={handleAdminNavigate}
            />
            <C.ImportPackaged onNavigateHome={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      {/* Liquor Brand */}
      <Route
        path="/liquorbrand"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="LIQUOR_BRAND"
              onNavigate={handleAdminNavigate}
            />
            <C.LiquorBrand onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      {/* Transport Bulk Spirit */}
      <Route
        path="/TransportBulkSpiritValidity"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="TRANSPORT_BULK_SPIRIT_VALIDITY"
              onNavigate={handleAdminNavigate}
            />
            <C.TransportBulkSpiritValidity />
          </div>
        }
      />

      {/* User Creation */}
      <Route
        path="/departmentdashboard/user-creation"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="OWNER_TYPE"
              onNavigate={handleAdminNavigate}
            />
            <C.UserCreation onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      {/* Bottler Master */}
      <Route
        path="/bottlermaster"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="BOTTLER_MASTER"
              onNavigate={handleAdminNavigate}
            />
            <C.BottlerMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      {/* Brand Owner Master */}
      <Route
        path="/brandowner"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="BRAND_OWNER"
              onNavigate={handleAdminNavigate}
            />
            <C.BrandOwner onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      {/* Owner Type */}
      <Route
        path="/departmentdashboard/owner-type"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="OWNER_TYPE"
              onNavigate={handleAdminNavigate}
            />
            <C.OwnerType onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      {/* License Title Routes */}
      <Route
        path="/licensetitle"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="LICENSE_TITLE"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseTitleMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/license-title"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="LICENSE_TITLE"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseTitleMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/departmentdashboard/license-title"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="LICENSE_TITLE"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseTitleMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/departmentdashboard/directory=license-title"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="LICENSE_TITLE"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseTitleMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      {/* License Category Master */}
      <Route
        path="/licensecategory"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="CATEGORY"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseCategoryMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/license-category"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="CATEGORY"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseCategoryMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/departmentdashboard/category"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="CATEGORY"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseCategoryMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/departmentdashboard/license-category"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="CATEGORY"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseCategoryMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      {/* User Hierarchy / Flow Hierarchy Mapping */}
      <Route
        path="/departmentdashboard/user-hierarchy"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="USER_HIERARCHY"
              onNavigate={handleAdminNavigate}
            />
            <UserHierarchyComponent onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/departmentdashboard/flow-hierarchy"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="USER_HIERARCHY"
              onNavigate={handleAdminNavigate}
            />
            <UserHierarchyComponent onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/user-hierarchy"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="USER_HIERARCHY"
              onNavigate={handleAdminNavigate}
            />
            <UserHierarchyComponent onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/flow-hierarchy"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="USER_HIERARCHY"
              onNavigate={handleAdminNavigate}
            />
            <UserHierarchyComponent onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      {/* License Sub Category Master */}
      <Route
        path="/licensesubcategory"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="SUB_CATEGORY"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseSubCategoryMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/license-sub-category"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="SUB_CATEGORY"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseSubCategoryMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/departmentdashboard/sub-category"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="SUB_CATEGORY"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseSubCategoryMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />

      <Route
        path="/departmentdashboard/license-sub-category"
        element={
          <div className="admin-app-layout ">
            <C.AdminHeader
              navItems={navItems}
              currentView="SUB_CATEGORY"
              onNavigate={handleAdminNavigate}
            />
            <C.LicenseSubCategoryMaster onBack={() => (window.location.href = "/departmentdashboard")} />
          </div>
        }
      />
    </React.Fragment>
  );
}
