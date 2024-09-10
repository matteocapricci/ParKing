import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import ParkingCard from "../components/ParkingCard";
import { label } from '../style/styles';
import { resetSelectedParking } from '../store/App';

function ParkingCardResultList() {
    const dispatch = useDispatch()

    const parkings = useSelector(state => state.searchedParkings.searchedParkings);
    dispatch(resetSelectedParking());

    return (
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
    )

}

export default ParkingCardResultList;
