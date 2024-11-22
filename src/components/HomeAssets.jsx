import React, { useEffect, useState } from "react";
import ShowAsset from "./ShowAsset";
import axios from "axios";
import useAssetStore from "../store/asset-store";
import { FaAngleDoubleDown } from "react-icons/fa";
import { getAllAssetsApi, getAllAssetsLoadMoreApi } from "../apis/search-api";
import "animate.css";
const HomeAssets = () => {
  const setCurrentAsset = useAssetStore((state) => state.setCurrentAsset);
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const hdlShowAssets = (el) => {
    setCurrentAsset(el.assetId);
    document.getElementById("asset_modal").showModal();
  };
  const getAllAssets = async () => {
    try {
      const result = await getAllAssetsApi(page);
      setAssets(result.data.assets);
      setTotalPage(Math.ceil(result.data.totalAssetsCount / 24));
    } catch (err) {
      console.log(err.message);
    }
  };
  const hdlLoadMore = async () => {
    try {
      setPage(page + 1);
      const result = await getAllAssetsLoadMoreApi(page);
      setAssets((prv) => [...prv, ...result.data.assets]);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    setPage(1);
    setTotalPage(1);
    setAssets([]);
    getAllAssets();
  }, []);
  const dayFromCreate = (createdAt) => {
    const creationDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = currentDate - creationDate;
    const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDay;
  };

  return (
    <div>
      {/* <button onClick={()=>{console.log(assets)}}>Test</button> */}
      <div className="w-full bg-my-bg-main flex flex-col justify-center items-center">
        {/* asset list area */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-4 gap-4">
          {/* <div className="flex justify-evenly items-center p-4 flex-wrap gap-4"> */}
          {/* create your asset */}
          {/* <div className="w-[170px] h-[220px] shadow-md flex flex-col items-center gap-2 overflow-hidden hover:bg-my-hover  cursor-pointer">
            <div className="w-full h-full p-4 bg-my-hover">
              <div className=" w-full h-full border inset-0 bg-my-bg-card flex justify-center items-center flex-col gap-2">
                <p className="w-[50px] h-[50px] flex justify-center items-center text-3xl bg-my-acct p-3 rounded-full font-bold text-my-text">
                  +
                </p>
                <p className="font-bold text-xs">Create Your Asset</p>
              </div>
            </div>
          </div> */}
          {assets.map((el, idx) => {
            return (
              <div
                key={idx}
                className="bg-my-bg-card w-[170px] h-[230px] shadow-md flex flex-col items-center gap-2 overflow-hidden p-2 hover:bg-my-hover  cursor-pointer relative animate__animated animate__zoomIn"
                onClick={(e) => {
                  hdlShowAssets(el);
                }}
              >
                {/* asset pic */}
                <div className="h-[150px]">
                  <img
                    className="h-[150px] object-contain"
                    src={el.assetThumbnail}
                    alt="no load"
                  />
                </div>
                {/* asset name */}
                <div className="w-full h-[20px]">
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis font-bold">
                    {el.assetName}
                  </p>
                </div>
                {/* offer */}
                <div className="w-full flex justify-between text-xs items-baseline">
                  <p>{el.user.userLocation}</p>
                  {el.assetOfferorCount + el.assetSwaperCount > 0 ? (
                    <div className=" h-[20px] flex justify-center items-center gap-1 px-2 rounded-full bg-my-acct text-white">
                      <p className="text-xs">Offer:</p>
                      <p className="font-bold">
                        {el.assetOfferorCount + el.assetSwaperCount}
                      </p>
                    </div>
                  ) : null}
                </div>
                {/* new badge */}
                {dayFromCreate(el.createdAt) <= 10 && (
                  <div className="w-[100px] h-[40px] text-center pt-4 absolute left-0 top-0 bg-my-prim text-my-text -rotate-45 -translate-x-10 -translate-y-2">
                    <p className="text-xs font-bold translate-y-1">NEW</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {page < totalPage && (
          <button
            className="h-[40px] py-1 w-[200px] mx-auto shadow-md bg-my-acct font-bold text-my-text flex justify-center items-center gap-1 hover:bg-my-btn-hover my-5"
            onClick={hdlLoadMore}
          >
            <FaAngleDoubleDown />
            Load more
          </button>
        )}
      </div>
      {/* Modal showAsset */}
      <dialog id="asset_modal" className="modal">
        <ShowAsset />
      </dialog>
    </div>
  );
};

export default HomeAssets;
