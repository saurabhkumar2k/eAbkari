import React, { useEffect, useState, useRef } from "react";
//import ActOnNewLicense from ""
import "../../../Style/Scruitiny.css";

const ActOnNewLicenseApplication = () => {
  const currentDate = new Date();

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const toDateValue = new Date();

  const fromDateValue = new Date();
  fromDateValue.setDate(fromDateValue.getDate() - 15);

  const [fromDate, setFromDate] = useState(formatDate(fromDateValue));
  const [toDate, setToDate] = useState(formatDate(toDateValue));

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showScrutinyPopup, setShowScrutinyPopup] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [scrutinyDocuments, setScrutinyDocuments] = useState([]);
  const [scrutinyLoading, setScrutinyLoading] = useState(false);
  const [scrutinyError, setScrutinyError] = useState("");

  const [showForwardPopup, setShowForwardPopup] = useState(false);
  const [selectedForwardApplication, setSelectedForwardApplication] =
    useState(null);
  const [forwardLoading, setForwardLoading] = useState(false);
  const [forwardError, setForwardError] = useState("");
  const [remarks, setRemarks] = useState("");
  // const [previousMessages, setPreviousMessages] = useState([]);

  const remarksInputRefs = useRef({});
  const [applicationComplete, setApplicationComplete] = useState("");

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

  const getApplicationFlowUser = async (applicationIdNo) => {
    try {
      const response = await fetch(
        `http://localhost:5214/api/ApplicationFlow/GetApplicationFlowUser?applicationIdNo=${encodeURIComponent(applicationIdNo)}`,
      );

      if (!response.ok) {
        throw new Error("Unable to get application flow details.");
      }

      const data = await response.json();

      console.log("Application Flow Details:", data);

      return data;
    } catch (error) {
      console.error("Application Flow API Error:", error);
      alert(error.message);
      return null;
    }
  };

  const handleSubmitScruiny = async () => {
    debugger;
    try {
      if (!scrutinyDocuments.length) {
        alert("No scrutiny documents found.");
        return;
      }

      //VALIDATION 1: Every document must have Yes or No selected

      //const invalidDocument = scrutinyDocuments.find((row) => !row.isValid);

      const invalidDocument = scrutinyDocuments.find(
        (row) => row.isValid !== "Y" && row.isValid !== "N",
      );

      if (invalidDocument) {
        console.log("Document without selection:", invalidDocument);
        console.log("All scrutiny documents:", scrutinyDocuments);

        alert("Please select Yes or No for all documents.");
        return;
      }

      // VALIDATION 2: Remarks mandatory only when Valid = No

      const remarksMissing = scrutinyDocuments.find(
        (row) => row.isValid === "N" && !row.remarks?.trim(),
      );

      if (remarksMissing) {
        alert("Please give remark.");

        remarksInputRefs.current[remarksMissing.docId]?.focus();

        return;
      }

      // VALIDATION 3: Application Complete checking

      const hasInvalidDocument = scrutinyDocuments.some(
        (row) => row.isValid === "N",
      );

      if (hasInvalidDocument && applicationComplete !== "N") {
        alert("Please select No for Whether Application is Complete?");
        return;
      }

      if (!hasInvalidDocument && applicationComplete !== "Y") {
        alert(
          "All documents are valid. Please select Yes for Whether Application is Complete?",
        );
        return;
      }

      // ALL VALIDATIONS PASSED - CALL SAVE API

      const applicationIdNo =
        selectedApplication?.ApplicationIdNo ??
        selectedApplication?.applicationIdNo;

      const flowData = await getApplicationFlowUser(applicationIdNo);

      if (!flowData) {
        return;
      }

      const userId = localStorage.getItem("userId");

      const userTypeCode = flowData.userTypeCode;

      const payload = scrutinyDocuments.map((row) => ({
        applicationIdNo: applicationIdNo,
        userId: userId,
        userTypeCode: userTypeCode,
        docId: row.docId,
        isValid: row.isValid,
        remarks: row.remarks || "",
        remarkDate: new Date().toISOString(),
      }));

      console.log("Scrutiny Save Payload:", payload);

      const response = await fetch(
        "http://localhost:5214/api/ApplicationScruitinyStatus/ApplicationScruitinyStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Scrutiny save failed.");
      }

      alert("Application Scrutiny Successfully Done!");

      setShowScrutinyPopup(false);
    } catch (error) {
      console.error("Scrutiny Save Error:", error);

      alert(error.message || "Something went wrong.");
    }
  };

  const handleScrutinyApplication = async (application) => {
    debugger;

    console.log("Selected Application:", application);

    setSelectedApplication(application);
    setShowScrutinyPopup(true);
    setScrutinyDocuments([]);
    setScrutinyError("");
    setScrutinyLoading(true);

    // useEffect(() => {
    //   getDocuments();
    // }, []);

    // const getDocuments = async () => {
    try {
      const applicationIdNo =
        application.ApplicationIdNo ?? application.applicationIdNo;
      if (!applicationIdNo) {
        throw new Error("Application ID not found.");
      }
      // const url = `http://localhost:5214/api/ApplicationScruitinyStatus/GetApplicationScruitinyStatus?applicationIdNo=${encodeURIComponent(application.ApplicationIdNo)}`;
      const url = `http://localhost:5214/api/ApplicationScruitinyStatus/GetApplicationScruitinyStatus?applicationIdNo=${encodeURIComponent(applicationIdNo)}`;
      const response = await fetch(url);
      // response = await response.json();
      // console.log("response", response);

      if (!response.ok) {
        throw new Error("Unable to load scrutiny data");
      }

      const data = await response.json();
      console.log("Scrutiny API Response:", data);
      setScrutinyDocuments(data || []);
    } catch (error) {
      console.error("Scrutiny API Error:", error);
      setScrutinyError(error.message);
    } finally {
      setScrutinyLoading(false);
    }
  };

  const handleForwardAction = async () => {
    try {
      debugger;
      if (!remarks.trim()) {
        alert("Please enter remarks.");
        return;
      }

      console.log("Selected Application:", selectedForwardApplication.applicationIdNo);

      const applicationIdNo = selectedForwardApplication.applicationIdNo;
      //application.ApplicationIdNo ?? application.applicationIdNo;

      if (!applicationIdNo) {
        throw new Error("Application ID not found.");
      }

      const regId = localStorage.getItem("regId");

      if (!regId) {
        throw new Error("Applicant ID not found. Please login again.");
      }

      // STEP 1: Get FlowUpto dynamically
      const flowResponse = await fetch(
        `http://localhost:5214/api/ApplicationFlow/GetApplicationFlowUser?applicationIdNo=${encodeURIComponent(applicationIdNo)}`,
      );

      if (!flowResponse.ok) {
        throw new Error(
          `Unable to get application flow details: ${await flowResponse.text()}`,
        );
      }

      const flowData = await flowResponse.json();

      const flowUpto = String(flowData.flowUpto);

      console.log("FlowUpto:", flowUpto);

      // STEP 2: Prepare all PlaAccessPermissionHistory columns
      const currentDate = new Date().toISOString();

      const obj = {
        applicationIdNo: applicationIdNo,
        flowUpto: flowUpto,

        transactionSiNo: 0, // Generated by backend
        transactionDate: currentDate,

        senderUserTypeCode: "00",
        senderUserID: regId,
        senderForwardingLevel: 0,

        receiverUserTypeCode: "",
        receiverUserID: null,
        receiverForwardingLevel: null,

        preScrutinyStatus: null,
        fixDateEnquiry: null,

        transactionRemarks: "Application forwarded by applicant",
        transactionStatusCode: "F",

        oprDate: currentDate,
      };

      console.log("Forwarding Object:", obj);

      // STEP 3: Save forwarding history
      const response = await fetch(
        "http://localhost:5214/api/ApplicationFlow/AccessPermissionHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        },
      );

      const responseText = await response.text();

      console.log("HTTP Status:", response.status);
      console.log("API Response:", responseText);

      if (!response.ok) {
        throw new Error(responseText);
      }

      const data = JSON.parse(responseText);

      if (!data.success) {
        throw new Error(data.message || "Application forwarding failed.");
      }

      console.log("Saved History:", data);

      alert(data.message);
    } catch (error) {
      console.error("Forward Application Error:", error);
      alert(error.message || "Unable to forward application.");
    }
  };

  const handleForwardSubmit = async (application) => {
    debugger;

    console.log("Selected Application:", application);

    setSelectedForwardApplication(application);
    setShowForwardPopup(true);
    setForwardError("");
    setForwardLoading(true);
    setRemarks("");
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
                      onClick={() => handleScrutinyApplication(application)}
                    >
                      Scrutiny Application
                    </button>

                    <button
                      type="button"
                      className="table-link"
                      onClick={() => handleForwardSubmit(application)}
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

              <p>
                Application ID:
                {selectedApplication?.ApplicationIdNo ??
                  selectedApplication?.applicationIdNo}
              </p>

              <div className="scrutiny-table-container">
                <table className="scrutiny-table">
                  <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "38%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "6%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "16%" }} />
                  </colgroup>
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
                    {scrutinyLoading ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>
                          Loading scrutiny documents...
                        </td>
                      </tr>
                    ) : scrutinyError ? (
                      <tr>
                        <td
                          colSpan="7"
                          style={{ textAlign: "center", color: "red" }}
                        >
                          {scrutinyError}
                        </td>
                      </tr>
                    ) : scrutinyDocuments.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>
                          No documents found.
                        </td>
                      </tr>
                    ) : (
                      scrutinyDocuments.map((row, index) => (
                        <tr key={`${row.docId}-${index}`}>
                          <td>{index + 1}</td>

                          <td className="scrutiny-doc-name">{row.docDesc}</td>

                          <td>
                            {row.uploadStatus === "Y"
                              ? "Yes"
                              : row.uploadStatus}
                          </td>

                          <td>
                            {row.document === "A"
                              ? "Personal Documents"
                              : row.document === "S"
                                ? "Site Documents"
                                : row.document}
                          </td>

                          <td>
                            {row.docUrl ? (
                              <a
                                href={row.docUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>

                          <td>
                            <label>
                              <input
                                type="radio"
                                name={`valid-${index}`}
                                value="Y"
                                checked={row.isValid === "Y"}
                                onChange={() => {
                                  setScrutinyDocuments((prev) =>
                                    prev.map((item, i) =>
                                      i === index
                                        ? { ...item, isValid: "Y" }
                                        : item,
                                    ),
                                  );
                                }}
                              />
                              Yes
                            </label>

                            <label>
                              <input
                                type="radio"
                                name={`valid-${index}`}
                                value="N"
                                checked={row.isValid === "N"}
                                onChange={() => {
                                  setScrutinyDocuments((prev) =>
                                    prev.map((item, i) =>
                                      i === index
                                        ? { ...item, isValid: "N" }
                                        : item,
                                    ),
                                  );
                                }}
                              />
                              No
                            </label>
                          </td>

                          <td>
                            <input
                              type="text"
                              className="scrutiny-remarks"
                              placeholder="Remarks"
                              value={row.remarks || ""}
                              ref={(el) => {
                                remarksInputRefs.current[row.docId] = el;
                              }}
                              onChange={(e) => {
                                setScrutinyDocuments((prev) =>
                                  prev.map((item, i) =>
                                    i === index
                                      ? { ...item, remarks: e.target.value }
                                      : item,
                                  ),
                                );
                              }}
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="scrutiny-complete">
                <strong>Whether Application is Complete?</strong>

                <label>
                  <input
                    type="radio"
                    name="applicationComplete"
                    value="Y"
                    checked={applicationComplete === "Y"}
                    onChange={(e) => setApplicationComplete(e.target.value)}
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    name="applicationComplete"
                    value="N"
                    checked={applicationComplete === "N"}
                    onChange={(e) => setApplicationComplete(e.target.value)}
                  />
                  No
                </label>
              </div>

              <div className="scrutiny-footer">
                {/* <button type="button">Previous Remarks</button> */}

                <button
                  type="button"
                  className="scrutiny-submit"
                  onClick={handleSubmitScruiny}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForwardPopup && (
        <div className="modal-overlay">
          <div className="remarks-modal">
            <div className="remarks-modal-header">
              <span>Forward Application</span>

              <button
                type="button"
                className="modal-close"
                onClick={() => {
                  setRemarks(""); 
                  setShowForwardPopup(false)}}
              >
                X
              </button>
            </div>

            <div className="scrutiny-content">
              <h2>Application Details</h2>

              <p>
                Application ID :-
                {selectedForwardApplication?.ApplicationIdNo ??
                  selectedForwardApplication?.applicationIdNo}
              </p>

              <div className="remarks-modal-body">
                {/* Remarks Textarea */}
                <div className="remarks-container">
                  <textarea
                    rows="10"
                    placeholder="Type your message here..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>

                <div className="forward-button-container">
                  <button
                    type="button"
                    className="forward-btn"
                    onClick={handleForwardAction}
                  >
                    Forward Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActOnNewLicenseApplication;
