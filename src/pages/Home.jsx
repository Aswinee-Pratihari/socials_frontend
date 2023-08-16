import React, { useEffect } from "react";
import Main from "../components/HomeComponent/Main";
import Trend from "../components/HomeComponent/Trend";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex py-4">
      <div className="flex-[3]">
        <Main />
      </div>
      <div className="flex-[1] max-md:hidden">
        <Trend />
      </div>
    </div>
  );
};

export default Home;
