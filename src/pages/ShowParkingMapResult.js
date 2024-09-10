import Header from "../components/Header";
import Footer from "../components/Footer";
import {
    h1
} from '../style/styles.js';
import DestinationForm from "../components/DestinationForm.js";
import MapComponent from "../components/MapComponent.js";
import { Box, Grid } from '@mui/material';
import ParkingCardResultList from "../components/ParkingCardResultList.js";
import SortDropdown from "../components/SortDropdown.js";
import { resultCardListStyle } from '../style/styles';

function ShowParkingMapResult(){

    return (
        <div>
            <Header page={"showParkingMapResult"}/>
            <h1 style={h1}>Available Parking Spots</h1>
            <Grid container spacing={4} alignItems="flex-start" justifyContent="center" sx={{ marginTop: '15px' }}>
                    <Grid item md={2} style={{ padding: 0 }}>
                        <div style={{display: 'flex'}}>
                            <SortDropdown />
                        </div>
                        <Box sx={{...resultCardListStyle, marginRight: '15px'}}>
                            <ParkingCardResultList />
                        </Box>
                    </Grid>
                    <Grid item md={6} style={{ padding: 0 }}>
                        <MapComponent />
                    </Grid>
                    <Grid item md={2} >
                        <DestinationForm />
                    </Grid>
            </Grid>
            <Footer />
        </div>
        
    );
}

export default ShowParkingMapResult;