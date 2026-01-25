import axios from "axios";
import { UserCard } from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import Toast from "./Toast";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const toast = useSelector((store) => store.toast);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading) return <Skeleton />;

  if (feed.length === 0)
    return (
      <h1 className="text-center textarea-lg text-gray-200 py-6">
        No user in database
      </h1>
    );

  return (
    <div className="flex justify-center item-center">
      {feed && <UserCard user={feed[0]} page={"FEED"} />}
      {toast && <Toast message={"You have logged in successfully"} />}
    </div>
  );
};

export default Feed;

const Skeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="flex w-60 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-20 w-full"></div>
      </div>

      <div className="flex w-60 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-20 w-full"></div>
      </div>
    </div>
  );
};
