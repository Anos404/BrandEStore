import React, { useState, useEffect } from 'react';

export default function LoginPage({ navigate, handleLogin, currentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) navigate('/profile');
  }, [currentUser, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const success = handleLogin(email, password);
    if (success) {
      navigate('/profile');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <main className="auth-page-wrap">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to access your BrandEStore profile</p>
        
        {error && <div className="auth-error-msg">{error}</div>}
        
        <form onSubmit={onSubmit} className="auth-form">
          <div className="auth-input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="auth-input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary auth-submit-btn">
            Log In
          </button>
        </form>
        <p className="auth-footer-text">
          Don't have an account? <span className="auth-link" onClick={() => navigate('/register')}>Register here</span>
        </p>
      </div>
    </main>
  );
}
