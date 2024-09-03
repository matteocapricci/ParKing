import React, { useContext, useEffect, useState } from 'react';
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
import { push_img, pull_img_url, store_doc, get_docs_by_attribute, delete_doc_by_attribute, update_doc, load_docs_by_attributes, delete_doc } from '../services/firebase/persistenceManager.js';
import { auth } from '../services/firebase/confFirebase.js';

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
        { parkingId: 'bUvHDar4FkvSKzWc8Ljr',parkingName: 'Central Parking', parkingSpot: {name:'Car1', size: 'Car'}, CheckIn: '2023-10-01 15:00', CheckOut: '2023-10-02 15:30', plate: 'ABC123', totalCost: 20.00, Services:[{name:'Car Wash', price: 20.00}, {name:'Valet Parking', price: 50.00}], uid: currentUser.uid },
        { parkingId: 'bUvHDar4FkvSKzWc8Ljr', parkingName: 'Downtown Garage', parkingSpot: {name:'Car1', size: 'Car'}, CheckIn: '2023-11-15 16:00', CheckOut: '2025-11-16 16:30', plate: 'XYZ789', totalCost: 35.00, Services:[{name:'Tire Inflation',price: 10.00}, {name:'Battery Check', price: 60.00}], uid: currentUser.uid  },
        { parkingId: 'bUvHDar4FkvSKzWc8Ljr', parkingName: 'Airport Lot A', parkingSpot: {name:'Car1', size: 'Car'}, CheckIn: '2023-12-05 17:00', CheckOut: '2023-12-07 18:00', plate: 'JKL456', totalCost: 50.00, Services:[{name:'Interior Cleaning',price: 30.00}, {name:'Premium Spot', price: 70.00}], uid: currentUser.uid  },
        { parkingId: 'bUvHDar4FkvSKzWc8Ljr', parkingName: 'City Center Parking', parkingSpot: {name:'Car2', size: 'Car'}, CheckIn: '2023-09-20 09:00', CheckOut: '2025-09-21 09:10', plate: 'MNO321', totalCost: 10.00, Services: [{name:'Helmet Storage',price: 40.00}, {name:'Bike Wash', price: 80.00}], uid: currentUser.uid  },
    ];
    

    const parks = {
        "doc_id": "parking_001",
        "nome": "City Center Parking",
        "descrizione": "Secure and affordable parking in the heart of the city, within walking distance to major attractions and shopping centers.",
        "location": {
          "address": "123 Main St, Downtown",
          "city": "Metropolis",
          "state": "NY",
          "postal_code": "10001",
          "latitude": 40.712776,
          "longitude": -74.005974
        },
        "timePrice": 2.00,
        "parkingSlots": [
            {name:'Car1', size: 'Car'},
            {name:'Car2', size: 'Car'}
        ],
        "services":[
            {name:'Car Wash', price: 20.00}, 
            {name:'Valet Parking', price: 50.00},
            {name:'Helmet Storage',price: 40.00}, 
            {name:'Bike Wash', price: 80.00}
        ],
        "photo_urls": [
          "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
          "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ]
      }      
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

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const retrieveComments = async (reservations) => {
        try {
            let updatedReservations = [];
            
            // Create an array of promises for parallel execution
            const promises = reservations.map(async (element) => {
                try {
                    const retrievedComment = await load_docs_by_attributes("Comment", {
                        uid: currentUser.uid,
                        parkingId: element.parkingId,
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

    const handleDeleteComment = async (reservation) => {
        try{
            await delete_doc("Comment", reservation.comment[0].doc_id);
            retrieveReservations();

        }catch (error) {
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
            'parkingId': reservation.parkingId,
            'parkingSpot': reservation.parkingSpot
        }

        try {
            await store_doc(comment, "Comment");
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
