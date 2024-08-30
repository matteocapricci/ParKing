import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import {useState} from "react";

// label = label that explains the button type
// variant = "text", "contained" or "outlined"
// color = "primary", "secondary", "error", "warning", "info" or "success"
// size = "small", "medium" or "large"
// children = <DeleteIcon />, <AlarmIcon /> ecc

function CustomIconButton({label, variant, color, sx, size, justClicked, icon, clickedIcon, handleClick}) {
    const [clicked, setClicked] = useState(!!justClicked)
    if(!!justClicked ? justClicked : clicked){
        icon = !!clickedIcon ? clickedIcon : icon
    }
    const realHandleClick = function (){
        if(!!justClicked ? justClicked : clicked){
            setClicked(false)
        }
        else {
            setClicked(true)
        }
        if(!!handleClick){
            handleClick()
        }
    }

    return (
            <IconButton aria-label={label}
                        variant={variant}
                        color={color}
                        sx={sx}
                        size={size}
                        onClick={realHandleClick}>
                {icon}
            </IconButton>
    );
}

export default CustomIconButton;