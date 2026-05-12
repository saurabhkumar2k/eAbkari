import React, { useState } from 'react';
import { 
  UserSvg, 
  CalendarSvg, 
  BriefcaseSvg, 
  MapPinSvg, 
  PhoneSvg, 
  MailSvg, 
  ShieldCheckSvg, 
  LockSvg, 
  CloudUploadSvg, 
  SendSvg, 
  InfoSvg, 
  ShieldSvg, 
  TimerSvg, 
  RefreshCwSvg, 
  HeadphonesSvg, 
  ChevronDownSvg 
} from '../../Style/images/Icons';

const Registration = ({ onNavigateToLogin }) => {
  return (
    <div className="registration-view">
      {/* Registration Banner */}
      <section className="reg-banner">
        <div className="reg-banner-overlay" />
        <img 
          src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=2000" 
          alt="" 
          className="reg-banner-bg"
        />
        <div className="container reg-banner-content">
          <div className="reg-header-box">
             <div className="reg-icon-circle">
                <UserSvg className="icon-lg reg-color-white" />
                <div className="reg-icon-plus">+</div>
             </div>
             <div>
                <h1 className="reg-main-title">User Registration</h1>
                <p className="reg-main-subtitle">Create your account to access the portal</p>
             </div>
          </div>
        </div>
      </section>

      {/* Registration Form Card */}
      <section className="container reg-form-section">
        <div className="reg-card">
          <form className="reg-grid">
            {/* Personal Info */}
            <div className="reg-field reg-field-full">
              <label className="reg-label">First Name <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><UserSvg className="icon-xs" /></div>
                <input type="text" placeholder="Enter first name" className="reg-input" />
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Last Name <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><UserSvg className="icon-xs" /></div>
                <input type="text" placeholder="Enter last name" className="reg-input" />
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Father / Husband Name <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><UserSvg className="icon-xs" /></div>
                <input type="text" placeholder="Enter father / husband name" className="reg-input" />
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Date of Birth <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <input type="text" placeholder="DD/MM/YYYY" className="reg-input" />
                <div className="reg-input-icon-right"><CalendarSvg className="icon-xs" /></div>
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Gender <span className="reg-required">*</span></label>
              <div className="reg-radio-group">
                <label className="reg-radio-label">
                  <input type="radio" name="gender" className="reg-radio" /> Male
                </label>
                <label className="reg-radio-label">
                  <input type="radio" name="gender" className="reg-radio" /> Female
                </label>
                <label className="reg-radio-label">
                  <input type="radio" name="gender" className="reg-radio" /> Other
                </label>
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Occupation <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><BriefcaseSvg className="icon-xs" /></div>
                <select className="reg-select">
                  <option>Select occupation</option>
                </select>
                <div className="reg-input-icon-right"><ChevronDownSvg className="icon-xs" /></div>
              </div>
            </div>

            <div className="reg-field reg-field-full">
              <label className="reg-label">Address Line 1 <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                <input type="text" placeholder="Enter address line 1" className="reg-input" />
              </div>
            </div>

            <div className="reg-field reg-field-full">
              <label className="reg-label">Address Line 2 (Optional)</label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                <input type="text" placeholder="Enter address line 2" className="reg-input" />
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">City <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                <input type="text" placeholder="Enter city" className="reg-input" />
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">State <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                <select className="reg-select">
                  <option>Select state</option>
                </select>
                <div className="reg-input-icon-right"><ChevronDownSvg className="icon-xs" /></div>
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">District <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                <select className="reg-select">
                  <option>Select district</option>
                </select>
                <div className="reg-input-icon-right"><ChevronDownSvg className="icon-xs" /></div>
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">PIN Code <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MapPinSvg className="icon-xs" /></div>
                <input type="text" placeholder="Enter PIN code" className="reg-input" />
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Mobile Number <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><PhoneSvg className="icon-xs" /></div>
                <input type="text" placeholder="Enter mobile number" className="reg-input" />
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Email Address <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><MailSvg className="icon-xs" /></div>
                <input type="email" placeholder="Enter email address" className="reg-input" />
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Secret Question <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><ShieldCheckSvg className="icon-xs" /></div>
                <select className="reg-select">
                  <option>Select secret question</option>
                </select>
                <div className="reg-input-icon-right"><ChevronDownSvg className="icon-xs" /></div>
              </div>
            </div>

            <div className="reg-field">
              <label className="reg-label">Secret Answer <span className="reg-required">*</span></label>
              <div className="reg-input-group">
                <div className="reg-input-icon"><LockSvg className="icon-xs" /></div>
                <input type="text" placeholder="Enter secret answer" className="reg-input" />
              </div>
            </div>

            <div className="reg-field-row reg-field-full">
               <div className="photo-upload-box">
                  <div className="upload-placeholder">
                    <CloudUploadSvg className="icon-md reg-color-primary" />
                    <div>
                       <div className="upload-link">Upload Photo</div>
                       <div className="upload-hint">JPG, PNG (Max. 2MB)</div>
                    </div>
                  </div>
               </div>

               <div className="checkbox-field margin-top-medium">
                  <label className="reg-checkbox-label">
                     <input type="checkbox" className="reg-checkbox" />
                     <span>Pursuable Offence</span>
                     <button type="button" className="info-trigger"><InfoSvg className="icon-xs" /></button>
                  </label>
               </div>
            </div>

            {/* Form Actions */}
            <div className="reg-actions-row col-span-full">
               <button type="submit" className="btn-reg-submit">
                  <SendSvg className="icon-xs" />
                  Submit
               </button>
               <button type="button" className="btn-reg-cancel">
                  Cancel
               </button>
            </div>
            <div className="login-link-footer">
               <p className="login-link-text">
                 Already have an account? 
                 <button 
                   type="button" 
                   onClick={() => onNavigateToLogin()} 
                   className="login-here-btn"
                 >
                   Login here
                 </button>
               </p>
            </div>
          </form>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="container reg-feature-strip">
         <div className="reg-feature-grid">
            <div className="reg-feature-item">
               <div className="reg-feature-icon blue">
                  <ShieldSvg className="icon-md" />
               </div>
               <div>
                  <h3 className="feature-title">Secure & Reliable</h3>
                  <p className="feature-desc">Your data is protected with highest security standards</p>
               </div>
            </div>
            <div className="reg-feature-item">
               <div className="reg-feature-icon green">
                  <TimerSvg className="icon-md" />
               </div>
               <div>
                  <h3 className="feature-title">Quick & Easy</h3>
                  <p className="feature-desc">Simple process with minimal steps to get started</p>
               </div>
            </div>
            <div className="reg-feature-item">
               <div className="reg-feature-icon purple">
                  <RefreshCwSvg className="icon-md" />
               </div>
               <div>
                  <h3 className="feature-title">Transparent Process</h3>
                  <p className="feature-desc">Track your application status in real-time</p>
               </div>
            </div>
            <div className="reg-feature-item">
               <div className="reg-feature-icon orange">
                  <HeadphonesSvg className="icon-md" />
               </div>
               <div>
                  <h3 className="feature-title">Help & Support</h3>
                  <p className="feature-desc">24/7 assistance for all your queries</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Registration;
