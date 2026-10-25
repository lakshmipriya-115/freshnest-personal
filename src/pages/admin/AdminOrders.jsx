import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { fetchOrders, updateOrderStatus, logoutAdmin } from '../../services/supabase';
import './Admin.css';

function AdminOrders() {
  const [searchParams] = useSearchParams();
  const selectedOrderId = searchParams.get('id');
  
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(o =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm)
    );
  }, [orders, searchTerm]);

  const selectedOrder = selectedOrderId
    ? orders.find(o => o.id === selectedOrderId)
    : null;

  const handleStatusChange = async (orderId, newStatus) => {
    // Optimistic UI update
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );

    // Sync with Supabase
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to save order status.");
      loadOrders(); // Revert on failure
    }
  };

  if (loading) {
    return <div className="admin-container"><div className="admin-content"><h2>Loading orders...</h2></div></div>;
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
          <li><Link to="/admin/products" className="nav-link">Products</Link></li>
          <li><Link to="/admin/orders" className="nav-link active">Orders</Link></li>
          <li><Link to="/" className="nav-link">Exit to Shop</Link></li>
          <li><button onClick={handleLogout} className="nav-link logout" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>Logout</button></li>
        </ul>
      </nav>

      <div className="admin-content">
        <div className="admin-header">
          <h1>Order Management</h1>
          <p>Manage customer orders and delivery</p>
        </div>

        {selectedOrder ? (
          // Order Details View
          <>
            <div className="section-card">
              <div className="section-header">
                <h2>Order {selectedOrder.id}</h2>
                <Link to="/admin/orders" className="btn btn-small btn-outline">
                  ← Back to Orders
                </Link>
              </div>

              {/* Customer Information */}
              <div className="order-details-grid">
                <div className="detail-box">
                  <h4>Customer Name</h4>
                  <p><strong>{selectedOrder.customer_name}</strong></p>
                </div>
                <div className="detail-box">
                  <h4>Phone Number</h4>
                  <p>
                    <a href={`tel:${selectedOrder.phone}`}>
                      {selectedOrder.phone}
                    </a>
                  </p>
                </div>
                <div className="detail-box">
                  <h4>Order Date</h4>
                  <p>
                    {new Date(selectedOrder.created_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="detail-box">
                  <h4>Order Status</h4>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    className={`form-select status-${selectedOrder.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="detail-box" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h4>Delivery Address</h4>
                <p><strong>{selectedOrder.delivery_address}</strong></p>
                {selectedOrder.landmark && (
                  <p><small>Landmark: {selectedOrder.landmark}</small></p>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Order Items</h3>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Variant</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.order_items.map((item, index) => (
                        <tr key={index}>
                          <td><strong>{item.product_name}</strong></td>
                          <td>{item.variant_name}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                          <td className="price">₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Order Summary */}
                <div className="order-summary" style={{ marginTop: 'var(--spacing-xl)' }}>
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="summary-line">
                    <span>Delivery Charge</span>
                    <span>₹{selectedOrder.delivery_charge}</span>
                  </div>
                  <div className="summary-total">
                    <span>Total Amount</span>
                    <span>₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Orders List View
          <>
            <div className="section-card">
              <input
                type="text"
                placeholder="Search orders by ID, customer name, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input search-input"
              />
            </div>

            <div className="section-card">
              <div className="section-header">
                <h2>Orders ({filteredOrders.length})</h2>
              </div>

              {filteredOrders.length > 0 ? (
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="order-id">{order.id}</td>
                          <td>{order.customer_name}</td>
                          <td>
                            <a href={`tel:${order.phone}`} title={order.phone}>
                              {order.phone.substring(0, 10)}
                            </a>
                          </td>
                          <td>{order.order_items ? order.order_items.length : 0}</td>
                          <td className="price">₹{order.total}</td>
                          <td className="date">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className={`status-badge ${order.status}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                          <td>
                            <Link
                              to={`/admin/orders?id=${order.id}`}
                              className="btn btn-small btn-primary"
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
                <p className="no-data">No orders found</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
