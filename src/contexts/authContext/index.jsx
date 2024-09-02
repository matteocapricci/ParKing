import React from "react";
import { useContext, useEffect, useState } from "react";
import { auth } from "../../services/firebase/confFirebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword, updateProfile} from "firebase/auth";
import { store_doc, update_doc, get_docs_by_attribute } from "../../services/firebase/persistenceManager"

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
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
            let userImage = {
                uid: currentUser.uid,
                email: currentUser.email,
                photoURL: null
            };
        
            await store_doc(userImage, "UserImage", () => console.log('done'), (error) => console.log('error'));
           
            
            navigate("/profile");
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
                navigate("/profile");
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
        navigate("/login");
        return auth.signOut();
    }

    const doSignInWithGoogle = async function (navigate) {
        try {
            const provider = new GoogleAuthProvider();
            
            // Sign in with Google and wait for the result
            const userCredential = await signInWithPopup(auth, provider);
            
            const user = userCredential.user;
            setCurrentUser(user);
            setUserLoggedIn(true);
    
            let oldUserImage = await get_docs_by_attribute(user.uid, "UserImage", "uid");
    
            if (oldUserImage.length === 0) {
                let userImage = {
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL
                };
    
                await store_doc(userImage, "UserImage");
                console.log('Document stored successfully');
            } else {
                let doc_id = oldUserImage[0].doc_id;
                let userImage = {
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL
                };
    
                await update_doc("UserImage", doc_id, userImage);
                console.log('Document updated successfully');
            }
    
            navigate("/profile");
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

        updateProfile(auth.currentUser, updates)
        .then((
            console.log('Profile updated!')
        )).catch((error) => {
            console.log('Profile NOT updated!')
          });

    }


    const value = {
        currentUser,
        userLoggedIn,
        loading,
        doCreateUserWithEmailAndPassword,        
        doSignInWithEmailAndPassword,
        doSignInWithGoogle,
        doSignOut,
        doPasswordChange,
        doUpdateProfile,    
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}