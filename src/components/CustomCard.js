import React from 'react';
import { Card, CardContent } from '@mui/material';

const CustomCard = ({ horizontal, maxWidth, contentWidth, img, children }) => {
    return (
        <Card sx={{ 
                display: 'flex', 
                flexDirection: horizontal ? 'row' : 'column', 
                maxWidth: maxWidth, 
                margin: '10px',
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center', 
                width: '100%' 
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
