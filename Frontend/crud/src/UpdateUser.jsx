import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/${userId}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setAge(response.data.age);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };

    axios
      .put(`http://localhost:3000/updateuser/${userId}`, updatedUser)

      .then((response) => {
        console.log("User updated");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {" "}
      <div className="d-flex bg-primary vh-100 justify-content-center align-items-center">
        <div className="w-50 rounded p-3 bg-white">
          <form onSubmit={handleSubmit}>
            <h2>Update user</h2>
            <div className="mb-2">
              <label htmlFor="">Name: </label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="mb-2">
              <label htmlFor="">Email: </label>
              <input
                type="text"
                placeholder="Enter Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="mb-2">
              <label htmlFor="">Age: </label>
              <input
                type="number"
                placeholder="Enter Age"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              ></input>
            </div>
            <button type="submit" className="btn btn-success">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
