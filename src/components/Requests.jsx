import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("request", res.data);
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests.length === 0)
    return (
      <h1 className="text-center textarea-lg text-gray-200 py-6">
        There is no requests
      </h1>
    );

  return (
    <div className="flex justify-center items-center">
      <ul className="list bg-base-300 rounded-box shadow-md">
        <li className="p-4 pb-2 text-2xl opacity-30 tracking-wide">Requests</li>

        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, gender, age } =
            request.fromUserId;
          return (
            <li className="list-row" key={_id}>
              <div>
                <img className="size-20 rounded-box" src={photoUrl} />
              </div>
              <div className="flex justify-center items-center gap-8">
                <div>
                  <div>{firstName + " " + lastName}</div>
                  {age && gender && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age + ", " + gender}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-info">Ignore</button>
                  <button className="btn btn-success">Accept</button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
