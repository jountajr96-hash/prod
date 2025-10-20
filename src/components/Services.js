import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div id="services" className="services-container">
      <h2 className="section-title">What We Do</h2>
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-video"></i>
          </div>
          <h3>Video Production</h3>
          <p>Professional production of commercial, corporate, and event videos</p>
        </div>
        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-camera"></i>
          </div>
          <h3>Photography</h3>
          <p>High-quality product, event, and portrait photography services</p>
        </div>
        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-magic"></i>
          </div>
          <h3>Post-Production</h3>
          <p>Editing, color grading, and special effects to achieve stunning results</p>
        </div>
      </div>
    </div>
  );
};

export default Services;