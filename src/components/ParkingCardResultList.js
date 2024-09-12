import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ParkingCard from "../components/ParkingCard";
import { label } from '../style/styles';
import { resetSelectedParking } from '../store/App';
import LoadingSpinner from './LoadingSpinner';

function ParkingCardResultList() {
    const dispatch = useDispatch()

    const parkings = useSelector(state => state.searchedParkings.searchedParkings);
    const [loading, setLoading] = useState(false);
    dispatch(resetSelectedParking());

    useEffect(() => {
        if(parkings.length > 0){
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [parkings]);

    setTimeout(() => {
        setLoading(false);
    }, 5000);

    return (
        <div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    {parkings.length > 0 ? (
                        parkings.map((parking, index) => (
                            <ParkingCard 
                                key={index}
                                id={parking.doc_id}
                                name={parking.name}
                                address={parking.location.address}
                                rating={parking.avg_rating} 
                                price={parking.timePrice} 
                            />
                        ))
                    ) : (
                        <h3 style={{...label, fontSize: "23px", textAlign: "center", marginRight: "80px"}}>No parking found in this area</h3>
                    )}
                </div>
            )}
        </div>
    )

}

export default ParkingCardResultList;
