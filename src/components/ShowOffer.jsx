import { IoIosClose } from "react-icons/io";
import useOfferStore from "../store/offer-store";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/user-store";
import ShowAsset from "./ShowAsset";
import useAssetStore from "../store/asset-store";
import { useNavigate } from "react-router-dom";
import ShowMessage from "./ShowMessage";
import useOtherStore from "../store/other-store";

export default function ShowOffer() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const setCurrentAsset = useAssetStore((state) => state.setCurrentAsset);
  const currentOffer = useOfferStore((state) => state.currentOffer);
  const setCurrentOffer = useOfferStore((state) => state.setCurrentOffer);
  const message = useOtherStore((state) => state.message);
  const setMessage = useOtherStore((state) => state.setMessage);
  const [offer, setOffer] = useState({});
  const hdlClosePopup = (e) => {
    setCurrentOffer(0);
    e.target.closest("dialog").close();
  };
  const hdlShowAssets = (el) => {
    setCurrentAsset(el.assetId);
    document.getElementById("asset_modal").showModal();
  };
  const getOfferDetail = async () => {
    console.log("-------------------------", currentOffer);
    try {
      const resp = await axios.get(
        "http://localhost:8000/api/offer/getdetail/" + currentOffer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data.returnOffer);
      setOffer(resp.data.returnOffer);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (currentOffer) {
      getOfferDetail();
    }
  }, [currentOffer]);
  const hdlAcceptOffer = async (e) => {
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/offer/acceptOffer/" + currentOffer,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      // addMessage
      const body = {
        messageTxt: `${
          resp.data.offer.offerorId == user.userId ? "Offeror" : "Swaper"
        } has accepted offer.`,
        messageIsAuto: "true",
        userId: user.userId,
        offerId: currentOffer,
      };
      await axios.post("http://localhost:8000/api/msg", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //refeash
      setCurrentOffer(0);
      navigate(0);
    } catch (err) {
      console.log(err.message);
      setMessage(err.response.data.msg || err.message);
      document.getElementById("message_modal").showModal();
      setTimeout(() => {
        setMessage("");
        document.getElementById("message_modal").close();
      }, 1000);
    }
  };
  return (
    <>
      <div className="w-8/12 min-h-[550px] bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col p-10">
        {/* offer detail */}
        <div className="bg-my-bg-card w-full shadow-md p-2">
          {/* head tag */}
          <div className="flex justify-between font-bold text-my-text relative">
            <div className="flex">
              <p className="bg-my-prim px-2 py-1">Swaper</p>
              <p className="bg-my-bg-card text-my-prim px-2 py-1 border border-my-prim">
                {offer.offerStatus == "REJECTED"
                  ? "Rejected"
                  : offer.swaperStatus
                  ? "Accepted"
                  : "Pending"}
              </p>
            </div>
            <div className="flex">
              <p className="bg-my-bg-card text-my-acct px-2 py-1 border border-my-acct">
                {offer.offerStatus == "REJECTED"
                  ? "Rejected"
                  : offer.offerorStatus
                  ? "Accepted"
                  : "Pending"}
              </p>
              <p className="bg-my-acct px-2 py-1">Offeror</p>
            </div>
          </div>
          <div className="flex justify-between font-bold text-my-text gap-5">
            {/* Swaper */}
            <div className="w-1/2 h-[100px]  flex justify-between text-my-prim border border-my-prim p-2">
              {/* profile pic */}
              <div className="w-4/12 rounded-full flex justify-center ">
                <img
                  className="w-[80px] h-[80px] object-cover"
                  src={offer?.swaper?.userProfilePic}
                  alt="no load"
                />
              </div>
              {/* profile detail */}
              <div className=" flex-1 p-1 flex flex-col justify-around">
                <div className=" flex">
                  <p className="w-5/12 font-bold">Swaper :</p>
                  <p className="flex-1">{offer?.swaper?.userDisplayName}</p>
                </div>
                <div className=" flex">
                  <p className="w-5/12 font-bold">Ship from :</p>
                  <p className="flex-1">{offer?.swaper?.userLocation}</p>
                </div>
                <div className=" flex items-center flex-wrap">
                  <p className="w-5/12 font-bold">Rating :</p>
                  <div className="flex gap-1 items-baseline">
                    {Array(Math.round(offer?.swaper?.userRating || 0))
                      .fill()
                      .map((el, idx) => (
                        <div
                          key={idx}
                          className="w-[10px] h-[10px] rounded-full bg-my-acct"
                        ></div>
                      ))}

                    <p className="text-xs">{`( ${
                      offer?.swaper?.userRating != null &&
                      !isNaN(offer?.swaper?.userRating)
                        ? Number(offer?.swaper?.userRating).toFixed(2)
                        : "0.00"
                    } / ${offer?.swaper?.userRatingCount || 0} )`}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Offeror */}
            <div className="w-1/2 h-[100px]  flex justify-between text-my-prim border border-my-acct p-2">
              {/* profile pic */}
              <div className="w-4/12 rounded-full flex justify-center ">
                <img
                  className="w-[80px] h-[80px] object-cover"
                  src={offer?.offeror?.userProfilePic}
                  alt="no load"
                />
              </div>
              {/* profile detail */}
              <div className=" flex-1 p-1 flex flex-col justify-around">
                <div className=" flex">
                  <p className="w-5/12 font-bold">Offeror :</p>
                  <p className="flex-1">{offer?.offeror?.userDisplayName}</p>
                </div>
                <div className=" flex">
                  <p className="w-5/12 font-bold">Ship from :</p>
                  <p className="flex-1">{offer?.offeror?.userLocation}</p>
                </div>
                <div className=" flex items-center flex-wrap">
                  <p className="w-5/12 font-bold">Rating :</p>
                  <div className="flex gap-1 items-baseline">
                    {Array(Math.round(offer?.offeror?.userRating || 0))
                      .fill()
                      .map((el, idx) => (
                        <div
                          key={idx}
                          className="w-[10px] h-[10px] rounded-full bg-my-acct"
                        ></div>
                      ))}
                    <p className="text-xs">{`( ${
                      offer?.offeror?.userRating != null &&
                      !isNaN(offer?.offeror?.userRating)
                        ? Number(offer?.offeror?.userRating).toFixed(2)
                        : "0.00"
                    } / ${offer?.offeror?.userRatingCount || 0} )`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* box */}
          <div className="flex justify-between gap-5">
            {/* swaper box */}
            <div className="w-1/2 min-h-[350px] border-2 border-my-prim bg-my-prim flex flex-col justify-between py-2">
              {/* swaper asset card */}
              <div className="flex flex-col h-[300px] gap-2 overflow-y-scroll px-5 bg-my-bg-card py-2">
                {/* card */}
                {offer.offerAssets &&
                  offer?.offerAssets.map((el, idx) => {
                    if (offer?.swaperId == el?.asset?.userId) {
                      return (
                        <div
                          key={idx}
                          className="w-full h-[80px] flex shadow-md cursor-pointer hover:bg-my-hover"
                          onClick={() => hdlShowAssets(el)}
                        >
                          {/* asset pic */}
                          <div className="min-w-[100px]">
                            <img
                              src={el?.asset?.assetThumbnail}
                              alt="no load"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          {/* asset detail */}
                          <div className="w-full h-full flex flex-col justify-between py-2">
                            <p>{el?.asset?.assetName}</p>
                            <p>{el?.asset?.assetCategory}</p>
                            <p>{el?.asset?.assetCondition}</p>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            {/* offeror box */}
            <div className="w-1/2 min-h-[350px] border-2 border-my-acct bg-my-acct flex flex-col justify-between py-2">
              {/* offeror asset card */}
              <div className="flex flex-col h-[300px] gap-2 overflow-y-scroll px-5 bg-my-bg-card py-2">
                {/* card */}
                {offer.offerAssets &&
                  offer?.offerAssets.map((el, idx) => {
                    if (offer?.offerorId == el?.asset?.userId) {
                      return (
                        <div
                          key={idx}
                          className="w-full h-[80px] flex shadow-md cursor-pointer hover:bg-my-hover"
                          onClick={() => hdlShowAssets(el)}
                        >
                          {/* asset pic */}
                          <div className="min-w-[100px]">
                            <img
                              src={el?.asset?.assetThumbnail}
                              alt="no load"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          {/* asset detail */}
                          <div className="w-full h-full flex flex-col justify-between py-2">
                            <p>{el?.asset?.assetName}</p>
                            <p>{el?.asset?.assetCategory}</p>
                            <p>{el?.asset?.assetCondition}</p>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
          {/* Modal showAsset */}
          <dialog id="asset_modal" className="modal">
            <ShowAsset />
          </dialog>
        </div>
        {/* accept offer button */}
        {offer.offerStatus == "CREATED" && (
          <div className="flex justify-center items-center mt-5">
            <button
              className="h-[40px] py-1 w-[200px] mx-auto shadow-md bg-my-acct font-bold text-my-text flex justify-center items-center gap-1 hover:bg-my-btn-hover"
              onClick={hdlAcceptOffer}
            >
              Accept Offer
            </button>
          </div>
        )}
        {/* message modal */}
        <dialog id="message_modal" className="modal">
          <ShowMessage />
        </dialog>
        {/* close button */}
        <button
          className="w-[50px] h-[50px] bg-my-acct text-my-text rounded-full text-4xl font-bold absolute flex justify-center items-center top-0 right-0 translate-x-4 -translate-y-4 shadow-md hover:bg-my-btn-hover"
          onClick={hdlClosePopup}
        >
          <IoIosClose />
        </button>
      </div>
    </>
  );
}
