import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Following = ({ userId }) => {
  const [followingData, setFollowingData] = useState([]);
  //   console.log(userId);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`/users/following/${userId}`);
        const followingIds = response.data.following;

        // Fetch data for each following user
        const fetchedData = await Promise.all(
          followingIds.map(async (Id) => {
            const userResponse = await axios.get(`/users/${Id}`);
            return userResponse.data;
          })
        );

        setFollowingData(fetchedData);
      } catch (error) {
        console.error("Error fetching following data:", error);
      }
    };
    fetchFollowing();
  }, [userId]);
  return (
    <>
      {followingData?.length > 0 && (
        <div className="bg-white rounded-lg p-3 space-y-4">
          <h3 className="text-lg font-bold">Followings</h3>

          {followingData?.map((user) => {
            console.log(user);
            return (
              <Link
                to={`/profile/${user?._id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={`${
                    user?.img ||
                    "https://online-communities.demos.buddyboss.com/wp-content/sandbox211082-uploads/avatars/2/621e2ce4392dd-bpthumb.png"
                  }`}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full"
                />

                <span>{user.userName}</span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Following;
