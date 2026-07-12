import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

function UserList() {
  const [listOfUSer, setListOfUSer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setListOfUSer(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch users. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="user-list-container">
        <h2>User Directory</h2>
        <div className="loading-spinner">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <h2>User Directory</h2>
        <div className="error-box">{error}</div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h2>User Directory ({listOfUSer.length})</h2>
      <div className="user-grid">
        {listOfUSer.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">
              {user.name.charAt(0)}
            </div>
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-username">@{user.username}</p>
              <p className="user-email">{user.email}</p>
              <div className="user-detail">
                <span className="detail-label">Phone:</span>
                <span>{user.phone}</span>
              </div>
              <div className="user-detail">
                <span className="detail-label">Website:</span>
                <span>{user.website}</span>
              </div>
              <div className="user-detail">
                <span className="detail-label">Company:</span>
                <span>{user.company.name}</span>
              </div>
              <div className="user-address">
                <span className="detail-label">Address:</span>
                <span>
                  {user.address.street}, {user.address.suite}, {user.address.city} {user.address.zipcode}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;