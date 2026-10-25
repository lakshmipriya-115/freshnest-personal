import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, updateVariantPrice, updateVariantAvailability, logoutAdmin } from '../../services/supabase';
import './Admin.css';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVariantPriceChange = async (productId, variantId, newPrice) => {
    const priceInt = parseInt(newPrice) || 0;
    
    // Optimistic UI update
    setProducts(prevProducts =>
      prevProducts.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            variants: p.variants.map(v => {
              if (v.id === variantId) {
                return { ...v, price: priceInt };
              }
              if (v.options) {
                return {
                  ...v,
                  options: v.options.map(o =>
                    o.id === variantId ? { ...o, price: priceInt } : o
                  )
                };
              }
              return v;
            })
          };
        }
        return p;
      })
    );

    // Save to Supabase
    try {
      await updateVariantPrice(variantId, priceInt);
    } catch (error) {
      console.error("Failed to update price:", error);
      alert("Failed to save price change.");
      loadProducts(); // Revert on failure
    }
  };

  const handleAvailabilityChange = async (productId, variantId, newAvailability) => {
    // Optimistic UI update
    setProducts(prevProducts =>
      prevProducts.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            variants: p.variants.map(v => {
              if (v.id === variantId) {
                return { ...v, availability: newAvailability };
              }
              if (v.options) {
                return {
                  ...v,
                  options: v.options.map(o =>
                    o.id === variantId ? { ...o, availability: newAvailability } : o
                  )
                };
              }
              return v;
            })
          };
        }
        return p;
      })
    );

    // Save to Supabase
    try {
      await updateVariantAvailability(variantId, newAvailability);
    } catch (error) {
      console.error("Failed to update availability:", error);
      alert("Failed to save availability change.");
      loadProducts(); // Revert on failure
    }
  };

  const handleProductNameChange = (productId, newName) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, name: newName } : p
      )
    );
  };

  if (loading) {
    return <div className="admin-container"><div className="admin-content"><h2>Loading products...</h2></div></div>;
  }

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <div className="admin-logo">
          <span className="logo-icon"><img 
  src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1791099714/Minimalist_Dark_Green_Leaf_Emblem_gjwodi.png"
  alt="Fresh Nest Logo"
  className="logo-img"
/></span>
          <span>Fresh Nest Admin</span>
        </div>
        <ul className="admin-menu">
          <li><Link to="/admin" className="nav-link">Dashboard</Link></li>
          <li><Link to="/admin/products" className="nav-link active">Products</Link></li>
          <li><Link to="/admin/orders" className="nav-link">Orders</Link></li>
          <li><Link to="/" className="nav-link">Exit to Shop</Link></li>
          <li><button onClick={handleLogout} className="nav-link logout" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>Logout</button></li>
        </ul>
      </nav>

      <div className="admin-content">
        <div className="admin-header">
          <h1>Product Management</h1>
          <p>Edit product prices, availability, and variants. Changes are saved automatically.</p>
        </div>

        {/* Search */}
        <div className="section-card">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input search-input"
          />
        </div>

        {/* Products List */}
        <div className="section-card">
          <div className="section-header">
            <h2>Products ({filteredProducts.length})</h2>
          </div>

          <div className="products-list">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-item">
                <div className="product-header">
                  <div className="product-title">
                    <h3>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleProductNameChange(product.id, e.target.value)}
                        className="product-name-input"
                        disabled
                      />
                    </h3>
                    <span className="product-category">{product.category}</span>
                  </div>
                  <div className="product-meta">
                    <span className="product-id">ID: {product.id}</span>
                  </div>
                </div>

                <div className="variants-table">
                  <table className="admin-table variants-table-inner">
                    <thead>
                      <tr>
                        <th>Variant</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map(variant => {
                        // For complex variants (with options)
                        if (variant.options) {
                          return (
                            <React.Fragment key={variant.id}>
                              <tr className="variant-group-header">
                                <td colSpan="4" className="variant-group-name">
                                  {variant.name} Options
                                </td>
                              </tr>
                              {variant.options.map(option => (
                                <tr key={option.id} className="option-row">
                                  <td>{option.name}</td>
                                  <td>
                                    <input
                                      type="number"
                                      value={option.price}
                                      onChange={(e) => handleVariantPriceChange(product.id, option.id, e.target.value)}
                                      className="price-input"
                                      min="0"
                                    />
                                  </td>
                                  <td>
                                    <select
                                      value={option.availability}
                                      onChange={(e) => handleAvailabilityChange(product.id, option.id, e.target.value)}
                                      className="form-select availability-select"
                                    >
                                      <option value="In Stock">In Stock</option>
                                      <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                  </td>
                                  <td>
                                    <span className={`status-badge ${option.availability === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
                                      {option.availability === 'In Stock' ? '✓' : '✕'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          );
                        }

                        // For simple variants
                        return (
                          <tr key={variant.id}>
                            <td className="variant-name">{variant.name}</td>
                            <td>
                              <input
                                type="number"
                                value={variant.price}
                                onChange={(e) => handleVariantPriceChange(product.id, variant.id, e.target.value)}
                                className="price-input"
                                min="0"
                              />
                            </td>
                            <td>
                              <select
                                value={variant.availability}
                                onChange={(e) => handleAvailabilityChange(product.id, variant.id, e.target.value)}
                                className="form-select availability-select"
                              >
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                              </select>
                            </td>
                            <td>
                              <span className={`status-badge ${variant.availability === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
                                {variant.availability === 'In Stock' ? '✓' : '✕'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="note-section">
          <p>
            💡 <strong>Note:</strong> Changes are now automatically saved to your database and immediately available to customers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
