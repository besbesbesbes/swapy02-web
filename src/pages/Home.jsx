import React from 'react'
import HomeHighlight from '../Components/HomeHighlight'
import HomeCategory from '../Components/HomeCategory'
import HomeAssets from '../Components/HomeAssets'

const Home = () => {
    return (
        <div>
            <HomeHighlight />
            <HomeCategory />
            <HomeAssets />
        </div>
    )
}

export default Home