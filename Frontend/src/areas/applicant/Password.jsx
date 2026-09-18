import React, { useState, useMemo } from "react";
import {
  KeyRound,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  Shield,
  Clock,
  Smartphone,
  Laptop,
  RotateCcw,
  HelpCircle,
  ArrowLeft,
  Check,
  RefreshCw,
  LogOut,
  Sparkles,
  Info
} from "lucide-react";

export default function Password({
  onNavigateToHome = () => {},
  onPasswordChanged = () => {},
  showToast,
  userEmail = "applicant.retail@delhiex.gov.in",
  userName = "Authorized Licensee Signatory",
  userRole = "Delhi Excise Licensee (L-1/L-2)"
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [logoutOtherSessions, setLogoutOtherSessions] = useState(true);
  const [notifyViaSms, setNotifyViaSms] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState("");
  const [errors, setErrors] = useState({});

  const triggerToast = (msg, type = "success") => {
    if (showToast) {
      showToast(msg, type);
    } else {
      setFeedbackToast(msg);
      setTimeout(() => setFeedbackToast(""), 3500);
    }
  };

  // Complexity rules evaluation
  const passwordCriteria = useMemo(() => {
    return {
      minLength: newPassword.length >= 8,
      maxLength: newPassword.length <= 25,
      hasUpper: /[A-Z]/.test(newPassword),
      hasLower: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword),
      notCurrent: currentPassword ? newPassword !== currentPassword : true
    };
  }, [newPassword, currentPassword]);

  // Overall strength score (0 to 100)
  const strengthScore = useMemo(() => {
    if (!newPassword) return 0;
    let score = 0;
    if (passwordCriteria.minLength) score += 20;
    if (passwordCriteria.hasUpper) score += 20;
    if (passwordCriteria.hasLower) score += 20;
    if (passwordCriteria.hasNumber) score += 20;
    if (passwordCriteria.hasSpecial) score += 20;
    return score;
  }, [passwordCriteria, newPassword]);

  const strengthLabel = useMemo(() => {
    if (strengthScore === 0) return { text: "None", color: "#94a3b8", bg: "#f1f5f9" };
    if (strengthScore <= 40) return { text: "Weak", color: "#ef4444", bg: "#fef2f2" };
    if (strengthScore <= 60) return { text: "Fair", color: "#f59e0b", bg: "#fffbeb" };
    if (strengthScore <= 80) return { text: "Good", color: "#0284c7", bg: "#f0f9ff" };
    return { text: "Very Strong", color: "#10b981", bg: "#ecfdf5" };
  }, [strengthScore]);

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  const validateForm = () => {
    const errs = {};
    if (!currentPassword.trim()) {
      errs.current = "Current account password is required";
    }
    if (!newPassword.trim()) {
      errs.newPass = "New password cannot be empty";
    } else if (strengthScore < 80) {
      errs.newPass = "Password does not meet mandatory security requirements";
    }
    if (!confirmPassword.trim()) {
      errs.confirm = "Please re-type to confirm the new password";
    } else if (newPassword !== confirmPassword) {
      errs.confirm = "Confirmation password does not match new password";
    }
    if (currentPassword && newPassword && currentPassword === newPassword) {
      errs.newPass = "New password must be different from current password";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      triggerToast("Please correct the validation errors before submitting", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      triggerToast("Password successfully updated and encrypted!", "success");
      if (onPasswordChanged) {
        onPasswordChanged();
      }
    }, 900);
  };

  const handleReset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  // Recent Security & Audit Logs
  const securityLogs = [
    {
      id: "SEC-LOG-8912",
      event: "Password Changed Successfully",
      date: "02/08/2026, 11:24 AM",
      ipAddress: "10.142.18.44 (eAbkari Portal)",
      device: "Desktop / Chrome 127",
      status: "Compliant"
    },
    {
      id: "SEC-LOG-8740",
      event: "Portal Sign-in via SMS OTP",
      date: "14/09/2026, 09:15 AM",
      ipAddress: "103.21.144.92 (NCT of Delhi)",
      device: "Windows 11 / Edge",
      status: "Verified"
    },
    {
      id: "SEC-LOG-8655",
      event: "DSC Digital Token Re-authenticated",
      date: "28/08/2026, 04:30 PM",
      ipAddress: "10.142.18.44 (eAbkari Portal)",
      device: "Desktop / Secure Token",
      status: "Verified"
    }
  ];

  return (
    <div className="renewal-page-wrapper">
      {/* Toast Notification Banner */}
      {feedbackToast && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            zIndex: 10000,
            background: "#012a52",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "6px",
            boxShadow: "0 10px 25px -5px rgba(1, 42, 82, 0.4)",
            fontSize: "0.875rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        >
          <CheckCircle2 style={{ color: "#22c55e", width: "18px", height: "18px" }} />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* 1. Breadcrumb Bar */}
      <div className="renewal-breadcrumb-bar">
        <div className="renewal-page-container">
          <div className="renewal-breadcrumb-inner">
            <div className="renewal-breadcrumb">
              <button
                type="button"
                className="renewal-breadcrumb-link"
                onClick={onNavigateToHome}
              >
                Dashboard
              </button>
              <span>/</span>
              <span>Account & Security</span>
              <span>/</span>
              <strong style={{ color: "#012a52" }}>Change Password & Credential Maintenance</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <div className="renewal-emblem-badge">
                <span className="renewal-emblem-dot"></span>
                <span>Government of NCT of Delhi • eAbkari Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="renewal-page-container">
        {/* 2. Hero Section */}
        <div className="renewal-hero-section">
          <div className="renewal-badge-inline">
            <span>Identity & Access Management</span>
            <span>•</span>
            <span>National e-Governance Security Compliance</span>
          </div>
          <h1 className="renewal-hero-title">Credential Management & Password Security</h1>
          <p className="renewal-hero-subtitle">
            Department of Excise, Entertainment & Luxury Tax • GNCTD
          </p>
          <div className="renewal-hero-tagline-box">
            <p className="renewal-hero-tagline">
              "Maintaining high-assurance authentication standards, mandatory cryptographic complexity validation, and digital audit logging under the National e-Governance Security Framework (NeGD & Cert-In guidelines) for all registered licensees and authorized trade signatories."
            </p>
          </div>
        </div>

        {/* 3. Metric Stats Strip */}
        <div className="renewal-stats-grid">
          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap emerald">
              <ShieldCheck style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number" style={{ fontSize: "1.25rem" }}>Active & Compliant</div>
              <div className="renewal-stat-label">Password Health Status</div>
              <div className="renewal-stat-note">Last rotated 42 days ago</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap blue">
              <Clock style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number" style={{ fontSize: "1.25rem" }}>48 Days Remaining</div>
              <div className="renewal-stat-label">Mandatory Rotation Policy</div>
              <div className="renewal-stat-note">90-day statutory expiry cycle</div>
            </div>
          </div>

          <div className="renewal-stat-card">
            <div className="renewal-stat-icon-wrap purple">
              <Smartphone style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <div className="renewal-stat-number" style={{ fontSize: "1.25rem" }}>2-Factor Active</div>
              <div className="renewal-stat-label">MFA Security Shield</div>
              <div className="renewal-stat-note">SMS OTP & Email Token Protected</div>
            </div>
          </div>
        </div>

        {/* 4. Main Section Card with Grid Layout */}
        <div className="renewal-section-card highlight-card">
          <div className="renewal-section-header">
            <div className="renewal-section-icon-box">
              <KeyRound style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <h2 className="renewal-section-title">Update Security Password</h2>
              <p className="renewal-section-subtitle">
                Please enter your current authorization password followed by a verified complex password compliant with NIC guidelines
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "28px", alignItems: "start" }}>
            {/* Left Column: Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Current Password Field */}
              <div className="renewal-form-group" style={{ margin: 0 }}>
                <div className="renewal-label-row">
                  <label className="renewal-label" htmlFor="currentPassword">
                    <Lock style={{ width: 14, height: 14, color: "#0284c7" }} />
                    <span>Current Password</span>
                    <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => triggerToast("Password reset link sent to registered email")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#0284c7",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    id="currentPassword"
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter your current portal password"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      if (errors.current) setErrors((prev) => ({ ...prev, current: null }));
                    }}
                    className="renewal-select"
                    style={{
                      paddingRight: "2.75rem",
                      borderColor: errors.current ? "#ef4444" : undefined
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    style={{
                      position: "absolute",
                      right: "0.85rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#64748b",
                      cursor: "pointer",
                      padding: "4px"
                    }}
                    aria-label="Toggle password visibility"
                  >
                    {showCurrent ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                  </button>
                </div>
                {errors.current && (
                  <span style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "4px", display: "block" }}>
                    {errors.current}
                  </span>
                )}
              </div>

              {/* New Password Field */}
              <div className="renewal-form-group" style={{ margin: 0 }}>
                <div className="renewal-label-row">
                  <label className="renewal-label" htmlFor="newPassword">
                    <KeyRound style={{ width: 14, height: 14, color: "#0284c7" }} />
                    <span>New Password</span>
                    <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  {newPassword && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        backgroundColor: strengthLabel.bg,
                        color: strengthLabel.color
                      }}
                    >
                      {strengthLabel.text}
                    </span>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    placeholder="Enter strong characters (min 8 chars)"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errors.newPass) setErrors((prev) => ({ ...prev, newPass: null }));
                    }}
                    className="renewal-select"
                    style={{
                      paddingRight: "2.75rem",
                      borderColor: errors.newPass ? "#ef4444" : undefined
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    style={{
                      position: "absolute",
                      right: "0.85rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#64748b",
                      cursor: "pointer",
                      padding: "4px"
                    }}
                    aria-label="Toggle password visibility"
                  >
                    {showNew ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                  </button>
                </div>

                {/* Password Strength Progress Bar */}
                <div style={{ marginTop: "6px" }}>
                  <div
                    style={{
                      height: "5px",
                      backgroundColor: "#e2e8f0",
                      borderRadius: "9999px",
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${strengthScore}%`,
                        backgroundColor: strengthLabel.color,
                        transition: "width 0.3s ease, background-color 0.3s ease"
                      }}
                    />
                  </div>
                </div>

                {errors.newPass && (
                  <span style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "4px", display: "block" }}>
                    {errors.newPass}
                  </span>
                )}
              </div>

              {/* Confirm New Password Field */}
              <div className="renewal-form-group" style={{ margin: 0 }}>
                <div className="renewal-label-row">
                  <label className="renewal-label" htmlFor="confirmPassword">
                    <CheckCircle2 style={{ width: 14, height: 14, color: "#0284c7" }} />
                    <span>Confirm New Password</span>
                    <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  {passwordsMatch && (
                    <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 600, display: "flex", alignItems: "center", gap: "3px" }}>
                      <Check style={{ width: 12, height: 12 }} />
                      <span>Passwords match</span>
                    </span>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-type new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirm) setErrors((prev) => ({ ...prev, confirm: null }));
                    }}
                    className="renewal-select"
                    style={{
                      paddingRight: "2.75rem",
                      borderColor: errors.confirm ? "#ef4444" : undefined
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{
                      position: "absolute",
                      right: "0.85rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#64748b",
                      cursor: "pointer",
                      padding: "4px"
                    }}
                    aria-label="Toggle password visibility"
                  >
                    {showConfirm ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                  </button>
                </div>
                {errors.confirm && (
                  <span style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "4px", display: "block" }}>
                    {errors.confirm}
                  </span>
                )}
              </div>

              {/* Security Checkbox Directives */}
              <div style={{ backgroundColor: "#f8fafc", padding: "14px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8125rem", color: "#334155", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={logoutOtherSessions}
                    onChange={(e) => setLogoutOtherSessions(e.target.checked)}
                    style={{ width: "16px", height: "16px", accentColor: "#012a52" }}
                  />
                  <span>
                    <strong>Revoke other active sessions:</strong> Immediately log out all other active web sessions across all devices.
                  </span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8125rem", color: "#334155", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={notifyViaSms}
                    onChange={(e) => setNotifyViaSms(e.target.checked)}
                    style={{ width: "16px", height: "16px", accentColor: "#012a52" }}
                  />
                  <span>
                    <strong>Security Alert Notice:</strong> Send immediate SMS and email notification to registered signatory contact.
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "8px" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="renewal-btn-primary"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.875rem",
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
                      <span>Encrypting & Updating...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound style={{ width: 16, height: 16 }} />
                      <span>Confirm & Update Password</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="renewal-btn-outline"
                  style={{ padding: "0.75rem 1.25rem", fontSize: "0.875rem" }}
                >
                  <RotateCcw style={{ width: 15, height: 15 }} />
                  <span>Reset</span>
                </button>
              </div>
            </form>

            {/* Right Column: Security Requirements & Policy Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Real-time Validation Rules Checklist */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1.25rem",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.85rem", paddingBottom: "0.6rem", borderBottom: "1px solid #f1f5f9" }}>
                  <Shield style={{ width: 18, height: 18, color: "#012a52" }} />
                  <h4 style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "#012a52" }}>
                    Statutory Password Policy Criteria
                  </h4>
                </div>
                <p style={{ margin: "0 0 1rem 0", fontSize: "0.75rem", color: "#64748b", lineHeight: 1.4 }}>
                  In accordance with the Delhi eAbkari Security Guidelines, your new credential must satisfy the following criteria:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                  {[
                    { label: "Between 8 and 25 characters long", met: passwordCriteria.minLength && passwordCriteria.maxLength },
                    { label: "At least one uppercase letter (A–Z)", met: passwordCriteria.hasUpper },
                    { label: "At least one lowercase letter (a–z)", met: passwordCriteria.hasLower },
                    { label: "At least one numerical digit (0–9)", met: passwordCriteria.hasNumber },
                    { label: "At least one special character (!@#$%^&*)", met: passwordCriteria.hasSpecial },
                    { label: "Different from current password", met: passwordCriteria.notCurrent }
                  ].map((rule, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.78rem",
                        color: rule.met ? "#059669" : "#64748b",
                        fontWeight: rule.met ? 600 : 500
                      }}
                    >
                      {rule.met ? (
                        <CheckCircle2 style={{ width: 16, height: 16, color: "#10b981", flexShrink: 0 }} />
                      ) : (
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            border: "1.5px solid #cbd5e1",
                            margin: "1px",
                            flexShrink: 0
                          }}
                        />
                      )}
                      <span>{rule.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Signatory Card */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1rem 1.25rem",
                  fontSize: "0.78rem",
                  color: "#475569"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <Info style={{ width: 15, height: 15, color: "#0284c7" }} />
                  <strong style={{ color: "#012a52" }}>Authenticated Licensee Account</strong>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <div>
                    <span style={{ color: "#64748b" }}>User Signatory:</span>{" "}
                    <strong style={{ color: "#1e293b" }}>{userName}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b" }}>Official Registered Email:</span>{" "}
                    <span style={{ fontFamily: "monospace", color: "#0369a1" }}>{userEmail}</span>
                  </div>
                  <div>
                    <span style={{ color: "#64748b" }}>Assigned Role:</span>{" "}
                    <span style={{ fontWeight: 600 }}>{userRole}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Security Pillars */}
          <div className="renewal-pillar-grid" style={{ marginTop: "2rem" }}>
            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <ShieldCheck style={{ width: 20, height: 20 }} />
              </div>
              <div className="renewal-pillar-num">01</div>
              <h4 className="renewal-pillar-title">End-to-End Cryptography</h4>
              <p className="renewal-pillar-desc">
                Stored credentials are salted and irreversibly hashed using standard SHA-256 / bcrypt cryptographic algorithms.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <Smartphone style={{ width: 20, height: 20 }} />
              </div>
              <div className="renewal-pillar-num">02</div>
              <h4 className="renewal-pillar-title">Two-Factor OTP Security</h4>
              <p className="renewal-pillar-desc">
                High-value licensing transactions trigger automated one-time passcodes transmitted to your Aadhaar-linked mobile.
              </p>
            </div>

            <div className="renewal-pillar-card">
              <div className="renewal-pillar-icon-box">
                <Lock style={{ width: 20, height: 20 }} />
              </div>
              <div className="renewal-pillar-num">03</div>
              <h4 className="renewal-pillar-title">Automatic Session Lock</h4>
              <p className="renewal-pillar-desc">
                Sessions automatically lock after 15 minutes of idle time to prevent unauthorized access in public or shared terminals.
              </p>
            </div>
          </div>

          {/* 7. Helpdesk Assistance Banner */}
          <div className="renewal-assistance-banner">
            <div>
              <h4 className="renewal-assistance-title">Excise Cybersecurity & Identity Helpdesk</h4>
              <p className="renewal-assistance-desc">
                Suspect unauthorized access or experiencing credential lockouts? Contact the GNCTD Computer Security Incident Response Team (CSIRT).
              </p>
            </div>
            <button
              type="button"
              className="renewal-btn-outline"
              onClick={() => triggerToast("Connecting to IT Security Helpdesk (Toll Free: 1800-11-2009)")}
            >
              <HelpCircle style={{ width: 14, height: 14 }} />
              <span>Contact Security Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          SUCCESS CONFIRMATION MODAL
          ============================================================ */}
      {showSuccessModal && (
        <div className="renewal-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div
            className="renewal-modal"
            style={{ maxWidth: "520px", textAlign: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "#ecfdf5",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem auto"
              }}
            >
              <CheckCircle2 style={{ width: 32, height: 32 }} />
            </div>

            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.15rem", fontWeight: 800, color: "#012a52" }}>
              Password Updated Successfully
            </h3>
            <p style={{ margin: "0 0 1.25rem 0", fontSize: "0.8125rem", color: "#475569", lineHeight: 1.5 }}>
              Your account security password has been updated in the eAbkari Master Authentication registry. Please use your new password on all future logins.
            </p>

            <div
              style={{
                backgroundColor: "#f8fafc",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                padding: "0.75rem",
                textAlign: "left",
                fontSize: "0.75rem",
                color: "#475569",
                marginBottom: "1.25rem"
              }}
            >
              <div>• A confirmation alert has been dispatched to <strong>{userEmail}</strong>.</div>
              {logoutOtherSessions && (
                <div style={{ marginTop: "4px" }}>
                  • All other active terminal sessions have been successfully invalidated.
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                type="button"
                className="renewal-btn-primary"
                onClick={() => {
                  setShowSuccessModal(false);
                  onNavigateToHome();
                }}
              >
                <span>Return to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
