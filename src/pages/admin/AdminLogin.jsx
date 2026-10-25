import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/supabase';
import './Admin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await loginAdmin(email, password);
      if (error) {
        throw error;
      }
      if (data.session) {
        navigate('/admin');
      }
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-light)' }}>
      <div className="section-card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="logo-icon" style={{ fontSize: '3rem' }}><img 
  src="https://res.cloudinary.com/dvg5qjtel/image/upload/v1791099714/Minimalist_Dark_Green_Leaf_Emblem_gjwodi.png"
  alt="Fresh Nest Logo"
  className="logo-img"
/></span>
          <h1 style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>Admin Login</h1>
        </div>
        
        {error && <div className="form-error" style={{ marginBottom: '1rem', color: 'red', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={() => navigate('/')} className="btn btn-outline btn-block">Back to Shop</button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
