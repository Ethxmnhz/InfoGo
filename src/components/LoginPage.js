import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for accessing state
import { useUser } from '../context/UserContext'; // Import user context
import '../pages/AuthPage.css'; 
import { auth } from '../firebase'; // Assuming `firebase.js` exports the initialized `auth`

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Get navigate for redirection
  const location = useLocation(); // Get location to access state
  const { setUser } = useUser(); // Get the setUser function from context

  // Determine the redirect path after login
  const from = location.state?.from || '/'; // Default to home if no state is provided

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(false); // Reset success state

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setSuccess(true);
      
      // Set user in context
      setUser({ name: user.displayName || user.uid, uid: user.uid });

      // Redirect the user to the determined page after login
      navigate(from); // Redirect to the page from where the user came
    } catch (error) {
      setError(error.message); // Set error message if login fails
    }
  };

  return (
    <div className="auth-container">
      <h1 className="infogo-logo">InfoGo</h1>
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        
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

        <button type="submit">Login</button>

        {/* Display error message if login fails */}
        {error && <p className="error-message">{error}</p>}
        
        {/* Optionally display success message */}
        {success && <p className="success-message">Login successful!</p>}
      </form>

      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default LoginPage;
