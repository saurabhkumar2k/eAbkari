import React, { useEffect, useState } from "react";
import "./HcrLicenseSelector.css";

export default function HcrLicenseSelector({
  regId,
  onContinue,
}) {
  const [ownerTypes, setOwnerTypes] = useState([]);
  const [licenseGroups, setLicenseGroups] = useState([]);

  // Store selected values as objects
  const [selectedOwnerType, setSelectedOwnerType] = useState({
    code: "",
    desc: "",
  });

  const [selectedLicensee, setSelectedLicensee] = useState({
    code: "",
    desc: "",
  });

  // =====================================================
  // Get Owner Types
  // =====================================================
  useEffect(() => {
    const fetchOwnerTypes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5214/api/LGDiretory/GetOwnerTypes"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Owner Types");
        }

        const data = await response.json();

        console.log("Owner Types:", data);

        setOwnerTypes(data);
      } catch (error) {
        console.error("Owner Type API Error:", error);
      }
    };

    fetchOwnerTypes();
  }, []);

  // =====================================================
  // Get HCR License Categories
  // =====================================================
  useEffect(() => {
    const fetchLicenseCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5214/api/LiquorMaster/GetHCRLicenseeCategory"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch License Categories");
        }

        const data = await response.json();

        console.log("License Categories API:", data);

        // Only keep required fields
        const formattedData = data.map((item) => ({
          licenseeCatCode: item.licenseeCatCode,
          licenseeCatDesc: item.licenseeCatDesc,
        }));

        setLicenseGroups(formattedData);
      } catch (error) {
        console.error("License Category API Error:", error);
      }
    };

    fetchLicenseCategories();
  }, []);

  // =====================================================
  // Continue
  // =====================================================
  const handleContinue = () => {
    if (!selectedOwnerType.code) {
      alert("Please select Owner Type");
      return;
    }

    if (!selectedLicensee.licenseeCatCode) {
      alert("Please select a Licensee");
      return;
    }

    const selectedData = {
      ownerType: selectedOwnerType,
      selectedLicensee: selectedLicensee,
      regId: regId,
    };

    console.log("Selected HCR Data:", selectedData);

    onContinue(selectedData);
  };

  return (
    <div className="hcr-selector-wrapper">
      <div className="hcr-selector-card">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="hcr-selector-header">
          <div className="hcr-selector-icon">
            <span>🍷</span>
          </div>

          <div>
            <h2>HCR License Application</h2>

            <p>
              Select the owner type and license category to
              continue with your application.
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <div className="hcr-selector-form">

          {/* ================================================= */}
          {/* OWNER TYPE */}
          {/* ================================================= */}

          <div className="hcr-field">
            <label htmlFor="ownerType">
              Owner Type
              <span className="required">*</span>
            </label>

            <select
              id="ownerType"
              value={selectedOwnerType.code}
              onChange={(e) => {
                const code = e.target.value;

                const desc =
                  e.target.options[e.target.selectedIndex].text;

                setSelectedOwnerType({
                  code: code,
                  desc: code ? desc : "",
                });
              }}
            >
              <option value="">
                Select Owner Type
              </option>

              {ownerTypes.map((item) => (
                <option
                  key={item.id}
                  value={item.otid}
                >
                  {item.ownerTypeName}
                </option>
              ))}
            </select>
          </div>

          {/* ================================================= */}
          {/* LICENSEE CARDS */}
          {/* ================================================= */}

          <div className="hcr-license-section">

            <div className="hcr-license-title-row">
              <div>
                <label>
                  Select Licensee
                  <span className="required">*</span>
                </label>

                <p>
                  Choose the license category applicable to
                  your business.
                </p>
              </div>

              {selectedLicensee.licenseeCatCode && (
                <span className="hcr-selected-badge">
                  Selected
                </span>
              )}
            </div>

            <div className="hcr-license-grid">

              {licenseGroups.map((license) => {

                // IMPORTANT:
                // Compare selectedLicensee.code with API code
                const isSelected =
                  selectedLicensee.licenseeCatCode ===
                  license.licenseeCatCode;

                return (
                  <button
                    type="button"
                    key={license.licenseeCatCode}
                    className={`hcr-license-item ${
                      isSelected
                        ? "hcr-license-item-selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedLicensee({
                        licenseeCatCode: license.licenseeCatCode,
                        licenseeCatDesc: license.licenseeCatDesc,
                      })
                    }
                  >
                    {/* Radio circle */}
                    <div
                      className={`hcr-license-radio ${
                        isSelected
                          ? "hcr-license-radio-selected"
                          : ""
                      }`}
                    >
                      {isSelected && (
                        <span>✓</span>
                      )}
                    </div>

                    {/* License information */}
                    <div className="hcr-license-info">

                      <div className="hcr-license-description">
                        {license.licenseeCatDesc}
                      </div>

                    </div>
                  </button>
                );
              })}

              {licenseGroups.length === 0 && (
                <div className="hcr-no-license">
                  No license categories available.
                </div>
              )}

            </div>
          </div>

          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <div className="hcr-selector-footer">

            <div className="hcr-selection-summary">

              {/* Owner Type */}
              <div>
                <span>Owner Type</span>

                <strong>
                  {selectedOwnerType.code
                    ? selectedOwnerType.desc
                    : "Not selected"}
                </strong>
              </div>

              {/* Licensee */}
              <div>
                <span>Licensee</span>

                <strong>
                  {selectedLicensee.licenseeCatCode
                    ? selectedLicensee.licenseeCatDesc
                    : "Not selected"}
                </strong>
              </div>

            </div>

            <button
              type="button"
              className="hcr-continue-button"
              onClick={handleContinue}
            >
              <span>Continue Application</span>
              <span className="hcr-arrow">→</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}