import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'First Name is required';
    }
    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'Last Name is required';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.phone.trim() === '') {
      newErrors.phone = 'Phone number is required';
    }
    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Users registration Success !`);
        setSubmitted(true);
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleLoginClick = () => {
   
    navigate('/');
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h2>Welcome {formData.firstName} {formData.lastName}!</h2>
          <p>Phone Number: {formData.phone}</p>
          <p><a href="/editprofile">Edit Profile</a></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && <span>{errors.firstName}</span>}
          </label>

          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && <span>{errors.lastName}</span>}
          </label>

          <label>
            Email Address:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </label>

          <label>
            Phone Number:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <span>{errors.phone}</span>}
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </label>

          <button type="submit">Register</button>

       
          <button type="button" onClick={handleLoginClick}>
            Login
          </button>
         
        </form>
      )}
    </div>
  );
};
