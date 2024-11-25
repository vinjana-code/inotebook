import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const host = "http://localhost:5000";
  const [credentials,setcredentials] = useState({exampleInputEmail1:"", exampleInputPassword1:""});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.exampleInputEmail1,password: credentials.exampleInputPassword1})
    });
    const json = await response.json();
    console.log(json);
    if(json.sucess){
        localStorage.setItem('authtoken',json.token);
        navigate("/");
    }else{

    }
  };

  const onChange = (e) => {
    setcredentials({...credentials,[e.target.name]: e.target.value});
  }

  return (
    <div>
      <h3 className="my-3">Login</h3>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="btn btn-primary"
          
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
