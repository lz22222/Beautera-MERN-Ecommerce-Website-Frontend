import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'


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
						<img src={product.image} alt="product image" className="w-full h-full object-cover hover:scale-105 transition-all duration-300 aspect-square" />
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
