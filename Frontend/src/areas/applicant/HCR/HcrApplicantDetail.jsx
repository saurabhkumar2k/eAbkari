import React from "react";
import {
  User,
  Calendar,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  FileText,
  Building,
  Hash,
  Compass
} from "lucide-react";

export default function HcrApplicantDetails({ formData, onChange, errors = {} }) {
  return (
    <div className="hcr-applicant-container animate-fade text-left">
      {/* Informational banner reflecting registered status */}
      <div className="info-banner">
        <div className="info-banner-icon">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="info-banner-title">Pre-filed HCR Registered Profile Information</h4>
          <p className="info-banner-text">
            These applicant details are loaded automatically from your online HCR registry records. You can review and verify the demographic, residential, and verification fields.
          </p>
        </div>
      </div>

      {/* Section 1: Personal Details */}
      <div className="form-section">
        <div className="section-header">
          <h3 className="section-title">
            <span className="section-number">1</span>
            Personal Details
          </h3>
          <p className="section-description">
            Your legal credentials used during Delhi Excise Portal profile registration
          </p>
        </div>

        <div className="form-grid">
          {/* Applicant Name */}
          <div className="reg-field">
            <label className="reg-label label-title flex items-center">
              <span>Applicant Name</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="Enter applicant name"
                className={`reg-input uppercase font-bold text-slate-800 ${
                  errors.applicantName ? "error" : ""
                }`}
                value={formData.applicantName || ""}
                onChange={(e) => onChange("applicantName", e.target.value.toUpperCase())}
              />
            </div>
            {errors.applicantName && (
              <p className="error-text">{errors.applicantName}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="reg-field">
            <label className="reg-label label-title flex items-center">
              <span>Date of Birth</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="date"
                className={`reg-input font-bold text-slate-800 ${
                  errors.dob ? "error" : ""
                }`}
                value={formData.dob || ""}
                onChange={(e) => onChange("dob", e.target.value)}
              />
            </div>
            {errors.dob && (
              <p className="error-text">{errors.dob}</p>
            )}
          </div>

          {/* Father's Name */}
          <div className="reg-field">
            <label className="reg-label label-title">Father / Husband Name</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="Father's / Husband's Name"
                className="reg-input uppercase font-bold text-slate-800"
                value={formData.fatherName || ""}
                onChange={(e) => onChange("fatherName", e.target.value.toUpperCase())}
              />
            </div>
          </div>

          {/* Occupation */}
          <div className="reg-field">
            <label className="reg-label label-title flex items-center">
              <span>Occupation</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="E.g. BUSINESS"
                className={`reg-input uppercase font-bold text-slate-800 ${
                  errors.occupation ? "error" : ""
                }`}
                value={formData.occupation || ""}
                onChange={(e) => onChange("occupation", e.target.value.toUpperCase())}
              />
            </div>
            {errors.occupation && (
              <p className="error-text">{errors.occupation}</p>
            )}
          </div>

          {/* PAN No */}
          <div className="reg-field">
            <label className="reg-label label-title flex items-center">
              <span>PAN Number</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                maxLength={10}
                placeholder="ABCDE1234F"
                className={`reg-input uppercase font-mono font-bold text-slate-800 ${
                  errors.panNo ? "error" : ""
                }`}
                value={formData.panNo || ""}
                onChange={(e) => onChange("panNo", e.target.value.toUpperCase())}
              />
            </div>
            {errors.panNo && (
              <p className="error-text">{errors.panNo}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Address Details */}
      <div className="form-section">
        <div className="section-header">
          <h3 className="section-title">
            <span className="section-number">2</span>
            Residential Address Details
          </h3>
          <p className="section-description">
            Your permanent address coordinates for official licensing records
          </p>
        </div>

        <div className="form-grid">
          {/* Address 1 */}
          <div className="reg-field full-width">
            <label className="reg-label label-title flex items-center">
              <span>Address Line 1</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="HOUSE / PLOT NO, BUILDING, STREET"
                className={`reg-input font-bold text-slate-800 ${
                  errors.address1 ? "error" : ""
                }`}
                value={formData.address1 || ""}
                onChange={(e) => onChange("address1", e.target.value)}
              />
            </div>
            {errors.address1 && (
              <p className="error-text">{errors.address1}</p>
            )}
          </div>

          {/* Address 2 */}
          <div className="reg-field full-width">
            <label className="reg-label label-title">Address Line 2</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="LOCALITY, AREA, NEAREST LANDMARK"
                className="reg-input font-bold text-slate-800"
                value={formData.address2 || ""}
                onChange={(e) => onChange("address2", e.target.value)}
              />
            </div>
          </div>

          {/* State */}
          <div className="reg-field">
            <label className="reg-label label-title flex items-center">
              <span>State</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Compass className="w-4 h-4 text-blue-600" />
              </div>
              <select
                className="reg-select font-bold text-slate-800"
                value={formData.state || "Delhi"}
                onChange={(e) => onChange("state", e.target.value)}
              >
                <option value="Delhi">Delhi</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>
          </div>

          {/* District */}
          <div className="reg-field">
            <label className="reg-label label-title flex items-center">
              <span>District</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Building className="w-4 h-4 text-blue-600" />
              </div>
              <select
                className="reg-select font-bold text-slate-800"
                value={formData.district || "South"}
                onChange={(e) => onChange("district", e.target.value)}
              >
                <option value="South">South</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Central">Central</option>
                <option value="North">North</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
          </div>

          {/* Sub Division */}
          <div className="reg-field">
            <label className="reg-label label-title flex items-center">
              <span>Sub Division</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Building className="w-4 h-4 text-blue-600" />
              </div>
              <select
                className="reg-select font-bold text-slate-800"
                value={formData.subDivision || "Saket"}
                onChange={(e) => onChange("subDivision", e.target.value)}
              >
                <option value="Saket">Saket</option>
                <option value="Vasant Vihar">Vasant Vihar</option>
                <option value="Hauz Khas">Hauz Khas</option>
                <option value="Mehrauli">Mehrauli</option>
                <option value="Kalkaji">Kalkaji</option>
              </select>
            </div>
          </div>

          {/* PIN */}
          <div className="reg-field">
            <label className="reg-label label-title flex items-center">
              <span>PIN Code</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Hash className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                maxLength={6}
                placeholder="110017"
                className={`reg-input font-mono font-bold text-slate-800 ${
                  errors.pin ? "error" : ""
                }`}
                value={formData.pin || ""}
                onChange={(e) => onChange("pin", e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {errors.pin && (
              <p className="error-text">{errors.pin}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Contact & Access */}
      <div className="form-section">
        <div className="section-header">
          <h3 className="section-title">
            <span className="section-number">3</span>
            Contact Details
          </h3>
          <p className="section-description">
            Active contact information for receiving validation tokens, OTPs, and permit PDF email notifications
          </p>
        </div>

        <div className="form-grid-two">
          {/* Mobile */}
          <div className="reg-field">
            <label className="reg-label label-title flex items-center">
              <span>Mobile Number</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                maxLength={10}
                placeholder="Enter 10-digit mobile"
                className={`reg-input font-mono font-bold text-slate-800 ${
                  errors.mobile ? "error" : ""
                }`}
                value={formData.mobile || ""}
                onChange={(e) => onChange("mobile", e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {errors.mobile && (
              <p className="error-text">{errors.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div className="reg-field">
            <label className="reg-label label-title flex items-center">
              <span>Email Address</span>
              <span className="required">*</span>
            </label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="email"
                placeholder="Enter email address"
                className={`reg-input font-bold text-slate-800 ${
                  errors.email ? "error" : ""
                }`}
                value={formData.email || ""}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="error-text">{errors.email}</p>
            )}
          </div>

          {/* Landline */}
          <div className="reg-field">
            <label className="reg-label label-title">Landline Number</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="Landline number (Optional)"
                className="reg-input font-bold text-slate-800"
                value={formData.landline || ""}
                onChange={(e) => onChange("landline", e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>

          {/* FAX */}
          <div className="reg-field">
            <label className="reg-label label-title">FAX Number</label>
            <div className="reg-input-group">
              <div className="reg-input-icon">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                placeholder="FAX number (Optional)"
                className="reg-input font-bold text-slate-800"
                value={formData.fax || ""}
                onChange={(e) => onChange("fax", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
