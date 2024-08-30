import React, { useContext, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import theme from '../style/palette';
import CenterLogo from '../components/CenterLogo.js';
import PageContainer from '../components/PageContainer.js';
import CustomCard from '../components/CustomCard.js';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Avatar, Typography } from '@mui/material';
import { AuthContext } from '../contexts/authContext/index.jsx';
import CustomButton from '../components/CustomButton.js';
import CustomIconButton from '../components/CustomIconButton.js';
import {
    succes,
    error,
  } from '../style/styles.js';

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRep, setNewPasswordRep] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [success, setSuccess] = useState('');
    const { doSignInWithEmailAndPassword, doPasswordChange } = useContext(AuthContext);


    const handleOldChange = function (event){
        setOldPassword(event.target.value);
    }

    const handleNewChange = function (event){
        setNewPassword(event.target.value);
    }

    const handleNewRepChange = function (event){
        setNewPasswordRep(event.target.value);
    }



    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setOldPasswordError('');
        setPasswordError('');
        setSuccess('')
    }

    const handleSave = async () => {

        setOldPasswordError('');
        setPasswordError('');
        setSuccess('')

        if (newPassword !== newPasswordRep) {
            setPasswordError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError("Password should be at least 6 characters.");
            return;
        }
        

        try {
            const result = await doSignInWithEmailAndPassword(currentUser.email, oldPassword, null);
            if(!result){
                setOldPasswordError('Wrong Old password');
                return;
                }
        } catch (error) {
            console.log(error)
        }

        try {
            const result = await doPasswordChange(newPassword);
            console.log(result);
            if(result){
                setOldPassword('');
                setNewPassword('');
                setNewPasswordRep('');
                setSuccess('Password changed correctly!');
            } 
        }catch (error) {
            console.log(error)
        }

        //handleClose(); // Optionally close the dialog on save
    }


    const propsEdit = {
        variant: "outlined",
        color: "secondary",
        sx: { color: theme.palette.info.dark },
        size: "large",
        endIcon: <EditIcon />,
        text: "Edit profile",
        handleClick: () =>{}
    }

    const propsRemoveCurrentImage = {
        variant: "outlined",
        color: "secondary",
        sx: { color: theme.palette.info.dark },
        size: "large",
        endIcon: <DeleteIcon />,
        text: "Delete Image",
        handleClick: () => {}
    }

    const propsSave = {
        variant: "outlined",
        color: "secondary",
        sx: { color: theme.palette.info.dark },
        size: "large",
        endIcon: <SaveAsIcon />,
        text: "Save ",
        onClick: () => { handleSave();},
    }

    const propsClose = {
        variant: "text",
        color: "error",
        sx: {color: theme.palette.error.main },
        size: "medium",
        icon: <CloseIcon />,
        handleClick: () => { handleClose();},
    }

    return (
        <>
            <Header page={"Profile"} />
            <CenterLogo />
            <PageContainer>
                <Grid container spacing={2} alignItems="flex-start" justifyContent="center" sx={{ marginTop: '20px' }}>
                    <Grid item xs={12} md={4}>
                        <CustomCard
                            horizontal={false}
                            maxWidth="300px"
                            contentWidth="100%"
                            img={currentUser?.photoURL || '/default-profile.png'} 
                            onClick={null}
                            children={
                                <>
                                    <div style={{ textAlign: 'center' }}>
                                        <Avatar
                                            alt={currentUser?.displayName || "User"}
                                            src={currentUser?.photoURL || '/default-profile.png'}
                                            sx={{ width: 100, height: 100, margin: 'auto', border: `3px solid ${theme.palette.secondary.main}` }}
                                        />
                                        <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold', fontSize:'30px'}}>
                                            {currentUser?.displayName?.split(' ')[0] || "First Name"} {currentUser?.displayName?.split(' ')[1] || "Last Name"}
                                        </Typography>
                                        <Typography variant="body1">
                                            <b>Email:</b> {currentUser?.email || "email@example.com"}
                                        </Typography>
                                        

                                        <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', width: '100%', marginTop: '20px' }}>
                                            <div style={{ borderBottom: `2px solid ${theme.palette.primary.main}`, width: '100%', position: 'relative' }}></div>
                                        </div>


                                        
                                        <div style={{ marginTop: '20px' }}>
                                            <CustomButton name = "Change Image" onClick ={() => (console.log(currentUser))}></CustomButton>
                                        <div/>
                                        <div style={{ marginTop: '15px' }}></div>
                                            <CustomButton name = "Change Password" onClick ={handleOpen}></CustomButton>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                maxWidth="sm"
                                                fullWidth>
                                                <DialogTitle sx={{ color: theme.palette.primary.dark, fontWeight: 'bold', fontSize:'25px'}}>
                                                    <EditIcon/> Change Password 
                                                </DialogTitle>
                                                <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
                                                    <CustomIconButton {...propsClose} />
                                                </div>
                                                <DialogContent>
                                                    <DialogContentText sx={{textAlign: 'left', width: '100%', color: theme.palette.primary.main, fontWeight: 'bold'}}>
                                                        Enter your old password:
                                                    </DialogContentText>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="odlPassword"
                                                        label="Old password"
                                                        value={oldPassword}
                                                        onChange={handleOldChange}
                                                        type="text"
                                                        fullWidth
                                                        variant="standard"
                                                        sx={{marginBottom: '30px'}}/>
                                                    {oldPasswordError && <p style={error}>{oldPasswordError}</p>}
                                                    <DialogContentText sx={{textAlign: 'left', width: '100%', color: theme.palette.primary.main, fontWeight: 'bold'}}>
                                                        Enter your new password:
                                                    </DialogContentText>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="newPassword"
                                                        label="New password"
                                                        value={newPassword}
                                                        onChange={handleNewChange}
                                                        type="text"
                                                        fullWidth
                                                        variant="standard"
                                                        sx={{marginBottom: '30px'}}/>
                                                    <DialogContentText sx={{textAlign: 'left', width: '100%', color: theme.palette.primary.main, fontWeight: 'bold'}}>
                                                        Repeat your new password:
                                                    </DialogContentText>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="newPasswordRep"
                                                        label="New password"
                                                        value={newPasswordRep}
                                                        onChange={handleNewRepChange}
                                                        type="text"
                                                        fullWidth
                                                        variant="standard"
                                                        sx={{marginBottom: '30px'}}/>
                                                    {passwordError && <p style={error}>{passwordError}</p>}
                                                    {success && <p style={succes}>{success}</p>}
                                                </DialogContent>
                                                <DialogActions>
                                                    <CustomButton {...propsSave} name='Change'/>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </div>
                                </>
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        
                    </Grid>
                </Grid>
            </PageContainer>
            <Footer />
        </>
    );
}

export default Profile;
