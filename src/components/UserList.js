import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import { fetchUsers, deleteUser } from '../services/BackendApi';
import UserCard from './UserCard';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success,setSuccess] = useState('');

  useEffect(() => {
    fetchUsers()
      .then((response) => setUsers(response.data))
      .catch(() => setError('Failed to fetch users.'));
  }, []);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => {setUsers(users.filter((user) => user.id !== id))
        setSuccess('User deleted successfully.');
      })
      .catch(() => setError('Failed to delete user.'));
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Ajackux Project</h1>
      <Link to="/add" className="btn btn-primary mb-3">
        Add User
      </Link>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4" key={user.id}>
            <UserCard user={user} onDelete={handleDelete} />
          </div>
        ))}
      </div>
      <p className="success-msg">{success}</p>
    </div>
  );
};

export default UserList;
