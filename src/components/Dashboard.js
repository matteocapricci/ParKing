import { Box, Typography, Grid } from "@mui/material";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import GeographyChart from "../components/GeographyChart";
import { mockLineData, mockPieData } from "../data/mockData";
import theme from '../style/palette';

const DashBoard = () => {
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
                        Car size (%)
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: '250px', width: '100%' }}>
                            <PieChart data={mockPieData}></PieChart>
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
                        Revenue Generated
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={theme.palette.primary.main}
                        gutterBottom
                    >
                        $59,342.32
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: '250px', width: '100%' }}>
                            <LineChart data={mockLineData} />
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
                        Geographical based parkings
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={theme.palette.primary.main}
                        gutterBottom
                    >
                        94
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: '250px', width: '100%' }}>
                            <GeographyChart></GeographyChart>
                        </Box>
                    </Box>
                </Box>
            </Grid>

        </Grid>
    );
}

export default DashBoard;
