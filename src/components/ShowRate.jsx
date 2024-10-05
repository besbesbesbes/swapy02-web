import { IoIosClose } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";

export default function ShowRate({ setCtrlShowRate, ctrlShowRate }) {
    const { visibility, opacity } = ctrlShowRate;
    const [userRate, setUserRate] = useState(3)
    const stars = [1, 2, 3, 4, 5]
    return (
        <div className={`bg-black bg-opacity-80 w-full h-full fixed top-0 left-0 transition-all duration-500 ${visibility === 'visible' ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-10`}
            onClick={e => {
                e.stopPropagation()
                setCtrlShowRate({ visibility: 'invisible', opcity: 0 })
            }}>
            {/* card */}
            <div className="w-4/12 min-h-[400px] bg-my-bg-card fixed left-1/2 top-1/2 -translate-y-2/3 -translate-x-1/2 flex flex-col py-10 px-32 justify-center items-center"
                onClick={e => {
                    e.stopPropagation()
                }}>
                {/* Rate Area */}
                <div className="h-[300px] w-full flex flex-col gap-10 items-center justify-evenly">
                    {/* user detail */}
                    <div className="w-full h-[100px]  flex justify-between text-my-prim p-2">
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
                    {/* stars */}
                    <div className="flex gap-3">
                        {stars.map((el, idx) => {
                            if ((idx + 1 <= userRate)) {
                                return <button
                                    onMouseEnter={() => setUserRate(idx + 1)}
                                ><FaStar className="text-3xl text-my-acct" /></button>
                            } else {
                                return <button
                                    onMouseEnter={() => setUserRate(idx + 1)}
                                ><FaRegStar className="text-3xl text-my-acct" /></button>
                            }
                        }
                        )}
                    </div>
                    {/* button */}
                    <div className="flex justify-center items-center">
                        <button className="w-[150px] h-[40px] font-bold text-my-text bg-my-acct">Confirm</button>
                    </div>
                </div>
                {/* close button */}
                <button className='w-[50px] h-[50px] bg-my-acct text-my-text rounded-full text-4xl font-bold absolute flex justify-center items-center top-0 right-0 translate-x-4 -translate-y-4 shadow-md hover:bg-my-btn-hover'
                    onClick={e => {
                        e.stopPropagation()
                        setCtrlShowRate({ visibility: 'invisible', opcity: 0 })
                    }
                    }><IoIosClose /></button>
            </div>
        </div>
    )
}
