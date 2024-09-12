import { ResponsiveLine } from '@nivo/line';
import { Box } from '@mui/material';

const LineChart = ({ data }) => {

    const processedData = data.map(dataset => ({
        ...dataset,
        data: dataset.data.map(point => ({
            ...point,
            y: point.y === 0 ? 0 : point.y 
        }))
    }));

    return (
        <Box m="20px" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
                <ResponsiveLine
                    data={processedData} 
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false
                    }}
                    yFormat=" >-.2f"
                    curve="cardinal"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Month',
                        legendOffset: 36,
                        legendPosition: 'middle',
                        tickValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Revenue in euros',
                        legendOffset: -50,
                        legendPosition: 'middle',
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    colors={['#FF5733', '#33FF57', '#3357FF']}
                    lineWidth={4}
                    enablePoints={false}
                    pointSize={10}
                    pointBorderWidth={2}
                    pointLabel="data.yFormatted"
                    pointLabelYOffset={-12}
                    enableArea={true}
                    enableTouchCrosshair={true}
                    useMesh={true}
                    legends={[]}
                />
            </Box>
        </Box>
    );
};

export default LineChart;
