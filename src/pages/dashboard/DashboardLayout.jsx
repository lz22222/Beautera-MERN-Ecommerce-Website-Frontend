import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import UserDashboard from './UserDashboard'
import AdminDashboard from './AdminDashboard'

const DashboardLayout = () => {
  // Access the logged-in user information from Redux state
  const { user } = useSelector((state) => state.auth)

  // Redirect to login page if no user is logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Render the appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard /> // Render admin dashboard for admin role
      case 'user':
        return <UserDashboard /> // Render user dashboard for user role
      default:
        return <Navigate to="/login" replace /> // Redirect to login for invalid roles
    }
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start">
      {/* Sidebar section */}
      <header className="lg:w-1/5 sm:w-2/5 w-full border">
        {renderDashboard()} {/* Render the dashboard based on user role */}
      </header>

      {/* Main content section */}
      <main className="p-8 bg-white w-full border mt-5">
        <Outlet /> {/* Render child routes */}
      </main>
    </div>
  )
}

export default DashboardLayout
