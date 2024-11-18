import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user, onDelete }) => {



    const nameStructure = user.name.split(' ');
    const firstName = nameStructure[0];
    const lastName = nameStructure[1];
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        
        <p className="card-text">
        <span className="fw-bold">Id:</span> {user.id}
        <br />
        <span className="fw-bold">First Name:</span> {firstName}
        <br />
        <span className="fw-bold">Last Name:</span> {lastName}
        <br />
          <span className="fw-bold">Email:</span> {user.email}
          <br />
          <span className="fw-bold">Department:</span> {user.company.name}
        </p>
        <div className="d-flex justify-content-between">
          <Link to={`/edit/${user.id}`} className="btn btn-warning btn-sm">
            Edit
          </Link>
          <button
            onClick={() => onDelete(user.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;