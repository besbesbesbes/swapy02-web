import React from "react";
import AssetsList from "../components/AssetsList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user-store";

const Assets = () => {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  useEffect(() => {
    token == "" ? navigate("/notfound") : null;
  }, []);
  return (
    <div className="w-full min-h-[600px] bg-my-bg-main pt-4">
      <AssetsList />
    </div>
  );
};

export default Assets;
