import { data_dummy } from '../data/testData'
import ShowAsset from "./ShowAsset";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
const assets = data_dummy.assets

export default function OfferDetail() {
    const [ctrlShowAsset, setCtrlShowAsset] = useState({ visibility: "invisible", opacity: 0 })
    const [selectedAsset, setSelectedAsset] = useState({})
    const hdlShowAssets = (el) => {
        setSelectedAsset(el)
        setCtrlShowAsset({ visibility: 'visible', opacity: 100 })
    }

    return (
        <div className='bg-my-bg-card w-full shadow-md p-2'>
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
                                    <div className='bg-my-prim mr-4 p-2 rounded-full my-auto flex justify-center items-center'>
                                        <IoTrashBin className='text-my-text text-lg' />
                                    </div>
                                </div>)
                            }
                        })}
                    </div>
                    {/* swaper add asset button */}
                    <div className='flex justify-center items-center'>
                        <button className='py-1 px-2 bg-my-prim text-my-text font-bold hover:bg-my-prim-hover flex gap-1 items-center'><IoIosAddCircle className='text-lg' /> Add Swaper Asset</button>
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
                                    <div className='bg-my-acct mr-4 p-2 rounded-full my-auto flex justify-center items-center'>
                                        <IoTrashBin className='text-my-text text-lg' />
                                    </div>
                                </div>)
                            }
                        })}
                    </div>
                    {/* offeror add asset button */}
                    <div className='flex justify-center items-center'>
                        <button className='py-1 px-2 bg-my-acct text-my-text font-bold hover:bg-my-btn-hover flex gap-1 items-center'><IoIosAddCircle className='text-lg' /> Add Offeror Asset</button>
                    </div>
                </div>
            </div >
            {/* show asset */}
            <ShowAsset ctrlShowAsset={ctrlShowAsset} setCtrlShowAsset={setCtrlShowAsset} selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
        </div >
    )
}
