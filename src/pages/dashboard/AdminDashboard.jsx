import React from 'react'
// Import logout mutation and Redux tools
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth/authSlice';

// Admin navigation items
const navItems = [
    { path: '/dashboard/admin', label: 'Dashboard' },
    { path: '/dashboard/add-new-product', label: 'Add Product' },
    { path: '/dashboard/manage-products', label: 'Manage Products' },
    { path: '/dashboard/manage-users', label: 'Users' },
    { path: '/dashboard/manage-orders', label: 'Manage Orders' },
]

const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handles logout by calling API and clearing state
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    }

    return (
        <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
            <div>
                {/* Logo section */}
                <div className='nav__logo'>
                    <Link to="/">Beautera<span>.</span></Link>
                    <p className='text-xs italic'>Admin dashboard</p>
                </div>
                <hr className='mt-5' />
                {/* Navigation links */}
                <ul className='space-y-5 pt-5'>
                    {
                        navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    className={({ isActive }) => isActive ? "text-blue-600 font-bold" : 'text-black'}
                                    end
                                    to={item.path}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/* Logout button */}
            <div className='mb-3'>
                <hr className='mb-3' />
                <button
                    onClick={handleLogout}
                    className='text-white bg-primary font-medium px-5 py-1 rounded-sm'>Logout</button>
            </div>
        </div>
    )
}

export default AdminDashboard
