import React, { useState } from 'react';

const SimpleSelect = ({ label, placeholder, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="form-group-v2">
      <label className="label-v2">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="select-v2"
        >
          <span className={!selected ? 'text-gray-400' : ''}>
            {selected || placeholder}
          </span>
          <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} style={{ fontSize: '12px' }}>▼</span>
        </button>
        
        {isOpen && (
          <div className="dropdown-v2">
            {options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setSelected(opt); setIsOpen(false); }}
                className="option-v2"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const NewLicenseApplication = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="license-dark-header">
        <h1>New License Application</h1>
      </div>

      <div className="license-form-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <SimpleSelect 
            label="Owner Type" 
            placeholder="Please Select" 
            options={["Individual", "Partnership", "Company", "Trust"]} 
          />
          <SimpleSelect 
            label="License Applied for the Licensing Year" 
            placeholder="--Select--" 
            options={["2024-2025", "2025-2026", "2026-2027"]} 
          />
          <div className="md:col-span-2">
            <SimpleSelect 
              label="Category of License Applied for" 
              placeholder="Please Select" 
              options={["Retail Liquor", "Wholesale Distiller", "Bar/Restaurant", "Microbrewery"]} 
            />
          </div>
        </div>

        <div className="flex justify-end mt-16">
          <button className="btn-next-teal">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
