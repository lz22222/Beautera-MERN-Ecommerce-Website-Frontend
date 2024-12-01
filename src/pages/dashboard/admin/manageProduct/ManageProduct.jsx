// Import necessary dependencies and hooks
import React, { useState } from 'react'
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../../redux/features/products/productsApi'
import { formatDate } from '../../../../utils/formateDate';
import { Link } from 'react-router-dom';

const ManageProduct = () => {
    // State for managing pagination (current page and products per page)
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12)

    // Fetch all products using a custom query hook
    const { data: { products = [], totalPages, totalProducts } = {}, isLoading, error, refetch } = useFetchAllProductsQuery({
        category: '', // Filter: category
        color: '', // Filter: color
        minPrice: '', // Filter: minimum price
        maxPrice: '', // Filter: maximum price
        page: currentPage, // Current page for pagination
        limit: productsPerPage, // Number of products per page
    })

    // Calculate the range of products being displayed
    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    // Handle page change for pagination
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber) // Update the current page state
        }
    }

    // Mutation hook to delete a product
    const [deleteProduct] = useDeleteProductMutation()
    const handleDeleteProduct = async (id) => {
        try {
            // Call the mutation and wait for the result
            const response = await deleteProduct(id).unwrap();
            alert("Product deleted successfully") // Show success message
            await refetch() // Refresh the product list

        } catch (error) {
            console.error("Error deleting product", error) // Log error if deletion fails
        }
    }

    return (
        <>
            {
                // Show loading state while fetching products
                isLoading && <div>Loading...</div>
            }
            {
                // Show error message if fetching fails
                error && <div>Error loading products.</div>
            }
            <section className="py-1 bg-blueGray-50">
                <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    {/* Display the section header */}
                                    <h3 className="font-semibold text-base text-blueGray-700">All Products</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    {/* Button to view all products */}
                                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                                </div>
                            </div>
                            {/* Display the current product range and total products */}
                            <h3 className='my-4  text-sm'>Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            {/* Product table */}
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        {/* Table headers */}
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Product Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Publishing date
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit or manage
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        // Render product rows dynamically
                                        products && products.map((product, index) => (
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index + 1} {/* Product serial number */}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {product?.name} {/* Product name */}
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {formatDate(product?.createdAt)} {/* Formatted publishing date */}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer hover:text-primary">
                                                    {/* Link to edit product */}
                                                    <Link to={`/dashboard/update-product/${product._id}`}> Edit</Link>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {/* Delete button */}
                                                    <button
                                                        onClick={() => handleDeleteProduct(product._id)}
                                                        className='bg-red-600 text-white px-2 py-1'>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pagination section */}
                <div className='mt-6 flex items-center justify-center'>
                    {/* Previous page button */}
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Previous</button>
                    {
                        // Dynamically render page numbers
                        [...Array(totalPages)].map((_, index) => (
                            <button 
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}>{index + 1}</button>
                        ))
                    }
                    {/* Next page button */}
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'>Next</button>
                </div>

                {/* Footer */}
                <footer className="relative pt-8 pb-6 mt-16">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                {/* Footer credit */}
                                <div className="text-sm text-blueGray-500 font-semibold py-1">
                                    Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        </>
    )
}

// Export the component
export default ManageProduct
