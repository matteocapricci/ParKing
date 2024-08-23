import Button from '@mui/material/Button';
import theme from '../style/palette';

function CustomButton({name, size, variant, handleClick}) {

    const realHandleClick = function () {
        /*if (clicked){
            setClicked(false)
        }
        else {
            setClicked(true)
        }
        if (!!handleClick){
            handleClick()
        }*/
        handleClick()
    }


    return (
        <div> 
            <Button
                size={size}
                variant={variant}
                sx={{ color: theme.palette.secondary.light }}
                onClick={realHandleClick}>
                {name}
            </Button>
        </div>
    );
}

export default CustomButton;