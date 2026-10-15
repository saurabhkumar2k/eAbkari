import React from "react";
import { Route } from "react-router-dom";

export default function PublicRoutes({ C, handleHeaderViewSelect }) {
  return (
    <React.Fragment key="public-routes">
      {/* Home */}
      <Route
        path="/"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="HOME" />
            <main>
              <C.HomeContent />
            </main>
            <C.Footer />
          </>
        }
      />

      {/* Dedicated About Us Routes */}
      <Route
        path="/about"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="ABOUT_US" />
            <main>
              <C.AboutUsPage
                onNavigateHome={() => (window.location.href = "/")}
                onNavigateToView={handleHeaderViewSelect}
              />
            </main>
            <C.Footer />
          </>
        }
      />

      <Route
        path="/about-us"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="ABOUT_US" />
            <main>
              <C.AboutUsPage
                onNavigateHome={() => (window.location.href = "/")}
                onNavigateToView={handleHeaderViewSelect}
              />
            </main>
            <C.Footer />
          </>
        }
      />

      <Route
        path="/about-eabkari"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="ABOUT_US" />
            <main>
              <C.AboutUsPage
                onNavigateHome={() => (window.location.href = "/")}
                onNavigateToView={handleHeaderViewSelect}
              />
            </main>
            <C.Footer />
          </>
        }
      />

      <Route
        path="/about-e-abkari"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="ABOUT_US" />
            <main>
              <C.AboutUsPage
                onNavigateHome={() => (window.location.href = "/")}
                onNavigateToView={handleHeaderViewSelect}
              />
            </main>
            <C.Footer />
          </>
        }
      />

      {/* Right to Information (RTI) */}
      <Route
        path="/rti"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="RTI" />
            <main>
              <C.RightToInformation onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      <Route
        path="/right-to-information"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="RTI" />
            <main>
              <C.RightToInformation onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      {/* Excise Commissioner / Head of Department */}
      <Route
        path="/excise-commissioner"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="EXCISE_COMMISSIONER" />
            <main>
              <C.ExciseCommissioner onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      <Route
        path="/head-of-department"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="EXCISE_COMMISSIONER" />
            <main>
              <C.ExciseCommissioner onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      {/* Licenses Administered / Facts & Figures */}
      <Route
        path="/licenses-administered"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="LICENSES_ADMINISTERED" />
            <main>
              <C.LicensesAdministered onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      <Route
        path="/licensesadministered"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="LICENSES_ADMINISTERED" />
            <main>
              <C.LicensesAdministered onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      <Route
        path="/facts-figures/licenses-administered"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="LICENSES_ADMINISTERED" />
            <main>
              <C.LicensesAdministered onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      {/* Applicant Login */}
      <Route
        path="/login"
        element={
          <C.Login
            onNavigateToRegister={() => (window.location.href = "/registration")}
            onNavigateHome={() => (window.location.href = "/")}
            onLoginSuccess={() => (window.location.href = "/applicantdashboard")}
          />
        }
      />

      {/* Registration */}
      <Route path="/registration" element={<C.Registration />} />

      {/* Organizational Structure */}
      <Route
        path="/organizational-structure"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="ORGANIZATIONAL_STRUCTURE" />
            <main>
              <C.OrganizationalStructure onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      {/* Feedback Routes */}
      <Route
        path="/feedback"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="FEEDBACK_FORM" />
            <main>
              <C.FeedbackForm onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      <Route
        path="/feedback-form"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="FEEDBACK_FORM" />
            <main>
              <C.FeedbackForm onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      <Route
        path="/feedbak"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="FEEDBACK_FORM" />
            <main>
              <C.FeedbackForm onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />

      {/* Licensee Login */}
      <Route
        path="/licensee-login"
        element={
          <C.LicenseeLogin
            onNavigateToRegister={() => (window.location.href = "/registration")}
            onNavigateHome={() => (window.location.href = "/")}
            onLoginSuccess={() => (window.location.href = "/applicantdashboard")}
          />
        }
      />

      <Route
        path="/licenseelogin"
        element={
          <C.LicenseeLogin
            onNavigateToRegister={() => (window.location.href = "/registration")}
            onNavigateHome={() => (window.location.href = "/")}
            onLoginSuccess={() => (window.location.href = "/applicantdashboard")}
          />
        }
      />

      {/* Department Login */}
      <Route
        path="/departmentlogin"
        element={
          <C.DepartmentLogin
            onNavigateHome={() => (window.location.href = "/")}
            onLoginSuccess={(role) => {
              if (role === "DA" || role === "da") {
                window.location.href = "/dadashboard";
              } else {
                window.location.href = "/departmentdashboard";
              }
            }}
          />
        }
      />

      {/* Staff */}
      <Route
        path="/staff"
        element={
          <>
            <C.Header onSelectView={handleHeaderViewSelect} currentView="STAFF" />
            <main>
              <C.Staff onNavigateHome={() => (window.location.href = "/")} />
            </main>
            <C.Footer />
          </>
        }
      />
    </React.Fragment>
  );
}
