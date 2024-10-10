import { BiSolidMessageAdd } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import ShowOffer from "./ShowOffer";
import useOfferStore from "../store/offer-store";
import axios from "axios";
import useUserStore from "../store/user-store";
import { useNavigate } from "react-router-dom";

export default function OfferMessage() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const currentOffer = useOfferStore((state) => state.currentOffer);
  const setCurrentOffer = useOfferStore((state) => state.setCurrentOffer);
  const [offer, setOffer] = useState({});
  const [input, setInput] = useState("");
  const noOffer = useOfferStore((state) => state.noOffer);
  //   --------------------------------------------------Auto scroll
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "auto" });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto", // This will animate the scroll
    });
  };
  useEffect(() => {
    scrollToBottom();
    setTimeout(() => scrollToTop(), 0);
  }, [offer]);
  //   --------------------------------------------------Auto scroll End
  const getOfferMessage = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:8000/api/offer/getmsg/" + currentOffer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOffer(resp.data.returnOffer);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (currentOffer) {
      getOfferMessage();
    }
  }, [currentOffer]);
  const formatDateToThailandTimezone = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Bangkok", // Thailand timezone
    };
    return date.toLocaleString("en-GB", options);
  };
  const hdlSubmitMsg = async (e) => {
    e.preventDefault();
    try {
      const body = {
        messageTxt: input,
        messageIsAuto: false,
        userId: user.userId,
        offerId: currentOffer,
      };
      const resp = await axios.post("http://localhost:8000/api/msg", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data.msg);
      setInput("");
      getOfferMessage();
    } catch (err) {
      console.log(err);
    }
  };
  const hdlRejectOffer = async (e) => {
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/offer/rejectOffer/" + currentOffer,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      // addMessage
      const body = {
        messageTxt: `${
          user.userId == resp.data.returnOffer.offerorId ? "Offeror" : "Swaper"
        } has rejected this offer.`,
        messageIsAuto: "true",
        userId: user.userId,
        offerId: resp.data.returnOffer.offerId,
      };
      await axios.post("http://localhost:8000/api/msg", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //navigate
      navigate(0);
      console.log(resp.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const hdlShowOffer = () => {
    document.getElementById("offer_modal").showModal();
  };
  const hdlPendingOffer = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/offer/pendingOffer/" + currentOffer,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      // addMessage
      const body = {
        messageTxt: `${
          resp.data.offer.offerorId == user.userId ? "Offeror" : "Swaper"
        } has a pendding offer.`,
        messageIsAuto: "true",
        userId: user.userId,
        offerId: currentOffer,
      };
      await axios.post("http://localhost:8000/api/msg", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //refeash
      setCurrentOffer(null);
      setTimeout(() => setCurrentOffer(currentOffer), 0);
    } catch (err) {
      console.log(err.message);
    }
    console.log("Pending");
  };

  return (
    <>
      {!noOffer && (
        <div className="flex flex-col gap-5">
          <div className="bg-my-bg-card w-full shadow-md p-2 flex flex-col">
            {/* message area */}
            <div className=" w-full h-[350px] text-my-prim bg-my-hover overflow-auto px-5 py-2">
              {offer.messages &&
                offer?.messages.map((el, idx) => {
                  if (offer.swaperId == el.userId) {
                    return (
                      <div
                        key={idx}
                        className="w-full flex items-end gap-1 self-start my-2"
                      >
                        <p className="bg-my-bg-card border border-my-prim py-1 px-2 rounded-xl w-fit shadow-md">
                          {el.messageTxt}
                          {el.messageIsAuto && (
                            <span className="font-bold italic">[Auto]</span>
                          )}
                        </p>
                        <p className="text-my-prim text-xs">
                          {formatDateToThailandTimezone(el.createdAt)}
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={idx}
                        className="w-full flex items-end gap-1 self-end my-2"
                      >
                        <p className="text-my-prim text-xs ml-auto">
                          {formatDateToThailandTimezone(el.createdAt)}
                        </p>
                        <p className="bg-my-bg-card border border-my-acct py-1 px-2 rounded-xl w-fit shadow-md">
                          {el.messageTxt}
                          {el.messageIsAuto && (
                            <span className="font-bold italic">[Auto]</span>
                          )}
                        </p>
                      </div>
                    );
                  }
                })}
              {/* useRef */}
              <div ref={messageEndRef} />
            </div>
            {/* input */}
            <form
              className="flex w-full min-h-[38px] border p-1 gap-2"
              onSubmit={hdlSubmitMsg}
            >
              <input
                type="text"
                className="w-full px-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="px-2 py-1 bg-my-acct text-my-text font-bold flex gap-1 hover:bg-my-btn-hover">
                <BiSolidMessageAdd className="text-xl" />
                Send
              </button>
            </form>
          </div>
          {/* button */}
          {offer.offerStatus == "CREATED" && (
            <div className="w-full h-[40px mb-10 flex justify-center text-my-text font-bold gap-5">
              {user.userId == offer.offerorId && !offer.offerorStatus && (
                <button
                  className="bg-my-acct hover:bg-my-btn-hover px-3 py-1 w-[150px]"
                  onClick={hdlShowOffer}
                >
                  Accept Offer
                </button>
              )}
              {user.userId == offer.swaperId && !offer.swaperStatus && (
                <button
                  className="bg-my-acct hover:bg-my-btn-hover px-3 py-1 w-[150px]"
                  onClick={hdlShowOffer}
                >
                  Accept Offer
                </button>
              )}
              {user.userId == offer.offerorId && offer.offerorStatus && (
                <button
                  className="bg-my-acct hover:bg-my-btn-hover px-3 py-1 w-[150px]"
                  onClick={hdlPendingOffer}
                >
                  Pending Offer
                </button>
              )}
              {user.userId == offer.swaperId && offer.swaperStatus && (
                <button
                  className="bg-my-acct hover:bg-my-btn-hover px-3 py-1 w-[150px]"
                  onClick={hdlPendingOffer}
                >
                  Pending Offer
                </button>
              )}
              <button
                className="bg-my-prim hover:bg-my-prim-hover px-3 py-1 w-[150px]"
                onClick={hdlRejectOffer}
              >
                Reject Offer
              </button>
              <button
                className="bg-my-card hover:bg-my-hover text-my-acct border border-my-acct px-3 py-1 w-[150px]"
                onClick={() => {
                  setCurrentOffer(null);
                  setTimeout(() => setCurrentOffer(currentOffer), 0);
                }}
              >
                Refresh Offer
              </button>
            </div>
          )}
          {/* Modal showOffer */}
          <dialog id="offer_modal" className="modal">
            <ShowOffer />
          </dialog>
        </div>
      )}
    </>
  );
}
