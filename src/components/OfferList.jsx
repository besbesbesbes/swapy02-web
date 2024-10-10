import axios from "axios";
import React, { useEffect, useState } from "react";
import useUserStore from "../store/user-store";
import useOfferStore from "../store/offer-store";

export default function OfferList() {
  const token = useUserStore((state) => state.token);
  const currentOffer = useOfferStore((state) => state.currentOffer);
  const setCurrentOffer = useOfferStore((state) => state.setCurrentOffer);
  const setNoOffer = useOfferStore((state) => state.setNoOffer);
  const noOffer = useOfferStore((state) => state.noOffer);
  const [offers, setOffers] = useState([]);
  const getOffers = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/api/offer/getList", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOffers(resp.data.offers);
      if (!resp.data.offers[0]) {
        setNoOffer(true);
        return;
      }
      setNoOffer(false);
      setCurrentOffer(resp.data.offers[0].offerId);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOffers();
  }, []);
  return (
    <>
      {!noOffer && (
        <div className="bg-my-bg-card w-3/12 shadow-md h-auto p-2 gap-4 flex flex-col items-start">
          {/* <button onClick={() => console.log(currentOffer)}>Test</button> */}
          <p className="p-1 font-bold bg-my-prim text-my-text w-full text-center">
            Your offer list
          </p>
          {/* offer list */}
          {offers.map((el, idx) => (
            <button
              key={idx}
              className={`p-1  w-full text-left ${
                currentOffer == el.offerId
                  ? "bg-my-bg-card font-bold text-my-prim hover:bg-my-hover border border-my-acct"
                  : "hover:bg-my-hover"
              }`}
              onClick={() => setCurrentOffer(el.offerId)}
            >
              <div className="flex justify-between">
                <p className="">{el.offerName}</p>
                <p
                  className={`${
                    el.offerStatus == "CREATED"
                      ? "text-my-acct"
                      : "text-my-prim"
                  }`}
                >
                  {el.offerStatus}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
