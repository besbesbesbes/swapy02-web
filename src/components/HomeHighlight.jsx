import React, { useEffect, useState } from 'react'
import ShowAsset from './ShowAsset'
import axios from "axios"
const HomeHighlight = () => {
    const [ctrlShowAsset, setCtrlShowAsset] = useState({ visibility: "invisible", opacity: 0 })
    const [selectedAsset, setSelectedAsset] = useState({})
    const [assets, setAssets] = useState([])
    const hdlShowAssets = (el) => {
        setSelectedAsset(el)
        setCtrlShowAsset({ visibility: 'visible', opacity: 100 })
    }
    const getHighlightAssets = async () => {
        const result = await axios.get("http://localhost:8000/search/highlight")
        // console.log(result)
        setAssets(result.data.topAssets)
        // console.log(assets)
    }
    useEffect(() => {
        getHighlightAssets()
    }, [])
    return (
        <div className='w-full m-h-[230px] bg-my-bg-main flex justify-evenly items-center p-4 gap-4'>
            {assets.map((el, idx) => {
                return (
                    // card
                    <div key={idx} className='w-[400px] h-[190px] bg-my-bg-card p-4 flex gap-4 relative shadow-md hover:bg-my-hover cursor-pointer'
                        onClick={() => hdlShowAssets(el)}>
                        <img src={el.assetThumbnail} alt="Not Load" />
                        <div className='flex flex-col justify-between'>
                            <div className='flex flex-col gap-1'>
                                <p className='font-bold'>{el.assetName}</p>
                                <p>{el.assetBrand}</p>
                                <p className='text-xs font-extralight h-[100px] overflow-hidden'>"{el.assetNote}"</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                {/* user rating */}
                                <div className='flex items-center gap-1'>
                                    <p>User Rating : </p>
                                    <div className='flex gap-[2px]'>
                                        {Array(Math.round(el.user.userRating)).fill().map((el, idx) => (
                                            <div key={idx} className='w-[10px] h-[10px] rounded-full bg-my-acct'></div>
                                        ))}</div>
                                </div>
                            </div>
                        </div>
                        {/* absolute icon */}
                        <div className='flex gap-2 absolute top-0 left-0 px-2 rounded-full bg-my-prim text-my-text items-baseline -translate-y-2 shadow-md'>
                            <p className='text-xs'>Swaper :</p>
                            <p className=' font-bold'>{el.assetSwaperCount}</p>
                        </div>
                        <div className='flex gap-2 absolute top-0 right-0 px-2 rounded-full bg-my-acct text-my-text items-baseline -translate-y-2 shadow-md'>
                            <p className='text-xs'>Offer :</p>
                            <p className=' font-bold'>{el.assetOfferorCount}</p>
                        </div>
                    </div>
                )
            }
            )}
            {/* show asset */}
            <ShowAsset ctrlShowAsset={ctrlShowAsset} setCtrlShowAsset={setCtrlShowAsset} selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
        </div>
    )
}

export default HomeHighlight