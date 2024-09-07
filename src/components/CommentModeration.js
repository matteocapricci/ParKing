import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Card, CardContent, CardActions, Button, Paper, Chip, Divider } from '@mui/material';
import theme from '../style/palette';
import DeleteButton from '../components/CustomButton.js';
import DeleteReservationDialog from './DeleteReservationDialog';
import { resultCommentListStyle } from '../style/styles';
import CommentCard from '../components/CommentCard'; 
import CommentDialog from '../components/CommentDialog'; 
import { load_all_docs, load_docs_by_attributes, delete_doc } from '../services/firebase/persistenceManager.js';
import { auth } from '../services/firebase/confFirebase.js';
const CommentModeration = () => {

    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(auth.currentUser);


    const retrieveComments = async () => {
        try {
            const retrievedComments = await load_all_docs("Comment");
            
            let newComments = []

            await Promise.all(retrievedComments.map(async (element) => {
                const user = await load_docs_by_attributes("UserImage", { "uid": element.uid });
                newComments.push({
                    ...element,
                    photoURL: user[0].photoURL,
                    displayName: user[0].displayName
                });
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
                                backgroundColor: theme.palette.background.default,
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                            }}
                        > 
                            <CommentCard comment={comment} username={comment.displayName} photoUrl={comment.photoURL} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                                <DeleteButton 
                                    name="Delete Comment" 
                                    onClick={() => handleDeleteComment(comment)} // Pass the individual comment
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