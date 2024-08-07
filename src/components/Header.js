import CustomButton from "./CustomButton";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';


function Header({page}) {

    const buttonHome1 = {
        name: page === ("defaultHomepage" || "registerHomepage") ? (<b>Home</b>) : "Home",
        size: "large",
        //handleClick: ()=>{navigate("/")}
    };

    const buttonHome2 = {
        name: page === "defaultHomepage" ?  "Sign-up" : "Area Personale",
        size: "large",
        //handleClick: ()=>{navigate("/")}
    };

    const buttonHome3 = {
        name: page === "defaultHomepage" ?  "Log-in" : "Log-out",
        size: "large",
        //handleClick: ()=>{navigate("/")}
    };

    const headerStyle = {
        backgroundColor: '#add8e6',
        bottom: 0,
        width: '100%',
        marginTop: '5px',
        marginBottom: '5px',
    };

    const logoStyle = {
        width: '100px',
        height: '100px',
        textAlign: 'left',
        padding: '5px 5px 5px 15px'
    };

    const textStyle = {
        width: '160px',
        height: '90px',
        padding: '5px 5px 5px 15px'
    };

    const buttonGroupStyle = {
        marginLeft: 'auto',
        padding: '5px 15px 5px 5px'
    };

    return (
        <Box style={headerStyle} display="flex" alignItems="center">
            <img src="/logos/parking_logo.png" alt="logo" style={logoStyle} />
            <img src="/logos/ParKing_Text.png" alt="ParKing" style={textStyle}/>
            <Box style={buttonGroupStyle}>
                <ButtonGroup variant="text" color="primary">
                    <CustomButton {...buttonHome1} />
                    <CustomButton {...buttonHome2} />
                    <CustomButton {...buttonHome3} />
                </ButtonGroup>
            </Box>
        </Box>
    );
}

export default Header;