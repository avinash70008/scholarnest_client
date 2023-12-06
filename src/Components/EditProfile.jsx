import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditProfile = ({ userId }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.error('Token not found in sessionStorage');
          return;
        }

        const response = await fetch(`https://scholarnest-api.onrender.com/login/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const { firstName, lastName, phone } = await response.json();
          setUserData({
            firstName,
            lastName,
            phone,
          });
        } else {
          console.error('Error fetching user details');
        }
      } catch (error) {
        console.error('Error during API call:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (userData.firstName.trim() === '') {
      newErrors.firstName = 'First Name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not found in sessionStorage');
        return;
      }

      const response = await fetch('https://scholarnest-api.onrender.com/editProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
        }),
      });

      if (response.ok) {
        alert('User details updated successfully!');
        setSubmitted(true);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to update user details:', errorMessage);

        // You may want to handle different error scenarios more specifically here

        alert('Failed to update user details. Please try again.');
      }
    } catch (error) {
      console.error('Error during API call:', error);
      alert('Failed to update user details. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      {submitted ? (
        <div>
          <h2>Profile Updated Successfully!</h2>
          <button onClick={handleBack}>Home</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
            />
   
          </label>

          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
            />
           
          </label>

          <label>
            Phone Number:
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
            />
           
          </label>

          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
};
