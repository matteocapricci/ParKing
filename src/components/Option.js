
import CustomButton from "./CustomButton";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import theme from "../style/palette";

function Option({ open=true, onClose= ()=>{}, onDelete= ()=>{}, onCancel= ()=>{},deleteLabel, cancelLabel, actionBar }) {

    //Props
    const deleteStyle = {
        color: theme.palette.error.main,
        borderColor: theme.palette.info.main,
        height: "40px",
        '&:hover': {
            borderColor: theme.palette.error.main,
        }
    }

    const cancelStyle = {
        color: theme.palette.info.dark,
        borderColor: theme.palette.info.main,
        height: "40px",
        fontAlign: "center",
        '&:hover': {
            borderColor: theme.palette.info.dark,
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >       <DialogTitle style={{color: theme.palette.info.dark, textAlign: "center"}}>Are you sure you want to delete it?</DialogTitle>
                <DialogActions style={{alignItems: "center", justifyContent: "center"}}>
                    { deleteLabel ? <CustomButton sx={deleteStyle} variant={"outlined"} text={deleteLabel} handleClick={onDelete}/> : ""}
                    { cancelLabel ? <CustomButton sx={cancelStyle} variant={"outlined"} text={cancelLabel} handleClick={onCancel}/> : ""}
                </DialogActions>
        </Dialog>
    );
}

export default Option;
