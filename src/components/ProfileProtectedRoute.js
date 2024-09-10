import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext/index.jsx';

const ProfileProtectedRoute = ({ children }) => {
    const { userLoggedIn } = useContext(AuthContext);
    return userLoggedIn ? children : <Navigate to="/login" />;
};

export default ProfileProtectedRoute;
