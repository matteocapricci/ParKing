import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, Paper, Divider } from '@mui/material';
import theme from '../style/palette';
import { resultCommentListStyle } from '../style/styles';
import CommentCard from '../components/CommentCard'; 
import { load_all_docs, load_docs_by_attributes, delete_doc, load_docs } from '../services/firebase/persistenceManager.js';
import { auth } from '../services/firebase/confFirebase.js';
import CustomButton from '../components/CustomButton.js';

const CommentModeration = () => {

    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(auth.currentUser);


    const retrieveComments = async () => {
        try {
            const retrievedComments = await load_all_docs("Comment");
            let newComments = [];
    
            await Promise.all(retrievedComments.map(async (element) => {
                const user = await load_docs_by_attributes("UserImage", { "uid": element.uid });
                newComments.push({
                    ...element,
                    photoURL: user[0]?.photoURL || '', 
                    displayName: user[0]?.displayName || 'Unknown' 
                });
            }));
    
            await Promise.all(newComments.map(async (element, index) => {
                let id = element.parkingId.trim();
                const park = await load_docs("Parking", id);
                newComments[index] = {
                    ...element,
                    parkingName: park?.name || 'Unknown'
                };
            }));
            setComments(newComments);
        } catch (error) {
            console.error("Failed to retrieve comments:", error);
        }
    };
    

    const handleDeleteComment = async (comment) => {
        try{
            await delete_doc("Comment", comment.id);
            retrieveComments();

        }catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };

    useEffect(() => {
        retrieveComments();
    }, []);

    return (
        <Paper elevation={3} sx={{ padding: '10px', backgroundColor: theme.palette.background.paper, borderRadius: '10px' }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                color={theme.palette.secondary.main}
                gutterBottom
                sx={{ textAlign: 'center' }} 
            >
                Comment Moderation
            </Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <Box sx={resultCommentListStyle}>
                {comments.length === 0 ? (
                    <Typography variant="h6" align="center" sx={{ color: theme.palette.text.secondary }}>
                        No comments found.
                    </Typography>
                ) : (
                    comments.map((comment, index) => (
                        <Card
                            key={index}
                            sx={{ 
                                marginBottom: '10px', 
                                backgroundColor: '#f0f0f0',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                            }}
                        > 
                            <Typography variant="h6" align="center" sx={{ color: theme.palette.primary.light, fontWeight: 'bold' }}>
                                {comment.parkingName}
                            </Typography>
                            <CommentCard comment={comment} username={comment.displayName} photoUrl={comment.photoURL} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>                                    
                                <CustomButton
                                    name="Delete Comment" 
                                    onClick={() => handleDeleteComment(comment)}
                                    variant="outlined"
                                />
                            </Box>
                        </Card>
                    ))
                )}
            </Box>
        </Paper>
    );


}

export default CommentModeration;