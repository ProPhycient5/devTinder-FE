import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <Skeleton />;

  if (requests.length === 0)
    return (
      <h1 className="text-center textarea-lg text-gray-200 py-6">
        No request found.
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
                <img
                  alt="profile pic"
                  className="size-20 rounded-box"
                  src={photoUrl}
                />
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
                  <button
                    className="btn btn-info"
                    onClick={() => handleReviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleReviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
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
      <div className="flex w-80 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="skeleton h-24 w-full"></div>
        </div>
      </div>
      <div className="flex w-80 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="skeleton h-24 w-full"></div>
        </div>
      </div>
      <div className="flex w-80 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="skeleton h-24 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
