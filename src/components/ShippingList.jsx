import React, { useState, useEffect } from "react";
import ShowOffer from "./ShowOffer";
import ShowRate from "./ShowRate";
import useUserStore from "../store/user-store";
import useAssetStore from "../store/asset-store";
import axios from "axios";
import useOfferStore from "../store/offer-store";
import { MdLocalShipping } from "react-icons/md";

export default function ShippingList() {
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const [assets, setAssets] = useState([]);
  const setCurrentOffer = useOfferStore((state) => state.setCurrentOffer);
  const currentOffer = useOfferStore((state) => state.currentOffer);
  const setCurrentUserForRate = useAssetStore(
    (state) => state.setCurrentUserForRate
  );
  const setCurrentAssetForRate = useAssetStore(
    (state) => state.setCurrentAssetForRate
  );

  const hdlShowOffer = (el) => {
    setCurrentOffer(el.offerId);
    document.getElementById("offer_modal").showModal();
  };
  const getAssets = async () => {
    const resp = await axios.get(
      "http://localhost:8000/api/shipping/getShipping/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(resp.data);
    setAssets(resp.data.assets);
  };
  useEffect(() => {
    getAssets();
  }, []);
  const hdlShipped = async (e, el) => {
    e.stopPropagation();
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/shipping/assetShipped/" + el.assetId,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      getAssets();
    } catch (err) {
      console.log(err.message);
    }
  };
  const hdlReceived = async (e, el) => {
    e.stopPropagation();
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/shipping/assetReceived/" + el.assetId,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      getAssets();
    } catch (err) {
      console.log(err.message);
    }
  };
  const hdlRateUser = (e, el) => {
    e.stopPropagation();
    setCurrentUserForRate(el.asset.userId);
    setCurrentAssetForRate(el.asset.assetId);
    document.getElementById("rating_modal").showModal();
  };
  return (
    <div>
      {/* <button onClick={() => console.log(currentOffer)}>test</button> */}
      {assets.length == 0 && (
        <div className="mt-[100px] flex flex-col items-center">
          <MdLocalShipping className="text-my-acct text-[100px]" />
          <p className="text-2xl text-my-acct font-bold">
            You have no shipping yet.
          </p>
          <p className="text-2xl text-my-acct font-bold">
            Shipping asset will be shown after offer was matched.
          </p>
        </div>
      )}
      <div className="w-8/12 mx-auto p-2 mt-2 flex flex-col gap-8 bg-my-bg-card">
        {assets.map((el, idx) => {
          return (
            // asset list area
            <div
              key={idx}
              className="w-full h-auto shadow-md flex gap-4 p-2 hover:bg-my-hover cursor-pointer relative"
              onClick={() => hdlShowOffer(el)}
            >
              <div className="w-[100px] ">
                {/* asset pic */}
                <img
                  className="w-[100px] h-[100px] object-contain"
                  src={el.asset.assetThumbnail}
                  alt=""
                />
              </div>
              {/* asset info */}
              <div className="flex-1  flex flex-col justify-between overflow-hidden ">
                <div className="flex w-full gap-1">
                  <p className="w-[100px] font-bold">Asset Name :</p>
                  <p className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
                    {el.asset.assetName}
                  </p>
                </div>
                <div className="flex w-full gap-1">
                  <p className="w-[100px] font-bold">Category :</p>
                  <p className="flex-1">{el.asset.assetCategory}</p>
                </div>
                <div className="flex w-full gap-1">
                  <p className="w-[100px] font-bold">Brand :</p>
                  <p className="flex-1">{el.asset.assetBrand}</p>
                </div>
                <div className="flex w-full gap-1">
                  <p className="w-[100px] font-bold">Condition :</p>
                  <p className="flex-1">{el.asset.assetCondition}</p>
                </div>
              </div>
              {/* shipping address */}
              <div className="flex-1  flex flex-col">
                <p className="font-bold">Shipping to :</p>
                <div className=" p-1 h-[70px] overflow-hidden">
                  <p className="text-xs">{el.asset.assetShippingAddress}</p>
                </div>
              </div>
              {/* button asset */}
              <div className="w-[150px]  flex flex-col justify-evenly items-center gap-1">
                {el.asset.userId == user.userId ? (
                  el.asset.assetStatus == "SHIPPED" ||
                  el.asset.assetStatus == "RECEIVED" ? null : (
                    <button
                      className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover"
                      onClick={(e) => hdlShipped(e, el)}
                    >
                      Confirm Shipped
                    </button>
                  )
                ) : el.asset.assetStatus == "RECEIVED" ? null : (
                  <button
                    className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover"
                    onClick={(e) => hdlReceived(e, el)}
                  >
                    Confirm Received
                  </button>
                )}
                {!el.asset.assetUserIsRate &&
                  el.asset.userId !== user.userId && (
                    <button
                      className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover"
                      onClick={(e) => hdlRateUser(e, el)}
                    >
                      {`Rate User`}
                    </button>
                  )}
              </div>
              {/* badge status */}
              <div className="px-2 mp-1 bg-my-acct absolute font-bold text-my-text rounded-xl top-0 left-0 -translate-x-3 -translate-y-3">
                {el.asset.assetStatus == "MATCHED" && <p>Wait to ship</p>}
                {el.asset.assetStatus == "SHIPPED" && <p>Wait to receive</p>}
                {el.asset.assetStatus == "RECEIVED" && <p>Received</p>}
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal showOffer */}
      <dialog id="offer_modal" className="modal">
        <ShowOffer />
      </dialog>
      {/* Modal showRating */}
      <dialog id="rating_modal" className="modal">
        <ShowRate />
      </dialog>
    </div>
  );
}
