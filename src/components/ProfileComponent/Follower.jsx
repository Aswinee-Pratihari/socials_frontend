import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Follower = ({ userId }) => {
  const [FollowerData, setFollowerData] = useState([]);

  useEffect(() => {
    const fetchFollower = async () => {
      try {
        const response = await axios.get(`/users/follower/${userId}`);
        const FollowerIds = response.data.followers;
        // console.log(FollowerIds);
        // Fetch data for each Follower user
        const fetchedData = await Promise.all(
          FollowerIds.map(async (Id) => {
            const userResponse = await axios.get(`/users/${Id}`);
            // console.log(userResponse.data);
            return userResponse.data;
          })
        );

        setFollowerData(fetchedData);
      } catch (error) {
        console.error("Error fetching Follower data:", error);
      }
    };
    fetchFollower();
  }, [userId]);
  return (
    <>
      {FollowerData?.length > 0 && (
        <div className="bg-white rounded-lg p-3 space-y-4">
          <h3 className="text-lg font-bold">Followers</h3>

          {FollowerData?.map((user) => {
            // console.log(user);
            return (
              <Link
                to={`/profile/${user?._id}`}
                className="flex items-center gap-3"
                key={user?._id}
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

export default Follower;
