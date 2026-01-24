import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) return <Skeleton />;

  if (connections.length === 0)
    return (
      <h1 className="text-center textarea-lg text-gray-200 py-6">
        No connection found
      </h1>
    );

  return (
    <div className="flex justify-center">
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
                <img
                  className="size-24 rounded-box"
                  src={photoUrl}
                  alt="profile pic"
                />
              </div>
              <div>
                <div>{firstName + " " + lastName}</div>
                {age && gender && (
                  <div className="text-xs uppercase font-semibold opacity-60 mt-1">
                    {age + ", " + gender}
                  </div>
                )}
                <p className="list-col-wrap text-xs mt-2">{bio}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

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

export default Connections;
