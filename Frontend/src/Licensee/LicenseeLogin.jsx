import React, { useState } from 'react';
import { 
  Home, 
  Store, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Award, 
  Building2, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { 
  GlobeSvg,
  ChevronDownSvg
} from "../components/icons/GlobalIcons";

const LicenseeLogin = ({ onNavigateToRegister, onNavigateHome, onLoginSuccess }) => {
  const [licenseeId, setLicenseeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!licenseeId.trim()) {
      setError('Please enter your License Number, Establishment Code or User ID.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your portal password or licensee PIN.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate authenticating licensee securely
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        window.location.href = '/applicantdashboard';
      }
    }, 450);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* Left Side: Branding & Licensee Information */}
        <div className="login-info-panel">
          <div className="login-info-content">
            <div className="login-dept-header">
              <div className="login-dept-box">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                  alt="Emblem of India" 
                  className="login-emblem" 
                />
                <div>
                  <h2 className="login-dept-title">Department of Excise</h2>
                  <p className="login-dept-subtitle">Government of NCT of Delhi</p>
                </div>
              </div>
            </div>

            <div className="welcome-section">
              {/* <div className="licensee-portal-tag">
                <Sparkles className="licensee-sparkle-icon" />
                <span>eAbkari Licensee Portal</span>
              </div> */}
              <h1 className="welcome-title">Welcome Licensee!</h1>
              <p className="welcome-subtitle">
                Official single-window portal for wholesale bonders, retail vends, distilleries, and hospitality (HCR) establishments.
              </p>
              <div className="welcome-line" />
            </div>

            <div className="info-feature-list">
              <div className="info-feature-item">
                <div className="info-feature-icon">
                  <Store className="licensee-feature-icon-svg" />
                </div>
                <div>
                  <h3 className="feature-title-white">Licensed Establishment Oversight</h3>
                  <p className="feature-desc-white">Unified operations for wholesale vends, retail bonded depots &amp; HCR bar lounges</p>
                </div>
              </div>

              <div className="info-feature-item">
                <div className="info-feature-icon">
                  <Truck className="licensee-feature-icon-svg" />
                </div>
                <div>
                  <h3 className="feature-title-white">Permits &amp; Transport Passes</h3>
                  <p className="feature-desc-white">Instant issuance of Import Permits Cum Passes (IP-PL) and bulk spirit authorisations</p>
                </div>
              </div>

              <div className="info-feature-item">
                <div className="info-feature-icon">
                  <ShieldCheck className="licensee-feature-icon-svg" />
                </div>
                <div>
                  <h3 className="feature-title-white">Statutory Returns &amp; Duty Filing</h3>
                  <p className="feature-desc-white">Real-time e-Challan payment reconciliation, brand quota monitoring &amp; renewals</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="login-info-footer">
            <p className="login-footer-text">© 2024 Department of Excise, Government of NCT of Delhi. All rights reserved.</p>
          </div>
          
          {/* Decorative Background Image with Overlay */}
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200" 
            alt="Licensed Establishment" 
            className="login-panel-bg" 
          />
          <div className="login-panel-overlay" />
        </div>

        {/* Right Side: Licensee Form Panel */}
        <div className="login-form-panel">
          <div className="licensee-top-bar">
            <button 
              type="button" 
              className="licensee-home-btn" 
              onClick={onNavigateHome}
              title="Return to Public Portal Home"
            >
              <Home className="licensee-home-icon" />
              <span>Home</span>
            </button>
            <div className="licensee-top-actions">
              {/* <button 
                type="button"
                onClick={() => window.location.href = '/login'}
                className="licensee-switch-btn"
                title="Switch to Applicant Login"
              >
                Applicant Login →
              </button> */}
              <button type="button" className="lang-btn">
                <GlobeSvg className="icon-xs" />
                <span>English</span>
                <ChevronDownSvg className="icon-xs" />
              </button>
            </div>
          </div>

          <div className="login-form-container">
            <div className="login-form-box">
              <div className="licensee-header-icon-circle">
                <Store className="licensee-header-store-icon" />
              </div>
              
              <h1 className="login-form-title">Licensee Login</h1>
             
              {/* License Category Filter Pills */}
              {/* <div className="licensee-category-tabs">
                {[
                  { id: 'ALL', label: 'All Licenses' },
                  { id: 'WHOLESALE', label: 'Wholesale (L-1)' },
                  { id: 'RETAIL', label: 'Retail Vend (L-6)' },
                  { id: 'HCR', label: 'Hotel & Bar (HCR)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`licensee-category-tab ${
                      selectedCategory === tab.id ? 'active' : ''
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div> */}

              {/* Error Alert Box */}
              {/* {error && (
                <div className="licensee-error-alert">
                  <AlertCircle className="licensee-error-icon" />
                  <span>{error}</span>
                </div>
              )} */}

              <form className="login-form-fields" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label className="reg-label-block">
                     User ID
                  </label>
                  <div className="login-input-group">
                    <div className="login-input-icon">
                      <Store className="licensee-field-icon" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="e.g. DL-L1-2024-0012 or Registered ID" 
                      className="login-input-field"
                      value={licenseeId}
                      onChange={(e) => {
                        setLicenseeId(e.target.value);
                        if (error) setError('');
                      }}
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="reg-label-block">Password / Licensee PIN</label>
                  <div className="login-input-group">
                    <div className="login-input-icon">
                      <Lock className="licensee-field-icon" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter Licensee Password" 
                      className="login-input-field padding-right-large" 
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError('');
                      }}
                      autoComplete="current-password"
                    />
                    <button 
                      type="button" 
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="licensee-pwd-icon" />
                      ) : (
                        <Eye className="licensee-pwd-icon" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="login-options-row">
                  <label className="checkbox-flex-label">
                    <input 
                      type="checkbox" 
                      className="reg-checkbox-small" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkbox-text">Remember me</span>
                  </label>
                  <button 
                    type="button" 
                    className="forgot-password-link"
                    onClick={() => alert("To reset your licensee password or PIN, please contact the Excise Nodal Officer or initiate digital eAbkari OTP reset.")}
                  >
                    Forgot Password
                  </button>
                </div>

                <button 
                  type="submit" 
                  className="login-btn-submit licensee-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Authenticating Licensee...</span>
                  ) : (
                    <>
                      <Lock className="licensee-btn-icon" />
                      <span>Sign In as Licensee</span>
                    </>
                  )}
                </button>

                <div className="divider-container">
                  <div className="divider-line-box">
                    <div className="divider-line"></div>
                  </div>
                  <div className="divider-text-box">
                    <span className="divider-text">OR</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="login-btn-new-account licensee-register-btn"
                  onClick={onNavigateToRegister}
                >
                  <Award className="licensee-award-icon" />
                  <span>Apply for Fresh License / New Vend</span>
                </button>
              </form>
            </div>

            <div className="gov-seal-footer">
              <div className="gov-seal-box">
                <ShieldCheck className="licensee-seal-icon" />
                <div>
                  <h4 className="gov-footer-title">Official Government Licensee Gateway</h4>
                  <p className="gov-footer-desc">Regulated under Delhi Excise Act 2009 &amp; Delhi Excise Rules 2010.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseeLogin;
