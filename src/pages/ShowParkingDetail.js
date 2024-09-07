import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import MapComponent from "../components/MapComponent.js";
import { Grid } from '@mui/material';
import ParkingCard from "../components/ParkingCard.js";
import { useSelector } from "react-redux";

function ShowParkingDetail(){

    const parking = useSelector(state => state.selectedParking.selectedParking)

    console.log(parking)

    return (
        <div>
            <Header page={"showParkingDetail"}/>
            <Grid container spacing={4} alignItems="flex-start" justifyContent="center" sx={{ marginTop: '15px' }}>
                    <Grid item md={3} >
                        <ParkingCard 
                            id={parking.doc_id}
                            name={parking.name}
                            address={parking.location.address}
                            description={parking.description}
                            rating={4.5} 
                            price={parking.timePrice} 
                            services={parking.services}
                        />
                    </Grid>
                    <Grid item md={7} style={{ padding: 0 }}>
                        <MapComponent />
                    </Grid>
            </Grid>
            <Footer />
        </div>
        
    );
}

export default ShowParkingDetail;