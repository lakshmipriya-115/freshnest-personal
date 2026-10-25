import React, { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be sent to a backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with Fresh Nest!</p>
        </div>
      </section>

      <div className="container">
        <div className="contact-container">
          {/* Contact Info */}
          <section className="contact-info-section">
            <div className="contact-info-grid">
              {/* Address */}
              <div className="info-card">
                <div className="info-icon">📍</div>
                <h3>Address</h3>
                <p>
                  123 Market Street<br />
                  Your City, State 123456<br />
                  India
                </p>
              </div>

              {/* Phone */}
              <div className="info-card">
                <div className="info-icon">📞</div>
                <h3>Phone</h3>
                <p>
                  <a href="tel:+919444620854">+91 94446 20854</a><br />
                  <small>Available 9 AM - 6 PM</small>
                </p>
              </div>

              {/* Email */}
              <div className="info-card">
                <div className="info-icon">📧</div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:hello@freshnest.com">hello@freshnest.com</a><br />
                  <small>Response within 24 hours</small>
                </p>
              </div>

              {/* WhatsApp */}
              <div className="info-card">
                <div className="info-icon">💬</div>
                <h3>WhatsApp</h3>
                <p>
                  <a href="https://wa.me/919444620854" target="_blank" rel="noopener noreferrer">
                    Message us on WhatsApp
                  </a><br />
                  <small>Quick responses available</small>
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form & Map */}
          <div className="contact-content">
            {/* Contact Form */}
            <section className="contact-form-section">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Tell us what you think..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  Send Message
                </button>

                {submitted && (
                  <div className="success-message">
                    ✓ Thank you! We've received your message and will get back to you soon.
                  </div>
                )}
              </form>
            </section>

            {/* Map/Location Info */}
            <section className="location-section">
              <h2>Visit Us</h2>
              <div className="map-container">
                <div className="map-placeholder">
                  <div className="map-content">
                    <div className="map-icon">📍</div>
                    <p>Fresh Nest Supermarket</p>
                    <p className="map-address">123 Market Street, Your City</p>
                    <p className="map-hours">
                      <strong>Opening Hours:</strong><br />
                      Monday - Sunday<br />
                      9:00 AM - 8:00 PM
                    </p>
                    <a 
                      href="https://maps.google.com/maps?q=123+Market+Street" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-small btn-outline"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              <div className="delivery-info-section">
                <h3>Delivery Information</h3>
                <div className="delivery-list">
                  <div className="delivery-item">
                    <span className="delivery-icon">✓</span>
                    <p>Fast delivery to your area</p>
                  </div>
                  <div className="delivery-item">
                    <span className="delivery-icon">✓</span>
                    <p>Fresh groceries verified before dispatch</p>
                  </div>
                  <div className="delivery-item">
                    <span className="delivery-icon">✓</span>
                    <p>Easy returns and refunds</p>
                  </div>
                  <div className="delivery-item">
                    <span className="delivery-icon">✓</span>
                    <p>Contactless delivery available</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* FAQ Quick Links */}
        <section className="faq-section">
          <h2>Common Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>📦 How do I place an order?</h4>
              <p>Browse our products, add items to your cart, and checkout with your delivery address.</p>
            </div>
            <div className="faq-item">
              <h4>🚚 What is the delivery charge?</h4>
              <p>We charge a flat delivery fee of ₹50 per order for all areas.</p>
            </div>
            <div className="faq-item">
              <h4>⏰ How long does delivery take?</h4>
              <p>We deliver within 24-48 hours of order placement to most areas.</p>
            </div>
            <div className="faq-item">
              <h4>🔄 Can I return items?</h4>
              <p>Yes, return items within 24 hours for a full refund.</p>
            </div>
            <div className="faq-item">
              <h4>💳 What payment methods do you accept?</h4>
              <p>We offer Pay on Delivery (Cash on Delivery) for your convenience.</p>
            </div>
            <div className="faq-item">
              <h4>🏪 Do you deliver everywhere?</h4>
              <p>We deliver to most areas in the city. Check at checkout to confirm delivery to your area.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;
