import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CenterLogo from '../components/CenterLogo.js';
import PageContainer from '../components/PageContainer.js';
import CustomCard from '../components/CustomCard.js';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileActions from '../components/ProfileActions';
import ChangePasswordDialog from '../components/ChangePasswordDialog';
import ChangeImageDialog from '../components/ChangeImageDialog';
import ReservationList from '../components/ReservationList';
import { Grid } from '@mui/material';
import { AuthContext } from '../contexts/authContext/index.jsx';
import { push_img, pull_img_url, store_doc, get_docs_by_attribute, delete_doc_by_attribute, update_doc } from '../services/firebase/persistenceManager.js';
import { auth } from '../services/firebase/confFirebase.js';
import { error } from '../style/styles.js';

const Profile = () => {
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
    const [reservations, setReservations] = useState([]);

    /*
    const reservations = [
        { parking: 'Central Parking', parkingSpot: 'Car1', code: 'Res-001', CheckIn: '2023-10-01', CheckOut: '2023-10-02', plate: 'ABC123', size: 'Compact', totalCost: '$20.00', Services: ['Car Wash', 'Valet Parking'], uid: currentUser.uid },
        { parking: 'Downtown Garage', parkingSpot: 'Car2', code: 'Res-002', CheckIn: '2023-11-15', CheckOut: '2025-11-16', plate: 'XYZ789', size: 'SUV', totalCost: '$35.00', Services: ['Tire Inflation', 'Battery Check'], uid: currentUser.uid  },
        { parking: 'Airport Lot A', parkingSpot: 'Car1', code: 'Res-003', CheckIn: '2023-12-05', CheckOut: '2023-12-07', plate: 'JKL456', size: 'Sedan', totalCost: '$50.00', Services: ['Interior Cleaning', 'Premium Spot'], uid: currentUser.uid  },
        { parking: 'City Center Parking', parkingSpot: 'Car2', code: 'Res-004', CheckIn: '2023-09-20', CheckOut: '2025-09-21', plate: 'MNO321', size: 'Motorbike', totalCost: '$10.00', Services: ['Helmet Storage', 'Bike Wash'], uid: currentUser.uid  },
    ];
    */


    const handleOldChange = (event) => setOldPassword(event.target.value);
    const handleNewChange = (event) => setNewPassword(event.target.value);
    const handleNewRepChange = (event) => setNewPasswordRep(event.target.value);

    const handleOpenPasswordChange = () => setOpenPassword(true);
    const handleOpenImgChange = () => setOpenImg(true);
    const handleClosePassword = () => setOpenPassword(false);
    const handleCloseImg = () => setOpenImg(false);
;


    const storeReservations = async () => {

        reservations.forEach(element => {
            store_doc(element, "Reservations", null, null);
        });

    }

    const retrieveReservations = async () => {
        try{
            let newReservations = await get_docs_by_attribute(currentUser.uid, "Reservations", "uid");
            setReservations(newReservations); 
            console.log(newReservations);
        }catch (error) {
            console.error("Failed to retrieve reservations:", error);
        }
    
    };

    
    useEffect(() => {
        retrieveReservations();
        console.log("changes");
    }, [currentUser]); //inserisci anche reservations quando lo hosti su firebase

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
            console.log(currentUser)
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
                    console.log(userImage)
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

    const handleDeleteReservation = async (selectedReservation) => { 
        
        try{
            await delete_doc_by_attribute("Reservations", "code", selectedReservation.code);
           
            let newReservations = reservations.filter(item => item !== selectedReservation);
            setReservations(newReservations); 
            console.log(newReservations);

        }catch (error) {
            console.error("Failed to delete reservation:", error);
        }
    }


    return (
        <>
            <Header page={"Profile"} />
            <CenterLogo />
            <PageContainer>
                <Grid container spacing={2} alignItems="flex-start" justifyContent="center" sx={{ marginTop: '20px' }}>
                    <Grid item xs={12} md={4}>
                        <CustomCard
                            horizontal={false}
                            maxWidth="300px"
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
                    <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <ReservationList reservations={reservations} deleteFunction={handleDeleteReservation} />
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

export default Profile;
