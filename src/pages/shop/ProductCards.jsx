import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'


import trend1 from '../../assets/trend1.avif';
import trend2 from '../../assets/trend2.png';
import trend3 from '../../assets/trend3.avif';
import trend4 from '../../assets/trend4.avif';
import trend5 from '../../assets/trend5.avif';
import trend6 from '../../assets/trend6.avif';
import trend7 from '../../assets/trend7.avif';
import trend8 from '../../assets/trend8.png';
import trend9 from '../../assets/trend9.avif';
import trend10 from '../../assets/trend10.png';
import placeholder from '../../assets/header.jpeg';

export const getImageSrc = (imagePath) => {
    switch (imagePath) {
        case '/assets/trend1.avif':
            return trend1;
        case '/assets/trend2.png':
            return trend2;
        case '/assets/trend3.avif':
            return trend3;
        case '/assets/trend4.avif':
            return trend4;
        case '/assets/trend5.avif':
            return trend5;
        case '/assets/trend6.avif':
            return trend6;
        case '/assets/trend7.avif':
            return trend7;
        case '/assets/trend8.png':
            return trend8;
        case '/assets/trend9.avif':
            return trend9;
        case '/assets/trend10.png':
            return trend10;
        default:
            return placeholder;
    }
};


const ProductCards = ({products}) => {
	const dispatch = useDispatch()

	
	const handleAddToCart = (product) => {
		console.log('Product clicked:', product);
		console.log('Available keys:', Object.keys(product));
		console.log('Product ID:', product._id || product.id);
	
		if (!product._id && !product.id) {
			console.error('Invalid product data:', product);
			return;
		}
	
		const productId = product._id || product.id;
		dispatch(addToCart({ ...product, _id: productId }));
	};
	



	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
			{products.map((product, index) => (
				<div key={index} className='product__card'>
					<div className='relative'>
						<Link to={`/shop/${product._id}`}>

                            <img
                                src={getImageSrc(product.image)}
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-all duration-300 aspect-square"
                            />
                        </Link>

                        <div className='hover:block absolute top-3 right-3'>
							<button>
								<i
									className='ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark'
									onClick={(e) => {
										e.stopPropagation()
										handleAddToCart(product)
									}}
								></i>
							</button>
						</div>
					</div>

					{/* product description */}
					<div className='product__card__content'>
						<h4>{product.name}</h4>
						<p>
							${product.price}{' '}
							{product?.oldPrice ? <s>${product?.oldPrice}</s> : null}
						</p>
						<RatingStars rating={product.rating} />
					</div>
				</div>
			))}
		</div>
	)
}


export default ProductCards;
