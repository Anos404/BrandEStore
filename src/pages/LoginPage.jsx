import React, { useState, useEffect } from 'react';

export default function LoginPage({ navigate, handleLogin, currentUser }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) navigate('/profile');
  }, [currentUser, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!usernameOrEmail || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    setError('');
    
    const res = await handleLogin(usernameOrEmail, password);
    setIsLoading(false);
    if (res.success) {
      navigate('/profile');
    } else {
      setError(res.message || 'Invalid username/email or password.');
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
            <label>Username or Email</label>
            <input 
              type="text" 
              placeholder="e.g. johnd or name@example.com" 
              value={usernameOrEmail}
              onChange={e => setUsernameOrEmail(e.target.value)}
              disabled={isLoading}
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
              disabled={isLoading}
              required 
            />
          </div>
          <button type="submit" className="btn-primary auth-submit-btn" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account? <span className="auth-link" onClick={() => navigate('/register')}>Register here</span>
        </p>
      </div>
    </main>
  );
}
