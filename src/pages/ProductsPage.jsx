import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchCategories, searchProductsAPI } from '../services/supabase';
import './ProductsPage.css';

function ProductsPage({ addToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedSort, setSelectedSort] = useState('name');
  const [notification, setNotification] = useState('');
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(null);

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          searchQuery ? searchProductsAPI(searchQuery) : fetchProducts()
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
        setDbError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDbError(error.message || 'Unable to connect to database');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (selectedSort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === 'price-low') {
      result.sort((a, b) => {
        const aPrice = a.variants[0]?.price || 0;
        const bPrice = b.variants[0]?.price || 0;
        return aPrice - bPrice;
      });
    } else if (selectedSort === 'price-high') {
      result.sort((a, b) => {
        const aPrice = a.variants[0]?.price || 0;
        const bPrice = b.variants[0]?.price || 0;
        return bPrice - aPrice;
      });
    }

    return result;
  }, [products, selectedCategory, selectedSort]);

  const handleAddToCart = (product, variant, quantity) => {
    addToCart(product, variant, quantity);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 2000);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div className="products-page"><div className="container" style={{padding: '100px 0', textAlign: 'center'}}><h2>Loading products...</h2></div></div>;
  }

  return (
    <div className="products-page">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="products-header">
        <div className="container">
          <h1>Our Products</h1>
          <p>Discover our fresh selection of groceries and essentials</p>
        </div>
      </div>

      <div className="container">
        <div className="products-container">
          {/* Sidebar */}
          <aside className="products-sidebar">
            {/* Categories Filter */}
            <div className="filter-section">
              <h3>Categories</h3>
              <div className="category-list">
                <button
                  className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('All')}  style={{ backgroundColor: "#203A21", color: "#FFFFFF" }}
                >
                  All Products
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Info */}
            {searchQuery && (
              <div className="search-info">
                <strong>Search Results:</strong>
                <p>"{searchQuery}"</p>
                <button 
                  className="btn btn-small btn-outline"
                  onClick={() => setSearchParams({})}
                >
                  Clear Search
                </button>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="products-main">
            {/* Sorting */}
            <div className="products-toolbar">
              <div className="sort-control">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
              <div className="product-count">
                {filteredProducts.length} products
              </div>
            </div>

            {/* Products Grid */}
            {dbError ? (
              <div style={{
                backgroundColor: '#fff3cd',
                color: '#856404',
                border: '1px solid #ffeeba',
                borderRadius: '8px',
                padding: '28px',
                textAlign: 'center',
                margin: '20px 0'
              }}>
                <h3 style={{ marginBottom: '10px', color: '#856404' }}>Database Notice</h3>
                <p style={{ margin: 0 }}>{dbError}</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <p>No products found.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchParams({});
                  }}
                >
                  View All Products
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
