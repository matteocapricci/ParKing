import { useEffect, useState } from 'react';
import { Box, Typography, Grid } from "@mui/material";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import GeographyChart from "../components/GeographyChart";
import theme from '../style/palette';
import { load_all_docs } from '../services/firebase/persistenceManager'
import LoadingSpinner from './LoadingSpinner';

const DashBoard = () => {

    const [reservations, setReservations] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [geoData, setGeoData] = useState([]);
    const [loading, setLoading] = useState(true);

    const allStates = [
        "AFG", "AGO", "ALB", "ARE", "ARG", "ARM", "ATA", "ATF", "AUT", "AZE",
        "BDI", "BEL", "BEN", "BFA", "BGD", "BGR", "BHS", "BIH", "BLR", "BLZ",
        "BOL", "BRN", "BTN", "BWA", "CAF", "CAN", "CHE", "CHL", "CHN", "CIV",
        "CMR", "COG", "COL", "CRI", "CUB", "-99", "CYP", "CZE", "DEU", "DJI",
        "DNK", "DOM", "DZA", "ECU", "EGY", "ERI", "ESP", "EST", "ETH", "FIN",
        "FJI", "FLK", "FRA", "GAB", "GBR", "GEO", "GHA", "GIN", "GMB", "GNB",
        "GNQ", "GRC", "GTM", "GUY", "HND", "HRV", "HTI", "HUN", "IDN", "IND",
        "IRL", "IRN", "IRQ", "ISL", "ISR", "ITA", "JAM", "JOR", "JPN", "KAZ",
        "KEN", "KGZ", "KHM", "OSA", "KWT", "LAO", "LBN", "LBR", "LBY", "LKA",
        "LSO", "LTU", "LUX", "LVA", "MAR", "MDA", "MDG", "MEX", "MKD", "MLI",
        "MMR", "MNE", "MNG", "MOZ", "MRT", "MWI", "MYS", "NAM", "NCL", "NER",
        "NGA", "NIC", "NLD", "NOR", "NPL", "NZL", "OMN", "PAK", "PAN", "PER",
        "PHL", "PNG", "POL", "PRI", "PRT", "PRY", "QAT", "ROU", "RUS", "RWA",
        "ESH", "SAU", "SDN", "SDS", "SEN", "SLB", "SLE", "SLV", "ABV", "SOM",
        "SRB", "SUR", "SVK", "SVN", "SWZ", "SYR", "TCD", "TGO", "THA", "TJK",
        "TKM", "TLS", "TTO", "TUN", "TUR", "TWN", "TZA", "UGA", "UKR", "URY",
        "USA", "UZB", "VEN", "VNM", "VUT", "PSE", "YEM", "ZAF", "ZMB", "ZWE",
        "KOR"
    ];
    

    const calculateSizePercentages = () => {
        const sizeCounts = { 'Car': 0, 'Moto': 0, 'Truck': 0 };
        const totalReservations = reservations.length;
    
        reservations.forEach(reservation => {
            if (reservation.parkingSpot && sizeCounts[reservation.parkingSpot.size] !== undefined) {
                sizeCounts[reservation.parkingSpot.size]++;
            }
        });
    
        const colors = {
            Car: "hsl(104, 70%, 50%)",
            Moto: "hsl(162, 70%, 50%)",
            Truck: "hsl(291, 70%, 50%)"
        };

        return Object.keys(sizeCounts).map(size => ({
            id: size+"(%)",
            label: size+"(%)",
            value: totalReservations ? Math.round((sizeCounts[size] / totalReservations) * 100) : 0,
            color: colors[size]
        }));
    };

    const calculateTotalRevenue = () => {
        const totalRevenue = reservations.reduce((total, reservation) => total + Number(reservation.totalCost), 0);
        return totalRevenue.toFixed(2); 
    };
    
    
    const computeMonthlyRevenue = () => {
        const monthlyRevenue = {};
    
        reservations.forEach(reservation => {
            const checkInDate = new Date(reservation.CheckIn);
            const month = checkInDate.toLocaleString('en-US', { month: 'short' });
            const year = checkInDate.getFullYear();
            const key = `${month}-${year}`;
    
            if (!monthlyRevenue[key]) {
                monthlyRevenue[key] = 0;
            }
            monthlyRevenue[key] += reservation.totalCost;
        });
        
        const formattedMonthlyRevenue = Object.keys(monthlyRevenue).map(key => {
            const [month] = key.split('-');
            return {
                x: month,
                y: monthlyRevenue[key]
            };
        });
    
        const monthsOrder = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
    
        const orderedMonthlyRevenue = monthsOrder.map(month => ({
            x: month,
            y: formattedMonthlyRevenue.find(item => item.x === month)?.y || 0
        }));
        
        return [{
            id: "Reservations",
            color: theme.palette.secondary.main,
            data: orderedMonthlyRevenue
        }];
    };
    
    const computeParkingsByState = () => {
        const stateCounts = {};
    
        allStates.forEach(state => {
            stateCounts[state] = 0;
        });
    
        parkings.forEach(parking => {
            const state = parking.location.state;
            if (stateCounts[state] !== undefined) {
                stateCounts[state]++;
            }
        });
        
        const formattedStateCounts = allStates.map(state => ({
            id: state,
            value: stateCounts[state] || 0
        }));
        
        return formattedStateCounts;
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); 
                const reservationsData = await load_all_docs("Reservations");
                setReservations(reservationsData);
    
                const parkingsData = await load_all_docs("Parking");
                setParkings(parkingsData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false); 
            }
        };
    
        fetchData();
    }, []);
    
    useEffect(() => {
        if (reservations.length > 0) {
            setPieData(calculateSizePercentages());
            setTotalRevenue(calculateTotalRevenue());
            setMonthlyRevenue(computeMonthlyRevenue());
        }
    }, [reservations]);
    
    useEffect(() => {
        if (parkings.length > 0) {
            let formattedParks = computeParkingsByState();
            setGeoData(formattedParks);
        }
    }, [parkings]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <LoadingSpinner/>
            </Box>
        );
    }

    return (
        <Grid container spacing={2} sx={{ padding: '10px', backgroundColor: theme.palette.info.light, height: '100%' }}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box
                    sx={{
                        backgroundColor: "#fffec8",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        overflow: 'hidden'
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={theme.palette.secondary.main}
                        gutterBottom
                    >
                        RESERVATIONS
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={theme.palette.primary.main}
                        gutterBottom
                    >
                        {reservations.length}
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: '250px', width: '100%' }}>
                            <PieChart data={pieData}></PieChart>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box
                    sx={{
                        backgroundColor: "#fffec8",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        overflow: 'hidden'
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={theme.palette.secondary.main}
                        gutterBottom
                    >
                        REVENUE GENERATED
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={theme.palette.primary.main}
                        gutterBottom
                    >
                        € {totalRevenue}
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: '250px', width: '100%' }}>
                            <LineChart data={monthlyRevenue} />
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box
                    sx={{
                        backgroundColor: "#fffec8",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        overflow: 'hidden'
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={theme.palette.secondary.main}
                        gutterBottom
                    >
                        GEOGRAPHICAL BASED PARKINGS
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={theme.palette.primary.main}
                        gutterBottom
                    >
                        {parkings.length}
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: '250px', width: '100%' }}>
                            <GeographyChart data={computeParkingsByState()}></GeographyChart>
                        </Box>
                    </Box>
                </Box>
            </Grid>

        </Grid>
    );
}

export default DashBoard;
