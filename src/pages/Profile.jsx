import React from "react";
import Trend from "../components/HomeComponent/Trend";
import PostCard from "../components/PostCard";

const Profile = () => {
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
              <h4 className="text-lg font-bold tracking-wide">USERNAME</h4>
              <span className="text-sm font-light ">Joined June 2023</span>
              <div className="flex items-center gap-4">
                <p className="text-sm font-normal">
                  <span className="font-bold">12</span> Followers
                </p>
                <p className="text-sm font-normal">
                  <span className="font-bold">24</span> Following
                </p>
              </div>
            </div>
          </div>

          <PostCard />
          <PostCard />
        </div>
      </div>
      <div className="flex-[1] max-md:hidden">
        <Trend />
      </div>
    </section>
  );
};

export default Profile;
