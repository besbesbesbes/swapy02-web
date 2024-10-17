import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdLocalOffer } from "react-icons/md";
import axios from "axios";
import useUserStore from "../store/user-store";
import useAssetStore from "../store/asset-store";
import { useNavigate, useLocation } from "react-router-dom";

export default function ShowAsset() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentAsset = useAssetStore((state) => state.currentAsset);
  const setCurrentAsset = useAssetStore((state) => state.setCurrentAsset);
  const [selectedPic, setSelectedPic] = useState(0);
  const [assets, setAssets] = useState([]);
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const hdlClosePopup = (e) => {
    setAssets([]);
    setSelectedPic(0);
    setCurrentAsset(0);
    e.target.closest("dialog").close();
  };
  const getAssets = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8000/api/search/all?a=" + currentAsset
      );
      console.log(result.data.assets[0]);
      setAssets(result.data.assets[0]);
    } catch (err) {
      console.log(err.message);
    }
  };
  const hdlCreateOffer = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/api/offer/createOffer/" + currentAsset,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // addMessage
      const body = {
        messageTxt: `Offeror create new offer with [${result.data.returnOffer.offerAssets[0].asset.assetName}]`,
        messageIsAuto: "true",
        userId: user.userId,
        offerId: result.data.returnOffer.offerId,
      };
      await axios.post("http://localhost:8000/api/msg", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //navigate
      if (location.pathname == "/offer") {
        navigate(0);
      } else {
        navigate("/offer");
      }
      console.log(result.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (currentAsset) {
      getAssets();
    }
  }, [currentAsset]);
  return (
    <div
      className="w-8/12 min-h-[500px] bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col p-10"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <button onClick={() => console.log(user)}>Test</button> */}
      <div className="flex w-full h-[400px]">
        {/* picture */}
        <div className="w-6/12 h-full flex flex-col p-5">
          {/* big picture */}
          <div className="w-full h-5/6 p-5 border">
            <img
              src={assets?.assetPics?.[selectedPic].assetPic}
              alt="no load"
              className="w-full max-h-[220px] object-contain"
            />
          </div>
          {/* list pic */}
          <div className="w-full h-[95px] py-2 flex gap-2 overflow-x-auto">
            {assets?.assetPics?.map((el, idx) => (
              <img
                key={idx}
                src={el.assetPic}
                alt="no load"
                className={`w-[50px] h-[50px] border cursor-pointer hover:bg-my-hover object-contain ${
                  selectedPic == idx ? "border-my-acct border-2" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPic(idx);
                }}
              />
            ))}
          </div>
        </div>
        {/* detail */}
        <div className="w-6/12 h-full p-5 flex flex-col justify-between gap-4">
          {/* user */}
          <div className="w-full h-[100px]  flex justify-between">
            {/* profile pic */}
            <div className="w-4/12 rounded-full ">
              <img
                className="w-[100px] h-[100px] object-cover"
                src={assets?.user?.userProfilePic}
                alt="no load"
              />
            </div>
            {/* profile detail */}
            <div className=" flex-1 p-1 flex flex-col justify-around">
              <div className=" flex">
                <p className="w-5/12 font-bold">Swaper :</p>
                <p className="flex-1">{assets?.user?.userDisplayName}</p>
              </div>
              <div className=" flex">
                <p className="w-5/12 font-bold">Ship from :</p>
                <p className="flex-1">{assets?.user?.userLocation}</p>
              </div>
              <div className=" flex items-center flex-wrap">
                <p className="w-5/12 font-bold">Rating :</p>
                <div className="flex gap-1 items-baseline">
                  {/* user rating */}
                  <div className="flex gap-[2px]">
                    {Array(Math.round(assets?.user?.userRating || 0))
                      .fill()
                      .map((el, idx) => (
                        <div
                          key={idx}
                          className="w-[10px] h-[10px] rounded-full bg-my-acct"
                        ></div>
                      ))}
                  </div>
                  <p className="text-xs">{`( ${
                    assets?.user?.userRating != null &&
                    !isNaN(assets?.user?.userRating)
                      ? Number(assets?.user?.userRating).toFixed(2)
                      : "0.00"
                  } / ${assets?.user?.userRatingCount || 0} )`}</p>
                </div>
              </div>
            </div>
          </div>
          {/* asset detail */}
          <div className=" w-full h-[400px] p-2 flex flex-col gap-1">
            <div className=" flex">
              <p className="min-w-3/12 font-bold">Asset :</p>
              <p className="flex-1">{assets.assetName}</p>
            </div>
            <div className=" flex">
              <p className="min-w-3/12 font-bold">Brand :</p>
              <p className="flex-1">{assets.assetBrand || "n/a"}</p>
            </div>
            <div className=" flex">
              <p className="min-w-3/12 font-bold">Category :</p>
              <p className="flex-1">{assets.assetCategory}</p>
            </div>
            <div className=" flex">
              <p className="min-w-3/12 font-bold">Condition :</p>
              <p className="flex-1">{assets.assetCondition}</p>
            </div>
            <div className=" flex">
              <p className="min-w-3/12 font-bold">Note :</p>
              <textarea
                className="flex-1 bg-my-bg-card text-[12px]"
                rows="7"
                value={assets.assetNote}
                disabled
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      {/* button */}
      {Object.keys(user).length > 0 &&
        user.userIsReady &&
        user.userId !== assets.userId &&
        assets.assetStatus == "READY" && (
          <div className="flex justify-center items-center mt-2">
            <button
              className="h-[40px] py-1 w-[200px] mx-auto shadow-md bg-my-acct font-bold text-my-text flex justify-center items-center gap-1 hover:bg-my-btn-hover"
              onClick={hdlCreateOffer}
            >
              <MdLocalOffer className="-translate-y-[1px]" />
              Make New Offer
            </button>
          </div>
        )}
      {assets.assetStatus !== "READY" && assets.assetStatus !== "CREATED" && (
        <div className="flex justify-center text-xl font-bold">
          <p className="text-my-acct">Asset has already matched</p>
        </div>
      )}
      {user.userId == assets.userId && (
        <div className="flex justify-center text-xl font-bold">
          <p>...This is your asset...</p>
        </div>
      )}
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
