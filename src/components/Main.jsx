import React from 'react'

import AppRouter from "../routes/AppRouter";

const Main = () => {
    return (
        <div className='w-full min-h-screen bg-my-bg '>
            <div className='w-10/12 mx-auto text-my-prim text-sm font-sans font-light'>
                <AppRouter />
            </div>
        </div>
    )
}
export default Main