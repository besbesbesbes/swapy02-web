import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeCategory = () => {
    const navigate = useNavigate()
    const dhlLink = (val) => {
        navigate("/search?c=" + val)
    }
    return (
        <div className='themeLight text-xs font-bold text-my-text'>
            {/* category area */}
            <div className='w-full bg-category-pattern bg-my-acct min-h-[80px] flex items-center justify-evenly flex-wrap'>
                {/* list of category */}
                <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => dhlLink("smartphone")}>
                    <img src="/src/pics/icon-smartphone.png" alt="no load" width={'45px'} />
                    <p className='w-[86px] text-center'>Smartphone</p>
                </div>
                <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => dhlLink("beauty")}>
                    <img src="/src/pics/icon-beauty.png" alt="no load" width={'45px'} />
                    <p className='w-[86px] text-center'>Beauty</p>
                </div>
                <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => dhlLink("electronic")}>
                    <img src="/src/pics/icon-electronic.png" alt="no load" width={'45px'} />
                    <p className='w-[86px] text-center'>Electronic</p>
                </div>
                <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => dhlLink("forniture")}>
                    <img src="/src/pics/icon-forniture.png" alt="no load" width={'45px'} />
                    <p className='w-[86px] text-center'>Forniture</p>
                </div>
                <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => dhlLink("vihicle")}>
                    <img src="/src/pics/icon-vihicle.png" alt="no load" width={'45px'} />
                    <p className='w-[86px] text-center'>Vihicle</p>
                </div>
                <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => dhlLink("clothes")}>
                    <img src="/src/pics/icon-clothes.png" alt="no load" width={'45px'} />
                    <p className='w-[86px] text-center'>Clothes</p>
                </div>

                <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => dhlLink("accessories")}>
                    <img src="/src/pics/icon-accessories.png" alt="no load" width={'45px'} />
                    <p className='w-[86px] text-center'>Accessories</p>
                </div>
                <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => dhlLink("food")}>
                    <img src="/src/pics/icon-food.png" alt="no load" width={'45px'} />
                    <p className='w-[86px] text-center'>Food</p>
                </div>

                <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => dhlLink("groceries")}>
                    <img src="/src/pics/icon-groceries.png" alt="no load" width={'45px'} />
                    <p className='w-[86px] text-center'>Groceries</p>
                </div>
                <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => dhlLink("miscellaneous")}>
                    <img src="/src/pics/icon-miscellaneous.png" alt="no load" width={'45px'} />
                    <p className='w-[86px] text-center'>Miscellaneous</p>
                </div>
            </div>
        </div>
    )
}
export default HomeCategory