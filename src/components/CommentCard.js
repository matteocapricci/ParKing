// src/components/CommentCard.js
import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Rating } from '@mui/material';
import CarRating from './CarRating'; 
import { styled } from '@mui/system';
import theme from '../style/palette';

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '12px',
    backgroundColor: theme.palette.secondary.light, 
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    marginBottom: '15px',
    maxWidth: '400px',
    margin: '0 auto', 
    padding: '10px',
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
    width: 50,
    height: 50,
    marginRight: '15px',
}));

const CommentText = styled(Typography)(({ theme }) => ({
    marginTop: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    lineHeight: '1.5',
}));

const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    color: theme.palette.primary.light
};

const CommentCard = ({ comment }) => {
    return (
        <StyledCard>
            <CardContent>
                <AvatarWrapper>
                    <AvatarStyled src={comment.photoURL} />
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                            {comment.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {comment.date}
                        </Typography>
                    </Box>
                </AvatarWrapper>
                <CommentText>
                    {comment.text}
                </CommentText>
                <Rating
                    name="read-only"
                    value={comment.rating}
                    readOnly
                    sx={{ color: theme.palette.secondary.main }}
                />
                <CarRating rating={comment.rating} />
            </CardContent>
        </StyledCard>
    );
};

export default CommentCard;
