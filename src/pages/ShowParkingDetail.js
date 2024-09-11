import React, { useContext, useEffect, useState } from 'react';
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import MapComponent from "../components/MapComponent.js";
import { Grid } from '@mui/material';
import ParkingCard from "../components/ParkingCard.js";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton.js";
import ReservationReview from "../components/ReservationReview.js";
import { get_docs_by_attribute, load_docs_by_attributes, load_docs } from '../services/firebase/crudOp.js';
import theme from '../style/palette.js';
import CommentCard from '../components/CommentCard.js';

function ShowParkingDetail(){

    const parking = useSelector(state => state.selectedParking.selectedParking);
    const [parkComments, setParkComment] = useState([]);
    
    const retriveCommentsByParking = async () => {

        try {
            const retrievedComments = await get_docs_by_attribute(parking.doc_id, "Comment", "parkingId");
            let newComments = [];
            
            if (retrievedComments.length > 0 ){
                await Promise.all(retrievedComments.map(async (element) => {
                    const user = await load_docs_by_attributes("UserImage", { "uid": element.uid });
                    newComments.push({
                        ...element,
                        photoURL: user[0]?.photoURL || '', 
                        displayName: user[0]?.displayName || 'Unknown' 
                    });
                }));

                setParkComment(newComments);
                return true;
            }
        } catch (error) {
            console.error("Failed to retrieve comments:", error);
            return false;
        }
    }

    retriveCommentsByParking();

    return (
        <div>
            <Header page={"showParkingDetail"}/>
            <Grid container spacing={4} alignItems="flex-start" justifyContent="center" sx={{ marginTop: '30px' }}>
                <Grid item md={2} style={{ padding: 0 }} >
                    <BackButton />
                    <ParkingCard 
                        id={parking.doc_id}
                        name={parking.name}
                        address={parking.location.address}
                        photo_urls={parking.photo_urls}
                        description={parking.description}
                        rating={parking.avg_rating} 
                        price={parking.timePrice} 
                        services={parking.services}
                    />
                </Grid>
                <Grid item md={6} style={{ padding: 0 }}>
                    <MapComponent />
                </Grid>
                <Grid item md={2} >
                    <ReservationReview />
                </Grid>
            </Grid>
            <div>
            <h1 style={{fontSize: '25px', color: theme.palette.secondary.main, marginLeft: '50px', marginTop: '30px'}}>Comments: </h1>
            {parkComments.length > 0 ? (
                parkComments.map((comment, index) => (
                    <CommentCard 
                        comment={comment} 
                        username={comment.displayName}
                        photoUrl={comment.photoURL} 
                    />
                ))
            ) : (
                <h1 style={{fontSize: '20px', color: theme.palette.primary.main, marginLeft: '50px', marginTop: '20px'}}>
                    There are no comments for this parking
                </h1>
            )}
            </div>
            <Footer />
        </div>
        
    );
}

export default ShowParkingDetail;