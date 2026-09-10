import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  ShieldCheck, 
  FileText,
  Search, 
  Check 
} from 'lucide-react';

// Establishments data organized by Category
const CATEGORY_VENDS = {
  'Bar': [
    { id: 'DL-BAR-001', name: 'The Grand Lounge Bar, Connaught Place', licensee: 'M/s Grand Hospitality Ventures LLP', address: 'Block C, Inner Circle, Connaught Place, New Delhi' },
    { id: 'DL-BAR-002', name: 'Oasis Restro-Bar & Lounge, Aerocity', licensee: 'M/s Aerocity Hospitality & Spirits Pvt. Ltd.', address: 'Asset 10, Hospitality District, Aerocity, New Delhi' },
    { id: 'DL-BAR-003', name: 'Imperial Spirits Bar, Vasant Kunj', licensee: 'M/s Imperial Heritage Leisure Corp.', address: 'Ambience Mall, Nelson Mandela Marg, Vasant Kunj' },
    { id: 'DL-BAR-004', name: 'Sky High Rooftop Lounge, Saket', licensee: 'M/s Sky High Leisure Concepts Pvt. Ltd.', address: 'Anupam Saket Community Centre, New Delhi' },
    { id: 'DL-BAR-005', name: 'Royal Club & Bar, Rajouri Garden', licensee: 'M/s Royal Dine & Spirits LLP', address: 'Ring Road, Rajouri Garden, West Delhi' },
    { id: 'DL-BAR-006', name: 'Urban Heritage Bistro & Bar, Hauz Khas', licensee: 'M/s Village Heritage Bars Pvt. Ltd.', address: 'Hauz Khas Village, South Delhi' }
  ],
  'Retail Vend': [
    { id: 'DL-RET-101', name: 'DSIIDC Premium Liquor Vend, Connaught Place', licensee: 'Delhi State Industrial and Infrastructure Development Corp. (DSIIDC)', address: 'Palika Bazar, Connaught Place' },
    { id: 'DL-RET-102', name: 'DTTDC Wine & Beer Shop, Mayur Vihar Phase-1', licensee: 'Delhi Tourism and Transportation Development Corp. (DTTDC)', address: 'Near Metro Station, Mayur Vihar-1' },
    { id: 'DL-RET-103', name: 'DCCWS Retail Vend, Sector-9 Rohini', licensee: 'Delhi Consumer’s Cooperative Wholesale Store Ltd. (DCCWS)', address: 'DC Chowk, Sector-9, Rohini' },
    { id: 'DL-RET-104', name: 'DSCSC Premium Vend, Saket Community Centre', licensee: 'Delhi State Civil Supplies Corp. Ltd. (DSCSC)', address: 'PVR Anupam Complex, Saket' }
  ],
  'Hotel / Club / Restaurant (HCR)': [
    { id: 'DL-HCR-201', name: 'The Oberoi New Delhi, Dr. Zakir Hussain Marg', licensee: 'M/s EIH Limited', address: 'Dr. Zakir Hussain Marg, New Delhi' },
    { id: 'DL-HCR-202', name: 'Taj Palace Hotel & Bar Lounge, Diplomatic Enclave', licensee: 'M/s The Indian Hotels Company Limited', address: 'Sardar Patel Marg, Chanakyapuri' },
    { id: 'DL-HCR-203', name: 'Delhi Gymkhana Club, Safdarjung Road', licensee: 'Delhi Gymkhana Club Ltd.', address: '2, Safdarjung Road, New Delhi' }
  ],
  'Wholesale Depot': [
    { id: 'DL-BWH-301', name: 'Bonded Warehouse (BWH-1), Okhla Industrial Area', licensee: 'M/s Delhi State Excise Warehousing Facility', address: 'Phase-II, Okhla Industrial Area' },
    { id: 'DL-BWH-302', name: 'BWFL Wholesale Bond Depot, Alipur', licensee: 'M/s Central Wholesale Bond Depot', address: 'GT Karnal Road, Alipur, North Delhi' }
  ],
  'Microbrewery': [
    { id: 'DL-MB-401', name: 'Capital Craft Microbrewery, Saket', licensee: 'M/s Capital Brewers & Co. LLP', address: 'Press Enclave Marg, Saket' },
    { id: 'DL-MB-402', name: 'Connaught Artisan Ales, CP', licensee: 'M/s Artisan Brews Delhi LLP', address: 'Scindia House, Connaught Circus' }
  ],
  'Distillery': [
    { id: 'DL-DIS-501', name: 'Delhi Bottling & Blending Plant, Narela', licensee: 'M/s Northern Distillers & Bottlers Ltd.', address: 'DSIDC Industrial Complex, Narela' }
  ]
};

const FEEDBACK_TYPES = [
  '--Select Feedback type--',
  'Overcharging / MRP Violation',
  'Sale to Minor / Underage Person',
  'Unauthorized / Spurious Liquor Sale',
  'Non-Issuance of Cash Memo / Bill',
  'Selling Outside Prescribed Timings',
  'Quality of Service & Hospitality',
  'Cleanliness, Hygiene & Sanitation',
  'Staff Behavior / Misconduct',
  'Brand Non-Availability / Forced Selling',
  'General Appreciation / Commendation',
  'Other Suggestion / Complaint'
];

export default function FeedbackForm({ onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'track'

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('9956363045'); // Pre-filled default as shown in reference image
  const [category, setCategory] = useState('Bar'); // Pre-filled 'Bar' as shown in reference image
  const [vend, setVend] = useState('');
  const [licensee, setLicensee] = useState('Licensee name will be here'); // As shown in reference image
  const [feedbackType, setFeedbackType] = useState('--Select Feedback type--');
  const [yourFeedback, setYourFeedback] = useState('');

  // OTP Verification States
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Form Submission States
  const [formError, setFormError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tracking tab search
  const [searchRef, setSearchRef] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);

  // Check URL params for tab=track
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'track') {
        setActiveTab('track');
      }
    } catch (_) {}

    // Load stored feedbacks
    try {
      const stored = localStorage.getItem('delhi_excise_feedbacks');
      if (stored) {
        setRecentFeedbacks(JSON.parse(stored));
      }
    } catch (_) {}
  }, []);

  // Update Licensee when Vend changes
  const handleVendChange = (selectedVendId) => {
    setVend(selectedVendId);
    if (!selectedVendId || selectedVendId === '--Select Category--' || selectedVendId === '--Select Vend--') {
      setLicensee('Licensee name will be here');
      return;
    }

    const categoryList = CATEGORY_VENDS[category] || [];
    const found = categoryList.find(v => v.id === selectedVendId);
    if (found) {
      setLicensee(found.licensee);
    } else {
      setLicensee('Licensee name will be here');
    }
  };

  // Update Category
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setVend('');
    setLicensee('Licensee name will be here');
  };

  // Resend Timer Countdown
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Handle Send OTP
  const handleSendOtp = () => {
    if (!phoneNo || phoneNo.trim().length < 10) {
      setOtpError('Please enter a valid 10-digit mobile number.');
      setShowOtpModal(true);
      return;
    }
    setOtpSent(true);
    setOtpError('');
    setResendTimer(30);
    setShowOtpModal(true);
  };

  // Handle Verify OTP
  const handleVerifyOtp = () => {
    if (otpInput.trim() === '1234' || otpInput.trim() === '123456' || otpInput.trim().length >= 4) {
      setIsOtpVerified(true);
      setShowOtpModal(false);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP. Please enter the demo OTP (1234).');
    }
  };

  // Reset / Cancel Form
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to clear the feedback form?')) {
      setName('');
      setEmail('');
      setPhoneNo('9956363045');
      setCategory('Bar');
      setVend('');
      setLicensee('Licensee name will be here');
      setFeedbackType('--Select Feedback type--');
      setYourFeedback('');
      setFormError('');
      setIsOtpVerified(false);
    }
  };

  // Submit Feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Form Validations
    if (!name.trim()) {
      setFormError('Please enter your Name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid E-Mail id.');
      return;
    }
    if (!phoneNo || phoneNo.trim().length < 10) {
      setFormError('Please enter a valid 10-digit Phone No.');
      return;
    }
    if (!isOtpVerified) {
      setFormError('Phone verification required. Please verify your Phone No with OTP before submitting.');
      setShowOtpModal(true);
      return;
    }
    if (!category || category === '--Select Category--') {
      setFormError('Please select a Category.');
      return;
    }
    if (!vend || vend === '--Select Category--' || vend === '--Select Vend--') {
      setFormError('Please select a Vend.');
      return;
    }
    if (!feedbackType || feedbackType === '--Select Feedback type--') {
      setFormError('Please select a Feedback Type.');
      return;
    }
    if (!yourFeedback.trim()) {
      setFormError('Please write your feedback in the box provided.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const refNumber = `DEL-EX-FB-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const newFeedback = {
        refNumber,
        name: name.trim(),
        email: email.trim(),
        phoneNo: phoneNo.trim(),
        category,
        vendId: vend,
        vendName: (CATEGORY_VENDS[category] || []).find(v => v.id === vend)?.name || vend,
        licensee,
        feedbackType,
        feedback: yourFeedback.trim(),
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        status: 'Submitted / Under Scrutiny',
        zonalOffice: 'Central Excise District, Delhi'
      };

      try {
        const existing = JSON.parse(localStorage.getItem('delhi_excise_feedbacks') || '[]');
        const updated = [newFeedback, ...existing];
        localStorage.setItem('delhi_excise_feedbacks', JSON.stringify(updated));
        setRecentFeedbacks(updated);
      } catch (_) {}

      setIsSubmitting(false);
      setSubmittedData(newFeedback);
    }, 600);
  };

  // Search Track Reference
  const handleTrackSearch = (e) => {
    e.preventDefault();
    if (!searchRef.trim()) return;

    const term = searchRef.trim().toUpperCase();
    const found = recentFeedbacks.find(
      f => f.refNumber.toUpperCase() === term || f.phoneNo === term
    );

    if (found) {
      setTrackResult(found);
    } else {
      setTrackResult({
        refNumber: searchRef.trim().toUpperCase(),
        name: 'Citizen Applicant',
        phoneNo: '' + searchRef.trim(),
        category: 'Bar',
        vendName: 'The Grand Lounge Bar, Connaught Place',
        licensee: 'M/s Grand Hospitality Ventures LLP',
        feedbackType: 'Quality of Service & Hospitality',
        feedback: 'Feedback lodged regarding service and compliance.',
        submittedAt: new Date().toLocaleDateString('en-IN'),
        status: 'Action Initiated / Forwarded to Zonal Inspector',
        zonalOffice: 'Central District Zonal Office, Delhi'
      });
    }
  };

  return (
    <div className="feedback-page-wrapper">
      <div className="feedback-container">
        
        {/* Breadcrumb & Navigation Bar */}
        <div className="feedback-breadcrumb-bar">
          <div className="feedback-breadcrumb">
            <button 
              type="button"
              onClick={onNavigateHome} 
              className="feedback-breadcrumb-link"
            >
              Home
            </button>
            </div>

          <div className="feedback-nav-tabs">
            <button 
              type="button"
              onClick={() => setActiveTab('form')}
              className={`feedback-tab-btn ${activeTab === 'form' ? 'active' : ''}`}
            >
              Feedback Form
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('track')}
              className={`feedback-tab-btn ${activeTab === 'track' ? 'active' : ''}`}
            >
              Track Status
            </button>
          </div>
        </div>

        {/* TRACK STATUS VIEW */}
        {activeTab === 'track' ? (
          <div className="feedback-track-card">
            <div className="feedback-track-header">
              <h2 className="feedback-track-title">
                <Search size={20} />
                Track Feedback / Grievance Status
              </h2>
              <p className="feedback-track-subtitle">
                Enter your Feedback Reference Number (e.g. DEL-EX-FB-2026-XXXXX) or registered Phone Number to check current processing status.
              </p>
            </div>

            <form onSubmit={handleTrackSearch} className="feedback-track-form">
              <input 
                type="text" 
                placeholder="Enter Reference Number or Phone No"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                className="feedback-track-input"
              />
              <button 
                type="submit"
                className="feedback-track-btn"
              >
                <Search size={16} />
                Search
              </button>
            </form>

            {trackResult && (
              <div className="feedback-track-result-box">
                <div className="feedback-track-result-header">
                  <span className="feedback-track-ref">Reference: {trackResult.refNumber}</span>
                  <span className="feedback-status-badge">
                    {trackResult.status}
                  </span>
                </div>
                <div className="feedback-track-grid">
                  <div><strong>Applicant:</strong> {trackResult.name}</div>
                  <div><strong>Phone:</strong> {trackResult.phoneNo}</div>
                  <div><strong>Category:</strong> {trackResult.category}</div>
                  <div><strong>Vend:</strong> {trackResult.vendName}</div>
                  <div><strong>Licensee:</strong> {trackResult.licensee}</div>
                  <div><strong>Feedback Type:</strong> {trackResult.feedbackType}</div>
                  <div className="span-full"><strong>Submission Date:</strong> {trackResult.submittedAt}</div>
                  <div className="span-full"><strong>Zonal Handling:</strong> {trackResult.zonalOffice}</div>
                </div>
              </div>
            )}
          </div>
        ) : (

        /* FEEDBACK FORM CARD - EXACT AS SHOWN IN THE USER IMAGE */
        <div className="feedback-card">
          
          {/* Top Yellow Accent Line (as seen in the user image) */}
          <div className="feedback-top-accent" />

          {/* Form Header info banner */}
          <div className="feedback-card-header">
            <div>
              <h1 className="feedback-card-title">
                Department of Excise - Citizen Feedback
              </h1>
              <p className="feedback-card-subtitle">
                Government of NCT of Delhi • Please fill the statutory feedback fields below
              </p>
            </div>
           </div>

          {/* Error Banner */}
          {formError && (
            <div className="feedback-alert-error">
              <AlertCircle size={16} />
              <span>{formError}</span>
            </div>
          )}

          {/* Feedback Form Content */}
          <form onSubmit={handleSubmit} className="feedback-form-body">
            
            {/* 1. Name: * */}
            <div className="feedback-form-row">
              <label className="feedback-label">
                Name: <span className="feedback-required-star">*</span>
              </label>
              <div className="feedback-field-container">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  className="feedback-input"
                  required
                />
              </div>
            </div>

            {/* 2. E-Mail id: * */}
            <div className="feedback-form-row">
              <label className="feedback-label">
                E-Mail id: <span className="feedback-required-star">*</span>
              </label>
              <div className="feedback-field-container">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter E-Mail id"
                  className="feedback-input"
                  required
                />
              </div>
            </div>

            {/* 3. Phone No: * (with OTP Verification as requested) */}
            <div className="feedback-form-row">
              <label className="feedback-label">
                Phone No: <span className="feedback-required-star">*</span>
              </label>
              <div className="feedback-field-container">
                <input 
                  type="tel" 
                  value={phoneNo}
                  onChange={(e) => {
                    setPhoneNo(e.target.value);
                    if (isOtpVerified) setIsOtpVerified(false);
                  }}
                  placeholder="9956363045"
                  maxLength={10}
                  className="feedback-input phone-input"
                  required
                />

                {/* OTP Verification Trigger & Status */}
                {isOtpVerified ? (
                  <span className="feedback-otp-verified-badge">
                    <CheckCircle2 size={14} />
                    OTP Verified
                  </span>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleSendOtp}
                    className="feedback-btn-verify-otp"
                  >
                    <Phone size={14} />
                    Verify via OTP
                  </button>
                )}
                
                <span className="feedback-otp-hint">
                  {isOtpVerified ? '(Mobile number authenticated)' : '(Click "Verify via OTP" to validate mobile number)'}
                </span>
              </div>
            </div>

            {/* 4. Category: * */}
            <div className="feedback-form-row">
              <label className="feedback-label">
                Category: <span className="feedback-required-star">*</span>
              </label>
              <div className="feedback-field-container">
                <select 
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="feedback-select"
                  required
                >
                  <option value="Bar">Bar</option>
                  <option value="Retail Vend">Retail Vend</option>
                  <option value="Hotel / Club / Restaurant (HCR)">Hotel / Club / Restaurant (HCR)</option>
                  <option value="Wholesale Depot">Wholesale Depot</option>
                  <option value="Microbrewery">Microbrewery</option>
                  <option value="Distillery">Distillery</option>
                </select>
              </div>
            </div>

            {/* 5. Vend: * */}
            <div className="feedback-form-row">
              <label className="feedback-label">
                Vend: <span className="feedback-required-star">*</span>
              </label>
              <div className="feedback-field-container">
                <select 
                  value={vend}
                  onChange={(e) => handleVendChange(e.target.value)}
                  className="feedback-select"
                  required
                >
                  <option value="">--Select Category--</option>
                  {(CATEGORY_VENDS[category] || []).map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 6. Licensee: * */}
            <div className="feedback-form-row">
              <label className="feedback-label">
                Licensee: <span className="feedback-required-star">*</span>
              </label>
              <div className="feedback-field-container">
                <div className="feedback-readonly-text">
                  {licensee}
                </div>
              </div>
            </div>

            {/* 7. Feedback Type: * */}
            <div className="feedback-form-row">
              <label className="feedback-label">
                Feedback Type: <span className="feedback-required-star">*</span>
              </label>
              <div className="feedback-field-container">
                <select 
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="feedback-select"
                  required
                >
                  {FEEDBACK_TYPES.map((type, idx) => (
                    <option key={idx} value={type === '--Select Feedback type--' ? '' : type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 8. Your Feedback: * */}
            <div className="feedback-form-row align-top">
              <label className="feedback-label">
                Your Feedback: <span className="feedback-required-star">*</span>
              </label>
              <div className="feedback-textarea-container">
                <div className="feedback-textarea-wrapper">
                  <textarea 
                    rows={6}
                    value={yourFeedback}
                    onChange={(e) => {
                      if (e.target.value.length <= 500) {
                        setYourFeedback(e.target.value);
                      }
                    }}
                    placeholder="Enter Your Feedback Here!"
                    maxLength={500}
                    className="feedback-textarea"
                    required
                  />
                  <span className="feedback-char-limit-note">
                    (maximum 500 Charecter allowed)
                  </span>
                </div>
                <div className="feedback-char-count">
                  {yourFeedback.length} / 500 characters
                </div>
              </div>
            </div>

            {/* 9. Bottom Action Buttons (Cancel and Submit as in image) */}
            <div className="feedback-actions">
              <button 
                type="button" 
                onClick={handleCancel}
                className="feedback-btn-cancel"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="feedback-btn-submit"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>

          </form>
        </div>
        )}

        {/* STATUTORY ADVISORY NOTE */}
        <div className="feedback-statutory-notes">
          <p><strong>Department of Excise Public Grievance &amp; Feedback Guidelines:</strong></p>
          <p>• Feedback received is treated with strict confidentiality under the Delhi Excise Act, 2009 and statutory vigilance protocols.</p>
          <p>• Verified phone numbers help our enforcement officers contact you if additional details or inspections are warranted.</p>
          <p>• For urgent complaints regarding illicit liquor or illegal trade, citizens can also dial the 24x7 Excise Control Room Toll-Free Helpline: <strong>1800-11-9922</strong>.</p>
        </div>

      </div>

      {/* OTP VERIFICATION MODAL */}
      {showOtpModal && (
        <div className="feedback-modal-overlay">
          <div className="feedback-modal-card">
            <div className="feedback-modal-header">
              <h3 className="feedback-modal-title">
                <ShieldCheck size={20} />
                Mobile Number OTP Verification
              </h3>
              <button 
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="feedback-modal-close"
              >
                &times;
              </button>
            </div>

            <p className="feedback-modal-desc">
              We have dispatched a verification code to <strong>+91 {phoneNo}</strong>. Please enter the OTP to confirm your contact number.
            </p>

            <div className="feedback-modal-demo-box">
              <span>Demo OTP: <strong>1234</strong></span>
              <button 
                type="button" 
                onClick={() => setOtpInput('1234')}
                className="feedback-modal-demo-btn"
              >
                Autofill 1234
              </button>
            </div>

            {otpError && (
              <div className="feedback-alert-error" style={{ margin: '0 0 1rem 0' }}>
                <AlertCircle size={16} />
                <span>{otpError}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                Enter 4-digit OTP:
              </label>
              <input 
                type="text" 
                value={otpInput}
                onChange={(e) => {
                  setOtpInput(e.target.value);
                  setOtpError('');
                }}
                maxLength={6}
                placeholder="1234"
                className="feedback-otp-input"
                autoFocus
              />
            </div>

            <div className="feedback-otp-resend-row">
              <span>Didn't receive code?</span>
              {resendTimer > 0 ? (
                <span>Resend in {resendTimer}s</span>
              ) : (
                <button 
                  type="button" 
                  onClick={() => {
                    setResendTimer(30);
                    setOtpError('');
                    alert('A fresh OTP (1234) has been resent to ' + phoneNo);
                  }}
                  className="feedback-otp-resend-link"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <div className="feedback-modal-footer">
              <button 
                type="button" 
                onClick={() => setShowOtpModal(false)}
                className="feedback-btn-secondary"
              >
                Close
              </button>
              <button 
                type="button" 
                onClick={handleVerifyOtp}
                className="feedback-btn-primary"
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION CONFIRMATION MODAL */}
      {submittedData && (
        <div className="feedback-modal-overlay">
          <div className="feedback-modal-card wide">
            <div className="feedback-success-icon-wrap">
              <Check size={28} />
            </div>
            <h3 className="feedback-success-title">Feedback Submitted Successfully!</h3>
            <p className="feedback-success-dept">Department of Excise, Government of NCT of Delhi</p>

            <div className="feedback-ack-card">
              <div className="feedback-ack-ref-row">
                <span>Acknowledgement Reference:</span>
                <span className="feedback-ack-ref-val">{submittedData.refNumber}</span>
              </div>
              <div className="feedback-ack-grid">
                <div><strong>Citizen Name:</strong> {submittedData.name}</div>
                <div><strong>Verified Phone:</strong> {submittedData.phoneNo}</div>
                <div><strong>Establishment:</strong> {submittedData.vendName}</div>
                <div><strong>Licensee:</strong> {submittedData.licensee}</div>
                <div><strong>Feedback Type:</strong> {submittedData.feedbackType}</div>
                <div><strong>Status:</strong> {submittedData.status}</div>
              </div>
              <div className="feedback-ack-log">
                <strong>Feedback Log:</strong> "{submittedData.feedback}"
              </div>
            </div>

            <div className="feedback-modal-footer" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={() => window.print()}
                className="feedback-btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <FileText size={14} />
                Print Acknowledgment
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => {
                    setSubmittedData(null);
                    setActiveTab('track');
                    setSearchRef(submittedData.refNumber);
                  }}
                  className="feedback-btn-secondary"
                  style={{ backgroundColor: '#0284c7', color: '#ffffff', borderColor: '#0284c7' }}
                >
                  Track Status
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setSubmittedData(null);
                    setName('');
                    setEmail('');
                    setYourFeedback('');
                    setIsOtpVerified(false);
                  }}
                  className="feedback-btn-primary"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
