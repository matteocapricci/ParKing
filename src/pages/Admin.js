import React, { useContext, useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CenterLogo from '../components/CenterLogo.js';
import PageContainer from '../components/PageContainer.js';
import CustomCard from '../components/CustomCard.js';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileActions from '../components/ProfileActions';
import ChangePasswordDialog from '../components/ChangePasswordDialog';
import CommentModeration from '../components/CommentModeration.js';
import ChangeImageDialog from '../components/ChangeImageDialog';
import DashBoard from '../components/Dashboard.js';
import { Grid } from '@mui/material';
import { AuthContext } from '../contexts/authContext/index.jsx';
import { auth } from '../services/firebase/confFirebase.js';
import { push_img, pull_img_url, store_doc, get_docs_by_attribute, delete_doc_by_attribute, update_doc, load_docs_by_attributes, delete_doc } from '../services/firebase/persistenceManager.js';


const Admin = () => {
    const { doSignInWithEmailAndPassword, doPasswordChange, doUpdateProfile } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const [openPassword, setOpenPassword] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRep, setNewPasswordRep] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [googleError, setGoogleError] = useState('');
    const [success, setSuccess] = useState('');
    const [img, setImg] = useState({});
    const [countryAccessData, setCountryAccessData] = useState([]);

    const handleOldChange = (event) => setOldPassword(event.target.value);
    const handleNewChange = (event) => setNewPassword(event.target.value);
    const handleNewRepChange = (event) => setNewPasswordRep(event.target.value);

    const handleOpenPasswordChange = () => setOpenPassword(true);
    const handleOpenImgChange = () => setOpenImg(true);
    const handleClosePassword = () => setOpenPassword(false);
    const handleCloseImg = () => setOpenImg(false);
    
    useEffect(() => {
        const mockCountryAccessData = [
            { countryCode: 'US', name: 'United States', accessCount: 100 },
            { countryCode: 'CA', name: 'Canada', accessCount: 50 },
            { countryCode: 'GB', name: 'United Kingdom', accessCount: 70 },
            { countryCode: 'IN', name: 'India', accessCount: 90 },
            { countryCode: 'FR', name: 'France', accessCount: 60 },
        ];

        setCountryAccessData(mockCountryAccessData);
    }, []);

    const handleChangePassword = async () => {
        setOldPasswordError('');
        setPasswordError('');
        setSuccess('');
        setGoogleError('');

        if (currentUser.emailVerified) {
            setGoogleError('You cannot change the Google account credential here.');
            return;
        }

        if (newPassword !== newPasswordRep) {
            setPasswordError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError("Password should be at least 6 characters.");
            return;
        }

        try {
            const result = await doSignInWithEmailAndPassword(currentUser.email, oldPassword, null);
            if (!result) {
                setOldPasswordError('Wrong Old password');
                return;
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const result = await doPasswordChange(newPassword);
            if (result) {
                setOldPassword('');
                setNewPassword('');
                setNewPasswordRep('');
                setSuccess('Password changed correctly!');
                setTimeout(() => setSuccess(''), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeImg = async () => {
        setSuccess('');
        setGoogleError('');

        if (currentUser.emailVerified) {
            setGoogleError('You cannot change the Google image here.');
            return;
        }

        try {
            // Upload the image and retrieve the URL once the upload is successful
            const snapshot = await push_img(`UserImages/${currentUser.email}_ProPic`, img, async (snapshot) => {
                const url = await pull_img_url(snapshot.ref.fullPath);
                
                // Set the photoURL of the current user with the retrieved URL
                await doUpdateProfile({ photoURL: url });

                let oldUserImage = await get_docs_by_attribute(currentUser.uid, "UserImage", "uid");
                if (oldUserImage.length === 0) {
                    let userImage = {
                        uid: currentUser.uid,
                        email: currentUser.email,
                        photoURL: url
                    };
                
                    await store_doc(userImage, "UserImage", () => console.log('done'), (error) => console.log('error'));
                } else {
                    let userImage = {
                        uid: currentUser.uid,
                        email: currentUser.email,
                        photoURL: url
                    };
                    await update_doc(userImage, "UserImage", oldUserImage[0].doc_id,
                        () => console.log('error'), 
                        () => console.log('done'), 
                        () => console.log('not exists'));
                }
                
                console.log("Profile updated successfully.");
                console.log(currentUser);
                setSuccess('Image changed correctly!');
                setTimeout(() => {
                    setSuccess("");
                    handleCloseImg();
                }, 4000);
            });
        } catch (error) {
            console.error("An error occurred while uploading the image or updating the profile:", error);
        } 
    };

    return (
        <>
            <Header page={"Admin"} />
            <CenterLogo />
            <PageContainer>
                <Grid container spacing={2} alignItems="flex-start" justifyContent="center" sx={{ marginTop: '20px', padding:'15px'}}>
                    {/* First row */}
                    <Grid item xs={12} md={12}>
                        <DashBoard />
                    </Grid>
                    {/*Second row */}             
                    <Grid item xs={12} md={4}>
                        <CommentModeration></CommentModeration>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <CustomCard
                            horizontal={false}
                            maxWidth="100%"
                            contentWidth="100%"
                            img={currentUser?.photoURL || '/default-profile.png'}
                            children={
                                <>
                                    <ProfileAvatar displayName={currentUser?.displayName} photoURL={currentUser?.photoURL} email={currentUser?.email} />
                                    <ProfileActions onChangeImageClick={handleOpenImgChange} onChangePasswordClick={handleOpenPasswordChange} />
                                </>
                            }
                        />
                    </Grid>

                </Grid>
            </PageContainer>
            <ChangePasswordDialog 
                open={openPassword} 
                onClose={handleClosePassword} 
                onChangePassword={handleChangePassword} 
                passwordData={{ oldPassword, newPassword, newPasswordRep, handleOldChange, handleNewChange, handleNewRepChange, oldPasswordError, passwordError, googleError, success }} 
            />
            <ChangeImageDialog 
                open={openImg} 
                onClose={handleCloseImg} 
                onChangeImg={handleChangeImg} 
                imageData={{ handleSetImage: setImg, googleError, success }} 
            />
            <Footer />
        </>
    );
}

export default Admin;
