import React from "react";
import { useContext, useEffect, useState } from "react";
import { auth } from "../../services/firebase/confFirebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
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

    const doCreateUserWithEmailAndPassword = async function (name, surname, email, password, navigate) {
            const registeredUser = {}
            registeredUser["name"] = name
            registeredUser["surname"] = surname
            registeredUser["role"] = false
            registeredUser["link_img"] = ""
    
    
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    registeredUser["uid"] = userCredential.user.uid
                    store_doc(registeredUser,"User")
                    setCurrentUser(userCredential.user.uid);
                    setUserLoggedIn(true);
                    navigate("/");
                    console.log("SUCCESS"); //Debug
                    console.log(registeredUser);
                    return true

                })
                .catch((error) => {
                    console.log("ERRORE"); //Debug
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    return false
                });
    }

    const doSignInWithEmailAndPassword = async function (email, password, navigate) {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setCurrentUser(userCredential.user);
                setUserLoggedIn(true);
                navigate("/");
                console.log("SUCCESS"); //Debug
                console.log(userCredential);
                return true
            })
            .catch((error) => {
                console.log("ERRORE"); //Debug
                return false
            });
    }

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
                console.log("SUCCESS"); //Debug
                return true
            })
            .catch((error) => {
                console.log("ERRORE"); //Debug
                const errorCode = error.code;
                const errorMessage = error.message;
                return false
            });
    }

    const doPasswordChange = (password) => {
        return updatePassword(auth.currentUser, password);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        doCreateUserWithEmailAndPassword,        
        doSignInWithEmailAndPassword,
        doSignInWithGoogle,
        doSignOut        
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}