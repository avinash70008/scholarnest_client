
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Dashboard = ({ token }) => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post('http://localhost:5000/login', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('API Response:', response.data); // Log the entire response to check the structure

        setUser(response.data.user);
        console.log('User Data:', user); // Log the user data

        setFormData({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          phone: response.data.user.phone,
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        console.log('Response:', error.response); // Log the response for further details
      }
    };

    fetchUser();
  }, [token, user]); // Add 'user' to the dependencies to track changes in the user state

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/editProfile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.user);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="full-screen">
      {editing ? (
        <div className="edit-profile-form">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="profile">
          <p>Welcome, {user.firstName}!</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};


