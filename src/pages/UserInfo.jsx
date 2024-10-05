import UserInfoProfile from "../components/UserInfoProfile";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user-store";

const UserInfo = () => {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  useEffect(() => {
    Object.keys(token).length == 0 ? navigate("/notfound") : null;
  }, []);

  return (
    <div className="w-full min-h-[600px] bg-my-bg-main pt-10">
      <UserInfoProfile />
    </div>
  );
};

export default UserInfo;
