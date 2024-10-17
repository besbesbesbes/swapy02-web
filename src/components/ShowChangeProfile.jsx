import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";
import useUserStore from "../store/user-store";
import useOtherStore from "../store/other-store";
import axios from "axios";
import ShowMessage from "./ShowMessage";
import { useNavigate } from "react-router-dom";

export default function ShowChangeProfile() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const token = useUserStore((state) => state.token);
  const setMessage = useOtherStore((state) => state.setMessage);
  const message = useOtherStore((state) => state.message);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const hdlFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const hdlClosePopup = (e) => {
    setFile(null);
    e.target.closest("dialog").close();
  };
  const hdlChangeProfilePic = async (e) => {
    try {
      setLoading(true);
      const body = new FormData();
      if (file) {
        body.append("image", file);
      } else {
        setMessage("Please select picture...");
        document.getElementById("message_modal").showModal();
        setTimeout(() => {
          setMessage("");
          document.getElementById("message_modal").close();
        }, 1000);
        return;
      }
      const resp = await axios.post(
        "http://localhost:8000/api/user/change-profilepic",
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(resp.data.msg);
      document.getElementById("message_modal").showModal();
      setTimeout(() => {
        document.getElementById("message_modal").close();
        setMessage("");
        navigate(0);
      }, 1000);
      setUser(resp.data.returnUser);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-4/12 min-h-[100px] bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col p-10 items-center">
      <input
        type="file"
        className="opacity-0 absolute"
        id="input-file"
        onChange={hdlFileChange}
      />
      <div
        className="border w-[300px] h-[300px] flex justify-center items-center cursor-pointer"
        onClick={() => document.getElementById("input-file").click()}
      >
        {file && (
          <div className="relative w-[300px] h-[300px]">
            <img
              src={URL.createObjectURL(file)}
              alt="No File"
              className="h-full w-full relative opacity-20 object-cover"
            />
            <img
              src={URL.createObjectURL(file)}
              alt="No File"
              className="h-full w-full absolute top-0 rounded-full border-my-text border-[4px] object-cover"
            />
          </div>
        )}
        {!file && (
          <div className="flex flex-col items-center gap-2">
            <RiImageAddFill className="text-[50px]" />
            <p>- Click to add a picture -</p>
          </div>
        )}
      </div>
      <button
        className=" mt-4 h-[40px] w-[200px] bg-my-acct text-my-text self-center font-bold hover:bg-my-btn-hover flex gap-2 justify-center items-center"
        onClick={hdlChangeProfilePic}
      >
        {loading && (
          <span className="loading loading-spinner text-my-text"></span>
        )}
        Change Picture
      </button>

      {/* close button */}
      <button
        className="w-[50px] h-[50px] bg-my-acct text-my-text rounded-full text-4xl font-bold absolute flex justify-center items-center top-0 right-0 translate-x-4 -translate-y-4 shadow-md hover:bg-my-btn-hover"
        onClick={hdlClosePopup}
      >
        <IoIosClose />
      </button>
      {/* Modal message */}
      <dialog id="message_modal" className="modal">
        <ShowMessage />
      </dialog>
    </div>
  );
}
