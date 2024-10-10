import { IoIosClose } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAssetStore from "../store/asset-store";
import axios from "axios";
import useUserStore from "../store/user-store";
import { useNavigate } from "react-router-dom";

export default function ShowRate() {
  const navigate = useNavigate();
  const [userRate, setUserRate] = useState(3);
  const [user, setUser] = useState({});
  const currentUserForRate = useAssetStore((state) => state.currentUserForRate);
  const setCurrentUserForRate = useAssetStore(
    (state) => state.setCurrentUserForRate
  );
  const currentAssetForRate = useAssetStore(
    (state) => state.currentAssetForRate
  );
  const setCurrentAssetForRate = useAssetStore(
    (state) => state.setCurrentAssetForRate
  );
  const token = useUserStore((state) => state.token);
  const stars = [1, 2, 3, 4, 5];
  const hdlClosePopup = (e) => {
    setCurrentUserForRate(0);
    e.target.closest("dialog").close();
  };
  const getUserRate = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:8000/api/shipping/userRate/" + currentUserForRate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
      setUser(resp.data.user);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (currentUserForRate) {
      getUserRate();
    }
  }, [currentUserForRate]);
  const hdlRateUser = async (e) => {
    console.log(userRate);
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/shipping/rateUser/" +
          currentUserForRate +
          "/" +
          userRate +
          "/" +
          currentAssetForRate,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentUserForRate(0);
      navigate(0);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="w-5/12 min-h-[400px] bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-2/3 -translate-x-1/2 flex flex-col py-10 px-20 justify-center items-center">
      {/* Rate Area */}
      <div className="h-[300px] w-full flex flex-col gap-10 items-center justify-evenly">
        {/* user detail */}
        <div className="w-full h-[100px]  flex justify-between text-my-prim p-2">
          {/* profile pic */}
          <div className="w-4/12 rounded-full ">
            <img
              className="w-[100px] h-[100px] object-cover"
              src={user?.userProfilePic}
              alt="no load"
            />
          </div>
          {/* profile detail */}
          <div className=" flex-1 p-1 flex flex-col justify-around gap-2">
            <div className=" flex">
              <p className="w-5/12 font-bold">Offeror :</p>
              <p className="flex-1">{user?.userName}</p>
            </div>
            <div className=" flex">
              <p className="w-5/12 font-bold">Ship from :</p>
              <p className="flex-1">{user?.userLocation}</p>
            </div>
            <div className=" flex items-center flex-wrap">
              <p className="w-5/12 font-bold">Rating :</p>
              {/* user rating */}
              <div className="flex gap-[5px]">
                {Array(Math.round(user?.userRating || 0))
                  .fill()
                  .map((el, idx) => (
                    <div
                      key={idx}
                      className="w-[10px] h-[10px] rounded-full bg-my-acct"
                    ></div>
                  ))}
              </div>
              <p className="ml-2">
                {`( ${
                  user?.userRating != null && !isNaN(user.userRating)
                    ? Number(user.userRating).toFixed(2)
                    : "0.00"
                } / ${user?.userRatingCount || 0} )`}
              </p>
            </div>
          </div>
        </div>
        {/* stars */}
        <div className="flex gap-3 mt-10">
          {stars.map((el, idx) => {
            if (idx + 1 <= userRate) {
              return (
                <button key={idx} onMouseEnter={() => setUserRate(idx + 1)}>
                  <FaStar className="text-3xl text-my-acct" />
                </button>
              );
            } else {
              return (
                <button key={idx} onMouseEnter={() => setUserRate(idx + 1)}>
                  <FaRegStar className="text-3xl text-my-acct" />
                </button>
              );
            }
          })}
        </div>
        {/* button */}
        <div className="flex justify-center items-center">
          <button
            className="w-[150px] h-[40px] font-bold text-my-text bg-my-acct"
            onClick={hdlRateUser}
          >
            Confirm
          </button>
        </div>
      </div>
      {/* close button */}
      <button
        className="w-[50px] h-[50px] bg-my-acct text-my-text rounded-full text-4xl font-bold absolute flex justify-center items-center top-0 right-0 translate-x-4 -translate-y-4 shadow-md hover:bg-my-btn-hover"
        onClick={hdlClosePopup}
      >
        <IoIosClose />
      </button>
    </div>
  );
}
