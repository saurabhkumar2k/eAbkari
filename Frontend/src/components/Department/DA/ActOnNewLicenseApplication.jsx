import React, { useEffect, useState } from "react";
//import ActOnNewLicense from ""
import "../../../Style/Scruitiny.css"

const ActOnNewLicenseApplication = () => {
  const currentDate = new Date();

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const toDateValue = new Date();

  const fromDateValue = new Date();
  fromDateValue.setDate(fromDateValue.getDate() - 7);

  const [fromDate, setFromDate] = useState(formatDate(fromDateValue));
  const [toDate, setToDate] = useState(formatDate(toDateValue));

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showScrutinyPopup, setShowScrutinyPopup] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [scrutinyDocuments, setScrutinyDocuments] = useState([]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const applicationIdNo = localStorage.getItem("applicationIdNo");
      const userId = localStorage.getItem("userId");

      if (!applicationIdNo) {
        throw new Error("No application ID is set.");
      }

      const response = await fetch(
        `http://localhost:5214/api/ApplicationFlow/GetAccessPermissionHistory?userId=${encodeURIComponent(userId)}&fromDate=${fromDate}&toDate=${toDate}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      console.log("data", data);

      // If API directly returns an array
      setApplications(data);

      // If your API returns { data: [...] }
      // use:
      // setApplications(data.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Unable to load applications.");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // LOAD DATA WHEN PAGE OPENS

  useEffect(() => {
    fetchApplications();
  }, []);

  // SEARCH

  const handleSearch = () => {
    fetchApplications();
  };

  // ACTION HANDLER

  const handleAction = (action, application) => {
    console.log("Action:", action);
    console.log("Application:", application);

    // Add navigation/API logic here
  };

  const handleScrutinyApplication = async (application) => {

    console.log("Selected Application:", application);
    setSelectedApplication(application);

    setShowScrutinyPopup(true);

    // setScrutinyRows([]);

    // try {
    //   const response = await fetch(
    //     `http://localhost:5214/api/ApplicationFlow/GetApplicationScrutiny?applicationIdNo=${encodeURIComponent(application.ApplicationIdNo)}`,
    //   );

    //   if (!response.ok) {
    //     throw new Error("Unable to load scrutiny data");
    //   }

    //   const data = await response.json();

    //   setScrutinyRows(data || []);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="act-new-license-page">
      <div className="act-page-header">
        <span>Act on Pending New License Application</span>
      </div>

      <div className="act-search-section">
        <div className="act-date-field">
          <label>From</label>
          <span>:</span>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          {/* </div>


        <div className="act-date-field"> */}
          <label>To</label>
          <span>:</span>

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="act-search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="act-count">
        Count(s) : <strong>{applications.length}</strong>
      </div>

      {error && <div className="act-error">{error}</div>}

      <div className="act-table-wrapper">
        <table className="act-license-table">
          <thead>
            <tr>
              <th className="sl-column">Sl.</th>

              <th className="application-column">
                Application ID No. &amp; Date
              </th>

              <th className="view-column">Click To View</th>

              <th className="action-column">Click To</th>
            </tr>
          </thead>

          <tbody>
            {/* LOADING */}

            {loading && (
              <tr>
                <td colSpan="4" className="no-record">
                  Loading...
                </td>
              </tr>
            )}

            {/* NO DATA */}

            {!loading && applications.length === 0 && (
              <tr>
                <td colSpan="4" className="no-record">
                  No application found
                </td>
              </tr>
            )}

            {/* DYNAMIC DATA */}

            {!loading &&
              applications.map((application, index) => (
                <tr key={application.applicationIdNo || index}>
                  {/* ==============================
                      SERIAL NUMBER
                  ============================== */}

                  <td className="sl-cell">{index + 1}</td>

                  {/* ==============================
                      APPLICATION DETAILS
                  ============================== */}

                  <td className="application-details">
                    <div className="detail-row">
                      <span className="detail-label">App. ID</span>

                      <span className="colon">:</span>

                      <strong>{application.applicationIdNo}</strong>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">License Description</span>

                      <span className="colon">:</span>

                      <strong className="license-description">
                        {application.licenseeCatDesc}
                      </strong>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Appl. Dt.</span>

                      <span className="colon">:</span>

                      <span>{application.applicationDate}</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">
                        Applicant Name/Site Name
                      </span>

                      <span className="colon">:</span>

                      <span>{application.siteName}</span>
                    </div>
                  </td>

                  {/* ==============================
                      VIEW ACTIONS
                  ============================== */}

                  <td className="view-actions">
                    <button
                      type="button"
                      className="table-link"
                      onClick={() => handleAction("Application", application)}
                    >
                      Application
                    </button>

                    <button
                      type="button"
                      className="table-link"
                      onClick={() => handleAction("Attached Doc", application)}
                    >
                      Attached Doc
                    </button>

                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleAction("Payment Breakup", application)
                      }
                    >
                      Payment Breakup
                    </button>

                    <button
                      type="button"
                      className="table-link"
                      onClick={() => handleAction("Life Cycle", application)}
                    >
                      Life Cycle
                    </button>
                  </td>

                  {/* ==============================
                      VIEW ACTIONS
                  ============================== */}

                  <td className="view-actions">
                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleScrutinyApplication(                         
                          application
                        )
                      }
                    >
                      Scrutiny Application
                    </button>

                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleAction("Forward Application", application)
                      }
                    >
                      Forward Application
                    </button>

                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleAction("Send Back Application", application)
                      }
                    >
                      Send Back Application
                    </button>

                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleAction("Reject Application", application)
                      }
                    >
                      Reject Application
                    </button>

                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleAction("Generate Offer Letter", application)
                      }
                    >
                      Generate Offer Letter
                    </button>
                  </td>

                  {/* ==============================
                      ACTIONS
                  ============================== */}

                  <td className="main-actions">
                    {application.actionLinks?.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        type="button"
                        className={`table-link ${
                          action.disabled ? "disabled-action" : ""
                        }`}
                        disabled={action.disabled}
                        onClick={() => handleAction(action.name, application)}
                      >
                        {action.name}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showScrutinyPopup && (
        <div className="scrutiny-overlay">
          <div className="scrutiny-popup">
            <div className="scrutiny-header">
              <h3>Application Scrutiny</h3>

              <button type="button" onClick={() => setShowScrutinyPopup(false)}>
                X
              </button>
            </div>

            <div className="scrutiny-content">
              <h4>Application Details</h4>

              <p>Application ID: {selectedApplication?.applicationIdNo}</p>

              <div className="scrutiny-table-container">
                <table className="scrutiny-table">
                  <thead>
                    <tr>
                      <th>Sl No.</th>
                      <th>Personal/Site Documents</th>
                      <th>Upload Status</th>
                      <th>Document Type</th>
                      <th>View</th>
                      <th>Valid</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>

                  <tbody>
                    {scrutinyDocuments.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>

                        <td className="scrutiny-doc-name">
                          {row.documentName}
                        </td>

                        <td>{row.uploadStatus}</td>

                        <td>{row.documentType}</td>

                        <td>
                          {row.uploadStatus === "Uploaded" && (
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              View
                            </a>
                          )}
                        </td>

                        <td>
                          <div className="scrutiny-radio">
                            <label>
                              <input
                                type="radio"
                                name={`valid-${row.docId}`}
                                value="No"
                              />
                              No
                            </label>

                            <label>
                              <input
                                type="radio"
                                name={`valid-${row.docId}`}
                                value="Yes"
                              />
                              Yes
                            </label>
                          </div>
                        </td>

                        <td>
                          <input
                            type="text"
                            className="scrutiny-remarks"
                            placeholder="Remarks"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="scrutiny-complete">
                <strong>Whether Application is Complete?</strong>

                <label>
                  <input type="radio" name="applicationComplete" value="Yes" />
                  Yes
                </label>

                <label>
                  <input type="radio" name="applicationComplete" value="No" />
                  No
                </label>
              </div>

              <div className="scrutiny-footer">
                {/* <button type="button">Previous Remarks</button> */}

                <button type="button" className="scrutiny-submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActOnNewLicenseApplication;
