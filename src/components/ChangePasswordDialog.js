import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CustomButton from '../components/CustomButton.js';
import CustomIconButton from '../components/CustomIconButton.js';
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import theme from '../style/palette';
import { error, succes } from '../style/styles.js';

const ChangePasswordDialog = ({ open, onClose, onChangePassword, passwordData }) => {
    const {
        oldPassword,
        newPassword,
        newPasswordRep,
        handleOldChange,
        handleNewChange,
        handleNewRepChange,
        oldPasswordError,
        passwordError,
        googleError,
        success
    } = passwordData;

    const propsChangePassword = {
        variant: "outlined",
        color: "secondary",
        sx: { color: theme.palette.info.dark },
        size: "large",
        endIcon: <SaveAsIcon />,
        text: "Save ",
        onClick: onChangePassword,
    }

    const propsClosePassword = {
        variant: "text",
        color: "error",
        sx: { color: theme.palette.error.main },
        size: "medium",
        icon: <CloseIcon />,
        handleClick: onClose,
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth>
            <DialogTitle sx={{ color: theme.palette.primary.dark, fontWeight: 'bold', fontSize: '25px' }}>
                <EditIcon /> Change Password
            </DialogTitle>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
                <CustomIconButton {...propsClosePassword} />
            </div>
            <DialogContent>
                <DialogContentText sx={{ textAlign: 'left', width: '100%', color: theme.palette.primary.main, fontWeight: 'bold' }}>
                    Enter your old password:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="oldPassword"
                    label="Old password"
                    value={oldPassword}
                    onChange={handleOldChange}
                    type="password"
                    fullWidth
                    variant="standard"
                    sx={{ marginBottom: '30px' }} />
                {oldPasswordError && <p style={error}>{oldPasswordError}</p>}
                <DialogContentText sx={{ textAlign: 'left', width: '100%', color: theme.palette.primary.main, fontWeight: 'bold' }}>
                    Enter your new password:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="newPassword"
                    label="New password"
                    value={newPassword}
                    onChange={handleNewChange}
                    type="password"
                    fullWidth
                    variant="standard"
                    sx={{ marginBottom: '30px' }} />
                <DialogContentText sx={{ textAlign: 'left', width: '100%', color: theme.palette.primary.main, fontWeight: 'bold' }}>
                    Repeat your new password:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="newPasswordRep"
                    label="New password"
                    value={newPasswordRep}
                    onChange={handleNewRepChange}
                    type="password"
                    fullWidth
                    variant="standard"
                    sx={{ marginBottom: '30px' }} />
                {passwordError && <p style={error}>{passwordError}</p>}
                {googleError && <p style={error}>{googleError}</p>}
                {success && <p style={succes}>{success}</p>}
            </DialogContent>
            <DialogActions>
                <CustomButton {...propsChangePassword} name='Change' />
            </DialogActions>
        </Dialog>
    );
}

export default ChangePasswordDialog;
