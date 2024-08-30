import React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';

const CustomCard = ({ horizontal, maxWidth, contentWidth, img, children }) => {
    return (
        <Card sx={{ 
                display: 'flex', 
                flexDirection: horizontal ? 'row' : 'column', 
                maxWidth: maxWidth, 
                marginLeft: '20px', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center'  // Optional: centers the text inside the CardContent
            }}>
            <CardContent sx={{ 
                width: contentWidth, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center' 
            }}>
                {children}
            </CardContent>
        </Card>
    );
}

export default CustomCard;
