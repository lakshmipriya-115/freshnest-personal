import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { insertOrder } from '../services/supabase';
import './CheckoutPage.css';

const DELIVERY_CHARGE = 50;

function CheckoutPage({ cart, clearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    landmark: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCharge = cart.length > 0 ? DELIVERY_CHARGE : 0;
    const total = subtotal + deliveryCharge;
    return { subtotal, deliveryCharge, total };
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Please add items before checking out</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^\d]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `ORD-${Date.now()}`;
      // Create order data structure ready for Supabase
      const orderData = {
        id: orderId,
        customer_name: formData.fullName,
        phone: formData.phone,
        delivery_address: formData.address,
        landmark: formData.landmark || null,
        subtotal: cartTotals.subtotal,
        delivery_charge: cartTotals.deliveryCharge,
        total: cartTotals.total,
        status: 'pending',
        order_items: cart.map(item => ({
          product_id: item.id,
          variant_id: item.selectedVariant.id,
          product_name: item.name,
          variant_name: item.selectedVariant.name || item.selectedVariant.options?.[0]?.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await insertOrder(orderData);

      clearCart();
      navigate(`/order-confirmation/${orderId}`, { 
        state: { 
          orderData: { ...orderData, created_at: new Date().toISOString() } 
        } 
      });
    } catch (error) {
      console.error('Error placing order:', error);
      setErrors({ submit: error.message || 'Failed to place order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        <div className="checkout-container">
          {/* Checkout Form */}
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <h2>Delivery Details</h2>

              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Enter your 10-digit phone number"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Delivery Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`form-textarea ${errors.address ? 'error' : ''}`}
                  placeholder="Enter your complete delivery address"
                  rows="4"
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="landmark">Landmark (Optional)</label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Nearby landmark (e.g., near school, near market)"
                />
              </div>

              {errors.submit && <div className="form-error">{errors.submit}</div>}

              <button 
                type="submit" 
                className="btn btn-primary btn-large"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Review */}
          <aside className="order-review">
            <h2>Order Review</h2>

            <div className="review-items">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedVariant.id}`} className="review-item">
                  <div className="review-item-details">
                    <h4>{item.name}</h4>
                    <p className="review-variant">
                      {item.selectedVariant.name || item.selectedVariant.options?.[0]?.name}
                    </p>
                  </div>
                  <div className="review-item-qty">x{item.quantity}</div>
                  <div className="review-item-price">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="review-divider"></div>

            <div className="review-summary">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{cartTotals.subtotal}</span>
              </div>
              <div className="summary-line">
                <span>Delivery Charge</span>
                <span>₹{cartTotals.deliveryCharge}</span>
              </div>
            </div>

            <div className="review-total">
              <span>Total Amount</span>
              <span className="total-amount">₹{cartTotals.total}</span>
            </div>

            <div className="payment-method">
              <h4>Payment</h4>
              <p className="payment-info">
                💰 Pay on Delivery<br />
                <small>No advance payment required</small>
              </p>
            </div>

            <div className="order-guarantee">
              <div className="guarantee-item">
                <span className="guarantee-icon">✓</span>
                <p>Fresh groceries guaranteed</p>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-icon">✓</span>
                <p>Easy returns within 24 hours</p>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-icon">✓</span>
                <p>Safe & secure delivery</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
