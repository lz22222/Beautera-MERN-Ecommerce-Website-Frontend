// Import necessary dependencies
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi';
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../addProduct/UploadImage';

// Categories and Colors used in the dropdowns
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

const UpdateProduct = () => {
    // Get product ID from route parameters
    const {id} = useParams();

    // React Router's navigate hook for redirecting after update
    const navigate = useNavigate();

    // Get user information from Redux store
    const {user} = useSelector((state) => state.auth);

    // State for product details
    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        description: '',
        image: ''
    });

    // Fetch product data using the product ID
    const {data: productData, isLoading: isProductLoading, error: fetchError, refetch} = useFetchProductByIdQuery(id);

    // State for new image (if the user uploads one)
    const [newImage, setNewImage] = useState(null);

    // Destructure product data from API response
    const {name, category, color, description, image: imageURL, price } = productData?.product || {};

    // Mutation hook for updating the product
    const [updateProduct, {isLoading: isUpdating, error: updateError}] = useUpdateProductMutation();

    // Populate product state when product data is fetched
    useEffect(() => {
        if (productData) {
            setProduct({
                name: name || '',
                category: category || '',
                color: color || '',
                price: price || '',
                description: description || '',
                image: imageURL || ''
            });
        }
    }, [productData]);

    // Handle input changes for product details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    // Handle new image upload
    const handleImageChange = (image) => {
        setNewImage(image);
    };

    // Handle form submission to update the product
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product,
            image: newImage ? newImage : product.image, // Use new image if uploaded, otherwise keep the existing image
            author: user?._id // Add author ID
        };

        try {
            await updateProduct({id: id, ...updatedProduct}).unwrap(); // Perform the mutation
            alert('Product updated successfully'); // Notify user
            await refetch(); // Refetch the updated product
            navigate("/dashboard/manage-products"); // Redirect to manage products page
        } catch (error) {
            console.error('Failed to update product:', error); // Log error
        }
    };

    // Show loading state while fetching product data
    if (isProductLoading) return <div>Loading....</div>;

    // Show error state if fetching product fails
    if (fetchError) return <div>Error fetching product!...</div>;

    return (
        <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-6'>Update Product </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Input for product name */}
                <TextInput
                    label="Product Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                />
                {/* Dropdown for selecting category */}
                <SelectInput
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />
                {/* Dropdown for selecting color */}
                <SelectInput
                    label="Color"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    options={colors}
                />
                {/* Input for price */}
                <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                />
                {/* Upload image component */}
                <UploadImage
                    name="image"
                    id="image"
                    value={newImage || product.image}
                    setImage={handleImageChange}
                />
                {/* Textarea for product description */}
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea
                        name="description"
                        id="description"
                        className='add-product-InputCSS'
                        value={product.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                {/* Submit button */}
                <div>
                    <button type='submit' className='add-product-btn'>
                        {isUpdating ? 'Updating...' : 'Update Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// Export the component for use in other parts of the application
export default UpdateProduct;
