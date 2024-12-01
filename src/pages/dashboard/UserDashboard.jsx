import React from 'react'
// Import necessary hooks and functions from React Router and Redux
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'

// Define navigation items for the user dashboard
const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/orders', label: 'Order' },
    { path: '/dashboard/payments', label: 'Payments' },
    { path: '/dashboard/profile', label: 'Profile' },
    { path: '/dashboard/reviews', label: 'Reviews' },
]

const UserDashboard = () => {
    const [logoutUser] = useLogoutUserMutation(); // Logout API mutation
    const dispatch = useDispatch(); // Dispatch function from Redux
    const navigate = useNavigate(); // Navigation function from React Router

    // Handle user logout
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap(); // Call the logout mutation
            dispatch(logout()); // Clear user state from Redux
            navigate('/'); // Navigate back to the homepage
        } catch (error) {
            console.error("Failed to log out", error); // Log any errors
        }
    }

    return (
        <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
            <div>
                {/* Logo and header section */}
                <div className='nav__logo'>
                    <Link to="/">Beautera<span>.</span></Link>
                    <p className='text-xs italic'>User dashboard</p>
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

export default UserDashboard
