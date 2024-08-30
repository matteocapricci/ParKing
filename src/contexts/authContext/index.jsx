import React from "react";
import { useContext, useEffect, useState } from "react";
import { auth } from "../../services/firebase/confFirebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword, updateProfile} from "firebase/auth";
import { store_doc } from "../../services/firebase/persistenceManager"

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe;
    }, [])

    async function initializeUser(user) {
        if(user){
            setCurrentUser({...user});
            setUserLoggedIn(true);
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const doCreateUserWithEmailAndPassword = async (name, surname, email, password, navigate) => {
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            let displayName = name + ' ' + surname;

            await updateProfile(userCredential.user, { displayName });

            setCurrentUser(userCredential.user);
            setUserLoggedIn(true);
            navigate("/");
            console.log("SUCCESS"); //Debug
            console.log(userCredential.user);
            return true

        } catch (error) {
            console.log("ERROR"); // Debug
            const errorCode = error.code;
            const errorMessage = error.message;
            return false;
        }
    }

    const doSignInWithEmailAndPassword = async function (email, password, navigate) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);
            setUserLoggedIn(true);
            if(navigate){
                navigate("/");
            }
            console.log(userCredential);
            return true; 
        } catch (error) {
            console.error("Error signing in:", error);
            return false;
        }
    };

    const doSignOut = (navigate) => {
        setCurrentUser(null);
        setUserLoggedIn(false);
        navigate("/");
        return auth.signOut();
    }

    const doSignInWithGoogle = async function (navigate) {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            .then((userCredential) => {
                setCurrentUser(userCredential.user);
                setUserLoggedIn(true);
                navigate("/");
                return true
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return false
            });
    }

    const doPasswordChange = async (password) => {
        try {
            await updatePassword(auth.currentUser, password);
            return true; 
        } catch (error) {
            console.error("Password change failed:", error); 
            return false; 
        }
    };


    const value = {
        currentUser,
        userLoggedIn,
        loading,
        doCreateUserWithEmailAndPassword,        
        doSignInWithEmailAndPassword,
        doSignInWithGoogle,
        doSignOut,
        doPasswordChange        
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}