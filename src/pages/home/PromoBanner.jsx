import React from 'react';

const PromoBanner = () => {
    return (
        <section className='section__container banner__container'>
            <div className='banner__card'>
                <span><i className='ri-truck-line'></i></span>
                <h4>Free Delivery</h4>
                <p>Enjoy fast, free shipping on all orders, delivering straight to your door—no matter where you are.</p>
            </div>

            <div className='banner__card'>
                <span><i className='ri-shield-check-line'></i></span>
                <h4>Quality Assurance</h4>
                <p>Shop with peace of mind! We guarantee top-notch quality on every product you buy, backed by our customer-first promise.</p>
            </div>

            <div className='banner__card'>
                <span><i className='ri-user-voice-fill'></i></span>
                <h4>Strong Support</h4>
                <p>We’ve got your back! Reach out to our friendly support team for any help or advice you need.</p>
            </div>
        </section>
    );
};

export default PromoBanner;
