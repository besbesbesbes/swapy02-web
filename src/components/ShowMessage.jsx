import React, { useEffect } from "react";

export default function ShowMessage({ msg }) {
  return (
    <div
      className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-my-bg-card px-20 py-20 transition-all duration-500 border-my-prim shadow-lg flex flex-col justify-center items-center gap-5`}
    >
      <p className="font-bold text-my-acct text-2xl">{msg}</p>
    </div>
  );
}
