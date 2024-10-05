import { IoIosClose } from "react-icons/io";

export default function ShowContactUs() {
  return (
    <div
      className="w-4/12 min-h-[400px] bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-2/3 -translate-x-1/2 flex flex-col p-10"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* qr */}
      <img src="./src/pics/contact-us-qr.png" alt="no load" />
      {/* link */}
      <a
        href="https://www.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-my-prim font-bold text-center text-xl"
      >
        Click
      </a>
      {/* close button */}
      <button
        className="w-[50px] h-[50px] bg-my-acct text-my-text rounded-full text-4xl font-bold absolute flex justify-center items-center top-0 right-0 translate-x-4 -translate-y-4 shadow-md hover:bg-my-btn-hover"
        onClick={(e) => e.target.closest("dialog").close()}
      >
        <IoIosClose />
      </button>
    </div>
  );
}
