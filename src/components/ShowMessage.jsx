import useOtherStore from "../store/other-store";

export default function ShowMessage() {
  const message = useOtherStore((state) => state.message);
  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-my-bg-card px-20 py-20 transition-all duration-500 border-my-prim shadow-lg flex flex-col justify-center items-center gap-5`}
    >
      <p className="font-bold text-my-acct text-2xl">{message}</p>
      {/* <button onClick={() => console.log(message)}>Test</button> */}
    </div>
  );
}
