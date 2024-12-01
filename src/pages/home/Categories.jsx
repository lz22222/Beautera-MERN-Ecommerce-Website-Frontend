import React from 'react';
import { Link } from 'react-router-dom';
import category1 from '../../assets/category-1.png';
import category2 from '../../assets/category-2.png';
import category3 from '../../assets/category-3.png';
import category4 from '../../assets/category-4.png';

const Categories = () => {
    const categories = [
        { name: 'Face', path: 'face', image: category1 },
        { name: 'Eyes', path: 'eyes', image: category2 },
        { name: 'Lips', path: 'lips', image: category3 },
        { name: 'Cheek', path: 'cheek', image: category4 },
    ];

    return (
        <>
            <div className="product__grid">
                {categories.map((category) => (
                    <Link
                        to={`/categories/${category.path}`}
                        className="categories__card"
                        key={category.path}
                    >
                        <img src={category.image} alt={category.name} />
                        <h4>{category.name}</h4>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Categories;
