import ShippingList from "../components/ShippingList";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user-store";

export default function Shipping() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  useEffect(() => {
    token == "" ? navigate("/notfound") : null;
  }, []);
  return (
    <div className="w-full min-h-[600px] bg-my-bg-main pt-10">
      <ShippingList />
    </div>
  );
}
