import React from "react";
import HomeHighlight from "../components/HomeHighlight";
import HomeCategory from "../components/HomeCategory";
import HomeAssets from "../components/HomeAssets";

const Home = () => {
  return (
    <div>
      <HomeHighlight />
      <HomeCategory />
      <HomeAssets />
    </div>
  );
};

export default Home;
