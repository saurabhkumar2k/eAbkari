/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DownloadSvg, ArrowUpRightSvg } from '../Style/images/Icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-layout-grid">
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-link-list">
              {['About Us', 'Facts & Figures', 'Acts, Rules & Orders', 'RTI', 'Feedback', 'Track & Trace', 'User Manuals'].map(l => (
                <li key={l} className="footer-link-item"><a href="#" className="footer-link">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Important Links</h4>
            <ul className="footer-link-list">
              {['Government of NCT of Delhi', 'Delhi Govt. Portal', 'Transparency Portal', 'e-District Delhi', 'India.gov.in'].map(l => (
                <li key={l} className="footer-link-item"><a href="#" className="footer-link">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Help & Support</h4>
            <ul className="footer-link-list">
              {['FAQs', 'Contact Us', 'Grievance Redressal', 'Website Policies', 'Sitemap'].map(l => (
                <li key={l} className="footer-link-item"><a href="#" className="footer-link">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Download Mobile App</h4>
            <a href="#" className="app-store-button">
              <div className="app-store-icon"><DownloadSvg className="icon-md" /></div>
              <div>
                <div className="app-label-small">Get it on</div>
                <div className="app-label-main">Google Play</div>
              </div>
            </a>
            <a href="#" className="app-store-button">
              <div className="app-store-icon"><ArrowUpRightSvg className="icon-md" /></div>
              <div>
                <div className="app-label-small">Download on the</div>
                <div className="app-label-main">App Store</div>
              </div>
            </a>
          </div>
        </div>

        <div className="footer-bottom-info">
          <p className="copyright-text-main">© 2025 Department of Excise, Government of NCT of Delhi. All Rights Reserved.</p>
          <div className="last-updated-tag">
            Last Updated: 20 May 2025
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
