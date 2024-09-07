import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import MapComponent from "../components/MapComponent.js";
import { Grid } from '@mui/material';
import ParkingCard from "../components/ParkingCard.js";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton.js";
import ReservationReview from "../components/ReservationReview.js";

function ShowParkingDetail(){

    const parking = useSelector(state => state.selectedParking.selectedParking)

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
            <Footer />
        </div>
        
    );
}

export default ShowParkingDetail;