import Button from '@mui/material/Button';

function CustomButton({name, size}) {

    return (
        <div> 
            <Button
                size={size}>
                {name}
            </Button>
        </div>
    );
}

export default CustomButton;