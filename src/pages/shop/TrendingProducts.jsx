import React, { useState } from 'react';
import ProductCards from './ProductCards';
import products from '../../data/products.json';

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    const loadMoreProducts = () => {
        setVisibleProducts((prevCount) => prevCount + 4);
    };

    return (
        <section className="section__container product__container">
            <h2 className="section__header">Trending Products</h2>
            <p className="section__subheader mb-12">
                Glow Up with the Best: Explore Our Curated Selection of Trending Beauty Products. Indulge in a Luxurious Beauty Experience with Our Curated Range of Top-Selling Makeup Products: From Flawless Foundations to Vibrant Lip Colors, Find Everything You Need to Create Stunning Looks and Unleash Your True Radiance.
            </p>

            {/* Product Cards */}
            <div className="mt-12">
                <ProductCards products={products.slice(0, visibleProducts)} />
            </div>

            {/* Load More Button */}
            <div className="product__btn">
                {visibleProducts < products.length && (
                    <button className="btn" onClick={loadMoreProducts}>
                        Load More
                    </button>
                )}
            </div>
        </section>
    );
};

export default TrendingProducts;
