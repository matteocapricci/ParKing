import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CustomButton from '../components/CustomButton.js';
import CustomIconButton from '../components/CustomIconButton.js';
import ImageUploader from '../components/ImageUploader.js';
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs.js';

import theme from '../style/palette';
import { error, succes } from '../style/styles.js';

const ChangeImageDialog = ({ open, onClose, onChangeImg, imageData }) => {
    const { handleSetImage, googleError, success } = imageData;

    const propsChangeImg = {
        variant: "outlined",
        color: "secondary",
        sx: { color: theme.palette.info.dark },
        size: "large",
        endIcon: <SaveAsIcon />,
        text: "Save ",
        onClick: onChangeImg,
    }

    const propsCloseImg = {
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
                <EditIcon /> Change Profile Image
            </DialogTitle>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
                <CustomIconButton {...propsCloseImg} />
            </div>
            <DialogContent>
                <DialogContentText sx={{ textAlign: 'left', width: '100%', marginBottom: '30px' }}>
                    Enter your new photo here:
                </DialogContentText>
                <ImageUploader props={{ uploadFunction: handleSetImage }} maxImages={1} minImages={0} />
                {googleError && <p style={error}>{googleError}</p>}
                {success && <p style={succes}>{success}</p>}
            </DialogContent>
            <DialogActions>
                <CustomButton {...propsChangeImg} name='Change' />
            </DialogActions>
        </Dialog>
    );
}

export default ChangeImageDialog;
