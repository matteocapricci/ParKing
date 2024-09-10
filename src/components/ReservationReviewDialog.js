import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider, Chip } from '@mui/material';
import CustomButton from './CustomButton.js';
import CustomIconButton from './CustomIconButton.js';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase/confFirebase.js';
import theme from '../style/palette.js';
import { error, input } from '../style/styles.js';
import { store_by_transaction } from '../services/firebase/persistenceManager.js';

const ReservationReviewDialog = ({ open, onClose }) => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State for input field focus and hover
    const [focused, setFocused] = useState(false);
    const [hover, setHover] = useState(false);

    const inputStyles = {
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px 12px',
        fontSize: '16px',
        width: '100%',
        maxWidth: '150px',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        outline: 'none',
        margin: '10px 0',
    };

    const focusedInputStyles = {
        borderColor: '#3498db',
        boxShadow: '0 0 5px rgba(52, 152, 219, 0.5)',
    };

    const hoverInputStyles = {
        borderColor: '#2980b9',
    };

    function formatDateTime(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

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
    const [plate, setPlate] = useState(null);
    const [plateError, setPlateError] = useState('');

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
    };

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

    function isValidLicensePlate(plate) {
        if (plate.length !== 7) {
            return false;
        }
        const plateRegex = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;
        return plateRegex.test(plate.toUpperCase());
    }

    const handleConfirmReservationDialog = async () => {
        if (isValidLicensePlate(plate) && plate !== null) {
            setPlateError('');

            let availableSpot = null;
            parking.parkingSlots.forEach(spot => {
                if (spot.size.toUpperCase() === transport) {
                    availableSpot = spot;
                    return;
                }
            });

            if (availableSpot !== null) {
                const newReservation = {
                    parkingName: parking.name,
                    parkingId: parking.doc_id,
                    parkingSpot: { name: availableSpot.name, size: availableSpot.size },
                    CheckIn: formatDateTime(dateIn),
                    CheckOut: formatDateTime(dateOut),
                    plate: plate,
                    totalCost: attualCost,
                    Services: selectedServices,
                    uid: currentUser.uid
                };

                await store_by_transaction(newReservation, "Reservations")

                navigate("/profile");

            } 
        } else {
            setPlateError("The plate entered does not comply with the characteristics");
        }
    };

    const handleLoginNavigate = () => {
        navigate('/login');
    };

    const handleSignupNavigate = () => {
        navigate('/signup');
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
                                <b>Please enter your license plate here: </b>
                            </label>
                            <input 
                                type="text" 
                                id="plate" 
                                name="plate" 
                                value={plate} 
                                onChange={(e) => setPlate(e.target.value)}
                                required 
                                style={{
                                    ...inputStyles,
                                    ...(focused ? focusedInputStyles : {}),
                                    ...(hover ? hoverInputStyles : {}),
                                }}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                onMouseOver={() => setHover(true)}
                                onMouseOut={() => setHover(false)}
                            />
                            {plateError && <p style={error}>{plateError}</p>}
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
                            <CustomButton name="log-in" onClick={handleLoginNavigate} />
                            <br/>
                            <label style={{fontSize: '18px', color: theme.palette.primary.main}}>
                                <b>or</b><br/>
                            </label>
                            <CustomButton name="create an account" onClick={handleSignupNavigate} />
                        </div>
                    </DialogContentText>
                )}
            </DialogContent>
            {currentUser !== null && (
                <DialogActions>
                    <CustomButton 
                        name='Confirm' 
                        size='large'
                        variant='contained'
                        onClick={handleConfirmReservationDialog}
                    />
                </DialogActions>
            )}
        </Dialog>
    );
}

export default ReservationReviewDialog;
