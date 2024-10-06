import ShowAsset from "./ShowAsset";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import useAssetStore from "../store/asset-store";
import useOfferStore from "../store/offer-store";
import axios from "axios";
import useUserStore from "../store/user-store";
import ShowAddAssetOffer from "./ShowAddAssetOffer";

export default function OfferDetail() {
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const setCurrentAsset = useAssetStore((state) => state.setCurrentAsset);
  const currentOffer = useOfferStore((state) => state.currentOffer);
  const setAddAssetUserId = useOfferStore((state) => state.setAddAssetUserId);
  const setCurrentOffer = useOfferStore((state) => state.setCurrentOffer);
  const [offer, setOffer] = useState({});
  const hdlShowAssets = (el) => {
    setCurrentAsset(el.assetId);
    document.getElementById("asset_modal").showModal();
  };
  const hdlShowAddAssetOffer = (side) => {
    if (side == "offer") {
      setAddAssetUserId(offer.offerorId);
    } else {
      setAddAssetUserId(offer.swaperId);
    }
    document.getElementById("add_asset_modal").showModal();
  };
  const getOfferDetail = async () => {
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
      console.log(err);
    }
  };
  useEffect(() => {
    if (currentOffer) {
      getOfferDetail();
    }
  }, [currentOffer]);
  const helDelOfferAsset = async (e, el) => {
    e.stopPropagation();
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/offer/asset/del/" +
          currentOffer +
          "/" +
          el.assetId,
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
        messageTxt: `Remove [${resp.data.delOfferAsset.asset.assetName}] on ${
          resp.data.delOfferAsset.asset.userId ==
          resp.data.delOfferAsset.offer.offerorId
            ? "Offeror"
            : "Swaper"
        } side`,
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
      setCurrentOffer(null);
      setTimeout(() => setCurrentOffer(currentOffer), 0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-my-bg-card w-full shadow-md p-2">
      {/* head tag */}
      <div className="flex justify-between font-bold text-my-text relative">
        <div className="flex">
          <p className="bg-my-prim px-2 py-1">Swaper</p>
          <p className="bg-my-bg-card text-my-prim px-2 py-1 border border-my-prim">
            {offer.swaperStatus ? "Accepted" : "Pending"}
          </p>
        </div>
        <div className="flex">
          <p className="bg-my-bg-card text-my-acct px-2 py-1 border border-my-acct">
            {offer.offerorStatus ? "Accepted" : "Pending"}
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
                <p className="text-xs">{`(${offer?.swaper?.userRating} / ${offer?.swaper?.userRatingCount})`}</p>
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
                <p className="text-xs">{`(${offer?.offeror?.userRating} / ${offer?.offeror?.userRatingCount})`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* box */}
      <div className="flex justify-between gap-5">
        {/* swaper box */}
        <div className="w-1/2 min-h-[400px] border-2 border-my-prim bg-my-prim flex flex-col justify-between py-2">
          {/* swaper asset card */}
          <div className="flex flex-col h-[350px] gap-2 overflow-y-scroll px-5 bg-my-bg-card py-2">
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
                      <div
                        className="bg-my-prim mr-4 p-2 rounded-full my-auto flex justify-center items-center hover:bg-my-prim-hover"
                        onClick={(e) => helDelOfferAsset(e, el)}
                      >
                        <IoTrashBin className="text-my-text text-lg" />
                      </div>
                    </div>
                  );
                }
              })}
          </div>
          {/* swaper add asset button */}
          <button className="flex justify-center items-center">
            <button
              className="py-1 px-2 bg-my-prim text-my-text font-bold hover:bg-my-prim-hover flex gap-1 items-center"
              onClick={() => hdlShowAddAssetOffer("swaper")}
            >
              <IoIosAddCircle className="text-lg" /> Add Swaper Asset
            </button>
          </button>
        </div>
        {/* offeror box */}
        <div className="w-1/2 min-h-[400px] border-2 border-my-acct bg-my-acct flex flex-col justify-between py-2">
          {/* offeror asset card */}
          <div className="flex flex-col h-[350px] gap-2 overflow-y-scroll px-5 bg-my-bg-card py-2">
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
                      <div
                        className="bg-my-acct mr-4 p-2 rounded-full my-auto flex justify-center items-center hover:bg-my-btn-hover"
                        onClick={(e) => helDelOfferAsset(e, el)}
                      >
                        <IoTrashBin className="text-my-text text-lg" />
                      </div>
                    </div>
                  );
                }
              })}
          </div>
          {/* offeror add asset button */}
          <div className="flex justify-center items-center">
            <button
              className="py-1 px-2 bg-my-acct text-my-text font-bold hover:bg-my-btn-hover flex gap-1 items-center"
              onClick={() => hdlShowAddAssetOffer("offer")}
            >
              <IoIosAddCircle className="text-lg" /> Add Offeror Asset
            </button>
          </div>
        </div>
      </div>
      {/* Modal showAsset */}
      <dialog id="asset_modal" className="modal">
        <ShowAsset />
      </dialog>
      {/* Modal showAddAssetOffer */}
      <dialog id="add_asset_modal" className="modal">
        <ShowAddAssetOffer />
      </dialog>
    </div>
  );
}
