import React, { Component } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

class Contact extends Component {
  render() {
    return (
      <section id="contact" className="contact-section">
        <div className="contact-container">

          {/* Header */}
          <div className="contact-header">
            <h2 className="contact-title">Get In Touch</h2>
            <p className="contact-subtitle">
              Contact the Department of Excise, Government of NCT of Delhi
            </p>
          </div>

          <div className="contact-grid">
            {/* LEFT */}
            <div className="contact-left">
              <h3 className="contact-heading">Contact Information</h3>

              <div className="contact-info">
                {/* Address */}
                <div className="contact-item">
                  <div className="contact-icon">
                    <MapPin size={20} />
                  </div>
                  <p className="contact-text">
                    <strong>Department of Excise</strong><br />
                    Government of NCT of Delhi<br />
                    L &amp; N Block, Vikas Bhawan,<br />
                    I.P. Estate, New Delhi – 110002
                  </p>
                </div>

                {/* Phone */}
                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone size={20} />
                  </div>
                  <p className="contact-text">
                    Helpdesk:{" "}
                    <a href="tel:01123370705">011-23370705</a>,{" "}
                    <a href="tel:01123379752">011-23379752</a>
                  </p>
                </div>

                {/* Email */}
                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail size={20} />
                  </div>
                  <p className="contact-text">
                    helpdesk-delhiexcise[at]delhi[dot]gov[dot]in
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="contact-map">
                <iframe
                  title="Excise, Entertainment Tax And Luxury Tax Department"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.997247933481!2d77.2419182!3d28.6261499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfcd4cb83f6b7%3A0x5c4a6256e1943afa!2sExcise%2C%20Entertainment%20Tax%20And%20Luxury%20Tax%20Department!5e0!3m2!1sen!2sin!4v1705131111111"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="contact-form-wrapper">
              <h3 className="contact-heading">Send Us a Message</h3>

              <form className="contact-form">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Your name" />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" />
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="4" placeholder="Write your message..." />
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default Contact;
