import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { load_docs, push_img, pull_img_url, store_doc, get_docs_by_attribute, delete_doc_by_attribute, update_doc, load_docs_by_attributes, delete_doc } from '../services/firebase/persistenceManager.js';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentPage } from '../store/App.js';
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { currentUser: masterCurrentUser, isAdmin, doSignInWithEmailAndPassword, doPasswordChange, doUpdateProfile } = useAuth();
    const [currentUser, setCurrentUser] = useState(masterCurrentUser);
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
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const page = useSelector(state => state.setCurrentPage.currentPage);

    const handlePopState = () => {
        console.log(page);
        if (page === "reservation"){
            dispatch(resetCurrentPage());
            navigate("/")
        }
    };

    window.addEventListener('popstate', handlePopState);
    

    const handleOldChange = (event) => setOldPassword(event.target.value);
    const handleNewChange = (event) => setNewPassword(event.target.value);
    const handleNewRepChange = (event) => setNewPasswordRep(event.target.value);

    const handleOpenPasswordChange = () => setOpenPassword(true);
    const handleOpenImgChange = () => setOpenImg(true);
    const handleClosePassword = () => setOpenPassword(false);
    const handleCloseImg = () => setOpenImg(false);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const retrieveComments = async (reservations) => {
        try {
            let updatedReservations = [];
            
            const promises = reservations.map(async (element) => {
                try {
                    const retrievedComment = await load_docs_by_attributes("Comment", {
                        uid: currentUser.uid,
                        parkingId: element.parkingId.trim(),
                        'parkingSpot.name': element.parkingSpot.name
                    });
                    
                    return { ...element, comment: retrievedComment };
                } catch (error) {
                    console.error("Failed to retrieve comment for element:", element.doc_id, error);
                    return { ...element, comment: [] };
                }
            });
    
            updatedReservations = await Promise.all(promises);
            
            return updatedReservations;
        } catch (error) {
            console.error("Failed to retrieve comments:", error);
        }
    };

    const retrieveReservations = async () => {
        try{
            let newReservations = await get_docs_by_attribute(currentUser.uid, "Reservations", "uid");
            newReservations = await retrieveComments(newReservations);
            await retrieveComments(newReservations);
            setReservations(newReservations);
        }catch (error) {
            console.error("Failed to retrieve reservations:", error);
        }
    
    };

    
    useEffect(() => {
        retrieveReservations();
    }, [currentUser]); 

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin, navigate]);

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

        }catch (error) {
            console.error("Failed to delete reservation:", error);
        }
    }

    const handleDeleteComment = async (reservation) => {
        try {
            await delete_doc("Comment", reservation.comment[0].doc_id);
    
            const commentPark = await load_docs_by_attributes("Comment", { "parkingId": reservation.parkingId.trim() });
    
            let newAvgRating = 0;
            if (commentPark.length > 0) {
                const totalRating = commentPark.reduce((sum, comment) => sum + comment.rating, 0);
                newAvgRating = totalRating / (commentPark.length);
            }
    
            await update_doc({ avg_rating: newAvgRating }, "Parking", reservation.parkingId.trim());
            retrieveReservations();
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };
    const handleAddComment = async (reservation, text, rating) => {
        let now = new Date();
        now = formatDate(now);

        let comment = {
            'uid': currentUser.uid,
            'text': text,
            'date': now,
            'rating': rating,
            'parkingId': reservation.parkingId.trim(),
            'parkingSpot': reservation.parkingSpot
        }

        try {
            await store_doc(comment, "Comment");
            const park = await load_docs("Parking", comment.parkingId.trim());
            const commentPark = await load_docs_by_attributes("Comment", { "parkingId" : comment.parkingId.trim()});
            
            if (commentPark.length > 0) {
                let updatedAvg = (park.avg_rating+comment.rating)/(commentPark.length);
                await update_doc({ avg_rating: updatedAvg }, "Parking", comment.parkingId.trim());
            }else{
                await update_doc({ avg_rating: comment.rating }, "Parking", comment.parkingId.trim());
            }
            retrieveReservations();
        } catch (error) {
            console.error("Failed to push comment:", error);
        }
    };


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
                      <ReservationList reservations={reservations} deleteFunction={handleDeleteReservation} currentUser={currentUser} deleteCommentFunction={handleDeleteComment} addCommentFunction={handleAddComment} />
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