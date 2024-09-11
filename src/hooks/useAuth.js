import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/authContext/index.jsx';

const useAuth = () => {
    const { 
        currentUser, 
        userLoggedIn,
        loading,
        isAdmin,
        loadingAdmin,
        doCreateUserWithEmailAndPassword,
        doSignInWithEmailAndPassword,
        doSignInWithGoogle,
        doSignOut,
        doPasswordChange,
        doUpdateProfile} = useContext(AuthContext);

    return {
        currentUser,
        userLoggedIn,
        loading,
        isAdmin,
        loadingAdmin,
        doCreateUserWithEmailAndPassword,
        doSignInWithEmailAndPassword,
        doSignInWithGoogle,
        doSignOut,
        doPasswordChange,
        doUpdateProfile,
    };
};

export default useAuth;