import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData && location.pathname !== "/login") fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mb-17 py-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
