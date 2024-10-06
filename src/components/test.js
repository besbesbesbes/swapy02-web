{
  /* box */
}
<div className="flex justify-between gap-5">
  {/* swaper box */}
  <div className="w-1/2 min-h-[400px] border-2 border-my-prim bg-my-prim flex flex-col justify-between py-2">
    {/* swaper asset card */}
    <div className="flex flex-col h-[350px] gap-2 overflow-y-scroll px-5 bg-my-bg-card py-2">
      {/* card */}
      {offer.offerAssets.map((el, idx) => {
        return (
          <div
            key={idx}
            className="w-full h-[80px] flex shadow-md cursor-pointer hover:bg-my-hover"
            onClick={() => hdlShowAssets(el)}
          >
            {/* asset pic */}
            <div className="min-w-[100px]">
              <img
                src={el.thumbnail}
                alt="no load"
                className="w-full h-full object-contain"
              />
            </div>
            {/* asset detail */}
            <div className="w-full h-full flex flex-col justify-between py-2">
              <p>{el.title}</p>
              <p>{el.category}</p>
              <p>Mint</p>
            </div>
            <div className="bg-my-prim mr-4 p-2 rounded-full my-auto flex justify-center items-center">
              <IoTrashBin className="text-my-text text-lg" />
            </div>
          </div>
        );
      })}
    </div>
    {/* swaper add asset button */}
    <div className="flex justify-center items-center">
      <button className="py-1 px-2 bg-my-prim text-my-text font-bold hover:bg-my-prim-hover flex gap-1 items-center">
        <IoIosAddCircle className="text-lg" /> Add Swaper Asset
      </button>
    </div>
  </div>
  {/* offeror box */}
  <div className="w-1/2 min-h-[400px] border-2 border-my-acct bg-my-acct flex flex-col justify-between py-2">
    {/* offeror asset card */}
    <div className="flex flex-col h-[350px] gap-2 overflow-y-scroll px-5 bg-my-bg-card py-2">
      {/* card */}
      {offer.offerAssets.map((el, idx) => {
        return (
          <div
            key={idx}
            className="w-full h-[80px] flex shadow-md cursor-pointer hover:bg-my-hover"
            onClick={() => hdlShowAssets(el)}
          >
            {/* asset pic */}
            <div className="min-w-[100px]">
              <img
                src={el.thumbnail}
                alt="no load"
                className="w-full h-full object-contain"
              />
            </div>
            {/* asset detail */}
            <div className="w-full h-full flex flex-col justify-between py-2">
              <p>{el.title}</p>
              <p>{el.category}</p>
              <p>Mint</p>
            </div>
            <div className="bg-my-acct mr-4 p-2 rounded-full my-auto flex justify-center items-center">
              <IoTrashBin className="text-my-text text-lg" />
            </div>
          </div>
        );
      })}
    </div>
    {/* offeror add asset button */}
    <div className="flex justify-center items-center">
      <button className="py-1 px-2 bg-my-acct text-my-text font-bold hover:bg-my-btn-hover flex gap-1 items-center">
        <IoIosAddCircle className="text-lg" /> Add Offeror Asset
      </button>
    </div>
  </div>
</div>;
