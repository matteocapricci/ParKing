import Header from "../components/Header";
import Footer from "../components/Footer";
import ParkingCard from "../components/ParkingCard";
import {
    h1
} from '../style/styles.js';
import DestinationForm from "../components/DestinationForm.js";
import MapComponent from "../components/MapComponent.js";
import { Grid } from '@mui/material';

function ShowParkingMapResult(){

    return (
        <div>
            <Header page={"showParkingMapResult"}/>
            <h1 style={h1}>Available Parking Spots</h1>
            <Grid container spacing={5} alignItems="flex-start" justifyContent="center" sx={{ marginTop: '15px' }}>
                    <Grid item xs={6} md={2}>
                        <div>
                            <ParkingCard 
                                name="Central Park Garage" 
                                address="123 Main St, New York, NY" 
                                rating={4.5} 
                                price={10} 
                            />
                            <ParkingCard 
                                name="Downtown Parking" 
                                address="456 Elm St, San Francisco, CA" 
                                rating={3.8} 
                                price={8} 
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <MapComponent />
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <DestinationForm />
                    </Grid>
            </Grid>
            <Footer />
        </div>
        
    );
}

export default ShowParkingMapResult;