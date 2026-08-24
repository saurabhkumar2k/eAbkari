import {
  Check,
  FileCheck2,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Printer,
  Home,
} from "lucide-react";

import "./ReceiptSuccessHCR.css";

const ReceiptSuccessHCR = ({
  applicant,
  siteForm,
  selectedLicenseCatDesc,
  triggerMockPrint,
  onBackToSelect,
}) => {
  // const selectedLicenseDetails = selectedLicense?.find(
  //   (item) => item.licenseeCatCode === selectedLicenseId,
  // );
  const address = [
    applicant?.addressLine1,
    applicant?.addressLine2,
    applicant?.city,
  ]
    .filter(Boolean)
    .join(", ");

  console.log("selectedLicense", selectedLicenseCatDesc);
  return (
    <div className="application-page">
      <div className="application-card">

        {/* =========================
          SUCCESS HEADER
      ========================== */}
        <section className="success-header">
          <div className="success-decoration success-decoration-left" />
          <div className="success-decoration success-decoration-right" />

          <div className="success-content">

            <div className="success-icon">
              <Check />
            </div>

            <div className="success-label">
              APPLICATION RECEIVED
            </div>

            <h1>
              Application Submitted Successfully
            </h1>

            <p>
              Your application has been successfully submitted and
              forwarded for verification.
            </p>

          </div>
        </section>


        {/* =========================
          APPLICATION NUMBER
      ========================== */}
        <section className="application-number-wrapper">

          <div className="application-number-card">

            <div className="application-number-left">

              <div className="application-document-icon">
                <FileCheck2 />
              </div>

              <div>
                <div className="field-label">
                  APPLICATION NUMBER
                </div>

                <div className="application-number">
                  {applicant?.applicationId || "—"}
                </div>
              </div>

            </div>

            <div className="submitted-badge">
              <span />
              Submitted
            </div>

          </div>

        </section>


        {/* =========================
          CONTENT
      ========================== */}
        <main className="application-content">

          {/* =========================
            APPLICANT DETAILS
        ========================== */}
          <section className="application-section">

            <div className="section-heading">
              <span className="section-line" />
              <h2>Applicant Details</h2>
              <span className="section-line" />
            </div>


            <div className="details-grid">

              {/* Applicant */}
              <div className="detail-card">

                <div className="detail-icon detail-icon-blue">
                  <User />
                </div>

                <div className="detail-content">
                  <div className="field-label">
                    Applicant Name
                  </div>

                  <div className="field-value">
                    {applicant?.applicantName || "—"}
                  </div>
                </div>

              </div>


              {/* Site */}
              <div className="detail-card">

                <div className="detail-icon detail-icon-indigo">
                  <Building2 />
                </div>

                <div className="detail-content">
                  <div className="field-label">
                    Site Name
                  </div>

                  <div className="field-value">
                    {siteForm?.SiteName || "—"}
                  </div>
                </div>

              </div>


              {/* Email */}
              <div className="detail-card">

                <div className="detail-icon detail-icon-orange">
                  <Mail />
                </div>

                <div className="detail-content">
                  <div className="field-label">
                    Email Address
                  </div>

                  <div className="field-value field-email">
                    {applicant?.email || "—"}
                  </div>
                </div>

              </div>


              {/* Mobile */}
              <div className="detail-card">

                <div className="detail-icon detail-icon-green">
                  <Phone />
                </div>

                <div className="detail-content">
                  <div className="field-label">
                    Mobile Number
                  </div>

                  <div className="field-value">
                    {applicant?.mobile || "—"}
                  </div>
                </div>

              </div>


              {/* Address */}
              <div className="detail-card detail-card-full">

                <div className="detail-icon detail-icon-red">
                  <MapPin />
                </div>

                <div className="detail-content">
                  <div className="field-label">
                    Address
                  </div>

                  <div className="field-value address-value">
                    {address || "—"}
                  </div>
                </div>

              </div>

            </div>

          </section>


          {/* =========================
            APPLIED LICENCE
        ========================== */}
          <section className="application-section">

            <div className="section-heading">
              <span className="section-line" />
              <h2>Applied Licence</h2>
              <span className="section-line" />
            </div>


            <div className="licence-card">

              <div className="licence-icon">
                <FileCheck2 />
              </div>

              <div className="licence-content">

                <div className="field-label licence-label">
                  Selected Licence
                </div>

                <div className="licence-name">
                  {selectedLicenseCatDesc || "—"}
                </div>

              </div>

            </div>

          </section>


          {/* =========================
            APPLICATION STATUS
        ========================== */}
          <section className="application-section">

            <div className="section-heading">
              <span className="section-line" />
              <h2>Application Status</h2>
              <span className="section-line" />
            </div>


            <div className="status-card">

              <div className="status-icon">
                <Check />
              </div>

              <div className="status-content">

                <div className="status-title-row">

                  <h3>
                    Application Submitted
                  </h3>

                  <span className="completed-badge">
                    Completed
                  </span>

                </div>

                <p>
                  Your application has been submitted successfully
                  and forwarded for verification. You can track the
                  application status anytime from your dashboard.
                </p>

              </div>

            </div>

          </section>

        </main>


        {/* =========================
          FOOTER
      ========================== */}
        <footer className="application-footer">

          <div className="footer-buttons">

            <button
              type="button"
              onClick={triggerMockPrint}
              className="btn btn-print"
            >
              <Printer />
              Print Receipt
            </button>

            <button
              type="button"
              onClick={onBackToSelect}
              className="btn btn-dashboard"
            >
              <Home />
              Back to Dashboard
            </button>

          </div>

          <p className="footer-note">
            Please keep your application number for future reference.
          </p>

        </footer>

      </div>
    </div>
  );
};

export default ReceiptSuccessHCR;
