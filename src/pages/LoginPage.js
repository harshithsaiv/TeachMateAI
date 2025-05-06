import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ role: 'faculty', email: formData.email }));
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // This would be implemented to handle social logins
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="login-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      
      <div className="login-panel">
        <div className="login-content">
          <div className="login-logo">
            <h1>TeachmateAI</h1>
          </div>
          
          <h2 className="login-title">Login</h2>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="username@gmail.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="sign-in-button" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
            
            <div className="social-login-divider">
              <span>or continue with</span>
            </div>
            
            <div className="social-login-buttons">
              <button 
                type="button" 
                className="social-button google-button"
                onClick={() => handleSocialLogin('Google')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path d="M12.545 12.151L12.545 14.106L16.061 14.106C15.854 15.398 14.703 17.032 12.545 17.032C10.678 17.032 9.158 15.482 9.158 13.588C9.158 11.693 10.678 10.144 12.545 10.144C13.637 10.144 14.415 10.568 14.875 10.999L16.333 9.595C15.214 8.565 13.985 7.956 12.545 7.956C9.407 7.956 6.869 10.522 6.869 13.588C6.869 16.654 9.407 19.219 12.545 19.219C15.863 19.219 18.118 16.761 18.118 13.679C18.118 13.283 18.083 12.919 18.01 12.55L12.545 12.55V12.151Z" fill="#EA4335"/>
                  <path d="M12.545 12.151L12.545 14.106L16.061 14.106C15.854 15.398 14.703 17.032 12.545 17.032C10.678 17.032 9.158 15.482 9.158 13.588C9.158 11.693 10.678 10.144 12.545 10.144C13.637 10.144 14.415 10.568 14.875 10.999L16.333 9.595C15.214 8.565 13.985 7.956 12.545 7.956C9.407 7.956 6.869 10.522 6.869 13.588C6.869 16.654 9.407 19.219 12.545 19.219C15.863 19.219 18.118 16.761 18.118 13.679C18.118 13.283 18.083 12.919 18.01 12.55L12.545 12.55V12.151Z" fill="#FBBC05"/>
                  <path d="M12.545 12.151L12.545 14.106L16.061 14.106C15.854 15.398 14.703 17.032 12.545 17.032C10.678 17.032 9.158 15.482 9.158 13.588C9.158 11.693 10.678 10.144 12.545 10.144C13.637 10.144 14.415 10.568 14.875 10.999L16.333 9.595C15.214 8.565 13.985 7.956 12.545 7.956C9.407 7.956 6.869 10.522 6.869 13.588C6.869 16.654 9.407 19.219 12.545 19.219C15.863 19.219 18.118 16.761 18.118 13.679C18.118 13.283 18.083 12.919 18.01 12.55L12.545 12.55V12.151Z" fill="#4285F4"/>
                </svg>
              </button>
              
              <button
                type="button"
                className="social-button github-button"
                onClick={() => handleSocialLogin('GitHub')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </button>
              
              <button 
                type="button" 
                className="social-button facebook-button"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                </svg>
              </button>
            </div>
            
            <div className="register-prompt">
              Don't have an account yet? <a href="#">Register for free</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;