import {
  Check,
  FileCheck2,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Printer,
  Home
} from "lucide-react";
const ReceiptSuccess = ({
  applicant,
  selectedLicense,
  triggerMockPrint,
  onBackToSelect
}) => {
  return (
    <div className="rmain-card">
      {/* Success Header */}
      <div className="rmain-card">
        {/* Success */}
        <div className="rcontent-section">
          <div className="rcenter-content">
            <div className="relative">
              <div className="rstatus-pulse"></div>
              <div className="rsuccess-icon">
                <Check className="rsuccess-icon-svg" />
              </div>
            </div>
          </div>
          <h2 className="rpage-title">Application Submitted Successfully</h2>
          <p className="rpage-subtitle"> Thank you. Your application has been submitted successfully. </p>
        </div>
      </div>

      {/* Application No */}
      <div className="px-10">
        <div className="receipt-card">
          <div className="rgrid-row">
            <div className="rcenter-content">
              <div className="rsuccess-icon-box">
                <FileCheck2 className="text-blue-600 w-7 h-7" />
              </div>
            </div>
            <div className="py-5">
              <p className="rsection-label">
                Application No.
              </p>
              <h3 className="rpage-heading">
                {localStorage.getItem("applicationId")}
              </h3>
            </div>
            <div className="pr-8">
              <span className="rstatus-badge">
                Submitted
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Applicant Details */}
      <div className="mt-10 px-10">
        <div className="rsuccess-icon-box">
          <div className="divider"></div>
          <h3 className="rheading-title">
            Applicant Details
          </h3>
          <div className="divider"></div>
        </div>
      </div>

      {/* Applied Licence */}
      <div className="app-form-grid-md">
        {/* Applicant */}
        <div className="app-card">
          <div className="reciept-container">
            <div className="ricon-box">
              <User className="text-blue-600" />
            </div>

            <div>
              <p className="receipt-label">
                Applicant Name
              </p>
              <h4 className="receipt-title">
                {applicant?.applicantName}
              </h4>
            </div>
          </div>
        </div>


        {/* Company */}
        <div className="app-card">
          <div className="reciept-container">
            <div className="rsicon-box">
              <Building2 className="text-indigo-600" />
            </div>
            <div>
              <p className="receipt-label">
                Company Name
              </p>
              <h4 className="receipt-title">
                {applicant?.companyName}
              </h4>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="app-card">
          <div className="reciept-container">
            <div className="rsuccess-icon-box">
             <Mail className="text-orange-600" />
            </div>
            <div>
              <p className="receipt-label">
                Email Address
              </p>
              <h4 className="font-semibold mt-1 break-all">
                {applicant?.email}
              </h4>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="app-card">
          <div className="reciept-container">
            <div className="rsuccess-icon-box">
              <Phone className="text-green-600" />
            </div>
            <div>
              <p className="receipt-label"> Mobile Number </p>
              <h4 className="font-semibold mt-1"> {applicant?.mobile} </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 app-card">
        <div className="reciept-container">
          <div className="reciept-box">
            <MapPin className="text-red-600" />
          </div>
          <div>
            <p className="receipt-label">
              Address
            </p>
            <p className="rdescription-text">
              {applicant?.addressLine1},
              {applicant?.addressLine2},
              {applicant?.city}
            </p>
          </div>
        </div>
      </div>

      {/* Applied Licence */}
      <div className="mt-10">
        <div className="rcenter-header">
          <div className="divider"></div>
          <h3 className="rheading-title">
            Applied Licence
          </h3>
          <div className="divider"></div>
        </div>

        <div className="rcenter-content">
          <div className="receipt-badge">
            <div className="rsicon-box">
             <FileCheck2 className="ricon-title" />
            </div>
            <div>
              <p className="rlabel-text">
                Selected Licence
              </p>
              <h4 className="rsection-title">
                {/* {selectedLicense?.licenseeCatCode} -{" "} */}
                {selectedLicense?.licenseeCatDesc}
              </h4>
            </div>
          </div>
        </div>
      </div>
 
      {/* Current Status */}
      <div className="mt-10">
        <div className="rsuccess-box">
          <div className="rcontent-row">
            <div className="rsuccess-circle">
              <Check className="rsuccess-icon" />
            </div>
            <div>
              <h4 className="rsuccess-title">
                Application Submitted
              </h4>
              <p className="rdescription-text">
                Your application has been submitted successfully.
                It has been forwarded for verification.
                You can track the application status anytime from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="rfooter-section">
        <div className="rbutton-container">
          <button
            type="button"
            onClick={triggerMockPrint}
            className="rprimary-btn "
          >
            <Printer className="ricon" />
            Print Receipt
          </button>
          <button
            type="button"
            onClick={onBackToSelect}
            className="rprimary-btn"
          >
            <Home className="ricon" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReceiptSuccess;