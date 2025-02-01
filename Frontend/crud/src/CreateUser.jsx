import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    console.log("Sending Data:", { name, email, age });

    axios
      .post("http://localhost:3000/createuser", { name, email, age })
      .then((result) => {
        console.log("Server Response:", result.data);
        navigate("/");
      })
      .catch((err) => console.error("Axios Error:", err));
  };

  return (
    <div className="d-flex bg-primary vh-100 justify-content-center align-items-center">
      <div className="w-50 rounded p-3 bg-white">
        <form onSubmit={submit}>
          <h2>Add a user</h2>
          <div className="mb-2">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Age:</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
