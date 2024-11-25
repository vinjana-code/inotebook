import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const host = "http://localhost:5000";
const [credentials, setcredentials] = useState({
  name: "",
  exampleInputEmail1: "",
  exampleInputPassword1: "",
  cexampleInputPassword1: "",
});
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch(`${host}/api/auth/createuser`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: credentials.name,
      username: credentials.exampleInputEmail1,
      email: credentials.exampleInputEmail1,
      password: credentials.exampleInputPassword1,
    }),
  });
  const json = await response.json();
  console.log(json);
  if (json.sucess) {
    localStorage.setItem("authtoken", json.token);
    navigate("/");
  } else {
  }
};

const onChange = (e) => {
  setcredentials({ ...credentials, [e.target.name]: e.target.value });
};

  return (
    <div>
      <h3 className="my-2">Signup</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credentials.exampleInputEmail1}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="exampleInputPassword1"
            value={credentials.exampleInputPassword1}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cexampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cexampleInputPassword1"
            name="cexampleInputPassword1"
            value={credentials.cexampleInputPassword1}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
