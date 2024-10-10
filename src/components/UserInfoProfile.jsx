import { IoIosSave } from "react-icons/io";
import useUserStore from "../store/user-store";
import useOtherStore from "../store/other-store";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ShowMessage from "./ShowMessage";
import ShowChangePassword from "./ShowChangePassword";
import ShowChangeProfile from "./ShowChangeProfile";

const UserInfoProfile = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const token = useUserStore((state) => state.token);
  const setMessage = useOtherStore((state) => state.setMessage);
  const [userInfo, setUserInfo] = useState({});
  const [input, setInput] = useState({
    userProfilePic: "",
    userDisplayName: "",
    userBio: "",
    userLocation: "",
    userAddress: "",
  });
  const showChangeProfile = () => {
    document.getElementById("change_profile_modal").showModal();
  };
  const getUserInfo = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(resp.data.user);
      setUser({ ...user, userIsReady: resp.data.user.userIsReady });
    } catch (err) {
      console.log(err.message);
    }
  };
  const hdlChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.patch(
        "http://localhost:8000/api/user/update-user",
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInfo(resp.data.user);
      setMessage(resp.data.msg);
      document.getElementById("message_modal").showModal();
      setTimeout(() => {
        document.getElementById("message_modal").close();
      }, 1000);
      await getUserInfo();
    } catch (err) {
      setMessage(err.response.data.msg || err.message);
      document.getElementById("message_modal").showModal();
      setTimeout(() => {
        setMessage("");
        document.getElementById("message_modal").close();
      }, 1000);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    if (userInfo) {
      setInput({
        userProfilePic: userInfo.userProfilePic || "",
        userDisplayName: userInfo.userDisplayName || "",
        userBio: userInfo.userBio || "",
        userLocation: userInfo.userLocation || "",
        userAddress: userInfo.userAddress || "",
      });
    }
  }, [userInfo]);
  return (
    <div>
      <div className="w-5/12 h-[150px]  mx-auto flex gap-4">
        {/* <button onClick={() => console.log(user)}>Test</button> */}
        {/* profile pic */}
        <div
          className="w-[150px] h-[150px] flex justify-center relative cursor-pointer"
          onClick={showChangeProfile}
        >
          <img
            className=" object-cover w-full h-full shadow-md"
            src={input.userProfilePic}
            alt="no load"
          />
          <p className="absolute bottom-0 text-slate-500 translate-y-5 text-[.6rem]">
            CLICK TO CHANGE
          </p>
        </div>
        {/* user info */}
        <div className="flex-1 h-full  flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="w-full flex  gap-2">
              <p className="w-4/12 font-bold">Username :</p>
              <p className="flex-1 font-bold">{userInfo.userName}</p>
            </div>
            <div className="w-full flex  gap-2">
              <p className="w-4/12 font-bold">Display Name :</p>
              <input
                className="flex-1 border"
                value={input.userDisplayName}
                name="userDisplayName"
                onChange={hdlChangeInput}
              />
            </div>
            <div className="w-full flex  gap-2">
              <p className="w-4/12 font-bold">Status :</p>
              <p className="flex-1 font-bold">
                {userInfo.userIsReady ? "Ready" : "Not Ready"}
              </p>
            </div>
            <div className="w-full flex  gap-2">
              <p className="w-4/12 font-bold">Password</p>
              <button
                className="flex-1 cursor-pointer text-my-acct font-bold text-left"
                onClick={() =>
                  document.getElementById("change_password_modal").showModal()
                }
              >
                Change Password
              </button>
            </div>
          </div>
          {/* user rating */}
          <div className="w-full flex  gap-2 items-baseline">
            <p className="w-4/12 font-bold">User Rating :</p>
            <div className="flex gap-1 items-baseline">
              {Array.from({ length: Math.ceil(userInfo.userRating) }).map(
                (el, idx) => (
                  <div
                    key={idx}
                    className="w-[10px] h-[10px] rounded-full bg-my-acct"
                  ></div>
                )
              )}
              {userInfo.userRating ? (
                <p className="text-xs">{`( ${
                  userInfo?.userRating != null && !isNaN(userInfo.userRating)
                    ? Number(userInfo.userRating).toFixed(2)
                    : "0.00"
                } / ${userInfo?.userRatingCount || 0} )`}</p>
              ) : (
                <p>User not have rating yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <form>
        {/* bio */}
        <div className="w-5/12 h-[150px] mx-auto  flex flex-col py-2 mt-3">
          <p className="font-bold">Bio :</p>
          <textarea
            className="h-full resize-none border p-2"
            value={input.userBio}
            name="userBio"
            onChange={hdlChangeInput}
          ></textarea>
        </div>
        {/* shippping location */}
        <div className="w-5/12 h-[50px] mx-auto  flex py-2 mt-3 items-center gap-2">
          <p className="font-bold w-5/12">Shipping Location :</p>
          <input
            className="h-full resize-none border p-2 w-full"
            value={input.userLocation}
            name="userLocation"
            onChange={hdlChangeInput}
          />
        </div>
        {/* shipping address */}
        <div className="w-5/12 h-[150px] mx-auto  flex flex-col py-2 mt-3">
          <p className="font-bold">Shipping Address :</p>
          <textarea
            className="h-full resize-none border p-2"
            value={input.userAddress}
            name="userAddress"
            onChange={hdlChangeInput}
          ></textarea>
        </div>
        {/* update button */}
        <div className="w-full flex justify-center py-8 gap-2">
          <button
            className="h-[40px] py-1 w-[200px] bg-my-acct font-bold text-white flex justify-center items-center gap-1 shadow-md hover:bg-my-btn-hover"
            onClick={updateUserInfo}
          >
            <IoIosSave className="text-xl" />
            Update
          </button>
        </div>
      </form>
      {/* Modal Change Password */}
      <dialog id="change_password_modal" className="modal">
        <ShowChangePassword />
      </dialog>
      {/* Modal message */}
      <dialog id="message_modal" className="modal">
        <ShowMessage />
      </dialog>
      {/* Modal change profile */}
      <dialog id="change_profile_modal" className="modal">
        <ShowChangeProfile />
      </dialog>
      {/* <button onClick={() => console.log(message)}>Test</button> */}
    </div>
  );
};

export default UserInfoProfile;
