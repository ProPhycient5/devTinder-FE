import React, { useState } from "react";
import { UserCard } from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    age: user?.age,
    gender: user?.gender,
    bio: user?.bio,
    photoUrl: user?.photoUrl,
  });
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const handleSave = async () => {
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", userInfo, {
        withCredentials: true,
      });
      setShowToast(true);
      dispatch(addUser(res.data.updatedProfile));
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center gap-6">
      <div className="flex justify-center">
        <div className="card card-border bg-base-200 w-72">
          <div className="card-body">
            <h2 className="card-title justify-center">Update Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                value={userInfo.firstName}
                onChange={(e) =>
                  setUserInfo((p) => ({ ...p, firstName: e.target.value }))
                }
              />
            </fieldset>
            <fieldset className="fieldset mb-1">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                value={userInfo.lastName}
                onChange={(e) =>
                  setUserInfo((p) => ({ ...p, lastName: e.target.value }))
                }
              />
            </fieldset>
            <fieldset className="fieldset mb-1">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input"
                value={userInfo.photoUrl}
                onChange={(e) =>
                  setUserInfo((p) => ({ ...p, photoUrl: e.target.value }))
                }
              />
            </fieldset>
            <fieldset className="fieldset mb-1">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input"
                value={userInfo.age}
                onChange={(e) =>
                  setUserInfo((p) => ({ ...p, age: e.target.value }))
                }
              />
            </fieldset>
            <fieldset className="fieldset mb-1">
              <legend className="fieldset-legend">Gender</legend>
              <select
                defaultValue={
                  userInfo.gender ? userInfo.gender : "Choose gender"
                }
                className="select appearance-none"
                onChange={(e) =>
                  setUserInfo((p) => ({ ...p, gender: e.target.value }))
                }
              >
                <option disabled={true}>Choose gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </fieldset>
            <fieldset className="fieldset mb-1">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea textarea-md"
                value={userInfo.bio}
                onChange={(e) =>
                  setUserInfo((p) => ({ ...p, bio: e.target.value }))
                }
              ></textarea>
            </fieldset>

            <p className="text-red-500 text-xs">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={userInfo} />
      {showToast && <Toast message={"Profile saved successfully."} />}
    </div>
  );
};

export default EditProfile;
