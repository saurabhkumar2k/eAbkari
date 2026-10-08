import React from "react";
// import "../Style/ApplyLicense.css";

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
  Train,
  Utensils,
} from "lucide-react";

import { Cat_Label } from "../areas/applicant/HCR/validation";
import TrainRute from "./TrainRute";

const TrainDetails = ({
  trainFrom,
  CatCode,
  errors = {},
  onChange,
  onTrainDetailChange,
  onAddTrainDetail,
  ondeleteTrainDetail,
  ConstitutionType,
}) => {
  // console.log("RestaurantDetails",siteForm)

  return (
    <div className="hcr-applicant-container animate-fade text-left">
      {/* HEADER */}
      <div className="premium-header">
        <div className="icon-box">
          <Train size={28} />
        </div>
        <div>
          <h2>{Cat_Label[CatCode]} Details</h2>
          <p>Enter {Cat_Label[CatCode]} location & contact info</p>
        </div>
      </div>

      {/* ================= BASIC ================= */}

      <div className="card-section">
        <h3>Train Details</h3>
        <div className="hcr-form-grid">
          {/* Company/Corporation/Board Operating the Train */}
          <div className="form-group">
            <label className="hcr-form-label">
              Company/Corporation/Board Operating the Train{" "}
              <span className="required">*</span>
            </label>

            <div className="reg-input-group">
              <input
                className="input-box"
                type="text"
                placeholder="Enter Company/Corporation/Board name"
                value={trainFrom.CompanyName}
                onChange={(e) => onChange("CompanyName", e.target.value)}
              />
            </div>
            {errors.CompanyName && (
              <p className="error-text">{errors.CompanyName}</p>
            )}
          </div>

          {/* Train Name */}
          <div className="form-group">
            <label className="hcr-form-label">
              {Cat_Label[CatCode]} Name <span className="required">*</span>
            </label>

            <div className="reg-input-group">
              <input
                className="input-box"
                type="text"
                placeholder="Enter train name"
                maxLength={50}
                value={trainFrom.TrainName}
                onChange={(e) => onChange("TrainName", e.target.value)}
              />
            </div>
            {errors.TrainName && (
              <p className="error-text">{errors.TrainName}</p>
            )}
          </div>

          {/* Train Number  */}
          <div className="form-group">
            <label className="hcr-form-label">
              Train Number
              <span className="required">*</span>
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Train Number"
              maxLength={7}
              value={trainFrom.TrainNumber || ""}
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  onChange("TrainNumber", value);
                }
              }}
              className="input-box"
            />
            {errors.TrainNumber && (
              <p className="error-text">{errors.TrainNumber}</p>
            )}
          </div>

          {/* Address of temporary store in case of Train goes under maintainance */}
          <div className="form-group">
            <label className="hcr-form-label">
              Address of temporary store in case of Train goes under
              maintainance
              <span className="required">*</span>
            </label>

            <input
              type="text"
              placeholder="Address of temporary stor"
              value={trainFrom.TempAddress}
              onChange={(e) => {
                const value = e.target.value;

                onChange("TempAddress", value);
              }}
              maxLength={100}
              className="input-box"
            />
            {errors.TempAddress && (
              <p className="error-text">{errors.TempAddress}</p>
            )}
          </div>

          {/* Train Originate from */}
          <div className="form-group">
            <label className="hcr-form-label">
              Train Originate from
              <span className="required">*</span>
            </label>

            <input
              type="text"
              placeholder="Train Originate from"
              value={trainFrom.OriginateFrom}
              onChange={(e) => {
                const value = e.target.value;

                onChange("OriginateFrom", value);
              }}
              maxLength={50}
              className="input-box"
            />
            {errors.OriginateFrom && (
              <p className="error-text">{errors.OriginateFrom}</p>
            )}
          </div>

          {/* Number of compartments */}
          <div className="form-group">
            <label className="hcr-form-label">
              Number of compartments
              <span className="required">*</span>
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Number of compartments"
              value={trainFrom.NumberOfcompartments}
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  onChange("NumberOfcompartments", value);
                }
              }}
              maxLength={2}
              className="input-box"
            />
            {errors.NumberOfcompartments && (
              <p className="error-text">{errors.NumberOfcompartments}</p>
            )}
          </div>

          {/* Number of Seat Covers in dinning car */}
          <div className="form-group">
            <label className="hcr-form-label">
              Number of Seat Covers in dinning car
              <span className="required">*</span>
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Number of Seat Covers in dinning car"
              value={trainFrom.NumberOfSeatCovers}
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  onChange("NumberOfSeatCovers", value);
                }
              }}
              maxLength={3}
              className="input-box"
            />
            {errors.NumberOfSeatCovers && (
              <p className="error-text">{errors.NumberOfSeatCovers}</p>
            )}
          </div>

          {/* Number of Dispensing Counter */}
          <div className="form-group">
            <label className="hcr-form-label">
              Number of Dispensing Counter
              <span className="required">*</span>
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Number of Dispensing Counter"
              value={trainFrom.NumberOfDispensingCounter}
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  onChange("NumberOfDispensingCounter", value);
                }
              }}
              maxLength={1}
              className="input-box"
            />
            {errors.NumberOfDispensingCounter && (
              <p className="error-text">{errors.NumberOfDispensingCounter}</p>
            )}
          </div>

          {/* Number of Managers */}
          <div className="form-group">
            <label className="hcr-form-label">
              Number of Managers
              <span className="required">*</span>
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Number of Managers"
              value={trainFrom.NumberOfManagers}
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  onChange("NumberOfManagers", value);
                }
              }}
              maxLength={2}
              className="input-box"
            />
            {errors.NumberOfManagers && (
              <p className="error-text">{errors.NumberOfManagers}</p>
            )}
          </div>

          {/* Number of Kitchen Staff  */}
          <div className="form-group">
            <label className="hcr-form-label">
              Number of Kitchen Staff
              <span className="required">*</span>
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Number of Kitchen Staff "
              value={trainFrom.NumberOfKitchenStaff}
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  onChange("NumberOfKitchenStaff", value);
                }
              }}
              maxLength={2}
              className="input-box"
            />
            {errors.NumberOfKitchenStaff && (
              <p className="error-text">{errors.NumberOfKitchenStaff}</p>
            )}
          </div>

          {/* Utility Employees */}
          <div className="form-group">
            <label className="hcr-form-label">
              Utility Employees
              <span className="required">*</span>
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Utility Employees"
              value={trainFrom.NumberOfUtlityEmployees}
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  onChange("NumberOfUtlityEmployees", value);
                }
              }}
              maxLength={2}
              className="input-box"
            />
            {errors.NumberOfUtlityEmployees && (
              <p className="error-text">{errors.NumberOfUtlityEmployees}</p>
            )}
          </div>

          {/* Number of Train Attendant */}
          <div className="form-group">
            <label className="hcr-form-label">
              Number of Train Attendant
              <span className="required">*</span>
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Number of Train Attendant"
              value={trainFrom.NumberOfBarAttendent}
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d*$/.test(value)) {
                  onChange("NumberOfBarAttendent", value);
                }
              }}
              maxLength={2}
              className="input-box"
            />
            {errors.NumberOfBarAttendent && (
              <p className="error-text">{errors.NumberOfBarAttendent}</p>
            )}
          </div>

          <div className="form-group full-width">
            {(CatCode === "52" || CatCode === "43") && (
              <TrainRute
                routes={trainFrom?.routes || []}
                ConstitutionType={ConstitutionType}
                onChange={onTrainDetailChange}
                onAdd={onAddTrainDetail}
                onDelete={ondeleteTrainDetail}
                errors={errors?.trainError}
              />
            )}
            <div className="error-text-container">
              {errors?.TrainRuteGlobalError && (
                <span className="error-text-all">
                  {errors?.TrainRuteGlobalError}
                </span>
              )}
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

export default TrainDetails;
