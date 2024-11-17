import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await axios.get('/api/users/me', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setUser(response.data);
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.username}'s Profile</h1>
          <p>Email: {user.email}</p>
          {/* Add more user details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
