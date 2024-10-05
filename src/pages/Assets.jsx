import React from "react";
import AssetsList from "../components/AssetsList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/user-store";

const Assets = () => {
  const navigate = useNavigate();
  const { user } = useAppStore((state) => ({
    user: state.user,
  }));
  useEffect(() => {
    Object.keys(user).length == 0 ? navigate("/notfound") : null;
  }, []);
  return (
    <div className="w-full min-h-[600px] bg-my-bg-main pt-4">
      <AssetsList />
    </div>
  );
};

export default Assets;
