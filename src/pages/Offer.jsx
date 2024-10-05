import React from "react";
import OfferList from "../Components/OfferList";
import OfferDetail from "../Components/OfferDetail";
import OfferMessage from "../Components/OfferMessage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/user-store";

export default function Offer() {
  const navigate = useNavigate();
  const { user } = useAppStore((state) => ({
    user: state.user,
  }));
  useEffect(() => {
    Object.keys(user).length == 0 ? navigate("/notfound") : null;
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
