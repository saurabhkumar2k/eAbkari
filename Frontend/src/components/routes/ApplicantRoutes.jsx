import React from "react";
import { Route } from "react-router-dom";

export default function ApplicantRoutes({ C }) {
  return (
    <React.Fragment key="applicant-routes">
      {/* Applicant Dashboard */}
      <Route
        path="/applicantdashboard"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
          />
        }
      />

      {/* New Permit */}
      <Route
        path="/newpermit"
        element={
          <C.PermitForm onBack={() => (window.location.href = "/applicantdashboard")} />
        }
      />

      {/* Renewal License Routes */}
      <Route
        path="/renewallicense"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Renewal License"
          />
        }
      />

      <Route
        path="/renewal-license"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Renewal License"
          />
        }
      />

      {/* Applied Dealer Routes */}
      <Route
        path="/applieddealer"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Applied Dealers"
          />
        }
      />

      <Route
        path="/applied-dealer"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Applied Dealers"
          />
        }
      />

      {/* Document Revalidation Routes */}
      <Route
        path="/documentrevalidation"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Document Revalidate"
          />
        }
      />

      <Route
        path="/document-revalidation"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Document Revalidate"
          />
        }
      />

      {/* Applied M&TP Routes */}
      <Route
        path="/appliedmtp"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Applied M&TP"
          />
        }
      />

      <Route
        path="/applied-mtp"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Applied M&TP"
          />
        }
      />

      {/* Applied Premise Routes */}
      <Route
        path="/appliedpremise"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Applied Premise"
          />
        }
      />

      <Route
        path="/applied-premise"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Applied Premise"
          />
        }
      />

      <Route
        path="/applied-premises"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Applied Premise"
          />
        }
      />

      <Route
        path="/premise"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="Applied Premise"
          />
        }
      />

      {/* Change Password Routes */}
      <Route
        path="/changepassword"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="ChangePassword"
          />
        }
      />

      <Route
        path="/change-password"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="ChangePassword"
          />
        }
      />

      <Route
        path="/password"
        element={
          <C.ApplicantDashboard
            onLogout={() => (window.location.href = "/")}
            onNavigateToHome={() => (window.location.href = "/")}
            initialTab="ChangePassword"
          />
        }
      />
    </React.Fragment>
  );
}
