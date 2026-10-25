import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const DELIVERY_CHARGE = 50;

function CartPage({ cart, updateQuantity, removeFromCart }) {
  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCharge = subtotal >= 100 ? 0 : DELIVERY_CHARGE;
    const total = subtotal + deliveryCharge;

    return { subtotal, deliveryCharge, total };
  }, [cart]);

  if (cart.length === 0) {

    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Start shopping to add items to your cart</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        <div className="cart-container">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-header">
              <span>Product</span>
              <span className="qty-col">Quantity</span>
              <span className="price-col">Price</span>
              <span className="action-col">Action</span>
            </div>

            <div className="cart-items">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedVariant.id}`} className="cart-item">
                  <div className="item-details">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=100&h=100&fit=crop';
                      }}
                    />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p className="variant-info">
                        {item.selectedVariant.name || item.selectedVariant.options?.[0]?.name}
                      </p>
                    </div>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.selectedVariant.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, item.selectedVariant.id, Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="qty-input"
                      min="1"
                    />
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.selectedVariant.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-price">
                    <span className="unit-price">₹{item.price}</span>
                    <span className="total-price">₹{item.price * item.quantity}</span>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.selectedVariant.id)}
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <aside className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-item">
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{cartTotals.subtotal}</span>
            </div>

            <div className="summary-item">
              <span>Delivery Charge</span>
              <span>₹{cartTotals.deliveryCharge}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{cartTotals.total}</span>
            </div>

            <Link to="/checkout" className="btn btn-primary btn-block">
              Proceed to Checkout
            </Link>

            <Link to="/products" className="btn btn-outline btn-block">
              Continue Shopping
            </Link>

            <div className="delivery-info">
              <p>✓ Flat ₹50 delivery charge</p>
              <p>✓ Fast delivery to your area</p>
              <p>✓ Easy returns within 24 hours</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
