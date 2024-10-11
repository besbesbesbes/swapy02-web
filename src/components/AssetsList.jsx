import { IoIosAddCircle } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ShowAsset from "./ShowAsset";
import { useEffect, useState } from "react";
import useUserStore from "../store/user-store";
import useAssetStore from "../store/asset-store";
import axios from "axios";
import { FaBoxOpen } from "react-icons/fa";
import ShowCreateAsset from "./ShowCreateAsset";
import { MdLocalOffer } from "react-icons/md";
import ShowMessage from "./ShowMessage";
import useOtherStore from "../store/other-store";

const AssetsList = () => {
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const setCurrentAsset = useAssetStore((state) => state.setCurrentAsset);
  const [assets, setAssets] = useState([]);
  const setMessage = useOtherStore((state) => state.setMessage);
  const message = useOtherStore((state) => state.message);
  const hdlShowAssets = (el) => {
    setCurrentAsset(el.assetId);
    document.getElementById("asset_modal").showModal();
  };
  const getAssets = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:8000/api/search/all?i=" + user.userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      setAssets(resp.data.assets);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (assets) {
      getAssets();
    }
  }, []);
  const hdlCreateAsset = () => {
    document.getElementById("create_asset_modal").showModal();
  };
  const hdlReady = async (e, el) => {
    e.stopPropagation();
    console.log("http://localhost:8000/api/asset/assetReady/" + el.assetId);
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/asset/assetReady/" + el.assetId,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(resp.data.msg);
      document.getElementById("message_modal").showModal();
      setTimeout(() => {
        document.getElementById("message_modal").close();
        setMessage("resp.data.msg");
      }, 1000);
      console.log(resp.data);
      getAssets();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* create new asset button */}
      <div className="w-full flex justify-center">
        <button
          className="h-[40px] py-1 w-[200px] mx-auto shadow-md bg-my-acct font-bold text-my-text flex justify-center items-center gap-1 hover:bg-my-btn-hover"
          onClick={hdlCreateAsset}
        >
          <IoIosAddCircle className="text-xl" />
          Create New Asset
        </button>
      </div>
      {assets.length == 0 && (
        <div className="mt-[100px] flex flex-col items-center">
          <FaBoxOpen className="text-my-acct text-[100px]" />
          <p className="text-2xl text-my-acct font-bold">
            You have no asset yet.
          </p>
          <p className="text-2xl text-my-acct font-bold">
            Try to create by click button above.
          </p>
        </div>
      )}
      <div className="w-8/12 mx-auto p-2 mt-2 flex flex-col gap-8 bg-my-bg-card">
        {assets.map((el, idx) => (
          // asset list area
          <div
            key={idx}
            className="w-full h-auto shadow-md flex gap- p-2 hover:bg-my-hover cursor-pointer relative"
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
            {/* asset note */}
            <div className="flex-1  flex flex-col">
              <p className="font-bold">Note :</p>
              <div className=" p-1 h-[70px] overflow-hidden">
                <p className="text-xs">{el.assetNote}</p>
              </div>
            </div>
            {/* button asset */}
            <div className="w-[150px]  flex flex-col justify-evenly items-center">
              {el.assetStatus == "CREATED" && (
                <button
                  className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover"
                  onClick={(e) => hdlReady(e, el)}
                >
                  <MdLocalOffer />
                  Ready for Offer
                </button>
              )}
              <button className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover">
                <AiFillEdit />
                Edit
              </button>
              <button className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover">
                <RiDeleteBin5Fill />
                Delete
              </button>
            </div>
            {/* badge status */}
            <div className="px-2 mp-1 bg-my-acct absolute font-bold text-my-text rounded-xl top-0 left-0 -translate-x-3 -translate-y-3">
              <p>{el.assetStatus}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Modal Create Asset */}
      <dialog id="create_asset_modal" className="modal">
        <ShowCreateAsset />
      </dialog>
      {/* Modal showAsset */}
      <dialog id="asset_modal" className="modal">
        <ShowAsset />
      </dialog>
      {/* Modal message */}
      <dialog id="message_modal" className="modal">
        <ShowMessage />
      </dialog>
    </div>
  );
};

export default AssetsList;
