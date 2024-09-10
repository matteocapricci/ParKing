import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Card, CardContent, CardActions, Button, Paper, Chip, Divider } from '@mui/material';
import theme from '../style/palette';
import DeleteReservationDialog from './DeleteReservationDialog';
import { resultCardListStyle } from '../style/styles';
import CommentCard from '../components/CommentCard'; 
import CommentDialog from '../components/CommentDialog'; 
import { CircularProgress } from '@mui/material';
import CustomButton from '../components/CustomButton.js';

const ReservationList = ({ reservations, deleteFunction, deleteCommentFunction, addCommentFunction, currentUser }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [selectedReservation, setselectedReservation] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    const handleOpenCommentDialog = (reservation) => (setselectedReservation(reservation), setOpenCommentDialog(true));
    const handleCloseCommentDialog = () => (setselectedReservation(null), setOpenCommentDialog(false));

    useEffect(() => {
        filterReservations();
    }, [tabIndex, reservations]);

    const handleChangeTab = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const filterReservations = () => {
        const now = new Date();
        const filtered = reservations.filter(reservation => {
            const reservationDate = new Date(reservation.CheckOut);
            return tabIndex === 0 
                ? reservationDate >= now 
                : reservationDate < now;
        });
        setFilteredReservations(filtered);
    };

    const isOngoing = (reservation) => {
        const now = new Date();
        const checkIn = new Date(reservation.CheckIn);
        const checkOut = new Date(reservation.CheckOut);
        return checkIn <= now && now <= checkOut;
    };

    const handleDeleteReservation = (selectedReservation) => { 
        deleteFunction(selectedReservation); 
        handleCloseDelete();
    };

    const handleDeleteComment = async (comment) => {
        deleteCommentFunction(comment);
    };

    const handleAddComment = async (reservation, text, rating) => {
        addCommentFunction(reservation, text, rating);
    };

    // Separate ongoing and future reservations
    const sortedReservations = [
        ...filteredReservations.filter(isOngoing),
        ...filteredReservations.filter(reservation => !isOngoing(reservation))
    ];

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: theme.palette.background.paper, borderRadius: '10px' }}>
            <Box sx={{ width: '100%', marginBottom: '20px', textAlign: 'center' }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleChangeTab}
                    centered
                    indicatorColor="secondary"
                    textColor="secondary"
                    sx={{
                        '& .MuiTab-root': {
                            fontWeight: 'bold',
                            color: theme.palette.text.primary,
                        },
                        '& .Mui-selected': {
                            color: theme.palette.secondary.main,
                        },
                    }}
                >
                    <Tab label="Future Reservations" />
                    <Tab label="Past Reservations" />
                </Tabs>
            </Box>

            <Box sx={resultCardListStyle}>
                {sortedReservations.length === 0 ? (
                    <Typography variant="h6" align="center" sx={{ color: theme.palette.text.secondary }}>
                        No {tabIndex === 0 ? 'future' : 'past'} reservations found.
                    </Typography>
                ) : (
                    sortedReservations.map((reservation, index) => (
                        <Card
                            key={index}
                            sx={{ 
                                marginBottom: '20px', 
                                backgroundColor: theme.palette.background.default,
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                    {reservation.parkingSpot.name} | {reservation.parkingName}
                                </Typography>
                                <Divider sx={{ marginBottom: '10px' }} />
                                <Box display="flex" flexDirection="column" sx={{ gap: '10px' }}>
                                    <Box display="flex" alignItems="center" gap="50px">
                                        <Typography variant="body1">
                                            <b>Check-In:</b> {reservation.CheckIn}
                                        </Typography>
                                        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2, borderColor: theme.palette.divider }} />
                                        <Typography variant="body1">
                                            <b>Check-Out:</b> {reservation.CheckOut}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1">
                                        <b>Total Cost:</b> €{reservation.totalCost}
                                    </Typography>
                                    <Box display="flex" flexWrap="wrap" gap="5px">
                                        {reservation.Services.map((service, index) => (
                                            <Chip key={index} label={service.name} color="secondary" variant="outlined" />
                                        ))}
                                    </Box>
                                    <Box display="flex" justifyContent={isOngoing(reservation) ? 'flex-end' : 'flex-end'} alignItems="center" gap="10px">
                                        {isOngoing(reservation) && (
                                            <>
                                                <CircularProgress size={24} sx={{ color: 'green', animation: 'pulse 1.5s infinite' }} />
                                                <Typography variant="body1" sx={{ color: 'green', fontWeight: 'bold' }}>On-going</Typography>
                                            </>
                                        )}
                                        {new Date(reservation.CheckOut) < new Date() && !isOngoing(reservation) && (
                                            reservation.comment && reservation.comment.length > 0 ? (
                                                reservation.comment.map((comment, idx) => (
                                                    <Box key={idx}>
                                                        <CommentCard comment={comment} username={currentUser.displayName} photoUrl={currentUser.photoURL} />
                                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                                                            <CustomButton
                                                                name="Delete Comment" 
                                                                variant="outlined"
                                                                onClick={() => handleDeleteComment(reservation)}
                                                            ></CustomButton>
                                                        </Box>
                                                    </Box>
                                                ))
                                            ) : (
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        
                                                <CustomButton
                                                    name="Add Comment" 
                                                    onClick={() => handleOpenCommentDialog(reservation)} 
                                                    variant="outlined"
                                                />
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                {!isOngoing(reservation) && new Date(reservation.CheckOut) >= new Date() && (
                                    <CustomButton name="Delete" onClick={() => handleOpenDelete(reservation)} variant="outlined" />
                                )}
                            </CardActions>
                            <DeleteReservationDialog
                                open={openDelete}
                                onClose={handleCloseDelete}
                                reservation={reservation}
                                onDelete={handleDeleteReservation}
                            />
                            <CommentDialog
                                open={openCommentDialog}
                                reservation={selectedReservation}
                                onClose={handleCloseCommentDialog}
                                onCommentSubmit={handleAddComment}
                            />
                        </Card>
                    ))
                )}
            </Box>
        </Paper>
    );
};

export default ReservationList;
