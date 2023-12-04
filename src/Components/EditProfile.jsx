import React, { useState, useEffect } from 'react';


export const EditProfile = ({ userId }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = sessionStorage.getItem('token'); 
        if (!token) {
          console.error('Token not found in sessionStorage');
          
          return;
        }

        const response = await fetch(`http://localhost:5000/login/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
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

   
      const response = await fetch('http://localhost:5000/editProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
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
            {errors.firstName && <span>{errors.firstName}</span>}
          </label>

          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && <span>{errors.lastName}</span>}
          </label>

          <label>
            Phone Number:
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <span>{errors.phone}</span>}
          </label>

          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
};
