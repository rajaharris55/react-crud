import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/allusers")
      .then((response) => {
        console.log("Users: ", response.data);
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:3000/deleteuser/${userId}`)
      .then(() => {
        setUsers((prevUsers) => {
          prevUsers.filter((user) => user._id !== userId);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name:</th>
              <th>Email:</th>
              <th>Age:</th>
              <th>Action:</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
