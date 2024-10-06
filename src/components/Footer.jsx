import React from "react";
import { RiSwap2Line } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="w-full bg-header-pattern bg-my-prim h-[50px] text-my-text text-xs flex justify-center pt-5 pb-2 flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="flex">
          <RiSwap2Line className="text-[25px] " />
          <p className="text-lg font-bold font-serif mr-2">Swapy Marketplace</p>
        </div>
        <p className="translate-y-[3px]">
          Copyright © 2024 | Swapy Project | Codecamp 18 #23
        </p>
      </div>
    </div>
  );
};

export default Footer;
