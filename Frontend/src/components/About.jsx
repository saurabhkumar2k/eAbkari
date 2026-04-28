import React, { Component } from "react";
import { Users, Target, Award } from "lucide-react";

class About extends Component {
  render() {
    const features = [
      {
        icon: Users,
        title: "Expert Team",
        description: "Our experienced professionals deliver exceptional results",
      },
      {
        icon: Target,
        title: "Focused Approach",
        description: "We target your specific needs with precision and care",
      },
      {
        icon: Award,
        title: "Proven Results",
        description: "Track record of successful projects and satisfied clients",
      },
    ];

    return (
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="Professional team meeting"
                className="about-image"
                width="600"
                height="400"
              />
            </div>

            <div className="about-content">
              <h2 className="about-title">About Our Company</h2>

              <p className="about-description">
                We are a forward-thinking company dedicated to providing
                innovative solutions that drive success. With years of
                experience and a commitment to excellence, we help businesses
                transform and grow.
              </p>

              <div className="features-list">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="feature-item">
                      <div className="feature-icon">
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-text">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
