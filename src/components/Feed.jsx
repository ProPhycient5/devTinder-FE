import axios from "axios";
import { UserCard } from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import Toast from "./Toast";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const toast = useSelector((store) => store.toast);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex justify-center item-center">
      {feed && <UserCard user={feed[0]} />}
      {toast && <Toast message={"You have logged in successfully"} />}
    </div>
  );
};

export default Feed;
