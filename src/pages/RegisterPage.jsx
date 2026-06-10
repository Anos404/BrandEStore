import React, { useState, useEffect } from 'react';

export default function RegisterPage({ navigate, handleRegister, currentUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) navigate('/profile');
  }, [currentUser, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    setError('');
    
    const res = await handleRegister(name, email, password);
    setIsLoading(false);
    if (res.success) {
      navigate('/profile');
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  return (
    <main className="auth-page-wrap">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join BrandEStore for a personalized shopping experience</p>
        
        {error && <div className="auth-error-msg">{error}</div>}
        
        <form onSubmit={onSubmit} className="auth-form">
          <div className="auth-input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={isLoading}
              required 
            />
          </div>
          <div className="auth-input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="auth-footer-text">
          Already have an account? <span className="auth-link" onClick={() => navigate('/login')}>Log in here</span>
        </p>
      </div>
    </main>
  );
}
