import React from "react";
import Main from "../components/HomeComponent/Main";
import Trend from "../components/HomeComponent/Trend";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user);
  if (!user) {
    navigate("/login");
  }
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
