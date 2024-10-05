import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { RiSwap2Line } from "react-icons/ri";
import { FaSearch, FaUser, FaBoxOpen } from "react-icons/fa";
import { MdLocalShipping, MdLocalOffer } from "react-icons/md";
import {
  FaPhone,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import ShowLogin from "./ShowLogin";
import ShowContactUs from "./ShowContactUs";
import useUserStore from "../store/user-store";
import axios from "axios";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState("");
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const token = useUserStore((state) => state.token);
  const setToken = useUserStore((state) => state.setToken);

  // -----------------------------------------------------------------------
  // const [inputValue, setInputValue] = useState('');
  // const [suggestions, setSuggestions] = useState([]);
  // const [assets, setAssets] = useState([])
  // const getAssets = async () => {
  //     const resp = await axios.get("http://localhost:8000/search/all")
  //     setAssets(resp.data.assets)
  // }
  // useEffect(() => {
  //     getAssets()
  // }, [])
  // const handleChange = async (e) => {
  //     const value = e.target.value;
  //     const predefinedSuggestions = assets.map(el => el.assetName)
  //     setInputValue(value);
  //     if (value) {
  //         const filteredSuggestions = predefinedSuggestions.filter(item =>
  //             item.toLowerCase().includes(value.toLowerCase())
  //         );
  //         setSuggestions(filteredSuggestions);
  //     } else {
  //         setSuggestions([]);
  //     }
  // };

  // const handleSuggestionClick = (suggestion) => {
  //     setInputValue(suggestion);
  //     setSuggestions([]);
  // };

  // -----------------------------------------------------------------------
  const hdlLogout = () => {
    setToken("");
    setUser({});
    navigate("/");
  };
  const hdlChangeInput = (e) => {
    setInput(e.target.value);
    console.log(input);
  };
  const hdlSubmitSearch = (e) => {
    e.preventDefault();
    navigate("/search?v=" + input);
    setInput("");
  };
  return (
    <div className="w-full text-my-text font-extralight">
      <div className=" h-[100px] pt-2 px-3 flex flex-col justify-between bg-my-prim bg-header-pattern">
        <div className="flex justify-between">
          {/* swapy logo */}
          <Link to="/">
            <div className="flex items-end gap-2 mt-3 cursor-pointer">
              <div className="flex justify-center items-center -translate-y-1">
                <p
                  className=" w-[35px] h-[35px] text-center text-xl font-bold p-1 text-my-text bg-my-acct flex justify-center items-center border-2"
                  to="/"
                >
                  <RiSwap2Line className="text-white text-[200px]" />
                </p>
              </div>
              <p className="text-lg font-bold font-serif mr-2">Swapy</p>
              <p className="text-xs mb-1">
                {" "}
                | Swap, Save, Share - The P2P Marketplace for Everyone...
              </p>
            </div>
          </Link>
          {/* menu login contact */}
          <div className="flex justify-end gap-1 text-my-text">
            {/* <button onClick={() => console.log(user)}>Test</button> */}
            <button
              className="px-2 flex gap-1"
              onClick={() =>
                document.getElementById("conatactUs_modal").showModal()
              }
            >
              <FaPhone />
              Contact us
            </button>
            {Object.keys(token).length > 0 ? (
              <div className="flex">
                <button className="px-2 flex gap-1" onClick={() => hdlLogout()}>
                  <FaArrowAltCircleLeft className="translate-y-[2px]" />
                  Logout
                </button>
                <p>
                  Welcome, <span className="font-bold">{user.userName}</span>
                </p>
                <img
                  className="w-[40px] h-[40px] object-cover rounded-full shadow-md  ml-2"
                  src={user.userProfilePic}
                  alt="noload"
                />
              </div>
            ) : (
              <button
                className="px-2 flex gap-1"
                onClick={() =>
                  document.getElementById("login_modal").showModal()
                }
              >
                <FaArrowAltCircleRight className="translate-y-[2px]" />
                Login
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between items-end gap-20">
          {/* search input */}
          <form
            className="flex border border-my-text p-1 flex-1 bg-my-text h-[38px]  max-w-[600px] mb-2 gap-1 relative"
            onSubmit={hdlSubmitSearch}
          >
            <input
              type="text"
              className="flex-1 text-my-prim px-2 bg-my-text"
              value={input}
              onChange={hdlChangeInput}
            />
            {/* value={inputValue}
                            onChange={handleChange} /> */}
            {/* -------------------------------------------------------------------------- */}
            {/* {suggestions.length > 0 && (
                            <ul className="absolute bg-white border mt-[1px] w-full left-0 max-h-60 overflow-auto z-10 text-my-prim translate-y-8">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )} */}

            {/* -------------------------------------------------------------------------- */}
            <button className="btn h-[30px] min-h-[30px] text-my-text border-none rounded-none py-1 px-2 bg-my-acct flex justify-center items-center gap-1 hover:bg-my-btn-hover">
              {" "}
              <FaSearch />
              Search
            </button>
          </form>
          {/* main menu */}
          {Object.keys(token).length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <button
                className={`py-1 px-2 ${
                  location.pathname == "/offer" ? "bg-my-acct" : ""
                }`}
              >
                <Link to="/offer" className="flex gap-1 items-baseline">
                  <MdLocalOffer />
                  Offer
                </Link>
              </button>
              <button
                className={`py-1 px-2 ${
                  location.pathname == "/shipping" ? "bg-my-acct" : ""
                }`}
              >
                <Link to="/shipping" className="flex gap-1 items-baseline">
                  <MdLocalShipping />
                  Shipping
                </Link>
              </button>
              <button
                className={`py-1 px-2 ${
                  location.pathname == "/assets" ? "bg-my-acct" : ""
                }`}
              >
                <Link to="/assets" className="flex gap-1 items-baseline">
                  <FaBoxOpen />
                  Assets
                </Link>
              </button>
              <button
                className={`py-1 px-2 ${
                  location.pathname == "/userinfo" ? "bg-my-acct" : ""
                }`}
              >
                <Link to="/userinfo" className="flex gap-1 items-baseline">
                  <FaUser />
                  User Info
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* underline menu */}
      <div className="h-[3px] bg-my-acct"></div>
      {/* Modal showLogin */}
      <dialog id="login_modal" className="modal">
        <ShowLogin />
      </dialog>
      {/* Modal contactUs */}
      <dialog id="conatactUs_modal" className="modal">
        <ShowContactUs />
      </dialog>
    </div>
  );
};
export default Header;
