import React from "react";
import "../Style/ApplyLicense.css";

import {
  Warehouse,
  Building2,
  Home,
  User,
  ChevronDown,
  MapPinned,
  Hash,
  Map,
  Shield,
  Mail,
  Phone,
  PhoneCall,
  FileText,
  Calendar,
  Clock3,
  Store,
} from "lucide-react";

const RestaurantDetails = ({
  siteForm,
  states = [],
  districts = [],
  subDivisions = [],
  policeStations = [],
  onChange,
}) => {

  console.log("RestaurantDetails",siteForm)
  return (
    <div className="premium-form">
      {/* HEADER */}
      <div className="premium-header">
        <div className="icon-box">🏬</div>
        <div>
          <h2>Restaurant Details</h2>
          <p>Enter Restaurant location & contact info</p>
        </div>
      </div>

      {/* ================= BASIC ================= */}

      <div className="card-section">
        <h3>Basic Details</h3>

        <div className="form-grid">
          <div className="reg-field">
            <label className="reg-label">
              Restaurant Name <span className="required">*</span>
            </label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Store className="w-4 h-4 text-blue-600" />
              </div>

              <input
                className="reg-input"
                type="text"
                value={siteForm.SiteName}
                onChange={(e) => onChange("SiteName", e.target.value)}
              />
            </div>
          </div>

          <div className="reg-field">
            <label className="reg-label">
              Address Line 1 <span className="required">*</span>
            </label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Home className="w-4 h-4 text-blue-600" />
              </div>

              <input
                type="text"
                className="reg-input"
                value={siteForm.SiteAddress}
                onChange={(e) => onChange("SiteAddress", e.target.value)}
                placeholder="Enter Address Line 1"
              />
            </div>
          </div>

          <div className="reg-field">
            <label className="reg-label">
              Address Line 2 <span className="required">*</span>
            </label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Home className="w-4 h-4 text-blue-600" />
              </div>

              <input
                type="text"
                className="reg-input"
                value={siteForm.SiteAddress2}
                onChange={(e) => onChange("SiteAddress2", e.target.value)}
                placeholder="Enter Address Line 2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= LOCATION ================= */}
      <div className="card-section">
        <h3>Location Details</h3>

        <div className="form-grid">
          {/* State */}
          <div className="reg-field">
            <label className="reg-label">
              State <span className="required">*</span>
            </label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <MapPinned className="w-4 h-4 text-blue-600" />
              </div>

              <select
                className="reg-select"
                name="state"
                value={siteForm.State}
                onChange={(e) => onChange("State", e.target.value.trim())}
              >
                <option value="">Select State</option>

                {states.map((state) => (
                  <option key={state.sid} value={state.stateCode.trim()}>
                    {state.stateName}
                  </option>
                ))}
              </select>

              <div className="reg-input-icon-right">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* District */}
          <div className="reg-field">
            <label className="reg-label">
              District <span className="required">*</span>
            </label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>

              <select
                className="reg-select"
                value={siteForm.DistrictCode}
                disabled={!siteForm.State}
                onChange={(e) => onChange("DistrictCode", e.target.value)}
              >
                <option value="">Select District</option>

                {(districts || []).map((d) => (
                  <option key={d.did} value={d.districtCode}>
                    {d.districtName}
                  </option>
                ))}
              </select>

              <div className="reg-input-icon-right">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Sub Division */}
          <div className="reg-field">
            <label className="reg-label">Sub Division <span className="required">*</span></label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Map className="w-4 h-4 text-blue-600" />
              </div>

              <select
                className="reg-select"
                value={siteForm.SubDivisionCode}
                onChange={(e) =>
                  onChange("SubDivisionCode", e.target.value)
                }
              >
                <option value="">Select Sub Division</option>

                {(subDivisions || []).map((s) => (
                  <option key={s.subDivisionCode} value={s.subDivisionCode}>
                    {s.subDivisionName}
                  </option>
                ))}
              </select>

              <div className="reg-input-icon-right">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Police Station */}
          <div className="reg-field">
            <label className="reg-label">Police Station <span className="required">*</span></label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>

              <select
                className="reg-select"
                value={siteForm.PoliceStationCode}
                onChange={(e) =>
                  onChange("PoliceStationCode", e.target.value)
                }
              >
                <option value="">Select Police Station</option>

                {(policeStations || []).map((p) => (
                  <option key={p.psCode} value={p.psCode}>
                    {p.psName}
                  </option>
                ))}
              </select>

              <div className="reg-input-icon-right">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* PIN */}
          <div className="reg-field">
            <label className="reg-label">
              PIN Code <span className="required">*</span>
            </label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Hash className="w-4 h-4 text-blue-600" />
              </div>

              <input
                type="text"
                className="reg-input"
                maxLength={6}
                value={siteForm.SitePin}
                onChange={(e) =>
                  onChange("SitePin", e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter PIN Code"
              />
            </div>
          </div>

          {/* Constituency Area */}
          {/* <div className="reg-field">
                        <label className="reg-label">
                            <span>Constituency Area</span>
                            <span className="required">*</span>
                        </label>

                        <div className="reg-input-group">
                            <div className="reg-input-icon">
                                <Shield className="w-4 h-4 text-blue-600" />
                            </div>

                            <select
                                className="reg-select"
                                value={siteForm.SiteAssembly || ""}
                                onChange={(e) => onChange("RestaurantConstituency", e.target.value)}
                            >
                                <option value="">Select Constituency Station</option>

                                {(Constituencys || []).map((p) => (
                                    <option key={p.psCode} value={p.psCode}>
                                        {p.psName}
                                    </option>
                                ))}
                            </select>

                            <div className="reg-input-icon-right">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                    </div> */}

          {/* Ward Name */}
          {/* <div className="form-group">
                        <label className="hcr-form-label">
                            Ward Name
                        </label>

                        <input
                            type="text"
                            placeholder="Ward Name"
                            value={siteForm.SiteWard}
                            onChange={(e) =>
                                onChange("RestaurantWard", e.target.value)
                            }
                            className="input-box"
                        />
                    </div> */}
        </div>
      </div>

      {/* ================= CONTACT ================= */}
      <div className="card-section">
        <h3>Contact Details</h3>

        <div className="form-grid">
          {/* Email */}
          <div className="reg-field">
            <label className="reg-label">Email <span className="required">*</span></label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>

              <input
                type="email"
                className="reg-input"
                placeholder="Enter Email"
                value={siteForm.SiteEmail}
                onChange={(e) => onChange("SiteEmail", e.target.value)}
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="reg-field">
            <label className="reg-label">Mobile <span className="required">*</span></label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>

              <input
                type="text"
                className="reg-input"
                maxLength={10}
                placeholder="Enter Mobile Number"
                value={siteForm.SiteMobile}
                onChange={(e) =>
                  onChange(
                    "SiteMobile",
                    e.target.value.replace(/\D/g, ""),
                  )
                }
              />
            </div>
          </div>

          {/* Landline */}
          <div className="reg-field">
            <label className="reg-label">Landline</label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <PhoneCall className="w-4 h-4 text-blue-600" />
              </div>

              <input
                type="text"
                className="reg-input"
                placeholder="Enter Landline Number"
                value={siteForm.SiteLandline}
                onChange={(e) =>
                  onChange(
                    "SiteLandline",
                    e.target.value.replace(/\D/g, ""),
                  )
                }
              />
            </div>
          </div>

          {/* Fax */}
          <div className="reg-field">
            <label className="reg-label">Fax</label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <PhoneCall className="w-4 h-4 text-blue-600" />
              </div>

              <input
                type="text"
                className="reg-input"
                placeholder="Enter Fax Number"
                value={siteForm.SiteFax}
                onChange={(e) =>
                  onChange("SiteFax", e.target.value.replace(/\D/g, ""))
                }
              />
            </div>
          </div>

          {/* SitePan */}
          <div className="reg-field">
            <label className="reg-label">PanNo</label>

            <div className="reg-input-group">
              <div className="reg-input-icon">
                <PhoneCall className="w-4 h-4 text-blue-600" />
              </div>

              <input
                type="text"
                className="reg-input"
                placeholder="Enter PanNo Number"
                value={siteForm.SitePan}
                onChange={(e) =>
                  onChange(
                    "SitePan",
                    e.target.value.replace(/\D/g, ""),
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* REUSABLE FIELD */
const Field = ({ icon, label, children }) => (
  <div className="field floating">
    <div className="input-box">
      <span className="input-icon">{icon}</span>
      {children}
      <label>{label}</label>
    </div>
  </div>
);

export default RestaurantDetails;
