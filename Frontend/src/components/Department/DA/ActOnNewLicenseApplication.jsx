import React, { useEffect, useState } from "react";
//import ActOnNewLicense from ""

const ActOnNewLicenseApplication = () => {
  const [fromDate, setFromDate] = useState("2024-08-05");
  const [toDate, setToDate] = useState("2026-08-12");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================
  // GET APPLICATION DATA
  // ============================================

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/License/GetPendingNewLicenseApplications?fromDate=${fromDate}&toDate=${toDate}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();

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

  // ============================================
  // LOAD DATA WHEN PAGE OPENS
  // ============================================

  useEffect(() => {
    fetchApplications();
  }, []);

  // ============================================
  // SEARCH
  // ============================================

  const handleSearch = () => {
    fetchApplications();
  };

  // ============================================
  // ACTION HANDLER
  // ============================================

  const handleAction = (action, application) => {
    console.log("Action:", action);
    console.log("Application:", application);

    // Add navigation/API logic here
  };

  return (
    <div className="act-new-license-page">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="act-page-header">
        <span>Act on Pending New License Application</span>
      </div>


      {/* ======================================
          SEARCH
      ====================================== */}

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


      {/* ======================================
          COUNT
      ====================================== */}

      <div className="act-count">
        Count(s) : <strong>{applications.length}</strong>
      </div>


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <div className="act-error">
          {error}
        </div>
      )}


      {/* ======================================
          GRID
      ====================================== */}

      <div className="act-table-wrapper">

        <table className="act-license-table">

          <thead>
            <tr>

              <th className="sl-column">
                Sl.
              </th>

              <th className="application-column">
                Application ID No. &amp; Date
              </th>

              <th className="view-column">
                Click To View
              </th>

              <th className="action-column">
                Click To
              </th>

            </tr>
          </thead>


          <tbody>

            {/* LOADING */}

            {loading && (
              <tr>
                <td
                  colSpan="4"
                  className="no-record"
                >
                  Loading...
                </td>
              </tr>
            )}


            {/* NO DATA */}

            {!loading && applications.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="no-record"
                >
                  No application found
                </td>
              </tr>
            )}


            {/* DYNAMIC DATA */}

            {!loading &&
              applications.map((application, index) => (

                <tr key={application.applicationId || index}>

                  {/* ==============================
                      SERIAL NUMBER
                  ============================== */}

                  <td className="sl-cell">
                    {index + 1}
                  </td>


                  {/* ==============================
                      APPLICATION DETAILS
                  ============================== */}

                  <td className="application-details">

                    <div className="detail-row">

                      <span className="detail-label">
                        App. ID
                      </span>

                      <span className="colon">
                        :
                      </span>

                      <strong>
                        {application.applicationId}
                      </strong>

                    </div>


                    <div className="detail-row">

                      <span className="detail-label">
                        License Description
                      </span>

                      <span className="colon">
                        :
                      </span>

                      <strong className="license-description">
                        {application.licenseDescription}
                      </strong>

                    </div>


                    <div className="detail-row">

                      <span className="detail-label">
                        Appl. Dt.
                      </span>

                      <span className="colon">
                        :
                      </span>

                      <span>
                        {application.applicationDate}
                      </span>

                    </div>


                    <div className="detail-row">

                      <span className="detail-label">
                        Applicant Name/Site Name
                      </span>

                      <span className="colon">
                        :
                      </span>

                      <span>
                        {application.applicantName}
                      </span>

                    </div>

                  </td>


                  {/* ==============================
                      VIEW ACTIONS
                  ============================== */}

                  <td className="view-actions">

                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleAction(
                          "Application",
                          application
                        )
                      }
                    >
                      Application
                    </button>


                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleAction(
                          "Attached Doc",
                          application
                        )
                      }
                    >
                      Attached Doc
                    </button>


                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleAction(
                          "Payment Breakup",
                          application
                        )
                      }
                    >
                      Payment Breakup
                    </button>


                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleAction(
                          "Life Cycle",
                          application
                        )
                      }
                    >
                      Life Cycle
                    </button>

                  </td>


                  {/* ==============================
                      ACTIONS
                  ============================== */}

                  <td className="main-actions">

                    {application.actionLinks?.map(
                      (action, actionIndex) => (

                        <button
                          key={actionIndex}
                          type="button"
                          className={`table-link ${
                            action.disabled
                              ? "disabled-action"
                              : ""
                          }`}
                          disabled={action.disabled}
                          onClick={() =>
                            handleAction(
                              action.name,
                              application
                            )
                          }
                        >
                          {action.name}
                        </button>

                      )
                    )}

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ActOnNewLicenseApplication;