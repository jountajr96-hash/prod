import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    serviceType: '',
    preferredDate: '',
    projectDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Your reservation has been submitted! We will contact you within 24 hours.');
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      serviceType: '',
      preferredDate: '',
      projectDetails: ''
    });
  };

  return (
    <div className="booking-container">
      <div className="booking-content">
        <h2 className="booking-title">Book Our Services</h2>
        <p className="booking-subtitle">
          Ready to bring your vision to life? Fill out the form below and we'll get back to you within 24 hours
        </p>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+1 234 567 8900"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="serviceType">Service Type</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                <option value="video-production">Video Production</option>
                <option value="photography">Photography</option>
                <option value="post-production">Post-Production</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="preferredDate">Preferred Date</label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectDetails">Project Details</label>
            <textarea
              id="projectDetails"
              name="projectDetails"
              placeholder="Tell us about your project..."
              value={formData.projectDetails}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Submit Reservation</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;