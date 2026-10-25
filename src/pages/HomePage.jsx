import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchCategories } from '../services/supabase';
import './HomePage.css';

function HomePage({ addToCart }) {
  const [notification, setNotification] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setDbError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDbError(error.message || 'Unable to connect to database');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAddToCart = (product, variant, quantity) => {
    addToCart(product, variant, quantity);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 2000);
  };

  const featuredProducts = products.slice(0, 8);

  if (loading) {
    return <div className="home-page"><div className="container" style={{padding: '100px 0', textAlign: 'center'}}><h2>Loading fresh products...</h2></div></div>;
  }

  return (
    <div className="home-page">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title" >Freshness You Can Trust</h1>
            <p className="hero-subtitle">Fresh groceries and everyday essentials, carefully selected for your home. </p>
            <div className="hero-cta">
              <Link to="/products" className="hero-button btn btn-primary" >
                 Shop Now
              </Link>
              <Link to="/about" className="hero-button-2  btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-card">
              <span className="trust-icon">✓</span>
              <h3>100% Fresh</h3>
              <p>Handpicked and verified for quality</p>
            </div>
            <div className="trust-card">
              <span className="trust-icon">🚚</span>
              <h3>Fast Delivery</h3>
              <p>Quick delivery to your doorstep</p>
            </div>
            <div className="trust-card">
              <span className="trust-icon">💰</span>
              <h3>Best Prices</h3>
              <p>Competitive prices without compromise</p>
            </div>
            <div className="trust-card">
              <span className="trust-icon">👥</span>
              <h3>Local Support</h3>
              <p>Dedicated support from the neighborhood</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => {
              const categoryProducts = products.filter(p => p.category === category);
              return (
                <Link 
                  key={category} 
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="category-card"
                >
                  <div className="category-icon">
                    {category === 'Fresh Vegetables' &&  (<img src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1791635234/Canvas_Tote_Filled_with_Fresh_Vegetables_qtwerb.png" alt="Vegies" className="category-icon"/>)}
                    {category === 'Fresh Fruits' && (<img src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1791625111/Overflowing_Fresh_Fruit_Canvas_Tote_zloal7.png" alt="Fruits" className="category-icon"/>)}
                    {category === 'Dairy & Breakfast' && (<img src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1791637029/Canvas_Tote_Filled_with_Dairy_Groceries_e9eydi.png" alt="Dairy" className="category-icon"/>)}
                    {category === 'Beverages' && (<img src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1791636676/Canvas_Tote_Bag_Filled_with_Drinks_hikft0.png" alt="Beverages" className="category-icon"/>)}
                    {category === 'Ice Cream & Treats' && (<img src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1791636590/Ice_Cream_Treats_in_Canvas_Tote_phfkpn.png" alt="Icecream" className="category-icon"/>)}
                    {category === 'Batter & Ready Essentials' && (<img src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1791636189/Indian_Breakfast_Tote_Bag_Collection_pnsvrb.png" alt="Batters" className="category-icon"/>)}
                    {category === 'Chocolates' && (<img src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1790954339/Cadbury_Dairy_Milk_in_Purple_Wrapper_swwzjp.png" alt="Chocolates" className="category-icon"/>)}
                    {category === 'Other Essentials' && (<img src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1791636113/Grocery-Filled_Canvas_Tote_Bag_l23eqk.png" alt="Other Essentials" className="category-icon"/>)}
                  </div>
                  <h3>{category}</h3>
                  <p>{categoryProducts.length} products</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Fresh Picks</h2>
          <p className="section-subtitle">Our handpicked selection of the freshest products</p>
          {dbError ? (
            <div style={{
              backgroundColor: '#fff3cd',
              color: '#856404',
              border: '1px solid #ffeeba',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center',
              margin: '20px 0'
            }}>
              <h3 style={{ marginBottom: '8px', color: '#856404' }}>Database Notice</h3>
              <p style={{ margin: 0 }}>{dbError}</p>
            </div>
          ) : (
            <div className="grid grid-4">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Fresh Nest Section */}
      <section className="why-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-content">
              <h2>Why Fresh Nest?</h2>
              <ul className="why-list">
                <li>
                  <strong>Quality First:</strong> Every item is inspected for freshness and quality before it reaches you.
                </li>
                <li>
                  <strong>Direct Source:</strong> We source directly from local farmers to ensure freshness.
                </li>
                <li>
                  <strong>Competitive Pricing:</strong> Great quality doesn't have to be expensive.
                </li>
                <li>
                  <strong>Customer Service:</strong> We're here to help with any questions or concerns.
                </li>
                <li>
                  <strong>Convenient Shopping:</strong> Easy ordering, quick delivery, happy customers.
                </li>
              </ul>
            </div>
            <div className="why-image">
               <img 
                 src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1791093105/Fresh_Market_Table_Still_Life_eoiyl9.png"
                 alt="Fresh Market"
                 className="why-img"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="delivery-section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="delivery-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Browse & Select</h3>
              <p>Choose from our wide range of fresh products</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Add to Cart</h3>
              <p>Pick your quantities and variants</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Checkout</h3>
              <p>Enter your delivery details</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Get Delivery</h3>
              <p>Receive fresh groceries at your door</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Good Food. Good Mood.</h2>
          <p>Start shopping now and experience the Fresh Nest difference</p>
          <Link to="/products" className="btn btn-primary btn-large">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
