import { IoIosClose } from "react-icons/io";
import { ImBoxAdd } from "react-icons/im";
import { IoIosAddCircle } from "react-icons/io";
import useUserStore from "../store/user-store";
import { useEffect, useState } from "react";
import axios from "axios";
import ShowMessage from "./ShowMessage";
import useOtherStore from "../store/other-store";
import { useNavigate } from "react-router-dom";
import { IoTrashBin } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import useAssetStore from "../store/asset-store";

export default function ShowEditAsset() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const message = useOtherStore((state) => state.message);
  const setMessage = useOtherStore((state) => state.setMessage);
  const files = useAssetStore((state) => state.files);
  const setFiles = useAssetStore((state) => state.setFiles);
  const currentAsset = useAssetStore((state) => state.currentAsset);
  const setCurrentAsset = useAssetStore((state) => state.setCurrentAsset);
  const [asset, setAsset] = useState({});
  const [input, setInput] = useState({
    assetName: "",
    assetBrand: "",
    assetCategory: "",
    assetCondition: "",
    assetNote: "",
  });
  const [picToDelete, setPicToDelete] = useState([]);
  const getUser = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(resp.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  const getAsset = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:8000/api/search/all?a=" + currentAsset
      );
      setAsset(resp.data.assets[0]);
      console.log(resp.data);
      setInput({
        assetName: resp.data?.assets[0]?.assetName || "",
        assetBrand: resp.data?.assets[0]?.assetBrand || "",
        assetCategory: resp.data?.assets[0]?.assetCategory || "",
        assetCondition: resp.data?.assets[0]?.assetCondition || "",
        assetNote: resp.data?.assets[0]?.assetNote || "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const hdlInputChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    // console.log(input);
  };
  const hdlFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const removeImage = (idx) => {
    setFiles(files.filter((v, i) => i !== idx));
  };
  const removeImageExisting = (assetPic) => {
    setAsset((prv) => ({
      ...prv,
      assetPics: prv.assetPics.filter(
        (el) => el.assetPicId !== assetPic.assetPicId
      ),
    }));
    setPicToDelete((prv) => [...prv, assetPic]);
  };
  const hdlEditAsset = async (e) => {
    try {
      setLoading(true);
      //validate
      if ((files.length == 0) & (asset.assetPics.length == 0)) {
        setMessage("At least 1 image require!");
        document.getElementById("message_modal").showModal();
        setTimeout(() => {
          document.getElementById("message_modal").close();
          setMessage("");
        }, 1000);
        setLoading(false);
        return;
      }
      if (files.length > 10) {
        setMessage("Maximum upload 10 images per time!");
        document.getElementById("message_modal").showModal();
        setTimeout(() => {
          document.getElementById("message_modal").close();
          setMessage("");
        }, 1000);
        setLoading(false);
        return;
      }
      const body = new FormData();
      body.append("assetId", currentAsset);
      body.append("assetName", input.assetName);
      body.append("assetBrand", input.assetBrand);
      body.append("assetCategory", input.assetCategory);
      body.append("assetCondition", input.assetCondition);
      body.append("assetNote", input.assetNote);
      body.append("assetPics", JSON.stringify(asset.assetPics));
      body.append("picToDelete", JSON.stringify(picToDelete));
      files.forEach((file) => {
        body.append("images", file);
      });
      //   for (let [key, value] of body.entries()) {
      //     console.log(key, value);
      //   }
      const resp = await axios.patch("http://localhost:8000/api/asset/", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);
      setMessage(resp.data.msg);
      document.getElementById("message_modal").showModal();
      setTimeout(() => {
        document.getElementById("message_modal").close();
        setMessage("");
        setInput({
          assetName: "",
          assetBrand: "",
          assetCategory: "",
          assetCondition: "",
          assetNote: "",
        });
        document.getElementById("edit_asset_modal").close();
        navigate(0);
      }, 1000);
    } catch (err) {
      console.log(err.message);
      setMessage(err?.response?.data?.msg || err.message);
      document.getElementById("message_modal").showModal();
      setTimeout(() => {
        document.getElementById("message_modal").close();
        setMessage("");
      }, 1000);
    } finally {
      setLoading(false);
      setFiles([]);
      setCurrentAsset(0);
      setPicToDelete([]);
    }
  };
  useEffect(() => {
    getUser();
    getAsset();
  }, [currentAsset]);
  return (
    <div className="w-8/12 min-h-[400px] bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col p-10">
      {/* Edit Asset */}
      <div className="flex">
        <button onClick={() => console.log(asset)}>Asset</button>
        <button onClick={() => console.log(files)}>files</button>
        <button onClick={() => console.log(picToDelete)}>picToDelete</button>
      </div>

      <div>
        <div className="w-full h-[500px] flex gap-2">
          {/* picture area */}
          <div className="flex flex-col w-1/2">
            {/* <button onClick={() => console.log(files)}>Test</button> */}
            <div className="w-full h-full border overflow-y-auto">
              {/* picture lists */}
              <input
                type="file"
                id="input-file"
                className="opacity-0 absolute"
                multiple
                accept="image/*"
                onChange={hdlFileChange}
              />
              {/* Asset pic list from server */}
              {asset?.assetPics?.length > 0 &&
                asset.assetPics.map((el, idx) => (
                  <div
                    key={idx}
                    className={`p-1 m-2 shadow-md flex gap-1 items-center relative ${
                      idx == 0 ? "border border-my-acct" : null
                    }`}
                  >
                    {idx == 0 && (
                      <p className="absolute top-1 left-1/2 -translate-x-1/2 text-my-acct font-bold">
                        Thumbnail
                      </p>
                    )}
                    <img
                      src={el.assetPic}
                      alt="no load"
                      className="w-[100px] h-[100px] object-cover"
                    />
                    <p className="flex-1 ml-2 overflow-hidden text-ellipsis">
                      On Swapy Marketplace server...
                    </p>
                    <IoTrashBin
                      className="p-2 text-[40px] text-my-acct cursor-pointer hover:text-my-btn-hover"
                      onClick={() => removeImageExisting(el)}
                    />
                  </div>
                ))}
              {/* New picture */}
              {Array.isArray(files) && files.length > 0
                ? files.map((el, idx) => (
                    <div
                      key={idx}
                      className={`p-1 m-2 shadow-md flex gap-1 items-center relative ${
                        asset?.assetPics?.length == 0 && idx == 0
                          ? "border border-my-acct"
                          : null
                      }`}
                    >
                      {asset?.assetPics?.length == 0 && idx == 0 && (
                        <p className="absolute top-1 left-1/2 -translate-x-1/2 text-my-acct font-bold">
                          Thumbnail
                        </p>
                      )}
                      <img
                        src={URL.createObjectURL(el)}
                        alt="no load"
                        className="w-[100px] h-[100px] object-cover"
                      />
                      <p className="flex-1 ml-2">{el.name}</p>
                      <IoTrashBin
                        className="p-2 text-[40px] text-my-acct cursor-pointer hover:text-my-btn-hover"
                        onClick={() => removeImage(idx)}
                      />
                    </div>
                  ))
                : null}
            </div>
            <button
              className="h-[40px] py-1 w-full mx-auto shadow-md bg-my-bg-card font-bold text-my-acct flex justify-center items-center gap-1 hover:bg-my-hover border border-my-acct mt-2"
              onClick={() => document.getElementById("input-file").click()}
            >
              <IoIosAddCircle className="text-xl" />
              Add pictures
            </button>
          </div>
          <div className="flex flex-col h-full w-1/2">
            {/* user */}
            <div className="w-full h-[100px]  flex justify-between">
              {/* profile pic */}
              <div className="w-4/12 rounded-full ">
                <img
                  className="w-[100px] h-[100px] object-cover"
                  src={userInfo?.userProfilePic}
                  alt="no load"
                />
              </div>
              {/* profile detail */}
              <div className=" flex-1 p-1 flex flex-col justify-around">
                <div className=" flex">
                  <p className="w-5/12 font-bold">Name :</p>
                  <p className="flex-1">{userInfo?.userDisplayName}</p>
                </div>
                <div className=" flex">
                  <p className="w-5/12 font-bold">Ship from :</p>
                  <p className="flex-1">{userInfo?.userLocation}</p>
                </div>
                <div className=" flex items-center flex-wrap">
                  <p className="w-5/12 font-bold">Rating :</p>
                  <div className="flex gap-1 items-baseline">
                    {/* user rating */}
                    <div className="flex gap-[2px]">
                      {Array(Math.round(userInfo?.userRating || 0))
                        .fill()
                        .map((el, idx) => (
                          <div
                            key={idx}
                            className="w-[10px] h-[10px] rounded-full bg-my-acct"
                          ></div>
                        ))}
                    </div>
                    <p className="text-xs">{`( ${
                      userInfo?.userRating != null &&
                      !isNaN(userInfo?.userRating)
                        ? Number(userInfo?.userRating).toFixed(2)
                        : "0.00"
                    } / ${userInfo?.userRatingCount || 0} )`}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* asset detail */}
            <div className=" w-full flex flex-col gap-2 mt-4">
              <div className="w-full flex">
                <p className="w-1/4 font-bold">Asset Name:</p>
                <input
                  type="text"
                  className="flex-1 border h-[35px] pl-2"
                  name="assetName"
                  value={input.assetName}
                  onChange={hdlInputChange}
                />
              </div>
              <div className="w-full flex">
                <p className="w-1/4 font-bold">Brand:</p>
                <input
                  type="text"
                  className="flex-1 border h-[35px] pl-2"
                  name="assetBrand"
                  value={input.assetBrand}
                  onChange={hdlInputChange}
                />
              </div>
              <div className="w-full flex">
                <p className="w-1/4 font-bold">Category:</p>
                <select
                  className="border p-2 h-[35px] w-full flex-1"
                  name="assetCategory"
                  value={input.assetCategory || ""}
                  onChange={hdlInputChange}
                >
                  <option value="" disabled>
                    ...choose category...
                  </option>
                  <option value="BEAUTY">BEAUTY</option>
                  <option value="FOOD">FOOD</option>
                  <option value="GROCERIES">GROCERIES</option>
                  <option value="FORNITURE">FORNITURE</option>
                  <option value="ELECTRONIC">ELECTRONIC</option>
                  <option value="CLOTHES">CLOTHES</option>
                  <option value="SMARTPHONE">SMARTPHONE</option>
                  <option value="VIHICLE">VIHICLE</option>
                  <option value="ACCESSORIES">ACCESSORIES</option>
                </select>
              </div>
              <div className="w-full flex">
                <p className="w-1/4 font-bold">Condition:</p>
                <select
                  className="border p-2 h-[35px] w-full flex-1"
                  name="assetCondition"
                  value={input.assetCondition || ""}
                  onChange={hdlInputChange}
                >
                  <option value="" disabled>
                    ...choose condition...
                  </option>
                  <option value="NEW">NEW</option>
                  <option value="MINT">MINT</option>
                  <option value="GOOD">GOOD</option>
                  <option value="ACCEPTABLE">ACCEPTABLE</option>
                  <option value="BROKEN">BROKEN</option>
                  <option value="PARTS">PARTS</option>
                </select>
              </div>
              <div className="w-full flex">
                <p className="w-1/4 font-bold">Note:</p>
                <textarea
                  className="w-full border flex-1  p-2"
                  rows="10"
                  name="assetNote"
                  value={input.assetNote}
                  onChange={hdlInputChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <button
          className="h-[40px] py-1 w-[200px] mx-auto shadow-md bg-my-acct font-bold text-my-text flex justify-center items-center gap-1 hover:bg-my-btn-hover mt-5"
          onClick={hdlEditAsset}
        >
          {loading && (
            <span className="loading loading-spinner text-my-text"></span>
          )}
          <ImBoxAdd />
          Update Asset
        </button>
      </div>
      {/* loading */}
      {loading && (
        <div>
          <div className="absolute w-full h-full inset-0 bg-black opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="loading loading-spinner text-my-acct w-[150px]"></span>
          </div>
        </div>
      )}
      {/* close button */}
      {!loading && (
        <button
          className="w-[50px] h-[50px] bg-my-acct text-my-text rounded-full text-4xl font-bold absolute flex justify-center items-center top-0 right-0 translate-x-4 -translate-y-4 shadow-md hover:bg-my-btn-hover"
          onClick={(e) => {
            setInput({
              assetName: "",
              assetBrand: "",
              assetCategory: "",
              assetCondition: "",
              assetNote: "",
            });
            setFiles([]);
            setCurrentAsset(0);
            setPicToDelete([]);
            e.target.closest("dialog").close();
          }}
        >
          <IoIosClose />
        </button>
      )}
      {/* Modal message */}
      <dialog id="message_modal" className="modal">
        <ShowMessage />
      </dialog>
    </div>
  );
}
