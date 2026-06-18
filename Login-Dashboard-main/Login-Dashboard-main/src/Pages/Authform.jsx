import React, { useState } from 'react';
import './Authform.css';
import { auth, db } from '../firebaseauth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

export default function Authform() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setMessage('');
    setFormData({ fName: '', lName: '', email: '', password: '' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignUp = async () => {
    const { fName, lName, email, password } = formData;
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCred.user.uid), {
        firstName: fName,
        lastName: lName,
        email: email,
      });
      setMessage('Sign Up Successful!');
      navigate("/dashboard");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleSignIn = async () => {
    const { email, password } = formData;
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login Successful!');
      navigate("/dashboard");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handlePasswordRecovery = async () => {
    if (!formData.email || !formData.email.includes('@')) {
      setMessage('Please enter a valid email first!');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      setMessage('Password reset email sent!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-form-title">{isSignUp ? 'Register' : 'Sign In'}</h1>
      {message && <div className="messageDiv">{message}</div>}

      {isSignUp && (
        <>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              name="fName"
              type="text"
              placeholder=" "
              value={formData.fName}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="fName">First Name</label>
          </div>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              name="lName"
              type="text"
              placeholder=" "
              value={formData.lName}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="lName">Last Name</label>
          </div>
        </>
      )}

      <div className="input-group">
        <i className="fas fa-envelope"></i>
        <input
          id="email"
          name="email"
          type="email"
          placeholder=" "
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email</label>
      </div>

      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder=" "
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Password</label>
        <i
          className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
          onClick={togglePasswordVisibility}
          title={showPassword ? 'Hide password' : 'Show password'}
        />
      </div>

      {!isSignUp && (
        <div className="recover">
          <a href="#" onClick={(e) => { e.preventDefault(); handlePasswordRecovery(); }}>
            Recover Password?
          </a>
        </div>
      )}

      <button type="button" className="auth-button" onClick={isSignUp ? handleSignUp : handleSignIn}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>

      <p className="or">-----or-----</p>
      <div className="icons">
        <i className="fab fa-google"></i>
        <i className="fab fa-facebook"></i>
      </div>
      <div className="links">
        <p>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</p>
        <span id={isSignUp ? 'signInButton' : 'signUpButton'} onClick={toggleForm}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </span>
      </div>
    </div>
  );
}
