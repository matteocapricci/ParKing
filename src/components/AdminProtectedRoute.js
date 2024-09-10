import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext/index.jsx';
import LoadingSpinner from './LoadingSpinner.js';

const AdminProtectedRoute = ({ children }) => {
    const { isAdmin, loadingAdmin } = useContext(AuthContext);

    if (loadingAdmin) {
        return <LoadingSpinner></LoadingSpinner>; 
    }

    return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
