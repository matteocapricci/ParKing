import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner.js';

const AdminProtectedRoute = ({ children }) => {

    const { isAdmin, loadingAdmin } = useAuth();

    if (loadingAdmin) {
        return <LoadingSpinner></LoadingSpinner>; 
    }

    return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
