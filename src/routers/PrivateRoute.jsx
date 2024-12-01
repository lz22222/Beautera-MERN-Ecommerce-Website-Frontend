import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children, role }) => {
  // Access user information from Redux state
  const { user } = useSelector((state) => state.auth)

  // Access the current location for redirect purposes
  const location = useLocation()

  // Redirect to login if the user is not logged in
  if (!user) {
    alert('You must be logged in!')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Restrict access if the user's role does not match the required role
  if (role && user.role !== role) {
    alert('You are not authorized to access this page!')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Render children components if user is authenticated and authorized
  return children
}

export default PrivateRoute
