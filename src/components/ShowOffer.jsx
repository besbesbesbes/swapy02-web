import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { data_dummy } from '../data/testData'
import ShowAsset from "./ShowAsset";
const assets = data_dummy.assets

export default function ShowOffer({ ctrlShowOffer, setCtrlShowOffer }) {
    const { visibility, opacity } = ctrlShowOffer;
    const hdlClosePopup = e => {
        e.stopPropagation()
        setCtrlShowOffer({ visibility: 'invisible', opcity: 0 })
    }
    const [ctrlShowAsset, setCtrlShowAsset] = useState({ visibility: "invisible", opacity: 0 })
    const [selectedAsset, setSelectedAsset] = useState({})
    const hdlShowAssets = (el) => {
        setSelectedAsset(el)
        setCtrlShowAsset({ visibility: 'visible', opacity: 100 })
    }
    return (
        <div className={`bg-black bg-opacity-80 w-full h-full fixed top-0 left-0 transition-all duration-500 ${visibility === 'visible' ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-10`}
            onClick={hdlClosePopup}>
            {/* card */}
            <div className="w-6/12 min-h-[550px] bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-2/3 -translate-x-1/2 flex flex-col p-10"
                onClick={e => { e.stopPropagation() }}>
                {/* content start here */}
                {/* head tag */}
                <div className='flex justify-between font-bold text-my-text gap-5'>
                    <p className='bg-my-prim px-2 py-1'>Swaper</p>
                    <p className='bg-my-acct px-2 py-1'>Offeror</p>
                </div>
                <div className='flex justify-between font-bold text-my-text gap-5'>
                    {/* Swaper */}
                    <div className="w-1/2 h-[100px]  flex justify-between text-my-prim border border-my-prim p-2">
                        {/* profile pic */}
                        <div className="w-4/12 rounded-full ">
                            <img className='w-full h-full object-contain' src="/src/pics/user.png" alt="no load" />
                        </div>
                        {/* profile detail */}
                        <div className=" flex-1 p-1 flex flex-col justify-around">
                            <div className=" flex">
                                <p className="w-5/12 font-bold">Swaper :</p>
                                <p className="flex-1">Joh***e</p>
                            </div>
                            <div className=" flex">
                                <p className="w-5/12 font-bold">Ship from :</p>
                                <p className="flex-1">Bangkok, Thailand</p>
                            </div>
                            <div className=" flex items-center flex-wrap">
                                <p className="w-5/12 font-bold">Rating :</p>
                                <div className='flex gap-1 items-baseline'>
                                    <div className='w-[10px] h-[10px] rounded-full bg-my-acct'></div>
                                    <div className='w-[10px] h-[10px] rounded-full bg-my-acct'></div>
                                    <div className='w-[10px] h-[10px] rounded-full bg-my-acct'></div>
                                    <div className='w-[10px] h-[10px] rounded-full bg-my-acct'></div>
                                    <p className='text-xs'>{`(4.2 / 5)`}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Offeror */}
                    <div className="w-1/2 h-[100px]  flex justify-between text-my-prim border border-my-acct p-2">
                        {/* profile pic */}
                        <div className="w-4/12 rounded-full ">
                            <img className='w-full h-full object-contain' src="/src/pics/user2.png" alt="no load" />
                        </div>
                        {/* profile detail */}
                        <div className=" flex-1 p-1 flex flex-col justify-around">
                            <div className=" flex">
                                <p className="w-5/12 font-bold">Offeror :</p>
                                <p className="flex-1">Ang***y</p>
                            </div>
                            <div className=" flex">
                                <p className="w-5/12 font-bold">Ship from :</p>
                                <p className="flex-1">Phuket, Thailand</p>
                            </div>
                            <div className=" flex items-center flex-wrap">
                                <p className="w-5/12 font-bold">Rating :</p>
                                <div className='flex gap-1 items-baseline'>
                                    <div className='w-[10px] h-[10px] rounded-full bg-my-acct'></div>
                                    <div className='w-[10px] h-[10px] rounded-full bg-my-acct'></div>
                                    <div className='w-[10px] h-[10px] rounded-full bg-my-acct'></div>
                                    <p className='text-xs'>{`(3.4 / 5)`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* box */}
                <div className='flex justify-between gap-5'>
                    {/* swaper box */}
                    <div className='w-1/2 min-h-[400px] border-2 border-my-prim bg-my-prim flex flex-col justify-between py-2'>
                        {/* swaper asset card */}
                        <div className='flex flex-col h-[350px] gap-2 overflow-y-scroll px-5 bg-my-bg-card py-2'>
                            {/* card */}
                            {assets.map((el, idx) => {
                                if (idx <= 1) {
                                    return (<div key={idx} className='w-full h-[80px] flex shadow-md cursor-pointer hover:bg-my-hover'
                                        onClick={() => hdlShowAssets(el)} >
                                        {/* asset pic */}
                                        <div className='min-w-[100px]' >
                                            <img src={el.thumbnail} alt="no load" className='w-full h-full object-contain' />
                                        </div>
                                        {/* asset detail */}
                                        <div className='w-full h-full flex flex-col justify-between py-2'>
                                            <p>{el.title}</p>
                                            <p>{el.category}</p>
                                            <p>Mint</p>
                                        </div>
                                    </div>)
                                }
                            })}
                        </div>
                    </div>
                    {/* offeror box */}
                    <div className='w-1/2 min-h-[400px] border-2 border-my-acct bg-my-acct flex flex-col justify-between py-2'>
                        {/* offeror asset card */}
                        <div className='flex flex-col h-[350px] gap-2 overflow-y-scroll px-5 bg-my-bg-card py-2'>
                            {/* card */}
                            {assets.map((el, idx) => {
                                if (idx > 20 && idx <= 28) {
                                    return (<div key={idx} className='w-full h-[80px] flex shadow-md cursor-pointer hover:bg-my-hover'
                                        onClick={() => hdlShowAssets(el)}>
                                        {/* asset pic */}
                                        <div className='min-w-[100px]' >
                                            <img src={el.thumbnail} alt="no load" className='w-full h-full object-contain' />
                                        </div>
                                        {/* asset detail */}
                                        <div className='w-full h-full flex flex-col justify-between py-2'>
                                            <p>{el.title}</p>
                                            <p>{el.category}</p>
                                            <p>Mint</p>
                                        </div>
                                    </div>)
                                }
                            })}
                        </div>
                    </div>
                </div >
                {/* confirm button */}
                <div className="flex justify-center">
                    <button className="w-[150px] px-2 py-1 bg-my-acct text-my-text font-bold mt-5 hover:bg-my-btn-hover">Confirm</button>
                </div>
                {/* close button */}
                <button className='w-[50px] h-[50px] bg-my-acct text-my-text rounded-full text-4xl font-bold absolute flex justify-center items-center top-0 right-0 translate-x-4 -translate-y-4 shadow-md hover:bg-my-btn-hover'
                    onClick={hdlClosePopup}><IoIosClose /></button>
            </div>
            {/* show asset */}
            <ShowAsset ctrlShowAsset={ctrlShowAsset} setCtrlShowAsset={setCtrlShowAsset} selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
        </div>
    )
}
