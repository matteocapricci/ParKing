import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider, Chip } from '@mui/material';
import CustomButton from './CustomButton.js';
import CustomIconButton from './CustomIconButton.js';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import { auth } from '../services/firebase/confFirebase.js';
import theme from '../style/palette.js';
import { setTotalCost } from '../store/App.js';

const ReservationReviewDialog = ({ open, onClose }) => {

    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const calculateTotalCost = () => {
        const inDate = new Date(dateIn);
        const outDate = new Date(dateOut);
        const hours = Math.abs(outDate - inDate) / 36e5;
        return (hours * parking.timePrice).toFixed(2); 
    };

    const parking = useSelector(state => state.selectedParking.selectedParking);
    const dateIn = useSelector(state => state.setDestinationFormField.dateIn);
    const dateOut = useSelector(state => state.setDestinationFormField.dateOut);
    const transport = useSelector(state => state.setDestinationFormField.transport).toUpperCase();
    let [attualCost, setAttualCost] = useState(calculateTotalCost());
    const [selectedServices, setSelectedServices] = useState([]);

    const services = useSelector(state => state.selectedParking.selectedParking.services);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        };
        return date.toLocaleDateString('en-US', options);
    };

    const propsClose = {
        variant: "text",
        color: "error",
        sx: { color: theme.palette.error.main },
        size: "medium",
        icon: <CloseIcon />,
        handleClick: onClose,
    }

    const handleServiceClick = (service) => {
        setSelectedServices(prevSelected => {
            if (prevSelected.includes(service)) {
                let newTotalCost = Number(attualCost) - Number(service.price);
                setAttualCost(newTotalCost.toFixed(2));
                return prevSelected.filter(item => item !== service);
            } else {
                let newTotalCost = Number(attualCost) + Number(service.price);
                setAttualCost(newTotalCost.toFixed(2));
                return [...prevSelected, service];
            }
        });
    };

    const handleConfirmReservationDialog = () => {
        const newReservation = {
            parkingName: '', parkingSpot: {name:'Car1', size: 'Car'}, CheckIn: '2023-10-01 15:00', CheckOut: '2023-10-02 15:30', plate: 'ABC123', totalCost: 20.00, Services:[{name:'Car Wash', price: 20.00}, {name:'Valet Parking', price: 50.00}], uid: currentUser.uid 
        }        
    }

    const handleLoginNavigate = () => {
        navigate('/login');  // Naviga verso la pagina di login
    };

    const handleSignupNavigate = () => {
        navigate('/signup');  // Naviga verso la pagina di signup
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth>
            <DialogTitle sx={{ color: theme.palette.primary.dark, fontWeight: 'bold', fontSize: '25px' }}>
                Confirm Reservation
            </DialogTitle>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
                <CustomIconButton {...propsClose} />
            </div>
            <DialogContent>
            {currentUser !== null ? (
                <DialogContentText sx={{ textAlign: 'left', marginBottom: '30px' }}>
                    <div>
                        <Divider sx={{ marginY: '10px', borderColor: theme.palette.primary.main, borderWidth: '1.5px' }} />
                        <label style={{fontSize: '18px', color: theme.palette.primary.main}}>
                            <b>Parking Name: </b>{parking.name} <br />
                            <b>Parking Address: </b>{parking.location.address}
                        </label>
                        <Divider sx={{ marginY: '10px', borderColor: theme.palette.primary.main, borderWidth: '1.5px' }} />
                        <label style={{fontSize: '18px', color: theme.palette.primary.main}}>
                            <b>From: </b> {formatDate(dateIn)} <br />
                            <b>To: </b> {formatDate(dateOut)}
                        </label>
                        <Divider sx={{ marginY: '10px', borderColor: theme.palette.primary.main, borderWidth: '1.5px' }} />
                        <label style={{fontSize: '18px', color: theme.palette.primary.main}}>
                            <b>Vehicle size selected: </b>{transport} <br />
                        </label>
                        <Divider sx={{ marginY: '10px', borderColor: theme.palette.primary.main, borderWidth: '1.5px' }} />
                        <div style={{color: theme.palette.secondary.main, marginBottom: '5px', marginTop: '20px', fontSize: '18px'}}>
                            <b>Available services to add:</b>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {services && services.map((service, index) => (
                                <Chip 
                                    key={index} 
                                    label={`${service.name}: ${service.price}€`} 
                                    color={selectedServices.includes(service) ? "primary" : "secondary"} 
                                    variant={selectedServices.includes(service) ? "filled" : "outlined"} 
                                    style={{ 
                                        marginBottom: '8px', 
                                        fontSize: '16px',
                                        padding: '12px 16px'
                                    }}
                                    onClick={() => handleServiceClick(service)}
                                />
                            ))}
                        </div>
                        <Divider sx={{ marginY: '10px', borderColor: theme.palette.primary.main, borderWidth: '1.5px' }} />
                        <div style={{ textAlign: 'right' }}>
                            <label style={{fontSize: '22px', color: theme.palette.primary.main}}>
                                <b>Total Cost: </b> <i>{attualCost}€</i>
                            </label>
                        </div>
                    </div>
                </DialogContentText>
            ) : (
                <DialogContentText sx={{ textAlign: 'center', marginBottom: '30px' }}>
                     <div>
                        <label style={{fontSize: '18px', color: theme.palette.primary.main}}>
                            <b>To make a reservation you must</b><br/>
                        </label>
                        <CustomButton name="log-in" onClick={handleLoginNavigate}></CustomButton><br/>
                        <label style={{fontSize: '18px', color: theme.palette.primary.main}}>
                            <b>or</b><br/>
                        </label>
                        <CustomButton name="create an account" onClick={handleSignupNavigate}></CustomButton>
                    </div>
                </DialogContentText>
            )
            }
            </DialogContent>
            {currentUser !== null ? (
                <DialogActions>
                <CustomButton 
                    name='Confirm' 
                    size='large'
                    variant='contained'
                    onClick={handleConfirmReservationDialog}
                />
            </DialogActions>
            ): ("")}
        </Dialog>
    );
}

export default ReservationReviewDialog;
