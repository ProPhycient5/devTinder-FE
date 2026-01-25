import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

export const UserCard = ({ user, page }) => {
  const { _id, firstName, lastName, bio, photoUrl, age, gender } = user;
  const dispatch = useDispatch();

  const handleSendConnection = async (status, connectionId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${connectionId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(connectionId));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-10 pt-10 ">
        <img src={photoUrl} alt="profile-pic" className="rounded-xl h-56" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {firstName} {lastName}, {age}, {gender}
        </h2>
        <p>{bio}</p>
        {page === "FEED" && (
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSendConnection("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendConnection("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
