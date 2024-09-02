import React from 'react';
import { Avatar, Typography } from '@mui/material';
import theme from '../style/palette';

const ProfileAvatar = ({ displayName, photoURL, email }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Avatar
                alt={displayName || "User"}
                src={photoURL || '/default-profile.png'}
                sx={{ width: 100, height: 100, margin: 'auto', border: `3px solid ${theme.palette.secondary.main}` }}
            />
            <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold', fontSize: '30px' }}>
                {displayName?.split(' ')[0] || "First Name"} {displayName?.split(' ')[1] || "Last Name"}
            </Typography>
            <Typography variant="body1">
                <b>Email:</b> {email || "email@example.com"}
            </Typography>
        </div>
    );
}

export default ProfileAvatar;
