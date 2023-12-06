import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://scholarnest-api.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('Login successful');

        setUserDetails({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
        });

        setLoginError(null);
      } else {
    
        setLoginError('Invalid email or password. Please try again.');
        setUserDetails(null);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleEditProfile = () => {
    navigate('/editProfile');
  };

  const handleRegister = () => {
    navigate('/registration');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {userDetails ? (
        <div>
          <h2>Welcome {userDetails.firstName} {userDetails.lastName}!</h2>
          <p>Email: {userDetails.email}</p>
          <p>Phone: {userDetails.phone}</p>
          <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>

          {loginError && <p className="error-message">{loginError}</p>}
        </form>
      )}

      {!userDetails && <button onClick={handleRegister}>Register</button>}
    </div>
  );
};
