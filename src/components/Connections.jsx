import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections.length === 0)
    return (
      <h1 className="text-center textarea-lg text-gray-200 py-6">
        Yet, you have no connections
      </h1>
    );

  return (
    <div className="flex justify-center items-center">
      <ul className="list bg-base-300 rounded-box shadow-md max-w-2/3">
        <li className="p-4 pb-2 text-2xl opacity-30 tracking-wide">
          Connections
        </li>

        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, bio, gender, age } =
            connection;
          return (
            <li className="list-row" key={_id}>
              <div>
                <img className="size-24 rounded-box" src={photoUrl} />
              </div>
              <div>
                <div>{firstName + " " + lastName}</div>
                {age && gender && (
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {age + ", " + gender}
                  </div>
                )}
              </div>
              <p className="list-col-wrap text-xs">{bio}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
