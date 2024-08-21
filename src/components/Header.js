import CustomButton from "./CustomButton";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";


function Header({page}) {

    const navigate = useNavigate();

    const handleClickLoginPage = () => {
        console.log(page)
        if (buttonHome3.name === 'Log-in') {
            navigate("/login")
        } else {
            navigate("/")
        }
    };

    const buttonHome1 = {
        name: page === ("defaultHomepage") ? (<b style={{ color: "#FFAF1F"}}>Home</b>) : "Home",
        size: "large",
        variant: "text",
        handleClick: ()=>{navigate("/")}
    };

    const buttonHome2 = { 
        name: page === ("defaultHomepage" || "login") ?  "Sign-up" : "Area Personale",
        size: "large",
        variant: "text"
        //handleClick: ()=>{navigate("/")}
    };

    const buttonHome3 = {
        name: page === "defaultHomepage" ?  "Log-in" : "Log-out",
        size: "large",
        variant: "text",
        handleClick: handleClickLoginPage
    };

    const headerStyle = {
        backgroundColor: '#304269',
        width: '100%'
    };

    const logoStyle = {
        width: '100px',
        height: '100px',
        textAlign: 'left',
        padding: '5px 5px 5px 15px'
    };

    const buttonGroupStyle = {
        marginLeft: 'auto',
        padding: '5px 15px 5px 5px'
    };

    return (
        <Box style={headerStyle} display="flex" alignItems="center">
            <img src="/logos/parking_logo.png" alt="logo" style={logoStyle} />
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