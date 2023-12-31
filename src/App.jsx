import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  const AppLayout = () => {
    return (
      <div className="flex  justify-center">
        {user != null && (
          <div className="flex-1">
            <SideBar />
          </div>
        )}
        <div className="flex-[4]">
          <Outlet />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:userId",
          element: <Profile />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/search",
          element: <Search />,
        },
      ],
    },
    ,
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
