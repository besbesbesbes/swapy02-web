// import { data_dummy } from "../data/testData";
import React, { useState, useEffect } from "react";
import ShowAsset from "./ShowAsset";
import ShowOffer from "./ShowOffer";
import ShowRate from "./ShowRate";
import useUserStore from "../store/user-store";
import useAssetStore from "../store/asset-store";
import axios from "axios";
// const assets = data_dummy.assets;

export default function ShippingList() {
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const setCurrentAsset = useAssetStore((state) => state.setCurrentAsset);
  const [assets, setAssets] = useState([]);
  const hdlShowAssets = (el) => {
    setCurrentAsset(el.assetId);
    document.getElementById("asset_modal").showModal();
  };
  const getAssets = async () => {
    const resp = await axios.get(
      "http://localhost:8000/api/search?i=" + user.userId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAssets(resp.data.assets);
  };
  useEffect(() => {
    getAssets();
    console.log(assets);
  }, []);
  return (
    <div>
      <div className="w-8/12 mx-auto p-2 mt-2 flex flex-col gap-8 bg-my-bg-card">
        {assets.map((el, idx) => {
          return (
            // asset list area
            <div
              key={idx}
              className="w-full h-auto shadow-md flex gap-4 p-2 hover:bg-my-hover cursor-pointer relative"
              onClick={() => hdlShowAssets(el)}
            >
              <div className="w-[100px] ">
                {/* asset pic */}
                <img
                  className="w-[100px] h-[100px] object-contain"
                  src={el.assetThumbnail}
                  alt=""
                />
              </div>
              {/* asset info */}
              <div className="flex-1  flex flex-col justify-between overflow-hidden ">
                <div className="flex w-full gap-1">
                  <p className="w-[100px] font-bold">Asset Name :</p>
                  <p className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
                    {el.assetName}
                  </p>
                </div>
                <div className="flex w-full gap-1">
                  <p className="w-[100px] font-bold">Category :</p>
                  <p className="flex-1">{el.assetCategory}</p>
                </div>
                <div className="flex w-full gap-1">
                  <p className="w-[100px] font-bold">Brand :</p>
                  <p className="flex-1">{el.assetBrand}</p>
                </div>
                <div className="flex w-full gap-1">
                  <p className="w-[100px] font-bold">Condition :</p>
                  <p className="flex-1">{el.assetCondition}</p>
                </div>
              </div>
              {/* shipping address */}
              <div className="flex-1  flex flex-col">
                <p className="font-bold">Shipping to :</p>
                <div className=" p-1 h-[70px] overflow-hidden">
                  <p className="text-xs">{el.assetShippingAddress}</p>
                </div>
              </div>
              {/* button asset */}
              <div className="w-[150px]  flex flex-col justify-evenly items-center gap-1">
                <button
                  className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover"
                  onClick={() => {}}
                >
                  See Offer
                </button>
                <button className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover">
                  Confirm Receive
                </button>
                <button
                  className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover"
                  onClick={() => {}}
                >
                  Rate Swaper
                </button>
              </div>
              {/* badge status */}
              <div className="px-2 mp-1 bg-my-acct absolute font-bold text-my-text rounded-xl top-0 left-0 -translate-x-3 -translate-y-3">
                <p>Wait for Ship</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal showAsset */}
      <dialog id="asset_modal" className="modal">
        <ShowAsset />
      </dialog>
      {/* show offer */}
      {/* <ShowOffer
        ctrlShowOffer={ctrlShowOffer}
        setCtrlShowOffer={setCtrlShowOffer}
      /> */}
      {/* show rate */}
      {/* <ShowRate ctrlShowRate={ctrlShowRate} setCtrlShowRate={setCtrlShowRate} /> */}
    </div>
  );
}
