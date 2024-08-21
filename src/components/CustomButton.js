import Button from '@mui/material/Button';

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
                sx={{ color: 'white' }}
                onClick={realHandleClick}>
                {name}
            </Button>
        </div>
    );
}

export default CustomButton;