import { data_dummy } from '../data/testData'
import React, { useState } from 'react'
import ShowAsset from './ShowAsset'
import ShowOffer from './ShowOffer'
import ShowRate from './ShowRate'
const assets = data_dummy.assets

export default function ShippingList() {
    const [ctrlShowAsset, setCtrlShowAsset] = useState({ visibility: "invisible", opacity: 0 })
    const [selectedAsset, setSelectedAsset] = useState({})
    const hdlShowAssets = (el) => {
        setSelectedAsset(el)
        setCtrlShowAsset({ visibility: 'visible', opacity: 100 })
    }
    const [ctrlShowOffer, setCtrlShowOffer] = useState({ visibility: "invisible", opacity: 0 })
    const hdlShowOffer = (e) => {
        e.stopPropagation()
        setCtrlShowOffer({ visibility: 'visible', opacity: 100 })
    }
    const [ctrlShowRate, setCtrlShowRate] = useState({ visibility: "invisible", opacity: 0 })
    const hdlShowRate = (e) => {
        e.stopPropagation()
        setCtrlShowRate({ visibility: 'visible', opacity: 100 })
    }
    return (
        <div>
            <div className='w-8/12 mx-auto p-2 mt-2 flex flex-col gap-8 bg-my-bg-card'>
                {assets.map((el, idx) => {
                    if (el.id <= 8) {
                        return (
                            // asset list area
                            <div key={idx} className='w-full h-auto shadow-md flex gap-4 p-2 hover:bg-my-hover cursor-pointer relative'
                                onClick={() => hdlShowAssets(el)}>
                                <div className='w-[100px] '>
                                    {/* asset pic */}
                                    <img className='w-[100px] h-[100px] object-contain' src={el.images[0]} alt="" />
                                </div>
                                {/* asset info */}
                                <div className='flex-1  flex flex-col justify-between overflow-hidden '>
                                    <div className='flex w-full gap-1'>
                                        <p className='w-[100px] font-bold'>Asset Name :</p>
                                        <p className='flex-1 text-ellipsis overflow-hidden whitespace-nowrap'>{el.title}</p>
                                    </div>
                                    <div className='flex w-full gap-1'>
                                        <p className='w-[100px] font-bold'>Category :</p>
                                        <p className='flex-1'>{el.category}</p>
                                    </div>
                                    <div className='flex w-full gap-1'>
                                        <p className='w-[100px] font-bold'>Brand :</p>
                                        <p className='flex-1'>{el.brand}</p>
                                    </div>
                                    <div className='flex w-full gap-1'>
                                        <p className='w-[100px] font-bold'>Condition :</p>
                                        <p className='flex-1'>Used</p>
                                    </div>

                                </div>
                                {/* shipping address */}
                                <div className='flex-1  flex flex-col'>
                                    <p className='font-bold'>Shipping to :</p>
                                    <div className=' p-1 h-[70px] overflow-hidden'>
                                        <p className='text-xs'>1/23 Klongsarn Krungthonburi, Bangrak, Bangkok, 123456 "Please call after delivery"</p>
                                    </div>
                                </div>
                                {/* button asset */}
                                <div className='w-[150px]  flex flex-col justify-evenly items-center gap-1'>
                                    <button className='py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover'
                                        onClick={hdlShowOffer}>See Offer</button>
                                    <button className='py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover'>Confirm Receive</button>
                                    <button className='py-1 px-2 bg-my-acct text-my-text w-full font-bold flex justify-center items-center gap-1 hover:bg-my-btn-hover'
                                        onClick={hdlShowRate}>Rate Swaper</button>
                                </div>
                                {/* badge status */}
                                <div className='px-2 mp-1 bg-my-acct absolute font-bold text-my-text rounded-xl top-0 left-0 -translate-x-3 -translate-y-3'>
                                    <p>Wait for Ship</p>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            {/* show asset */}
            <ShowAsset ctrlShowAsset={ctrlShowAsset} setCtrlShowAsset={setCtrlShowAsset} selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
            {/* show offer */}
            <ShowOffer ctrlShowOffer={ctrlShowOffer} setCtrlShowOffer={setCtrlShowOffer} />
            {/* show rate */}
            <ShowRate ctrlShowRate={ctrlShowRate} setCtrlShowRate={setCtrlShowRate} />
        </div>
    )
}
