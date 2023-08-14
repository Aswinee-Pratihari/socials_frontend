import React from "react";
import {
  BeakerIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="bg-white p-4 h-screen fixed top-0 bottom-0 w-[200px] max-md:w-[90px] max-sm:[50px]">
      <div className="flex flex-col gap-4 items-start  w-full  h-full">
        <h1 className="font-bold text-2xl block max-md:hidden">SOCIALS</h1>
        <div className="flex flex-col gap-6 items-start  h-full  w-full">
          <Link
            to="/"
            className="flex items-center gap-3 hover:bg-orange-500 w-full p-3 rounded-lg hover:shadow-lg cursor-pointer"
          >
            <HomeIcon className="w-6 h-6" />
            <h4 className="block max-md:hidden">Home</h4>
          </Link>
          <div className=" flex items-center gap-3 hover:bg-orange-500 w-full p-3 rounded-lg  hover:shadow-lg cursor-pointer">
            <MagnifyingGlassIcon className="w-6 h-6" />
            <h4 className="block max-md:hidden">Search</h4>
          </div>
          <div className="flex items-center gap-3 hover:bg-orange-500 w-full p-3 rounded-lg  hover:shadow-lg cursor-pointer">
            <HandThumbUpIcon className="w-6 h-6" />
            <h4 className="block max-md:hidden">Liked Post</h4>
          </div>
          <Link
            to="/profile"
            className="flex items-center gap-3 hover:bg-orange-500 w-full p-3 rounded-lg  hover:shadow-lg cursor-pointer"
          >
            <UserIcon className="w-6 h-6" />
            <h4 className="block max-md:hidden">Profile</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
