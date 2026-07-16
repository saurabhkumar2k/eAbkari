import React from "react";

export default function Step2HallDetails({
  halls,
  addHall,
  deleteHall,
  handleHallChange,
  handleNextStep
}) {
  return (
    <div className="premise-card-body" style={{ padding: "1.5rem 2rem" }}>
      <div className="premise-hall-header-banner">
        Hall Details
      </div>

      <div className="premise-hall-buttons-row">
        <button type="button" onClick={addHall} className="premise-hall-btn-blue">Add</button>
        <span className="premise-hall-divider">|</span>
        <button type="button" onClick={deleteHall} className="premise-hall-btn-blue">Delete</button>
      </div>

      <div className="premise-hall-table-container">
        <table className="premise-hall-table">
          <thead>
            <tr>
              <th style={{ width: "8%" }}>SlNo</th>
              <th style={{ width: "32%" }}>Hall Name</th>
              <th style={{ width: "30%" }}>Minimum Capacity(No. of person)</th>
              <th style={{ width: "30%" }}>Maximum Capacity(No. of Person)</th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall, idx) => (
              <tr key={hall.id}>
                <td className="premise-td-slno">{idx + 1}</td>
                <td>
                  <input
                    type="text"
                    value={hall.name}
                    onChange={(e) => handleHallChange(hall.id, "name", e.target.value)}
                    className="premise-table-input"
                    placeholder=""
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={hall.minCapacity ?? "0"}
                    onChange={(e) => handleHallChange(hall.id, "minCapacity", e.target.value)}
                    className="premise-table-input text-center"
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={hall.maxCapacity ?? "0"}
                    onChange={(e) => handleHallChange(hall.id, "maxCapacity", e.target.value)}
                    className="premise-table-input text-center"
                    required
                  />
                </td>
              </tr>
            ))}
            <tr className="premise-table-empty-row">
              <td colSpan={4}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="premise-hall-save-row">
        <button type="button" onClick={handleNextStep} className="premise-hall-save-btn">
          Save
        </button>
      </div>
    </div>
  );
}
