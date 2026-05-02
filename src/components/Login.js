import React, { useState } from 'react';
import {
  authenticateLocalUser,
  registerLocalUser,
  resetLocalPassword,
} from '../utils/clientStorage';
import '../styles/Auth.css';

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const normalizeEmail = (value) => value.trim().toLowerCase();

  const resetMessages = () => {
    setError('');
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    try {
      const user = authenticateLocalUser({
        email: normalizeEmail(formData.email),
        password: formData.password,
      });
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const user = registerLocalUser({
        name: name.trim(),
        email: normalizeEmail(formData.email),
        password: formData.password,
      });
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    if (!formData.email || !formData.password || !confirmPassword) {
      setError('Please fill email, new password, and confirm password');
      setLoading(false);
      return;
    }

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const user = resetLocalPassword({
        email: normalizeEmail(formData.email),
        newPassword: formData.password,
        confirmPassword,
      });

      setSuccessMessage('पासवर्ड सफलतापूर्वक बदल दिया गया (Password reset successfully)');
      setFormData({ email: formData.email, password: '' });
      setConfirmPassword('');
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode) => {
    setIsSignup(nextMode === 'signup');
    setIsForgotPassword(nextMode === 'forgot');
    resetMessages();
    setConfirmPassword('');
    if (nextMode !== 'signup') {
      setName('');
    }
  };

  const submitHandler = isForgotPassword ? handleForgotPassword : isSignup ? handleSignup : handleLogin;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>💰 Expense Tracker</h1>
        <h2>{isForgotPassword ? 'Forgot Password' : isSignup ? 'Sign Up' : 'Login'}</h2>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={submitHandler}>
          {isSignup && (
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
          </div>

          <div className="form-group">
            <label>{isForgotPassword ? 'New Password *' : 'Password *'}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isForgotPassword ? 'Enter new password' : 'At least 6 characters'}
              required
            />
          </div>

          {(isSignup || isForgotPassword) && (
            <div className="form-group">
              <label>{isForgotPassword ? 'Confirm New Password *' : 'Confirm Password *'}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={isForgotPassword ? 'Confirm new password' : 'Confirm your password'}
                required
              />
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Processing...' : isForgotPassword ? 'Reset Password' : isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {!isSignup && !isForgotPassword && (
          <div className="auth-help">
            <button type="button" className="link-button" onClick={() => switchMode('forgot')}>
              Forgot password?
            </button>
          </div>
        )}

        <div className="auth-toggle">
          <p>
            {isSignup || isForgotPassword ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => switchMode(isSignup || isForgotPassword ? 'login' : 'signup')}
            >
              {isSignup || isForgotPassword ? 'Login' : 'Sign Up'}
            </button>
          </p>

          {isForgotPassword && (
            <button type="button" className="link-button" onClick={() => switchMode('login')}>
              Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
