import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import theme from '../style/palette';
import CustomButton from '../components/CustomButton.js';
import { error as errorStyle } from '../style/styles.js';

const CommentDialog = ({ open, onClose, onCommentSubmit, reservation }) => {
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (commentText.trim() && rating > 0) {
            onCommentSubmit(reservation, commentText, rating);
            setCommentText('');
            setRating(0);
            setError('');
            onClose();
        } else {
            setError('Please provide a comment and select a rating.');
        }
    };

    const ratingStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        marginTop: theme.spacing(2),
        color: theme.palette.secondary.main,
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.secondary.main,
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                padding: theme.spacing(2),
            }}>
                Submit Comment
            </DialogTitle>
            <DialogContent sx={{
                backgroundColor: theme.palette.background.default,
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                padding: theme.spacing(3),
            }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Comment"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    sx={{ marginBottom: theme.spacing(2) }}
                />
                <Box sx={ratingStyle}>
                    <Typography sx={{ color: theme.palette.text.primary }}>Rating:</Typography>
                    {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon
                            key={index}
                            icon={faCar}
                            style={{
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: index < rating ? theme.palette.secondary.main : theme.palette.text.disabled,
                            }}
                            onClick={() => setRating(index + 1)}
                        />
                    ))}
                </Box>
                {error && <Typography sx={errorStyle}>{error}</Typography>}
            </DialogContent>
            <DialogActions sx={{ backgroundColor: theme.palette.background.paper }}>
                <Button onClick={onClose} sx={{ color: theme.palette.text.primary }}>
                    Cancel
                </Button>
                <CustomButton onClick={handleSubmit} variant="contained" color="secondary" name={'Submit'}>
                </CustomButton>
            </DialogActions>
        </Dialog>
    );
};

export default CommentDialog;
