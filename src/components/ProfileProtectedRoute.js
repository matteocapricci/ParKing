import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProfileProtectedRoute = ({ children }) => {
    const { userLoggedIn } = useAuth();
    return userLoggedIn ? children : <Navigate to="/login" />;
};

export default ProfileProtectedRoute;
