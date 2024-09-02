import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Divider } from '@mui/material';
import theme from '../style/palette';
import { delete_doc_by_id } from '../services/firebase/persistenceManager';

const DeleteReservationDialog = ({ open, onClose, reservation, onDelete }) => {
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: theme.palette.error.main, fontWeight: 'bold', textAlign: 'center'  }}>Delete Reservation</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
          Are you sure you want to delete the following reservation?
        </Typography>
        <Box sx={{ padding: '10px', borderRadius: '5px', backgroundColor: theme.palette.background.default }}>
          <Typography variant="body2"><b>Parking:</b> {reservation.parking}</Typography>
          <Typography variant="body2"><b>Code:</b> {reservation.code}</Typography>
          <Typography variant="body2"><b>Check-In:</b> {reservation.CheckIn}</Typography>
          <Typography variant="body2"><b>Check-Out:</b> {reservation.CheckOut}</Typography>
          <Typography variant="body2"><b>Total Cost:</b> {reservation.totalCost}</Typography>
          <Typography variant="body2"><b>Services:</b> {reservation.Services.join(', ')}</Typography>
          <Divider sx={{ marginY: '10px' }} />
          <Typography variant="body2"><b>Total Cost:</b> {reservation.totalCost}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: theme.palette.text.primary }}>
          Cancel
        </Button>
        <Button onClick={() => (onDelete(reservation))} sx={{ backgroundColor: theme.palette.error.main, color: theme.palette.error.contrastText, '&:hover': { backgroundColor: theme.palette.error.dark } }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteReservationDialog;
