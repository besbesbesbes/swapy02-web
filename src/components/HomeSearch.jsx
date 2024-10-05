import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ShowAsset from './ShowAsset'
import axios from "axios"
import { IoHomeSharp } from "react-icons/io5";
export default function HomeSearch() {
    const [ctrlShowAsset, setCtrlShowAsset] = useState({ visibility: "invisible", opacity: 0 })
    const [selectedAsset, setSelectedAsset] = useState({})
    const [assets, setAssets] = useState([])
    const hdlShowAssets = (el) => {
        setSelectedAsset(el)
        setCtrlShowAsset({ visibility: 'visible', opacity: 100 })
    }
    const [searchParams] = useSearchParams()
    const getAllAssets = async () => {
        let result
        searchParams.get("c") ? result = await axios.get("http://localhost:8000/search?c=" + searchParams.get("c")) : null
        searchParams.get("v") ? result = await axios.get("http://localhost:8000/search?v=" + searchParams.get("v")) : null
        setAssets(result.data.assets)
    }
    useEffect(() => {
        setAssets([])
        getAllAssets()
    }, [searchParams])
    return (
        <div>
            {/* header */}
            {/* <button onClick={() => console.log(cat)}>Test</button> */}
            <div className='flex text-xl w-full bg-my-bg-card px-5 py-1 '>
                <Link to='/'>
                    <div className='flex items-center gap-1'>
                        <IoHomeSharp className='-translate-y-[1px]' />
                        <p className='font-bold'>Home</p>
                    </div>
                </Link>

                <span className='px-4'>|</span>
                {searchParams.get("c") && <p>{searchParams.get("c").charAt(0).toUpperCase() + searchParams.get("c").slice(1)}</p>}
                {searchParams.get("v") && <p>search:{searchParams.get("v")}</p>}
            </div>
            <div className='w-full bg-my-bg-main flex justify-evenly items-center p-4 flex-wrap gap-4 i'>
                {assets.map((el, idx) => {
                    return (
                        <div key={idx} className='bg-my-bg-card w-[170px] h-[230px] shadow-md flex flex-col items-center gap-2 overflow-hidden p-2 hover:bg-my-hover  cursor-pointer relative'
                            onClick={e => { hdlShowAssets(el) }}>
                            {/* asset pic */}
                            <div className='h-[150px]'>
                                <img className='h-[150px] object-contain' src={el.assetThumbnail} alt="no load" />
                            </div>
                            {/* asset name */}
                            <div className='w-full h-[20px]'>
                                <p className='overflow-hidden whitespace-nowrap text-ellipsis font-bold'>{el.assetName}</p>
                            </div>
                            {/* offer */}
                            <div className='w-full flex justify-between text-xs items-baseline'>
                                <p>{el.user.userLocation}</p>
                                {el.assetOfferorCount + el.assetSwaperCount > 0
                                    ? <div className=' h-[20px] flex justify-center items-center gap-1 px-2 rounded-full bg-my-acct text-white'>
                                        <p className='text-xs'>Offer:</p>
                                        <p className='font-bold'>{el.assetOfferorCount + el.assetSwaperCount}</p>
                                    </div>
                                    : null}

                            </div>
                            {/* new badge */}
                            {el.assetId % 5 == 0 &&
                                <div className='w-[100px] h-[40px] text-center pt-4 absolute left-0 top-0 bg-my-prim text-my-text -rotate-45 -translate-x-10 -translate-y-2'>
                                    <p className='text-xs font-bold translate-y-1'>NEW</p>
                                </div>}
                        </div>
                    )
                })}
            </div>
            {/* show asset */}
            <ShowAsset ctrlShowAsset={ctrlShowAsset} setCtrlShowAsset={setCtrlShowAsset} selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
        </div >
    )
}
