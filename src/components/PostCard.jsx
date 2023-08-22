import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { HandThumbUpIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deletepost,
  fetchSinglePost,
  likepost,
  setPost,
} from "../redux/postSlice";
const PostCard = ({ post }) => {
  const likeCount = Object.keys(post?.likes).length;
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.post.post);
  console.log(posts);
  const [userinfo, setUserInfo] = useState(null);
  const [like, setLike] = useState(post.likes.length);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${post?.userId}`);
        const data = await res.data;
        setUserInfo(data);
        // dispatch(fetchVideo(post));
        // console.log(posts);
      } catch (error) {
        alert(error.response);
      }
    };

    fetchData();
  }, [like, setLike]);

  const handleLike = async () => {
    const res = await axios.put(`posts/like/${post?._id}`, {
      userId: `${userinfo?._id}`,
    });
    if (res.data == "liked") {
      setLike(like + 1);
    } else {
      setLike(like - 1);
    }
    console.log(res);
  };
  const handleDelete = async () => {
    try {
      dispatch(deletepost(post._id));
      // const res = await axios.delete(`posts/${post?._id}`);
      // alert("post deleted");
      // navigate("/");
      console.log(res);
    } catch (error) {
      console.log(error);
      alert("you can't delete the post");
    }
  };
  return (
    <>
      {post != null && (
        <>
          <div className="p-3 rounded-lg bg-white">
            <div className="flex justify-between items-center">
              <Link
                to={`/profile/${post?.userId}`}
                className="top flex items-center gap-3"
              >
                <img
                  src="https://online-communities.demos.buddyboss.com/wp-content/sandbox211082-uploads/avatars/2/621e2ce4392dd-bpthumb.png"
                  className="w-10 h-10 rounded-full object-cover"
                  alt=""
                />
                <div>
                  <h5 className="text-sm font-semibold">
                    {userinfo?.userName}
                  </h5>
                  <p className="text-sm font-normal">
                    {dayjs(post?.createdAt).format("MMM D, YYYY")}
                  </p>
                </div>
              </Link>

              {user?._id == userinfo?._id && (
                <div>
                  <TrashIcon
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleDelete}
                  />
                </div>
              )}
            </div>

            {/* content of post */}
            <div className="middle my-3 space-y-5">
              <p className="text-sm font-medium ">{post?.content}</p>
              <div>
                {post?.img && (
                  <img
                    src={post?.img}
                    className="max-w  rounded-lg object-cover mx-auto"
                    alt=""
                  />
                )}
              </div>
            </div>

            {/* buttons for like and comment */}
            <div className="flex gap-4 items-center">
              <span>{like} Likes</span>
              <div className="flex items-center gap-2">
                <HandThumbUpIcon
                  className="w-6 h-6  cursor-pointer"
                  onClick={handleLike}
                />
                <span>{post.likes.includes(user?._id) ? "Liked" : "Like"}</span>
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
