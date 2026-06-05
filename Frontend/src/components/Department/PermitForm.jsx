import React from 'react';
import { MapPinSvg, CalendarSvg } from '../../components/icons/GlobalIcons';
import { ChevronDownSvg } from '../../components/icons/GlobalIcons';

const PermitForm = () => {
  return (
    <div className="permit-form-card glass-card animate-up">
      <div className="form-grid">
        <div className="form-field">
          <label className="field-label">Name of the State</label>
          <div className="input-with-icon">
            <MapPinSvg className="input-icon" />
            <select className="form-select-custom">
              <option>--Select--</option>
              <option>Delhi</option>
              <option>Punjab</option>
              <option>Haryana</option>
              <option>Uttar Pradesh</option>
            </select>
            <ChevronDownSvg className="select-arrow-custom" />
          </div>
        </div>

        <div className="form-field">
          <label className="field-label">Max No. of days from the Date of Issue of IP</label>
          <div className="input-with-icon">
            <CalendarSvg className="input-icon" />
            <input type="text" className="form-input-custom" placeholder="Enter days" />
          </div>
        </div>

        <div className="form-field">
          <label className="field-label">Max No. of days from the Date of Issue of Export Order</label>
          <div className="input-with-icon">
            <CalendarSvg className="input-icon" />
            <input type="text" className="form-input-custom" placeholder="Enter days" />
          </div>
        </div>

        <div className="form-field">
          <label className="field-label">Max No. of days from the Date of Receipt of IP</label>
          <div className="input-with-icon">
            <CalendarSvg className="input-icon" />
            <input type="text" className="form-input-custom" placeholder="Enter days" />
          </div>
        </div>

        <div className="form-field full-width">
          <label className="field-label mb-3">EO Required or not</label>
          <div className="radio-group">
            <label className="radio-container">
              <input type="radio" name="eo-required" defaultChecked />
              <span className="radio-checkmark"></span>
              <span className="radio-text">EO Required</span>
            </label>
            <label className="radio-container">
              <input type="radio" name="eo-required" />
              <span className="radio-checkmark"></span>
              <span className="radio-text">EO Not Required</span>
            </label>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PermitForm;
