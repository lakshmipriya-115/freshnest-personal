import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About Fresh Nest</h1>
          <p className="tagline">Your trusted local supermarket for fresh groceries and everyday essentials.</p>
        </div>
      </section>

      <div className="container">
        {/* Mission Section */}
        <section className="about-section">
          <div className="section-content">
            <div className="section-text">
              <h2>Our Mission</h2>
              <p>
                At Fresh Nest, we believe that quality groceries shouldn't be expensive or hard to find. 
                Our mission is to bring fresh, high-quality produce and everyday essentials directly to your doorstep, 
                supporting local farmers and keeping our community connected.
              </p>
              <p>
                We handpick every item, ensuring that what arrives at your home is fresh, nutritious, 
                and worthy of your family's trust.
              </p>
            </div>
            <div className="section-image">
              <img 
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&h=600&fit=crop"
                alt="Fresh Market"
                className="section-img"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="about-section">
          <h2 className="section-title">Why Choose Fresh Nest?</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">🌱</span>
              <h3>Quality First</h3>
              <p>Every item is carefully selected and verified for freshness and quality before delivery.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">👨‍🌾</span>
              <h3>Direct From Farmers</h3>
              <p>We source directly from local farmers, ensuring freshness and supporting our community.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">💰</span>
              <h3>Competitive Pricing</h3>
              <p>Quality doesn't have to be expensive. We offer the best prices without compromising quality.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🚚</span>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery service to get fresh groceries to your door in time.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">👥</span>
              <h3>Friendly Service</h3>
              <p>We're a local business that cares about our customers. Your satisfaction is our priority.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🔄</span>
              <h3>Easy Returns</h3>
              <p>Not satisfied with your order? Return items within 24 hours, no questions asked.</p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="about-section">
          <div className="section-content reverse">
            <div className="section-text">
              <h2>Our Story</h2>
              <p>
                Fresh Nest was founded with a simple idea: make it easier for families to access fresh, 
                quality groceries without the hassle of crowded markets or compromising on quality.
              </p>
              <p>
                What started as a neighborhood initiative has grown into a trusted local supermarket 
                that serves hundreds of families daily. We've built our reputation on quality, reliability, 
                and genuine care for our community.
              </p>
              <p>
                Today, Fresh Nest continues to grow while staying true to our core values: 
                quality products, fair prices, and excellent service.
              </p>
            </div>
            <div className="section-image">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop"
                alt="Fresh Produce"
                className="section-img"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">2000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Local Farmers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Deliveries</div>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="about-section commitment-section">
          <h2 className="section-title">Our Commitment</h2>
          <div className="commitment-grid">
            <div className="commitment-item">
              <h3>🌍 Sustainability</h3>
              <p>We're committed to sustainable practices and minimizing our environmental impact through responsible sourcing and delivery.</p>
            </div>
            <div className="commitment-item">
              <h3>👨‍👩‍👧‍👦 Community</h3>
              <p>We believe in supporting local farmers and businesses, contributing to the growth of our community.</p>
            </div>
            <div className="commitment-item">
              <h3>✨ Excellence</h3>
              <p>Every interaction with Fresh Nest is designed to exceed your expectations and earn your trust.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <h2>Experience Fresh Nest Today</h2>
          <p>Join thousands of families who trust Fresh Nest for their daily groceries</p>
          <a href="/products" className="btn btn-primary">Start Shopping</a>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
