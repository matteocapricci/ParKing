import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Card, CardContent, CardActions, Button, Paper, Chip, Divider } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import theme from '../style/palette';
import DeleteButton from '../components/CustomButton.js';
import DeleteReservationDialog from './DeleteReservationDialog';
import { resultCardListStyle } from '../style/styles'; // Import the styles
import CommentCard from '../components/CommentCard'; // Adjust the path as needed


const ReservationList = ({ reservations, deleteFunction }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);

    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false)

    const dummyComments = [
        {
            username: 'John Doe',
            photoURL: 'https://via.placeholder.com/40',
            date: '2024-09-01',
            text: 'Great stay! Very comfortable and clean.',
            rating: 4
        },
    ];


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

    const handleDeleteReservation = (selectedReservation) => { 
        deleteFunction(selectedReservation); 
        handleCloseDelete()
    };

    const propsEliminate = {
        variant: "text",
        color: "error",
        sx: { color: theme.palette.error.main },
        size: "medium",
        handleClick: null,
    }

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
                {filteredReservations.length === 0 ? (
                    <Typography variant="h6" align="center" sx={{ color: theme.palette.text.secondary }}>
                        No {tabIndex === 0 ? 'future' : 'past'} reservations found.
                    </Typography>
                ) : (
                    filteredReservations.map((reservation, index) => (
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
                                    {reservation.code} | {reservation.parking}
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
                                        <b>Total Cost:</b> {reservation.totalCost}
                                    </Typography>
                                    <Box display="flex" flexWrap="wrap" gap="5px">
                                        {reservation.Services.map((service, index) => (
                                            <Chip key={index} label={service} color="secondary" variant="outlined" />
                                        ))}
                                    </Box>
                                    {new Date(reservation.CheckOut) >= new Date() ? (
                                        <></>
                                    ) : (
                                        dummyComments.map((comment, idx) => (<CommentCard key={idx} comment={comment} />))
                                    )}
                                </Box>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                            {new Date(reservation.CheckOut) >= new Date() ? (
                                <DeleteButton name={"Delete"} onClick={() => handleOpenDelete(reservation)}></DeleteButton>
                            ) : (
                                <DeleteButton name={"Add Comment"} onClick={() => console.log(reservation)}></DeleteButton>
                            )}
                        </CardActions>
                            <DeleteReservationDialog
                                open={openDelete}
                                onClose={handleCloseDelete}
                                reservation={reservation}
                                onDelete={handleDeleteReservation}
                            />
                        </Card>
                    ))
                )}
            </Box>
        </Paper>
    );
};

export default ReservationList;