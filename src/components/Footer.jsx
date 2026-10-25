import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>About Fresh Nest</h4>
              <p>Your trusted local supermarket for fresh groceries and everyday essentials.</p>
              <p className="tagline-footer">Freshness You Can Trust, Every Day.</p>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Shop</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-info">
                <p>
                  <strong>Phone:</strong><br />
                  <a href="tel:+919444620854">+91 94446 20854</a>
                </p>
                <p>
                  <strong>Email:</strong><br />
                  <a href="mailto:freshnest28@gmail.com">freshnest28@gmail.com</a>
                </p>
                <p>
                  <strong>Address:</strong><br />
                  115 Market Street, cpt, India
                </p>
              </div>
            </div>

            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://wa.me/919444620854" target="_blank" rel="noopener noreferrer" className="social-link">
                  WhatsApp
                </a>
                <a href="https://www.facebook.com/freshnest" target="_blank" rel="noopener noreferrer" className="social-link">
                  Facebook
                </a>
                <a href="https://www.instagram.com/freshnest" target="_blank" rel="noopener noreferrer" className="social-link">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p style={{color:"#ffffff"}}>&copy; 2024 Fresh Nest. All rights reserved. | Built with ❤️ for freshness.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
