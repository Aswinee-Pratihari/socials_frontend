import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      //   const response = await axios.post(`api/auth/signup`, details);
      const res = await axios.post("/users/signUp", details);
      dispatch(login(res?.data));
      navigate("/");
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="h-screen flex justify-center items-center ">
      <div className=" sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register Yourself
        </h2>
        <form action="" method="post" className="space-y-6">
          <div>
            <label
              htmlFor="user_name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username:
            </label>
            <input
              type="text"
              value={details.userName}
              id="user_name"
              placeholder="Ex:- Aswinee"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  outline-none  sm:text-sm sm:leading-6 px-4 "
              onChange={(e) =>
                setDetails((details) => ({
                  ...details,
                  userName: e.target.value,
                }))
              }
              autoComplete="name"
            />
          </div>
          <div>
            <label
              htmlFor="user_email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address:
            </label>
            <input
              type="email"
              id="user_email"
              value={details.email}
              name="email"
              placeholder="you@example.com"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm focus:ring-indigo-600 outline-none  sm:text-sm sm:leading-6"
              autoComplete="email"
              onChange={(e) =>
                setDetails((details) => ({ ...details, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label
              htmlFor="user_password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password:
            </label>
            <input
              type="password"
              id="user_password"
              value={details.password}
              name="password"
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm focus:ring-indigo-600 outline-none  sm:text-sm sm:leading-6"
              autoComplete="password"
              onChange={(e) =>
                setDetails((details) => ({
                  ...details,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 w-full flex justify-center px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm rounded-md"
            onClick={handleSignUp}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
