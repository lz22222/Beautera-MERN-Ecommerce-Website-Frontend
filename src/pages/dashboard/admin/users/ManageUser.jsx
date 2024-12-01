// Import necessary dependencies
import React, { useState } from 'react'
import { useDeleteUserMutation, useGetUserQuery } from '../../../../redux/features/auth/authApi'
import { Link } from 'react-router-dom';
import UpdateUserModal from './UpdateUserModal';

const ManageUser = () => {
    // State to manage modal visibility and selected user
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch user data using a custom query hook
    const { data: users = [], error, isLoading, refetch } = useGetUserQuery();

    console.log(users); // Log fetched users for debugging

    // Mutation hook for deleting a user
    const [deleteUser] = useDeleteUserMutation();

    // Handle user deletion
    const handleDelete = async (id) => {
        try {
            const response = await deleteUser(id).unwrap(); // Perform the delete mutation
            alert("User deleted successfully!"); // Notify the admin
            refetch(); // Refresh user list after deletion
        } catch (error) {
            console.error("Failed to delete user", error); // Log error if deletion fails
        }
    };

    // Handle user editing (open modal)
    const handleEdit = (user) => {
        setSelectedUser(user); // Set the user to be edited
        setIsModalOpen(true); // Open the modal
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedUser(null); // Clear the selected user
    };

    return (
        <>
            {/* Display loading indicator while fetching data */}
            {isLoading && <div>Loading...</div>}

            {/* Display error message if fetching fails */}
            {error && <div>Error loading users data.</div>}

            <section className="py-1 bg-blueGray-50">
                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    {/* Header for user management */}
                                    <h3 className="font-semibold text-base text-blueGray-700">All Users</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                                </div>
                            </div>
                        </div>

                        {/* Table to display user data */}
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        {/* Table headers */}
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            User email
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            User role
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
                                    {/* Render user rows dynamically */}
                                    {users && users.map((user, index) => (
                                        <tr key={index}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {index + 1} {/* User index */}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {user?.email || 'N/A'} {/* User email */}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {/* Display user role with styling */}
                                                <span
                                                    className={`rounded-full py-[2px] px-3 ${user?.role === "admin"
                                                        ? "bg-indigo-500 text-white "
                                                        : "bg-amber-300"
                                                    }`}
                                                >
                                                    {user?.role}
                                                </span>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer hover:text-primary">
                                                {/* Edit button */}
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className='flex gap-1 items-center hover:text-red-500'>
                                                    <i className='ri-edit-2-line'></i>
                                                    Edit
                                                </button>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {/* Delete button */}
                                                <button
                                                    onClick={() => handleDelete(user?._id)}
                                                    className='bg-red-600 text-white px-2 py-1'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer section */}
                <footer className="relative pt-8 pb-6 mt-16">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                <div className="text-sm text-blueGray-500 font-semibold py-1">
                                    Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>

            {/* Conditionally render UpdateUserModal */}
            {isModalOpen && <UpdateUserModal user={selectedUser} onClose={handleCloseModal} onRoleUpdate={refetch} />}
        </>
    );
};

// Export the component for use in the admin dashboard
export default ManageUser;
