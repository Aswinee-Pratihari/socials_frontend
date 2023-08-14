import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  BeakerIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
const PostCard = ({ post }) => {
  console.log(post);
  const [userinfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`users/${post?.userId}`);
      const data = await res.data;
      setUserInfo(data);
      console.log(userinfo);
    };

    fetchData();
  }, [post]);

  const handleLike = async () => {
    await axios.put(`posts/like/${post?._id}`, {
      userId: "64d9ed4fdbf13c1ba994e445",
    });
  };
  return (
    <>
      {post != null && (
        <>
          <div className="p-3 rounded-lg bg-white">
            <div className="top flex items-center gap-3 ">
              <img
                src="https://online-communities.demos.buddyboss.com/wp-content/sandbox211082-uploads/avatars/2/621e2ce4392dd-bpthumb.png"
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />
              <div>
                <h5 className="text-sm font-semibold">{userinfo?.userName}</h5>
                <p className="text-sm font-normal">
                  {dayjs(post?.updatedAt).format("MMM D, YYYY")}
                </p>
              </div>
            </div>

            {/* content of post */}
            <div className="middle my-3 space-y-5">
              <p className="text-sm font-medium ">{post?.content}</p>
              <div>
                {post?.img && (
                  <img
                    src={post?.img}
                    className="w-1/2 h-52 rounded-lg object-cover mx-auto"
                    alt=""
                  />
                )}
              </div>
            </div>

            {/* buttons for like and comment */}
            <div className="flex gap-4 items-center">
              <span>{post?.likes?.length} Likes</span>
              <div className="flex items-center gap-2">
                <HandThumbUpIcon
                  className="w-6 h-6  cursor-pointer"
                  onClick={handleLike}
                />
                <span>Like</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>

                <span>Comment</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostCard;
