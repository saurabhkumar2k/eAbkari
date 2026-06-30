import React, { useState } from "react";
import { Plus, Trash2, Train, AlertCircle, Save } from "lucide-react";

export default function L20({ formData, onChange, errors = {} }) {
  // Routes list helper
  const [routeInput, setRouteInput] = useState("");
  const routes = formData.trainRoutes || [];

  const handleAddRoute = () => {
    if (!routeInput.trim()) return;
    const updated = [...routes, routeInput.trim()];
    onChange("trainRoutes", updated);
    setRouteInput("");
  };

  const handleDeleteRoute = () => {
    if (routes.length === 0) return;
    const updated = [...routes];
    updated.pop(); // Remove the last one as customary or per selection
    onChange("trainRoutes", updated);
  };

  return (
    <div className="l20-container animate-fade">
      {/* Train Details Banner matching screenshot title */}
      <div className="train-title-banner">
        Train Details
      </div>

      <div className="train-form-wrapper text-left">
        <div className="train-grid">
          
          {/* License / Excise Year */}
          <div className="form-group">
            <label className="label-title">
              License / Excise Year
            </label>
            <select
              value={formData.exciseYear || "2025-2026"}
              onChange={(e) => onChange("exciseYear", e.target.value)}
              className="select-box"
            >
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
            </select>
          </div>

          {/* Category License Applied for */}
          <div className="form-group">
            <label className="label-title">
              Category License Applied for
            </label>
            <select
              disabled
              value="L-20"
              className="select-box"
            >
              <option value="L-20">
                L20 (Service of Indian Liquor in a bar/dining car in a luxury train)
              </option>
            </select>
          </div>

          {/* Company/Corporation/Board Operating the Train */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Company/Corporation/Board Operating the Train</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter name of operating company / board"
              value={formData.operatingCompany || ""}
              onChange={(e) => onChange("operatingCompany", e.target.value)}
              className={`input-box ${errors.operatingCompany ? "border-red-400" : ""}`}
            />
            {errors.operatingCompany && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.operatingCompany}
              </p>
            )}
          </div>

          {/* Train Name */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Train Name</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Palace on Wheels"
              value={formData.trainName || ""}
              onChange={(e) => onChange("trainName", e.target.value)}
              className={`input-box ${errors.trainName ? "border-red-400" : ""}`}
            />
            {errors.trainName && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.trainName}
              </p>
            )}
          </div>

          {/* Train Number */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Train Number</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 12952"
              value={formData.trainNumber || ""}
              onChange={(e) => onChange("trainNumber", e.target.value)}
              className={`input-box ${errors.trainNumber ? "border-red-400" : ""}`}
            />
            {errors.trainNumber && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.trainNumber}
              </p>
            )}
          </div>

          {/* Address of temporary store in case Train goes under maintenance */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Address of temporary store in case of Train goes under maintenance</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter temporary warehouse address"
              value={formData.tempStoreAddress || ""}
              onChange={(e) => onChange("tempStoreAddress", e.target.value)}
              className={`input-box ${errors.tempStoreAddress ? "border-red-400" : ""}`}
            />
            {errors.tempStoreAddress && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.tempStoreAddress}
              </p>
            )}
          </div>

          {/* Train Originate from */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Train Originate from</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. New Delhi Railway Station (NDLS)"
              value={formData.trainOrigin || ""}
              onChange={(e) => onChange("trainOrigin", e.target.value)}
              className={`input-box ${errors.trainOrigin ? "border-red-400" : ""}`}
            />
            {errors.trainOrigin && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.trainOrigin}
              </p>
            )}
          </div>

          {/* Add Train Route with buttons matching the screenshot */}
          <div className="route-section">
            <label className="label-title flex items-center">
              <span>Add Train Route</span>
              <span className="required">*</span>
            </label>

            {/* Current journey stops */}
            {routes.length > 0 ? (
              <div className="route-tags">
                {routes.map((rt, idx) => (
                  <span
                    key={idx}
                    className="route-tag"
                  >
                    <Train className="w-3.5 h-3.5" />
                    <span>{rt}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-semibold mb-3">
                No route stations added yet. Please specify intermediate stopping stations.
              </p>
            )}

            <div className="route-input-row">
              <input
                type="text"
                placeholder="Type route station/junction, e.g. Jaipur"
                value={routeInput}
                onChange={(e) => setRouteInput(e.target.value)}
                className="input-box"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddRoute();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddRoute}
                className="btn-primary-route"
              >
                Add Train Route
              </button>
              <button
                type="button"
                onClick={handleDeleteRoute}
                className="btn-danger-route"
              >
                Delete Route
              </button>
            </div>
            {errors.trainRoutes && (
              <p className="text-red-600 font-bold mt-2.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.trainRoutes}
              </p>
            )}
          </div>

          {/* Number of compartments */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Number of compartments</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 14"
              value={formData.numCompartments || ""}
              onChange={(e) => onChange("numCompartments", e.target.value.replace(/\D/g, ""))}
              className={`input-box ${errors.numCompartments ? "border-red-400" : ""}`}
            />
            {errors.numCompartments && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.numCompartments}
              </p>
            )}
          </div>

          {/* Number of Seat Covers in dining car */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Number of Seat Covers in dinning car</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 48"
              value={formData.numSeatCovers || ""}
              onChange={(e) => onChange("numSeatCovers", e.target.value.replace(/\D/g, ""))}
              className={`input-box ${errors.numSeatCovers ? "border-red-400" : ""}`}
            />
            {errors.numSeatCovers && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.numSeatCovers}
              </p>
            )}
          </div>

          {/* Number of Dispensing Counter */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Number of Dispensing Counter</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 2"
              value={formData.numDispensingCounters || ""}
              onChange={(e) => onChange("numDispensingCounters", e.target.value.replace(/\D/g, ""))}
              className={`input-box ${errors.numDispensingCounters ? "border-red-400" : ""}`}
            />
            {errors.numDispensingCounters && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.numDispensingCounters}
              </p>
            )}
          </div>

          {/* Number of Managers */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Number of Managers</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 3"
              value={formData.numManagers || ""}
              onChange={(e) => onChange("numManagers", e.target.value.replace(/\D/g, ""))}
              className={`input-box ${errors.numManagers ? "border-red-400" : ""}`}
            />
            {errors.numManagers && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.numManagers}
              </p>
            )}
          </div>

          {/* Number of Kitchen Staff */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Number of Kitchen Staff</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 8"
              value={formData.numKitchenStaff || ""}
              onChange={(e) => onChange("numKitchenStaff", e.target.value.replace(/\D/g, ""))}
              className={`input-box ${errors.numKitchenStaff ? "border-red-400" : ""}`}
            />
            {errors.numKitchenStaff && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.numKitchenStaff}
              </p>
            )}
          </div>

          {/* Utility Employees */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Utility Employees</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 12"
              value={formData.numUtilityEmployees || ""}
              onChange={(e) => onChange("numUtilityEmployees", e.target.value.replace(/\D/g, ""))}
              className={`input-box ${errors.numUtilityEmployees ? "border-red-400" : ""}`}
            />
            {errors.numUtilityEmployees && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.numUtilityEmployees}
              </p>
            )}
          </div>

          {/* Number of Train Attendant */}
          <div className="form-group">
            <label className="label-title flex items-center">
              <span>Number of Train Attendant</span>
              <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 24"
              value={formData.numTrainAttendants || ""}
              onChange={(e) => onChange("numTrainAttendants", e.target.value.replace(/\D/g, ""))}
              className={`input-box ${errors.numTrainAttendants ? "border-red-400" : ""}`}
            />
            {errors.numTrainAttendants && (
              <p className="text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.numTrainAttendants}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
