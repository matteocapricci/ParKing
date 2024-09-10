import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import theme from '../style/palette.js';
import { load_by_doc_id, load_docs } from '../services/firebase/crudOp.js';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedParking } from '../store/App.js';
import { Box, Chip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SimpleSlider from './SimpleSlider.js';
import CustomButton from './CustomButton.js';

const ParkingCard = ({ id, name, address, photo_urls, description, services, rating, price }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const parking = useSelector(state => state.selectedParking.selectedParking);
    const parkings = useSelector(state => state.searchedParkings.searchedParkings);

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '500px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        margin: '10px',
    };

    const nameStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: theme.palette.primary.dark
    };

    const addressStyle = {
        color: theme.palette.primary.light,
        marginBottom: '10px',
    };

    const ratingStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        color: theme.palette.primary.light
    };

    const carValueStyle = {
        color: theme.palette.secondary.dark,
        marginRight: '5px'
    };

    const priceStyle = {
        fontSize: '18px',
        color: theme.palette.success.main,
        fontWeight: 'bold',
        marginTop: '30px',
    };

    const handleClick = async (event) => {

        console.log(parking)

        if (parking === null){
            event.preventDefault();
            let park = await load_by_doc_id("Parking", id);
            parkings.forEach(parking => {
                if (id === parking.doc_id) {
                    park.parkingSlots = parking.parkingSlots;
                }
            });
            park = {...park, "doc_id": id};
            dispatch(setSelectedParking(park));
            navigate('/parkingDetail')
        }

    }

    return (
        <div style={cardStyle}>
            <div style={nameStyle}>{name}</div>
            <div style={addressStyle}>{address}</div>
            <div style={ratingStyle}>
                {[...Array(Math.floor(rating))].map((_, i) => (
                    <FontAwesomeIcon icon={faCar} style={carValueStyle} key={i} />
                ))}
                {rating.toFixed(1)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {photo_urls && <SimpleSlider images={parking.photo_urls}/>}
            </div>
            <div style={priceStyle}>{`€${price} / hour`}</div><br/>
            {services && 
            <Box display="flex" flexDirection="column" gap="5px">
                <Divider sx={{ marginY: '10px' }} />
                {description && <div style={{color: theme.palette.primary.main, marginBottom: '10px'}}>
                    <b>Description: </b><br/>{description}
                    </div>}
                <div style={{color: theme.palette.secondary.main, marginBottom: '5px'}}><b>Available services:</b></div>
                {services.map((service, index) => (
                   <Chip key={index} label={service.name + ": " + service.price + "€"} color="secondary" variant="outlined" />
                ))}
            </Box>}
            {parking === null ? (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CustomButton
                    name={<>
                        View details<FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '8px' }} />
                      </>}
                    onClick={handleClick}
                >
                </CustomButton>
            </div>
            ):(
                ''
            )}
            
        </div>
    );
};

export default ParkingCard;