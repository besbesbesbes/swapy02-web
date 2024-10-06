import React from "react";
import OfferList from "../components/OfferList";
import OfferDetail from "../components/OfferDetail";
import OfferMessage from "../components/OfferMessage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user-store";

export default function Offer() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  useEffect(() => {
    Object.keys(token).length == 0 ? navigate("/notfound") : null;
  }, []);
  return (
    <div className="w-full min-h-[600px] bg-my-bg-main pt-10 flex px-5 items-start gap-5 justify-center">
      <OfferList />
      <div className="flex flex-col gap-5 w-9/12">
        <OfferDetail />
        <OfferMessage />
      </div>
    </div>
  );
}
