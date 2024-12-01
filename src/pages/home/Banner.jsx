import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../assets/header.jpeg';

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">UP TO 25% Discount on</h4>
        <h1>Premium Beauty Products</h1>
        <p>
        Discover the latest in skincare, makeup, and beauty essentials. Unveil your unique glow with our curated collection of premium products, designed to bring out the best in you. Explore luxurious cosmetics that suit every skin type and every occasion.
        </p>
        <button className="btn">
          <Link to="/shop">SHOP NOW</Link>
        </button>
      </div>

      <div className="header__image">
        <img src={bannerImg} alt="banner image" />
      </div>
    </div>
    
  );
};

console.log("Banner component loaded");

export default Banner;
