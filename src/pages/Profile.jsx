import React, { useEffect, useState } from "react";
import Trend from "../components/HomeComponent/Trend";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import Following from "../components/ProfileComponent/Following";
import Follower from "../components/ProfileComponent/Follower";

const Profile = () => {
  const { userId } = useParams();
  // console.log(userId);
  const [posts, setPost] = useState([]);
  const [user, setUser] = useState();
  const currentuser = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/posts/profile/${userId}`);
      const data = await res.data;
      // console.log(res);
      setPost(data);
    };

    const fetchUser = async () => {
      const res = await axios.get(`/users/${userId}`);
      const data = await res.data;
      setUser(data);
      console.log(data);
    };
    fetchPost();
    fetchUser();
  }, [userId]);

  // const { userinfo } = useUserInfo(userId);
  // console.log(userinfo);
  if (!user) {
    navigate("/login");
  }
  return (
    <section className="p-3 rounded-lg  flex">
      <div className="flex-[3]">
        <div className="space-y-5">
          <div className="white  w-full bg-white h-[400px] rounded-2xl">
            <div className="h-1/2 relative ">
              <img
                src="https://online-communities.demos.buddyboss.com/wp-content/sandbox211102-uploads/buddypress/members/2/cover-image/621e2cf2a9e5d-bp-cover-image.jpg"
                alt=""
                className="w-full h-full "
              />
            </div>
            <div className="flex justify-center items-center flex-col ">
              {/* profile image */}
              <img
                src="https://online-communities.demos.buddyboss.com/wp-content/sandbox211082-uploads/avatars/2/621e2ce4392dd-bpthumb.png"
                className="w-32 h-32 rounded-full object-cover border-4 border-white items-center"
                alt=""
              />
              <h4 className="text-lg font-bold tracking-wide">
                {user?.userName}
              </h4>
              <span className="text-sm font-light ">
                Joined {dayjs(user?.createdAt).format("MMM , YYYY")}
              </span>
              <div className="flex items-center gap-4">
                <p className="text-sm font-normal">
                  <span className="font-bold">{user?.followers.length}</span>
                  Followers
                </p>
                <p className="text-sm font-normal">
                  <span className="font-bold">{user?.following.length}</span>
                  Following
                </p>
              </div>
            </div>
          </div>

          {posts.length > 0 ? (
            posts?.map((post) => {
              return <PostCard post={post} key={post?._id} />;
            })
          ) : (
            <>no post to show</>
          )}

          {/* <PostCard /> */}
        </div>
      </div>
      <div className="flex-[1] gap-3 max-md:hidden h-screen sticky top-0 bottom-0">
        <Following userId={user?._id} />
        <Follower userId={user?._id} />
      </div>
    </section>
  );
};

export default Profile;
