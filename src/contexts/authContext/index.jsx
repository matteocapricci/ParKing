import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../services/firebase/confFirebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updatePassword, updateProfile } from "firebase/auth";
import { store_doc, update_doc, get_docs_by_attribute } from "../../services/firebase/persistenceManager";
import { resetCurrentPage } from "../../store/App.js"
import { useDispatch, useSelector } from "react-redux";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loadingAdmin, setLoadingAdmin] = useState(false);

    const dispatch = useDispatch();
    const page = useSelector(state => state.setCurrentPage.currentPage);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (currentUser) {
            verifyAdmin(currentUser.email);
        } else {
            setIsAdmin(false);
        }
    }, [currentUser]);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser(user);
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const verifyAdmin = async (email) => {
        setLoadingAdmin(true);
        try {
            const result = await get_docs_by_attribute(email, "Admins", "email");
            if (result.length > 0 && result[0].isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            setLoadingAdmin(false);
        } catch (error) {
            console.error("Error verifying admin:", error);
            setIsAdmin(false);
        }
    };

    const doCreateUserWithEmailAndPassword = async (name, surname, email, password, navigate) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            let displayName = `${name} ${surname}`;
            await updateProfile(userCredential.user, { displayName });
            setCurrentUser(userCredential.user);
            setUserLoggedIn(true);

            const userImage = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                photoURL: null,
                displayName,
                enable: true,
            };

            await store_doc(userImage, "UserImage");

            if (page === "review") {
                dispatch(resetCurrentPage());
                navigate("/parkingDetail")
            } else {
                navigate("/profile")
            }
            
            return true;
        } catch (error) {
            console.error("Error creating user:", error);
            return false;
        }
    };

    const doSignInWithEmailAndPassword = async (email, password, navigate) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);
            setUserLoggedIn(true);
            await verifyAdmin(userCredential.user.email);

            console.log(page);

            if (navigate) {
                if (page === "review") {
                    dispatch(resetCurrentPage());
                    navigate("/parkingDetail")
                } else {
                    navigate("/profile")
                }
            }
            return true;
        } catch (error) {
            console.error("Error signing in:", error);
            return false;
        }
    };

    const doSignOut = (navigate) => {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setIsAdmin(false);
        navigate("/login");
        return auth.signOut();
    };

    const doSignInWithGoogle = async (navigate) => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            setCurrentUser(user);
            setUserLoggedIn(true);

            const oldUserImage = await get_docs_by_attribute(user.uid, "UserImage", "uid");

            if (oldUserImage.length === 0) {
                const userImage = {
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    enable: true,
                };
                await store_doc(userImage, "UserImage");
            } else {
                const doc_id = oldUserImage[0].doc_id;
                const userImage = {
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    enable: true,
                };
                await update_doc("UserImage", doc_id, userImage);
            }

            await verifyAdmin(user.email);
            if (page === "review") {
                dispatch(resetCurrentPage());
                navigate("/parkingDetail")
            } else {
                navigate("/profile")
            }
            return true;
        } catch (error) {
            console.error('Error during sign-in or document update:', error);
            return false;
        }
    };

    const doPasswordChange = async (password) => {
        try {
            await updatePassword(auth.currentUser, password);
            return true;
        } catch (error) {
            console.error("Password change failed:", error);
            return false;
        }
    };

    const doUpdateProfile = async (updates) => {
        try {
            await updateProfile(auth.currentUser, updates);
            console.log('Profile updated!');
        } catch (error) {
            console.log('Profile NOT updated!', error);
        }
    };

    const value = {
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

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
