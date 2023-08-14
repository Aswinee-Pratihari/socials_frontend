import React, { useEffect, useState } from "react";
import {
  BeakerIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import PostCard from "../PostCard";
import axios from "axios";
import { useSelector } from "react-redux";
const Main = () => {
  const [data, setData] = useState();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`posts/timeline/${user?._id}`);
      const data = await res.data;
      // console.log(data);
      setData(data);
    };

    fetchData();
  }, []);
  return (
    <main className="p-4">
      <h2 className="font-bold text-2xl">Activity Feed</h2>

      <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-xl mt-4 cursor-pointer">
        <img
          src="https://online-communities.demos.buddyboss.com/wp-content/sandbox211082-uploads/avatars/2/621e2ce4392dd-bpthumb.png"
          className="w-10 h-10 rounded-full object-cover"
          alt=""
        />
        <span className="text-sm font-semibold text-gray-400">
          {`Share Whats in your mind ${user?.userName}...`}
        </span>
      </div>

      {/* creating search for feed */}
      <div className="inputsearch flex gap-3 items-center rounded-lg shadow-xl bg-white w-fit my-4 p-3">
        <MagnifyingGlassIcon className="w-4 h-4 " />
        <input
          type="text"
          name=""
          id=""
          placeholder="search the feed"
          className="focus:outline-none  text-sm font-medium rounded-lg"
        />
      </div>

      {/* reating post card */}
      <div className="space-y-4">
        {data?.map((post) => {
          return <PostCard post={post} />;
        })}
      </div>
    </main>
  );
};

export default Main;
