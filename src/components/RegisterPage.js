// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import '../pages/AuthPage.css'; 
import { auth } from '../firebase'; // Assuming `firebase.js` exports the initialized `auth`

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New field for the user's name
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    
    // Firebase registration
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Optionally save the name to user profile
        user.updateProfile({
          displayName: name,
        }).then(() => {
          setSuccess(true);
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="auth-container">
      <h1 className="infogo-logo">InfoGo</h1>
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        
        {/* Name Field */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        {/* Display success message or errors */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Registration successful!</p>}
      </form>
      
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default RegisterPage;
