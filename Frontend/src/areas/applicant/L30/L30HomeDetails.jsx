import React, { useState, useEffect } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5214";

export default function L30HomeDetails({
  formData = {},
  onChange,
  onNext,
  onPrevious
}) {
  const [states, setStates] = useState([]);
  const [homeDistricts, setHomeDistricts] = useState([]);
  const [homeSubDivisions, setHomeSubDivisions] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);

  const handleFieldChange = (field, value) => {
    onChange?.(field, value);
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/api/LGDiretory/getState`
        );

        if (!response.ok) {
          throw new Error(
            `State lookup failed (${response.status})`
          );
        }

        const data = await response.json();
        setStates(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]);
      }
    };

    fetchStates();
  }, []);

  const fetchDistricts = async (stateCode) => {
    if (!stateCode) {
      setHomeDistricts([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/LGDiretory/GetDistrict?Statecode=${encodeURIComponent(
          stateCode
        )}`
      );

      if (!response.ok) {
        throw new Error(
          `District lookup failed (${response.status})`
        );
      }

      const data = await response.json();
      setHomeDistricts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("District lookup error:", error);
      setHomeDistricts([]);
    }
  };

  const fetchSubDivisions = async (districtCode) => {
    if (!districtCode) {
      setHomeSubDivisions([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/LGDiretory/getSubDivision?districtCode=${encodeURIComponent(
          districtCode
        )}`
      );

      if (!response.ok) {
        throw new Error(
          `Sub-division lookup failed (${response.status})`
        );
      }

      const data = await response.json();
      setHomeSubDivisions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Sub-division lookup error:", error);
      setHomeSubDivisions([]);
    }
  };

  const fetchPoliceStations = async (districtCode) => {
    if (!districtCode) {
      setPoliceStations([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/LGDiretory/PoliceStations/${encodeURIComponent(
          districtCode
        )}`
      );

      if (!response.ok) {
        throw new Error(
          `Police-station lookup failed (${response.status})`
        );
      }

      const data = await response.json();
      setPoliceStations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Police-station lookup error:", error);
      setPoliceStations([]);
    }
  };

  useEffect(() => {
    if (formData.stateId) {
      fetchDistricts(formData.stateId);
    } else {
      setHomeDistricts([]);
    }
  }, [formData.stateId]);

  useEffect(() => {
    if (formData.districtCode) {
      fetchSubDivisions(formData.districtCode);
      fetchPoliceStations(formData.districtCode);
    } else {
      setHomeSubDivisions([]);
      setPoliceStations([]);
    }
  }, [formData.districtCode]);

  return (
    <div className="l30-home-wrapper">
      <div className="l30-grey-header">Home Details</div>

      <div className="l30-form-card">
        <div className="l30-home-grid">
          <div className="l30-form-group l30-col-full">
            <label className="l30-form-label">
              Home Name <span className="l30-req">*</span>
            </label>

            <input
              type="text"
              value={formData.homeName || ""}
              onChange={(e) =>
                handleFieldChange("homeName", e.target.value)
              }
              className="l30-input"
              placeholder="Home name"
            />
          </div>

          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Address 1 <span className="l30-req">*</span>
            </label>

            <input
              type="text"
              value={formData.homeAddress1 || ""}
              onChange={(e) =>
                handleFieldChange("homeAddress1", e.target.value)
              }
              className="l30-input"
              placeholder="Home Address 1"
            />
          </div>

          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Address 2 <span className="l30-req">*</span>
            </label>

            <input
              type="text"
              value={formData.homeAddress2 || ""}
              onChange={(e) =>
                handleFieldChange("homeAddress2", e.target.value)
              }
              className="l30-input"
              placeholder="Home Address 2"
            />
          </div>

          <div className="l30-form-group">
            <label className="l30-form-label">
              Home State <span className="l30-req">*</span>
            </label>

            <select
              className="l30-input"
              value={formData.stateId || ""}
              onChange={(e) => {
                const stateCode = e.target.value;

                handleFieldChange("stateId", stateCode);
                handleFieldChange("districtCode", "");
                handleFieldChange("homeSubDivisionCode", "");
                handleFieldChange("psCode", "");

                setHomeDistricts([]);
                setHomeSubDivisions([]);
                setPoliceStations([]);

                if (stateCode) {
                  fetchDistricts(stateCode);
                }
              }}
            >
              <option value="">Select State</option>

              {states.map((state) => (
                <option
                  key={state.sid}
                  value={state.stateCode}
                >
                  {state.stateName}
                </option>
              ))}
            </select>
          </div>

          <div className="l30-form-group">
            <label className="l30-form-label">
              Home District <span className="l30-req">*</span>
            </label>

            <select
              className="l30-input"
              value={formData.districtCode || ""}
              onChange={(e) => {
                const districtCode = e.target.value;

                handleFieldChange("districtCode", districtCode);
                handleFieldChange("homeSubDivisionCode", "");
                handleFieldChange("psCode", "");

                setHomeSubDivisions([]);
                setPoliceStations([]);

                if (districtCode) {
                  fetchSubDivisions(districtCode);
                  fetchPoliceStations(districtCode);
                }
              }}
            >
              <option value="">Select District</option>

              {homeDistricts.map((district) => (
                <option
                  key={district.did}
                  value={district.districtCode}
                >
                  {district.districtName}
                </option>
              ))}
            </select>
          </div>

          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Sub Division <span className="l30-req">*</span>
            </label>

            <select
              className="l30-input"
              value={formData.homeSubDivisionCode || ""}
              onChange={(e) =>
                handleFieldChange(
                  "homeSubDivisionCode",
                  e.target.value
                )
              }
            >
              <option value="">Select Sub Division</option>

              {homeSubDivisions.map((item) => (
                <option
                  key={item.dvid}
                  value={item.subDivisionCode}
                >
                  {item.subDivisionName}
                </option>
              ))}
            </select>
          </div>

          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Police Station <span className="l30-req">*</span>
            </label>

            <select
              className="l30-input"
              value={formData.psCode || ""}
              onChange={(e) =>
                handleFieldChange("psCode", e.target.value)
              }
            >
              <option value="">Select Police Station</option>

              {policeStations.map((station) => (
                <option
                  key={station.psCode}
                  value={station.psCode}
                >
                  {station.psName}
                </option>
              ))}
            </select>
          </div>

          <div className="l30-form-group">
            <label className="l30-form-label">
              Home PIN <span className="l30-req">*</span>
            </label>

            <input
              type="text"
              value={formData.homePin || ""}
              onChange={(e) =>
                handleFieldChange("homePin", e.target.value)
              }
              className="l30-input"
              placeholder="PIN code"
            />
          </div>

          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Ward Name
            </label>

            <input
              type="text"
              value={formData.homeWardName || ""}
              onChange={(e) =>
                handleFieldChange("homeWardName", e.target.value)
              }
              className="l30-input"
              placeholder="Ward name"
            />
          </div>

          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Email <span className="l30-req">*</span>
            </label>

            <input
              type="email"
              value={formData.homeEmail || ""}
              onChange={(e) =>
                handleFieldChange("homeEmail", e.target.value)
              }
              className="l30-input"
              placeholder="name@example.com"
            />
          </div>

          <div className="l30-form-group">
            <label className="l30-form-label">
              Home Mobile <span className="l30-req">*</span>
            </label>

            <input
              type="text"
              value={formData.homeMobile || ""}
              onChange={(e) =>
                handleFieldChange("homeMobile", e.target.value)
              }
              className="l30-input"
              placeholder="Mobile number"
            />
          </div>
        </div>

        <div className="l30-action-footer">
          {onPrevious && (
            <button
              type="button"
              onClick={onPrevious}
              className="l30-btn-prev"
            >
              Previous
            </button>
          )}

          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="l30-btn-next"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}