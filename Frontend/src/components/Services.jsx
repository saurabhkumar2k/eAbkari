import React, { Component } from "react";
import { Code, Smartphone, Globe, Zap } from "lucide-react";

class Services extends Component {
  render() {
    const services = [
      {
        icon: Code,
        title: "Web Development",
        description:
          "Custom web applications built with modern technologies and best practices.",
        features: ["Responsive Design", "Performance Optimized", "SEO Friendly"],
      },
      {
        icon: Smartphone,
        title: "Mobile Apps",
        description:
          "Native and cross-platform mobile applications for iOS and Android.",
        features: ["Native Performance", "Cross-Platform", "User-Centric Design"],
      },
      {
        icon: Globe,
        title: "Digital Strategy",
        description:
          "Comprehensive digital transformation strategies for your business.",
        features: ["Market Analysis", "Growth Planning", "Technology Roadmap"],
      },
      {
        icon: Zap,
        title: "Consulting",
        description:
          "Expert guidance to help you make informed technology decisions.",
        features: [
          "Technical Expertise",
          "Strategic Planning",
          "Implementation Support",
        ],
      },
    ];

    return (
      <section id="services" className="services">
        <div className="services-container">

          {/* Header */}
          <div className="services-header">
            <h2 className="services-title">Our Services</h2>
            <p className="services-subtitle">
              We offer comprehensive solutions to help your business thrive in
              the digital age.
            </p>
          </div>

          {/* Grid */}
          <div className="services-grid">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="service-card">
                  <div className="service-icon">
                    <IconComponent size={24} />
                  </div>

                  <h3 className="service-title">{service.title}</h3>

                  <p className="service-description">
                    {service.description}
                  </p>

                  <ul className="service-features">
                    {service.features.map((feature, i) => (
                      <li key={i}>
                        <span className="feature-dot"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    );
  }
}

export default Services;
