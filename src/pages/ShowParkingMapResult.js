import Header from "../components/Header";
import Footer from "../components/Footer";
import ParkingCard from "../components/ParkingCard";
import CenterLogo from "../components/CenterLogo.js";
import {
    h1,
    resultCardListStyle
} from '../style/styles.js';
import DestinationForm from "../components/DestinationForm.js";

function ShowParkingMapResult(){
    return (
        <div>
            <Header page={"showParkingMapResult"}/>
            <h1 style={h1}>Available Parking Spots</h1>
            <div style={{display: "flex", minHeight: "73vh", marginTop: "15px"}}>
                <div style={resultCardListStyle}>
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
                </div>
                <div style={{width: "60%", marginTop: "15px"}}>

                </div>
                <div style={{width: "15%", marginRight: "15px", marginTop: "15px"}}>
                    <DestinationForm displayDatePicker={""}/>
                </div>
            </div>

            

            <Footer />
        </div>
        
    );
}

export default ShowParkingMapResult;