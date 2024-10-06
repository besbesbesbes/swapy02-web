import { IoIosClose, IoMdAdd } from "react-icons/io";
import useOfferStore from "../store/offer-store";
import useAssetStore from "../store/asset-store";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/user-store";
import ShowAsset from "./ShowAsset";

export default function ShowAddAssetOffer() {
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const setCurrentAsset = useAssetStore((state) => state.setCurrentAsset);
  const addAssetUserId = useOfferStore((state) => state.addAssetUserId);
  const setAddAssetUserId = useOfferStore((state) => state.setAddAssetUserId);
  const currentOffer = useOfferStore((state) => state.currentOffer);
  const setCurrentOffer = useOfferStore((state) => state.setCurrentOffer);
  const [assets, setAssets] = useState([]);
  const hdlShowAssets = (el) => {
    setCurrentAsset(el.assetId);
    document.getElementById("asset_modal").showModal();
  };
  const hdlClosePopup = (e) => {
    setAssets([]);
    setAddAssetUserId(0);
    e.target.closest("dialog").close();
  };
  const getOfferAssetForAdd = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:8000/api/offer/asset/" +
          currentOffer +
          "/" +
          addAssetUserId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data.assets);
      setAssets(resp.data.assets);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (addAssetUserId) {
      getOfferAssetForAdd();
    }
  }, [addAssetUserId]);
  const hdlAddOfferAsset = async (e, el) => {
    e.stopPropagation();
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/offer/asset/add/" +
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
        messageTxt: `Add [${resp.data.newOfferAsset.asset.assetName}] on ${
          resp.data.newOfferAsset.asset.userId ==
          resp.data.newOfferAsset.offer.offerorId
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
      //close
      setAssets([]);
      setAddAssetUserId(0);
      e.target.closest("dialog").close();
      //refeash
      setCurrentOffer(null);
      setTimeout(() => setCurrentOffer(currentOffer), 0);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-4/12 min-h-[500px] bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-2/3 -translate-x-1/2 flex flex-col p-10">
      <div className="w-full  h-[450px] overflow-auto flex flex-col gap-4">
        {assets[0] &&
          assets.map((el, idx) => (
            <div
              key={idx}
              className="w-full max-h-[80px] flex shadow-md cursor-pointer hover:bg-my-hover"
              onClick={() => hdlShowAssets(el)}
            >
              {/* asset pic */}
              <div className="min-w-[100px]">
                <img
                  src={el?.assetThumbnail}
                  alt="no load"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* asset detail */}
              <div className="w-full h-full flex flex-col justify-between py-2">
                <p>{el?.assetName}</p>
                <p>{el?.assetCategory}</p>
                <p>{el?.assetCondition}</p>
              </div>
              <button
                className="bg-my-acct mr-4 p-2 rounded-full my-auto flex justify-center items-center hover:bg-my-btn-hover"
                onClick={(e) => hdlAddOfferAsset(e, el)}
              >
                <IoMdAdd className="text-my-text text-lg" />
              </button>
            </div>
          ))}
        {/* Modal showAsset */}
        <dialog id="asset_modal" className="modal">
          <ShowAsset />
        </dialog>
        {/* close button */}
        <button
          className="w-[50px] h-[50px] bg-my-acct text-my-text rounded-full text-4xl font-bold absolute flex justify-center items-center top-0 right-0 translate-x-4 -translate-y-4 shadow-md hover:bg-my-btn-hover"
          onClick={hdlClosePopup}
        >
          <IoIosClose />
        </button>
      </div>
    </div>
  );
}
