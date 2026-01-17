import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("rahul@gmail.com");
  const [password, setPassword] = useState("passWord@7");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-5">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset mb-1">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
