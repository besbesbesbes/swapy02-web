import { useEffect, useState } from "react";
import { TbFaceIdError } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useStore from "../store/user-store";

export default function NotFound() {
  const navigate = useNavigate();
  const [sec, setSec] = useState(5);

  useEffect(() => {
    if (sec === 0) {
      navigate(`/`); // Redirect when seconds hit 0
    } else {
      const timer = setTimeout(() => {
        setSec((prevSec) => prevSec - 1); // Decrement seconds
      }, 1000);

      return () => clearTimeout(timer); // Clear timeout on cleanup
    }
  }, [sec, navigate]);

  return (
    <>
      <div className="w-full min-h-[600px] bg-my-bg-main flex flex-col items-center pt-32 gap-4">
        <p className="text-my-acct font-bold text-4xl flex items-end gap-3">
          <TbFaceIdError className="text-[100px] font-bold translate-y-2" />
          Page Not Found!
        </p>
        <p>
          We will bring to you homepage in{" "}
          <span className="font-bold text-[16px]">{sec}</span> sec...
        </p>
      </div>
    </>
  );
}
