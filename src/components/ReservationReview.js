import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faLocationDot, faMotorcycle, faCar, faTruck, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { setTransport } from '../store/App.js';
import {
    error,
    label,
    formContainer,
    heading
} from '../style/styles.js';
import theme from '../style/palette.js';
import { Button, Divider } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import DestinationForm from './DestinationForm.js';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import CustomIconButton from './CustomIconButton.js';
import CloseIcon from '@mui/icons-material/Close';
import ReservationReviewDialog from './ReservationReviewDialog.js';
import { useNavigate } from 'react-router-dom';

const ReservationReview = () => {

    const parking = useSelector(state => state.selectedParking.selectedParking);

    const getUniqueSizes = () => {
        const allSizes = parking.parkingSlots.map(slot => slot.size);
        const uniqueSizes = [...new Set(allSizes)]; 
        return uniqueSizes;
    };

    const dateIn = useSelector(state => state.setDestinationFormField.dateIn);
    const dateOut = useSelector(state => state.setDestinationFormField.dateOut);
    const transport = useSelector(state => state.setDestinationFormField.transport);
    const [tempTransport, setTempTransport] = useState('');
    const [transportError, setTransportError] = useState('');

    let [modifyReservation, setModifyReservation] = useState(false);
    let [confirmReservation, setConfirmReservation] = useState(false);

    const dispatch = useDispatch();

    const radioGroupStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    };

    const radioItemStyle = {
        alignItems: 'center',
        marginRight: '10px',
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '4px',
        transition: 'background-color 0.3s, border-color 0.3s',
        color: theme.palette.secondary.dark
    };

    const activeRadioItemStyle = {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
        borderColor: theme.palette.primary.light,
    };

    const radioInputStyle = {
        marginRight: '10px',
    };

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

    const calculateTotalCost = () => {
        const inDate = new Date(dateIn);
        const outDate = new Date(dateOut);
        const hours = Math.abs(outDate - inDate) / 36e5;
        return (hours * parking.timePrice).toFixed(2); 
    };

    const handleModifyClick = async (event) => {
        setModifyReservation(true);
    }

    const onCloseModifyReservation = async (event) => {
        setModifyReservation(false);
    }

    const handleConfirmClick = async (event) => {
        if (transport === "any" && tempTransport === '') {
            setTransportError('Choose one of the possible vehicol size')
        } else {
            if (transport !== "any") {
                dispatch(setTransport(transport))
            } else {
                dispatch(setTransport(tempTransport))
            }
            setConfirmReservation(true);
        }
    }

    const onCloseConfirmClick = async (event) => {
        setConfirmReservation(false);
    }

    const propsClose = {
        variant: "text",
        color: "error",
        sx: { color: theme.palette.error.main },
        size: "medium",
        icon: <CloseIcon />,
        handleClick: onCloseModifyReservation,
    }

    return (
        <div style={formContainer}>
            <h2 style={{...heading, fontSize: '25px'}}>Reservation Review</h2>
            <Divider sx={{ marginY: '10px', borderColor: theme.palette.primary.main, borderWidth: '1.5px' }} />
            <label style={{...label, fontSize: '20px', color: theme.palette.secondary.main}}>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '10px', color: theme.palette.secondary.main }} />
                <b>Parking Location:</b>
            </label>
            <label style={{...label, fontSize: '18px'}}>
                {parking.name} <br />
                {parking.location.address}
            </label>
            <Divider sx={{ marginY: '10px', borderColor: theme.palette.primary.main, borderWidth: '1.5px'  }} />
            <div style={{ flex: '1' }}>
                <label style={{...label, fontSize: '20px', color: theme.palette.secondary.main }}>
                    <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: '10px', color: theme.palette.secondary.main }} />
                    <b>Parking Duration:</b>
                </label>
            </div>
            <div style={{ flex: '1' }}>
                <label style={{...label, fontSize: '18px', color: theme.palette.primary.main}}>
                    <b>From: </b> {formatDate(dateIn)} <br />
                    <b>To: </b> {formatDate(dateOut)}
                </label>
            </div>
            <Divider sx={{ marginY: '10px', borderColor: theme.palette.primary.main, borderWidth: '1.5px' }} />
                {transport === 'any' ? (
                    <div>
                        <label style={{...label, fontSize: '20px'}}>
                            <FontAwesomeIcon icon={faWandSparkles} style={{ marginRight: '10px' }} />
                            <b>Vehicol size:</b>
                        </label>
                        <div style={radioGroupStyle}>
                            {getUniqueSizes().includes("Moto") ? (
                                <div 
                                style={{ ...radioItemStyle, ...(tempTransport === 'moto' ? activeRadioItemStyle : {}) }} 
                                onClick={() => {
                                    setTempTransport('moto');
                                }}
                                >
                                <FontAwesomeIcon icon={faMotorcycle} style={radioInputStyle} />
                                Moto
                                </div>)
                                : ('')
                            }
                            {getUniqueSizes().includes("Car") ? (
                                <div 
                                style={{ ...radioItemStyle, ...(tempTransport === 'car' ? activeRadioItemStyle : {}) }} 
                                onClick={() => {
                                    setTempTransport('car');
                                }}
                                >
                                <FontAwesomeIcon icon={faCar} style={radioInputStyle} />
                                Car
                                </div>)
                                : ('')
                            }
                            {getUniqueSizes().includes("Truck") ? (
                                <div 
                                style={{ ...radioItemStyle, ...(transport === 'truck' ? activeRadioItemStyle : {}) }} 
                                onClick={() => {
                                    setTempTransport('truck');
                                }}
                                >
                                <FontAwesomeIcon icon={faTruck} style={radioInputStyle} />
                                Truck
                                </div>)
                                : ('')
                            }
                        </div>
                        {transportError && <p style={error}>{transportError}</p>}
                    </div>

                ):(
                    <label style={{fontSize: '18px', color: theme.palette.primary.main}}>
                        <b>Vehicle size selected: </b>{transport.toUpperCase()} <br />
                    </label> 
                )}
            <Divider sx={{ marginY: '10px', borderColor: theme.palette.primary.main, borderWidth: '1.5px' }} />
            <div style={{ textAlign: 'right' }}>
                <label style={{...label, fontSize: '22px'}}>
                    <b>Total Cost: </b> <i>{calculateTotalCost()}€</i>
                </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button variant="contained" style={{ backgroundColor: theme.palette.primary.main, fontSize: '16px', maxWidth: '130px', width: '100%' }} onClick={handleModifyClick}>
                    Modify
                </Button>
                <Button variant="contained" style={{ backgroundColor: theme.palette.success.main, fontSize: '16px', maxWidth: '130px', width: '100%' }} onClick={handleConfirmClick}>
                    Confirm
                </Button>
            </div>

            <Dialog
                open={modifyReservation}
                onClose={onCloseModifyReservation}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ color: theme.palette.primary.dark, fontWeight: 'bold', fontSize: '25px', textAlign: 'center' }}>
                    Modify Reservation
                </DialogTitle>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
                    <CustomIconButton {...propsClose} />
                </div>
                <Divider sx={{ marginY: '10px', borderColor: theme.palette.primary.main, borderWidth: '1.5px', marginLeft: '60px', marginRight: '60px' }} />
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px'}} >
                    <DestinationForm />
                </DialogContent>
            </Dialog>

            <ReservationReviewDialog
                open={confirmReservation}
                onClose={onCloseConfirmClick}
            />

        </div>
    );
}

export default ReservationReview;
