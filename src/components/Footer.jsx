import React from 'react'

import instaImg1 from "../assets/instagram-1.png"
import instaImg2 from "../assets/instagram-2.png"
import instaImg3 from "../assets/instagram-3.png"
import instaImg4 from "../assets/instagram-4.png"
import instaImg5 from "../assets/instagram-5.jpeg"
import instaImg6 from "../assets/instagram-6.jpeg"

const Footer = () => {
    return (
        <>
            <footer className='section__container footer__container'>
                <div className='footer__col'>
                    <h4>CONTACT INFO</h4>
                    <p>
                        <span><i className="ri-map-pin-2-fill"></i></span>
                        10000 10st NW, Edmonton, AB, Canada
                    </p>
                    <p>
                        <span><i className="ri-mail-fill"></i></span>
                        beautera-support@gmail.com
                    </p>
                    <p>
                        <span><i className="ri-phone-fill"></i></span>
                        +1 123-456-7890
                    </p>
                </div>

                <div className='footer__col'>
                    <h4>COMPANY</h4>
                    <a href="/">Home</a>
                    <a href="/">About Us</a>
                    <a href="/">Work With Us</a>
                    <a href="/">Our Blogs</a>
                    <a href="/">Trems & Condition</a>
                </div>

                <div className='footer__col'>
                    <h4>USEFUL LINK</h4>
                    <a href="/">Help</a>
                    <a href="/">Track your order</a>
                    <a href="/">Face</a>
                    <a href="/">Lips</a>
                    <a href="/">Eyes</a>
                </div>
                <div className='footer__col'>
                    <h4>INSTAGRAM</h4>
                    <div className='instagram__grid'>
                        <img src={instaImg1} alt="" />
                        <img src={instaImg2} alt="" />
                        <img src={instaImg3} alt="" />
                        <img src={instaImg4} alt="" />
                        <img src={instaImg5} alt="" />
                        <img src={instaImg6} alt="" />
                    </div>
                </div>
            </footer>

            <div className='footer__bar'>
                Copyright © 2025 by Beautera. All rights reserved.
            </div>
        </>
    )
}

export default Footer