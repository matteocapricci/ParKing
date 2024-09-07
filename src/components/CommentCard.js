// src/components/CommentCard.js
import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import CarRating from './CarRating'; 
import { styled } from '@mui/system';
import theme from '../style/palette';

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '12px',
    backgroundColor: '#f8f7b1', 
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    marginBottom: '10px',
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

const CommentCard = ({ comment, username, photoUrl }) => {
    return (
        <StyledCard>
            <CardContent>
                <AvatarWrapper>
                    <Avatar
                        alt={username || "User"}
                        src={photoUrl || '/default-profile.png'} //aggiusta con img del utente
                        sx={{ width: 40, height: 40, marginRight:'10px', border: `2px solid ${theme.palette.secondary.dark}` }}
                    />
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                            {username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {comment.date}
                        </Typography>
                    </Box>
                </AvatarWrapper>
                <CommentText  sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', fontStyle: 'italic' }}>
                    {comment.text}
                </CommentText>
                <CarRating rating={comment.rating} />
            </CardContent>
        </StyledCard>
    );
};

export default CommentCard;
