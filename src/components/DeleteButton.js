import Button from '@mui/material/Button';
import theme from '../style/palette';
import React, { useState } from 'react';

function DeleteButton({ name, size, variant, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (

    <Button
        variant="outlined"
        sx={{
            backgroundColor: isHovered ? theme.palette.error.dark : theme.palette.error.main,
            color: theme.palette.error.contrastText, 
            border: `1px solid ${theme.palette.error.dark}`,
            '&:hover': {
                backgroundColor: theme.palette.error.dark,
                color: theme.palette.error.contrastText,
            }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick} // Directly use onClick here
        >
        {name}  
    </Button> 
  );
}

export default DeleteButton;
