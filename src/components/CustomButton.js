import Button from '@mui/material/Button';
import theme from '../style/palette';
import React, { useState } from 'react';

function CustomButton({ name, size, variant, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      size={size}
      variant={variant}
      sx={{
        backgroundColor: isHovered ? theme.palette.secondary.dark : theme.palette.primary.main,
        color: theme.palette.secondary.light,
        border: theme.palette.primary.dark,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // Directly use onClick here
    >
      {name}
    </Button>
  );
}

export default CustomButton;
