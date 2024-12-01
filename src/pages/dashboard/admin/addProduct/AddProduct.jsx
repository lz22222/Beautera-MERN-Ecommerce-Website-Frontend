import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';
import { useNavigate } from 'react-router-dom';

// Predefined categories and colors for the product form
const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Face', value: 'face' },
    { label: 'Eyes', value: 'eyes' },
    { label: 'Lips', value: 'lips' },
    { label: 'Cheek', value: 'cheek' }
];

const colors = [
    { label: 'Select Color', value: '' },
    { label: 'Black', value: 'black' },
    { label: 'Red', value: 'red' },
    { label: 'Brown', value: 'brown' },
    { label: 'Clear', value: 'clear' },
    { label: 'Pink', value: 'pink' },
    { label: 'Silver', value: 'silver' },
    { label: 'Green', value: 'green' }
];

const AddProduct = () => {
    // Get the logged-in user from the Redux store
    const { user } = useSelector((state) => state.auth);

    // Local state to manage the product details
    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        description: ''
    });

    // State to manage the uploaded image
    const [image, setImage] = useState('');

    // RTK Query mutation hook for adding a new product
    const [AddProduct, { isLoading, error }] = useAddProductMutation();

    // Navigate hook to programmatically navigate between routes
    const navigate = useNavigate();

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that all required fields are filled
        if (!product.name || !product.category || !product.price || !product.description || !product.color) {
            alert('Please fill all the required fields');
            return;
        }

        try {
            // Add the product using the API mutation
            await AddProduct({ ...product, image, author: user?._id }).unwrap();
            alert('Product added successfully');

            // Reset the form after successful submission
            setProduct({ name: '', category: '', color: '', price: '', description: '' });
            setImage('');
            
            // Navigate to the shop page
            navigate('/shop');
        } catch (error) {
            console.log('Failed to submit product', error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input field for Product Name */}
                <TextInput
                    label="Product Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                />

                {/* Dropdown for Product Category */}
                <SelectInput
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />

                {/* Dropdown for Product Color */}
                <SelectInput
                    label="Color"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    options={colors}
                />

                {/* Input field for Product Price */}
                <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                />

                {/* Component for Uploading Image */}
                <UploadImage
                    name="image"
                    id="image"
                    value={(e) => setImage(e.target.value)}
                    setImage={setImage}
                />

                {/* Textarea for Product Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className="add-product-InputCSS"
                        value={product.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="add-product-btn"
                    >
                        {isLoading ? 'Adding...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
