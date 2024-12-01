import React from 'react';
import Banner from '/src/pages/home/Banner'; 
import Categories from '/src/pages/home/Categories'; 
import ThreeCard from '/src/pages/home/ThreeCard'; 
import TrendingProducts from '/src/pages/shop/TrendingProducts'; 
import PromoBanner from '/src/pages/home/PromoBanner'; 


const Home = () => {
  console.log('Home component rendered'); 
  
  return (
    <>
      <Banner />
      <Categories />
      <ThreeCard />
      <TrendingProducts />
      <PromoBanner />
    </>
  );
};



export default Home;