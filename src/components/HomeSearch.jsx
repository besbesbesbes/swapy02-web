import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ShowAsset from "./ShowAsset";
import axios from "axios";
import { IoHomeSharp } from "react-icons/io5";
import useAssetStore from "../store/asset-store";
import { FaAngleDoubleDown, FaSearchMinus } from "react-icons/fa";
import "animate.css";
import {
  getAllAssetsCatApi,
  // getAllAssetsCatMoreApi,
  getAllAssetsValApi,
  // getAllAssetsValMoreApi,
} from "../apis/search-api";

export default function HomeSearch() {
  const setCurrentAsset = useAssetStore((state) => state.setCurrentAsset);
  const [assets, setAssets] = useState([]);
  const hdlShowAssets = (el) => {
    setCurrentAsset(el.assetId);
    document.getElementById("asset_modal").showModal();
  };
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const getAllAssets = async () => {
    let result;
    // console.log(page);
    searchParams.get("c")
      ? (result = await getAllAssetsCatApi(page, searchParams.get("c")))
      : null;
    searchParams.get("v")
      ? (result = await getAllAssetsValApi(page, searchParams.get("v")))
      : null;
    setAssets(result.data.assets);
    setTotalPage(Math.ceil(result.data.totalAssetsCount / 24));
  };
  useEffect(() => {
    setPage(1);
    setTotalPage(1);
    setAssets([]);
    getAllAssets();
  }, [searchParams]);
  useEffect(() => {
    getAllAssets();
  }, [page]);
  const dayFromCreate = (createdAt) => {
    const creationDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = currentDate - creationDate;
    const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDay;
  };
  const hdlLoadMore = async () => {
    try {
      let result;
      if (searchParams.get("c")) {
        result = await getAllAssetsCatApi(page + 1, searchParams.get("c"));
        setAssets((prv) => [...prv, ...result.data.assets]);
      }
      if (searchParams.get("v")) {
        result = await getAllAssetsValApi(page + 1, searchParams.get("v"));
        setAssets((prv) => [...prv, ...result.data.assets]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      {/* header */}
      {/* <button onClick={() => console.log(assets)}>Test</button> */}
      <div className="flex text-xl w-full bg-my-bg-card px-5 py-1 ">
        {/* <button onClick={() => console.log(page)}>Test</button> */}
        <Link to="/">
          <div className="flex items-center gap-1">
            <IoHomeSharp className="-translate-y-[1px]" />
            <p className="font-bold">Home</p>
          </div>
        </Link>

        <span className="px-4">|</span>
        {searchParams.get("c") && (
          <p>
            {searchParams.get("c").charAt(0).toUpperCase() +
              searchParams.get("c").slice(1)}
          </p>
        )}
        {searchParams.get("v") && <p>search:{searchParams.get("v")}</p>}
      </div>
      <div className="bg-my-bg-card pb-5">
        {/* <div className="w-full min-h-[500px] bg-my-bg-main flex justify-evenly items-start p-4 flex-wrap gap-4"> */}
        {assets.length == 0 && (
          <div className="pt-[100px] flex flex-col items-center gap-2">
            <FaSearchMinus className="text-my-acct text-[100px]" />
            <p className="text-2xl text-my-acct font-bold">
              No assets were found
            </p>
            <p className="text-2xl text-my-acct font-bold">
              based on your search criteria.
            </p>
          </div>
        )}
        <div className="w-full min-h-[500px] bg-my-bg-main grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
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
            className="h-[40px] py-1 w-[200px] mx-auto shadow-md bg-my-acct font-bold text-my-text flex justify-center items-center gap-1 hover:bg-my-btn-hover mt-5"
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
}
