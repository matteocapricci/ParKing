import { Box } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import theme from '../style/palette';
import { mockGeographyData } from "../data/mockData";
import { interpolateLab } from 'd3-interpolate'; 

const GeographyChart = () => {

  const baseColors = ['#f9f9f9', theme.palette.secondary.dark];

  const generateColorScale = (colors, num) => {
    const scale = interpolateLab(colors[0], colors[colors.length - 1]);
    const colorArray = [];
    
    for (let i = 0; i < num; i++) {
      const t = i / (num - 1);
      colorArray.push(scale(t));
    }
  
    return colorArray;
  };

  return (
    <Box m="20px" sx={{ display: 'flex', flexDirection: 'column', height: '97%', border: `1px solid ${theme.palette.primary.main}`, borderRadius:"2px" }}>
        <ResponsiveChoropleth
          data={mockGeographyData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.primary.main,
                },
              },
              legend: {
                text: {
                  fill: theme.palette.primary.main,
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.primary.main,
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.primary.main,
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.primary.main,
              },
            },
            background: "#dfeefb",
          }}
          features={geoFeatures.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          domain={[0, 30]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={100} // Adjusted scale for better visibility
          projectionTranslation={[0.5, 0.75]} // Centered on Europe
          projectionRotation={[0, 0, 0]} 
          borderWidth={0.5}
          borderColor={theme.palette.primary.main}
          colors={generateColorScale(baseColors, 30)} 
        />
    </Box>
  );
};

export default GeographyChart;
