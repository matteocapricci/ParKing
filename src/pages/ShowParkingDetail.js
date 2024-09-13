import React, { useState } from 'react';
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import MapComponent from "../components/MapComponent.js";
import { Grid } from '@mui/material';
import ParkingCard from "../components/ParkingCard.js";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton.js";
import ReservationReview from "../components/ReservationReview.js";
import { get_docs_by_attribute, load_docs_by_attributes } from '../services/firebase/crudOp.js';
import theme from '../style/palette.js';
import CommentCard from '../components/CommentCard.js';
import { resultCommentListStyle } from '../style/styles';
import { Box, Typography, Card, Paper, Divider } from '@mui/material';


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
                <Grid item md={5} >
                    <Paper elevation={3} sx={{ padding: '10px', backgroundColor: theme.palette.background.paper, borderRadius: '10px'}}>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color={theme.palette.secondary.main}
                            gutterBottom
                            sx={{ textAlign: 'center' }} 
                        >
                            Feedbacks
                        </Typography>
                        <Divider sx={{ marginBottom: '10px' }} />
                        <Box sx={resultCommentListStyle}>
                            {parkComments.length === 0 ? (
                                <Typography variant="h6" align="center" sx={{ color: theme.palette.text.secondary }}>
                                    No comments found.
                                </Typography>
                            ) : (
                                parkComments.map((comment, index) => (
                                <Box key={index} sx={{ marginBottom: '20px' }}>
                                    <CommentCard 
                                        comment={comment} 
                                        username={comment.displayName} 
                                        photoUrl={comment.photoURL} 
                                    />
                                </Box>))
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </div>
        
    );
}

export default ShowParkingDetail;