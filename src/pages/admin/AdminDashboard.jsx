import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { logoutAdmin } from '../../services/supabase';
import '../admin/Admin.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('orders') || '[]');
    } catch (e) {
      return [];
    }
  });

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  const stats = useMemo(() => {
    const totalProducts = PRODUCTS.length;
    const availableProducts = PRODUCTS.filter(p => 
      p.variants.some(v => v.availability === 'In Stock' || (v.options && v.options.some(o => o.availability === 'In Stock')))
    ).length;
    const outOfStockProducts = totalProducts - availableProducts;
    const newOrders = orders.filter(o => o.status === 'pending').length;

    return {
      totalProducts,
      availableProducts,
      outOfStockProducts,
      newOrders
    };
  }, [orders]);

  const recentOrders = orders.slice(-5).reverse();

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
          <li><Link to="/admin" className="nav-link active"style={{ textAlign: "center", color:"white" }}>Dashboard</Link></li>
          <li><Link to="/admin/products" className="nav-link"style={{ textAlign: "center" }}>Products</Link></li>
          <li><Link to="/admin/orders" className="nav-link"style={{ textAlign: "center" }}>Orders</Link></li>
          <li><Link to="/" className="nav-link"style={{ textAlign: "center" }}>Exit to Shop</Link></li>
          <li><button onClick={handleLogout} className="nav-link logout" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', textAlign: 'center', width: '100%' }}>Logout</button></li>
        </ul>
      </nav>

      <div className="admin-content">
        <div className="admin-header">
          <h1>Dashboard</h1>
          <p>Welcome to Fresh Nest Admin Panel</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-icon">📦</div>
            <div className="stat-details">
              <h3>Total Products</h3>
              <p className="stat-number">{stats.totalProducts}</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">✓</div>
            <div className="stat-details">
              <h3>Available Products</h3>
              <p className="stat-number">{stats.availableProducts}</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">✕</div>
            <div className="stat-details">
              <h3>Out of Stock</h3>
              <p className="stat-number">{stats.outOfStockProducts}</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">📋</div>
            <div className="stat-details">
              <h3>New Orders</h3>
              <p className="stat-number">{stats.newOrders}</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="section-card">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <Link to="/admin/orders" className="btn btn-small btn-primary">View All</Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Items</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.customer_name}</td>
                      <td className="price">₹{order.total}</td>
                      <td>{order.order_items.length}</td>
                      <td className="date">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <Link 
                          to={`/admin/orders?id=${order.id}`}
                          className="btn btn-small btn-outline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No orders yet</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <Link to="/admin/products" className="action-card">
              <span className="action-icon">📦</span>
              <h3>Manage Products</h3>
              <p>Edit prices, availability, and variants</p>
            </Link>

            <Link to="/admin/orders" className="action-card">
              <span className="action-icon">📋</span>
              <h3>View Orders</h3>
              <p>Process and manage customer orders</p>
            </Link>

            <Link to="/products" className="action-card">
              <span className="action-icon">🏪</span>
              <h3>Visit Shop</h3>
              <p>See how customers view products</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
