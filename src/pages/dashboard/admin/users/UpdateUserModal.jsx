// Import necessary dependencies
import React, { useState } from 'react'
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    // State to manage the selected role of the user
    const [role, setRole] = useState(user.role);

    // Mutation hook for updating the user's role
    const [updateUserRole] = useUpdateUserRoleMutation();

    // Handle updating the user role
    const handleUpdateRole = async () => {
        try {
            // Perform the mutation with user ID and new role
            await updateUserRole({ userId: user?._id, role }).unwrap();
            alert('Updated role successfully!'); // Notify on success
            onRoleUpdate(); // Refresh the user list or role display
            onClose(); // Close the modal
        } catch (error) {
            console.error("Failed to update user role", error); // Log error if the update fails
        }
    };

    return (
        // Modal wrapper with a semi-transparent black background
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
            <div className='bg-white p-4 rounded shadow-lg w-1/3'>
                {/* Modal header */}
                <h2 className='text-xl mb-4'>Edit User Role</h2>

                {/* Display the user's email (read-only field) */}
                <div className='mb-4 space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className='mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-5 focus:outline-none'
                    />
                </div>

                {/* Dropdown for selecting the user role */}
                <div className='mb-4 space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Role</label>
                    <select
                        value={role} // Controlled input
                        onChange={(e) => setRole(e.target.value)} // Update state when role is changed
                        className='block w-full shadow-sm sm:text-sm bg-gray-100 border-gray-300 rounded-md py-2.5 px-5 focus:outline-none'
                    >
                        <option value="user">User</option> {/* Regular user role */}
                        <option value="admin">Admin</option> {/* Admin role */}
                    </select>
                </div>

                {/* Modal footer with action buttons */}
                <div className='flex justify-end pt-5'>
                    {/* Cancel button to close the modal */}
                    <button
                        onClick={onClose} // Trigger the modal close callback
                        className="bg-primary text-white px-4 py-2 rounded mr-2">
                        Cancel
                    </button>
                    {/* Save button to update the role */}
                    <button
                        onClick={handleUpdateRole} // Trigger the role update handler
                        className="bg-indigo-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

// Export the component for use in other parts of the application
export default UpdateUserModal;
