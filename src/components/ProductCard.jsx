import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, showActions = true }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Check if this has complex variants (options within variants)
  const hasComplexVariants = product.variants?.some(v => v.options);
  
  const defaultVariant = product.variants && product.variants[0];
  const displayVariant = selectedVariant || defaultVariant;

  const handleAddToCart = () => {
    if (!displayVariant) {
      alert('Please select a variant');
      return;
    }

    if (displayVariant.availability === 'Out of Stock') {
      alert('This item is currently out of stock');
      return;
    }

    // For complex variants with options, we can't add from card - must use detail page
    if (hasComplexVariants) {
      alert('Please click on the product to select options and add to cart');
      return;
    }

    setIsAdding(true);
    onAddToCart(product, displayVariant, quantity);
    setQuantity(1);
    setSelectedVariant(null);

    // Reset adding state after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 300);
  };

  const isOutOfStock = displayVariant?.availability === 'Out of Stock';

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=500&h=500&fit=crop';
            }}
          />
          {isOutOfStock && (
            <div className="stock-badge out-of-stock">Out of Stock</div>
          )}
          {displayVariant?.availability === 'In Stock' && (
            <div className="stock-badge in-stock">In Stock</div>
          )}
        </div>

        <div className="product-info">
          <h4 className="product-name">{product.name}</h4>
          <p className="product-category">{product.category}</p>
          
          {displayVariant && (
            <div className="product-variant">
              <span className="variant-name">{displayVariant.name}</span>
              <span className="variant-price">₹{displayVariant.price}</span>
            </div>
          )}
        </div>
      </Link>

      {showActions && (
        <div className="product-actions">
          {product.variants && product.variants.length > 1 && !hasComplexVariants && (
            <div className="variant-selector">
              <select
                value={selectedVariant?.name || ''}
                onChange={(e) => {
                  const selected = product.variants.find(v => v.name === e.target.value);
                  setSelectedVariant(selected);
                }}
                className="variant-select"
              >
                {product.variants.map((variant, idx) => (
                  <option key={idx} value={variant.name}>
                    {variant.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="quantity-control">
            <button
              className="qty-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isOutOfStock}
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="qty-input"
              disabled={isOutOfStock}
              min="1"
            />
            <button
              className="qty-btn"
              onClick={() => setQuantity(quantity + 1)}
              disabled={isOutOfStock}
            >
              +
            </button>
          </div>

          <button
            className={`btn btn-primary add-to-cart-btn ${isOutOfStock ? 'btn-disabled' : ''} ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isAdding ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
