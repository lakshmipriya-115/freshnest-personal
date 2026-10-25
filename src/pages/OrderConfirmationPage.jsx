import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './OrderConfirmationPage.css';

function OrderConfirmationPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state?.orderData || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderData) {
      setLoading(false);
      return;
    }
    // Fetch order from localStorage as a fallback
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const order = orders.find(o => o.id === orderId);
      if (order) {
        setOrderData(order);
      }
    } catch (e) {
      console.error('Error loading order:', e);
    }
    setLoading(false);
  }, [orderId, orderData]);

  if (loading) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="loading">Loading order confirmation...</div>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="error-state">
            <h1>Order Not Found</h1>
            <p>We couldn't find your order. Please contact support.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const orderDate = new Date(orderData.created_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          {/* Success Message */}
          <div className="success-header">
            <div className="success-icon">✓</div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order. We'll deliver your fresh groceries soon.</p>
          </div>

          <div className="confirmation-container">
            {/* Order Details */}
            <div className="confirmation-details">
              {/* Order Number */}
              <div className="detail-card order-number-card">
                <h3>Order Number</h3>
                <p className="order-id">{orderData.id}</p>
                <small>Order placed on {orderDate}</small>
              </div>

              {/* Customer Information */}
              <div className="detail-card">
                <h3>Delivery Details</h3>
                <div className="customer-info">
                  <div className="info-row">
                    <span className="label">Name:</span>
                    <span className="value">{orderData.customer_name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Phone:</span>
                    <span className="value">
                      <a href={`tel:${orderData.phone}`}>{orderData.phone}</a>
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Address:</span>
                    <span className="value">{orderData.delivery_address}</span>
                  </div>
                  {orderData.landmark && (
                    <div className="info-row">
                      <span className="label">Landmark:</span>
                      <span className="value">{orderData.landmark}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="detail-card">
                <h3>Order Items</h3>
                <div className="items-list">
                  {orderData.order_items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-name">
                        <strong>{item.product_name}</strong>
                        <span className="item-variant">{item.variant_name}</span>
                      </div>
                      <div className="item-details">
                        <span className="qty">×{item.quantity}</span>
                        <span className="price">₹{item.price}</span>
                        <span className="total">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary & Next Steps */}
            <aside className="confirmation-sidebar">
              {/* Order Summary */}
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>₹{orderData.subtotal}</span>
                </div>
                <div className="summary-line">
                  <span>Delivery Charge</span>
                  <span>₹{orderData.delivery_charge}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-total">
                  <span>Total Amount</span>
                  <span className="amount">₹{orderData.total}</span>
                </div>
              </div>

              {/* What's Next */}
              <div className="next-steps-card">
                <h3>What's Next?</h3>
                <div className="steps">
                  <div className="step">
                    <span className="step-number">1</span>
                    <p>We're preparing your order</p>
                  </div>
                  <div className="step">
                    <span className="step-number">2</span>
                    <p>Our team will confirm delivery</p>
                  </div>
                  <div className="step">
                    <span className="step-number">3</span>
                    <p>Fresh groceries at your door</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="contact-card">
                <h3>Need Help?</h3>
                <p>Contact Fresh Nest:</p>
                <div className="contact-options">
                  <a href="tel:+919444620854" className="contact-link">
                    📞 +91 94446 20854
                  </a>
                  <a href="https://wa.me/91" target="9444620854_blank" rel="noopener noreferrer" className="contact-link">
                    💬 WhatsApp
                  </a>
                  <a href="mailto:freshnest28@gmail.com" className="contact-link">
                    📧 freshnest28@gmail.com
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="action-buttons">
                <Link to="/products" className="btn btn-primary btn-block">
                  Continue Shopping
                </Link>
                <Link to="/" className="btn btn-outline btn-block">
                  Back to Home
                </Link>
              </div>
            </aside>
          </div>

          {/* Additional Info */}
          <div className="info-banner">
            <div className="info-item">
              <span className="info-icon">✓</span>
              <div>
                <strong>Fresh Guarantee</strong>
                <p>All items are freshly selected and verified</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✓</span>
              <div>
                <strong>Easy Returns</strong>
                <p>Not satisfied? Return items within 24 hours</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✓</span>
              <div>
                <strong>Safe Delivery</strong>
                <p>Contactless delivery available on request</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
