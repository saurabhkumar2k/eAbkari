import React from 'react';
import { MapPinSvg, CalendarSvg } from '../../components/icons/GlobalIcons';
import { ChevronDownSvg } from '../../components/icons/GlobalIcons';

const PermitForm = ({ states, form, onChange, onSubmit, onReset, isEditing, isSaving, message }) => {
  return (
    <form className="permit-form-card glass-card animate-up" onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="form-field">
          <label className="field-label">Name of the State</label>
          <div className="input-with-icon">
            <MapPinSvg className="input-icon" />
            <select
              className="form-select-custom"
              value={form.stateCode}
              onChange={(e) => onChange('stateCode', e.target.value)}
              disabled={isEditing}
            >
              <option value="">--Select--</option>
              {states.map((state) => (
                <option key={state.stateCode} value={state.stateCode}>
                  {state.stateName}
                </option>
              ))}
            </select>
            <ChevronDownSvg className="select-arrow-custom" />
          </div>
        </div>

        <div className="form-field">
          <label className="field-label">Max No. of days from the Date of Issue of IP</label>
          <div className="input-with-icon">
            <CalendarSvg className="input-icon" />
            <input
              type="text"
              className="form-input-custom"
              placeholder="Enter days"
              maxLength="2"
              value={form.daysIpValidity}
              onChange={(e) => onChange('daysIpValidity', e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>

        <div className="form-field">
          <label className="field-label">Max No. of days from the Date of Issue of Export Order</label>
          <div className="input-with-icon">
            <CalendarSvg className="input-icon" />
            <input
              type="text"
              className="form-input-custom"
              placeholder="Enter days"
              maxLength="2"
              value={form.daysIpValidityEoIssue}
              onChange={(e) => onChange('daysIpValidityEoIssue', e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>

        <div className="form-field">
          <label className="field-label">Max No. of days from the Date of Receipt of IP</label>
          <div className="input-with-icon">
            <CalendarSvg className="input-icon" />
            <input
              type="text"
              className="form-input-custom"
              placeholder="Enter days"
              maxLength="2"
              value={form.daysIpValidityIpRecv}
              onChange={(e) => onChange('daysIpValidityIpRecv', e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>

        <div className="form-field full-width">
          <label className="field-label mb-3">EO Required or not</label>
          <div className="radio-group">
            <label className="radio-container">
              <input
                type="radio"
                name="eo-required"
                checked={form.eoRequired === 'Y'}
                onChange={() => onChange('eoRequired', 'Y')}
              />
              <span className="radio-checkmark"></span>
              <span className="radio-text">EO Required</span>
            </label>
            <label className="radio-container">
              <input
                type="radio"
                name="eo-required"
                checked={form.eoRequired === 'N'}
                onChange={() => onChange('eoRequired', 'N')}
              />
              <span className="radio-checkmark"></span>
              <span className="radio-text">EO Not Required</span>
            </label>
          </div>
        </div>
      </div>

      {message && <p style={{ marginTop: '12px', color: '#b91c1c' }}>{message}</p>}

      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <button type="submit" className="form-action-button" disabled={isSaving}>
          {isSaving ? 'Saving...' : isEditing ? 'Update' : 'Save'}
        </button>
        <button type="button" className="form-action-button" onClick={onReset}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PermitForm;
