import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Button, Divider } from '@mui/material';
import { load_all_docs, update_doc, delete_doc } from '../services/firebase/persistenceManager';
import theme from '../style/palette';
import { resultCommentListStyle } from '../style/styles';
import CustomButton from '../components/CustomButton';

const UserModeration = () => {
    const [users, setUsers] = useState([]);

    const retrieveUsers = async () => {
        try {
            const retrievedUsers = await load_all_docs("UserImage");
            setUsers(retrievedUsers);
        } catch (error) {
            console.error("Failed to retrieve users:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await delete_doc("UserImage", userId); 
            retrieveUsers(); 
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const handleDisableUser = async (user) => {
        try {
            await update_doc({ enable: false }, "UserImage", user.id);
            retrieveUsers(); 
        } catch (error) {
            console.error("Failed to disable user:", error);
        }
    };

    const handleEnableUser = async (user) => {
        try {
            await update_doc({ enable: true }, "UserImage", user.id); 
            retrieveUsers(); 
        } catch (error) {
            console.error("Failed to enable user:", error);
        }
    };

    useEffect(() => {
        retrieveUsers();
    }, []);

    return (
        <Paper elevation={3} sx={{ padding: '10px', backgroundColor: theme.palette.background.default, borderRadius: '10px' }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                color={theme.palette.secondary.main}
                gutterBottom
                sx={{ textAlign: 'center' }}
            >
                User Moderation
            </Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <Box sx={{ ...resultCommentListStyle, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {users.length === 0 ? (
                    <Typography variant="h6" align="center" sx={{ color: '#666' }}>
                        No users found.
                    </Typography>
                ) : (
                    users.map((user, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '8px',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Avatar alt={user.displayName} src={user.photoURL || '/default-profile.png'} sx={{ width: 50, height: 50 }} />
                                <Typography variant="body1" fontWeight="bold">{user.displayName || 'Unknown User'}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', gap: '10px' }}>                                 
                                <CustomButton 
                                    name="Delete Account"
                                    onClick={() => handleDeleteUser(user.id)}
                                    variant="outlined"
                                />
                                {user.enable ? (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDisableUser(user)}
                                    >
                                        Disable Account
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleEnableUser(user)}
                                    >
                                        Enable Account
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
        </Paper>
    );
};

export default UserModeration;
