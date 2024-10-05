import { IoIosAddCircle } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
// import { data_dummy } from '../data/testData'
import ShowAsset from "./ShowAsset";
import { useEffect, useState } from "react";
import useAppStore from "../store/user-store";
import axios from "axios";
// const assets = data_dummy.assets

const AssetsList = () => {
  const [ctrlShowAsset, setCtrlShowAsset] = useState({
    visibility: "invisible",
    opacity: 0,
  });
  const [selectedAsset, setSelectedAsset] = useState({});
  const [assets, setAssets] = useState([]);
  const hdlShowAssets = (el) => {
    setSelectedAsset(el);
    setCtrlShowAsset({ visibility: "visible", opacity: 100 });
  };
  const { user, token } = useAppStore((state) => ({
    user: state.user,
    token: state.token,
  }));
  const getAssets = async () => {
    const resp = await axios.get("http://localhost:8000/asset/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAssets(resp.data.assets);
  };
  useEffect(() => {
    getAssets();
  }, [assets]);

  return (
    <div>
      {/* create new asset button */}
      <div className="w-full flex justify-center">
        <button className="h-[40px] py-1 w-[200px] mx-auto shadow-md bg-my-acct font-bold text-my-text flex justify-center items-center gap-1 hover:bg-my-btn-hover">
          <IoIosAddCircle className="text-xl" />
          Create New Asset
        </button>
      </div>
      <div className="w-8/12 mx-auto p-2 mt-2 flex flex-col gap-4 bg-my-bg-card">
        {assets.map((el, idx) => (
          // asset list area
          <div
            key={idx}
            className="w-full h-auto shadow-md flex gap-4 p-2 hover:bg-my-hover cursor-pointer"
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
              <div>
                <p className="font-bold">Ready</p>
              </div>
              <button className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover">
                <AiFillEdit />
                Edit
              </button>
              <button className="py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover">
                <RiDeleteBin5Fill />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* show asset */}
      <ShowAsset
        ctrlShowAsset={ctrlShowAsset}
        setCtrlShowAsset={setCtrlShowAsset}
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
      />
    </div>
  );
};

export default AssetsList;
