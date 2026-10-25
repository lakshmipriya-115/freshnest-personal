import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../services/supabase';
import './ProductDetailPage.css';

function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(null);

  const [selectedVariantType, setSelectedVariantType] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
        setDbError(null);
        if (productData) {
          const allProducts = await fetchProducts();
          const related = allProducts
            .filter(p => p.category === productData.category && p.id !== productData.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setDbError(error.message || 'Error fetching product from database');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="product-detail-page"><div className="container" style={{padding: '100px 0', textAlign: 'center'}}><h2>Loading product...</h2></div></div>;
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>{dbError ? 'Database Notice' : 'Product Not Found'}</h1>
            <p>{dbError || "Sorry, we couldn't find the product you're looking for."}</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if this is a complex variant product (like mushroom)
  const hasComplexVariants = product.variants?.some(v => v.options);
  const simpleVariants = hasComplexVariants 
    ? null 
    : product.variants;

  const handleAddToCart = () => {
    let variantToAdd = null;

    if (hasComplexVariants) {
      // For complex variants (box/wholesale), use the selected option
      if (!selectedVariantType) {
        alert('Please select a variant type (Box or Wholesale)');
        return;
      }
      if (!selectedOption) {
        alert(`Please select a ${selectedVariantType} option`);
        return;
      }
      variantToAdd = selectedOption;
    } else {
      // For simple variants, use the first selected variant or default
      variantToAdd = selectedVariantType || simpleVariants[0];
    }

    if (!variantToAdd) {
      alert('Please select a variant');
      return;
    }

    if (variantToAdd.availability === 'Out of Stock') {
      alert('This item is currently out of stock');
      return;
    }

    addToCart(product, variantToAdd, quantity);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 2000);
  };

  const getDisplayedVariant = () => {
    if (hasComplexVariants && selectedOption) {
      return selectedOption;
    }
    if (!hasComplexVariants && selectedVariantType) {
      return selectedVariantType;
    }
    if (!hasComplexVariants && simpleVariants) {
      return simpleVariants[0];
    }
    return null;
  };

  const displayVariant = getDisplayedVariant();
  const isOutOfStock = displayVariant?.availability === 'Out of Stock';

  return (
    <div className="product-detail-page">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="breadcrumb">
        <div className="container">
          <button onClick={() => navigate('/products')} className="breadcrumb-link">Products</button>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="product-detail-container">
          {/* Product Image */}
          <div className="product-detail-image">
            <img 
              src={displayVariant?.image || product.image} 
              alt={product.name}
              className="detail-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=800&h=800&fit=crop';
              }}
            />
            {isOutOfStock && (
              <div className="out-of-stock-overlay">OUT OF STOCK</div>
            )}
          </div>

          {/* Product Details */}
          <div className="product-detail-info">
            <div className="detail-header">
              <h1>{product.name}</h1>
              <p className="detail-category">{product.category}</p>
            </div>

            <p className="detail-description">{product.description}</p>

            {displayVariant && (
              <div className="price-section">
                <span className="price-label">Price:</span>
                <span className="price">₹{displayVariant.price}</span>
              </div>
            )}

            {displayVariant && (
              <div className="availability-section">
                <span className={`availability-badge ${displayVariant.availability === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
                  {displayVariant.availability}
                </span>
              </div>
            )}

            {/* Variants Selection */}
            <div className="variants-section">
              <h3>Select Options</h3>

              {hasComplexVariants ? (
                // Complex variants (Box/Wholesale)
                <>
                  <div className="variant-types">
                    {product.variants.map((variantType) => (
                      <button
                        key={variantType.id}
                        className={`variant-type-btn ${selectedVariantType === variantType.name ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedVariantType(variantType.name);
                          setSelectedOption(null);
                        }}
                      >
                        {variantType.name}
                      </button>
                    ))}
                  </div>

                  {selectedVariantType && (
                    <div className="variant-options">
                      {product.variants
                        .find(v => v.name === selectedVariantType)
                        ?.options.map((option) => (
                          <button
                            key={option.id}
                            className={`option-btn ${selectedOption?.id === option.id ? 'active' : ''}`}
                            onClick={() => setSelectedOption(option)}
                          >
                            <span className="option-name">{option.name}</span>
                            <span className="option-price">₹{option.price}</span>
                            {option.availability === 'Out of Stock' && (
                              <span className="option-stock">Out of Stock</span>
                            )}
                          </button>
                        ))}
                    </div>
                  )}
                </>
              ) : (
                // Simple variants
                <div className="variant-options">
                  {simpleVariants?.map((variant) => (
                    <button
                      key={variant.id}
                      className={`option-btn ${selectedVariantType?.id === variant.id ? 'active' : ''}`}
                      onClick={() => setSelectedVariantType(variant)}
                    >
                      <span className="option-name">{variant.name}</span>
                      <span className="option-price">₹{variant.price}</span>
                      {variant.availability === 'Out of Stock' && (
                        <span className="option-stock">Out of Stock</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="purchase-section">
              <div className="quantity-control">
                <label>Quantity:</label>
                <div className="qty-controls">
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
              </div>

              <button
                className={`btn btn-primary add-cart-btn ${isOutOfStock ? 'btn-disabled' : ''}`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Additional Info */}
            <div className="additional-info">
              <div className="info-item">
                <strong>📦 Delivery:</strong>
                <p>Fast delivery available to your area</p>
              </div>
              <div className="info-item">
                <strong>✓ Quality Assured:</strong>
                <p>Handpicked and freshness verified</p>
              </div>
              <div className="info-item">
                <strong>🔄 Easy Returns:</strong>
                <p>Not satisfied? Easy returns within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-section">
          <h2>More from {product.category}</h2>
          <div className="related-grid">
            {relatedProducts.map(relatedProduct => (
                <div
                  key={relatedProduct.id}
                  className="related-card"
                  onClick={() => navigate(`/products/${relatedProduct.id}`)}
                >
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=300&h=300&fit=crop';
                    }}
                  />
                  <h4>{relatedProduct.name}</h4>
                  <p>₹{relatedProduct.variants[0]?.price}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
