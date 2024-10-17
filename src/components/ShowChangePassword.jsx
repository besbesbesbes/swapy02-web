import axios from "axios";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import useUserStore from "../store/user-store";
import ShowMessage from "./ShowMessage";
import userOtherStore from "../store/other-store";
export default function ShowChangePassword() {
  const token = useUserStore((state) => state.token);
  const message = userOtherStore((state) => state.message);
  const setMessage = userOtherStore((state) => state.setMessage);
  const [input, setInput] = useState({
    curPwd: "",
    newPwd: "",
    cnewPwd: "",
  });
  const hdlClosePopup = (e) => {
    setInput({
      curPwd: "",
      newPwd: "",
      cnewPwd: "",
    });
    e.target.closest("dialog").close();
  };
  const hdlChangeInput = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  const hdlChangePassword = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/user/change-password",
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data.msg);
      setMessage(resp.data.msg);
      document.getElementById("message_modal").showModal();
      setTimeout(() => {
        document.getElementById("message_modal").close();
      }, 1000);
    } catch (err) {
      console.log(err.response.data.msg);
      setMessage(err.response.data.msg);
      document.getElementById("message_modal").showModal();
      setTimeout(() => {
        document.getElementById("message_modal").close();
      }, 1000);
    } finally {
      setInput({
        curPwd: "",
        newPwd: "",
        cnewPwd: "",
      });
      e.target.closest("dialog").close();
    }
  };
  return (
    <div className="w-4/12 min-h-[100px] bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col p-10">
      <form className="flex flex-col gap-2" onSubmit={hdlChangePassword}>
        <p className="font-bold">Current Password :</p>
        <input
          type="password"
          className="border h-[37px] w-full px-2"
          name="curPwd"
          value={input.curPwd}
          onChange={hdlChangeInput}
        />
        <p className="font-bold">New Password :</p>
        <input
          type="password"
          className="border  h-[37px] w-full px-2"
          name="newPwd"
          value={input.newPwd}
          onChange={hdlChangeInput}
        />
        <p className="font-bold">Confirm New Password :</p>
        <input
          type="password"
          className="border  h-[37px] w-full px-2"
          name="cnewPwd"
          value={input.cnewPwd}
          onChange={hdlChangeInput}
        />
        <button className=" mt-4 h-[40px] w-[200px] bg-my-acct text-my-text self-center font-bold hover:bg-my-btn-hover">
          Change Password
        </button>
      </form>

      {/* close button */}
      <button
        className="w-[50px] h-[50px] bg-my-acct text-my-text rounded-full text-4xl font-bold absolute flex justify-center items-center top-0 right-0 translate-x-4 -translate-y-4 shadow-md hover:bg-my-btn-hover"
        onClick={hdlClosePopup}
      >
        <IoIosClose />
      </button>
      {/* Modal Message */}
      <dialog id="message_modal" className="modal">
        <ShowMessage />
      </dialog>
    </div>
  );
}
