import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addUser, editUser, fetchUsers } from '../services/BackendApi';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  
 
  useEffect(() => {
    const loadUserData = async () => {
      if (id) {
        try {
          const response = await fetchUsers();
          const user = response.data.find((user) => user.id === parseInt(id));
          if (user) {

            const nameStructure = user.name.split(' ');
            const firstName = nameStructure[0];
            const lastName = nameStructure[1];
          
            setFormData({
              firstName: firstName || '',
              lastName: lastName || '',
              email: user.email || '',
              department: user.company.name || '',
            });
          }
        } catch (err) {
          setError('Failed to load user details.');
        }
      }
    };
    loadUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await editUser(id, formData);
      } else {
        await addUser(formData);
      }
      navigate('/');
    } catch (err) {
      setError(id ? 'Failed to update user.' : 'Failed to add user.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      <h1>{id ? 'Edit User' : 'Add User'}</h1>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default UserForm;