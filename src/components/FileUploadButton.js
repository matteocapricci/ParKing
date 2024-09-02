import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import theme from "../style/palette";
import { useState } from 'react';

const VisuallyHiddenInput = styled('input') (
    {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    }
);

const FileUploadButton = ({ onFileChange }) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleFileChange = (event) => {
        if (onFileChange) {
            onFileChange(event.target.files);
        }
    };

    return (
        <Button
            component="label"
            variant="outlined"
            style={{ border: '1px solid primary' }}
            color= 'secondary'
            sx={{
                backgroundColor: isHovered ? theme.palette.primary.main :  theme.palette.secondary.dark,
                color: theme.palette.primary.dark,
                border: theme.palette.primary.dark,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            startIcon={<CloudUploadIcon />}> Upload
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
    );
};

export default FileUploadButton;