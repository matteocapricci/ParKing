import CustomButton from "./CustomButton";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import {
    headerStyle,
    buttonGroupStyle,
} from '../style/styles.js';
import { useContext } from "react";
import { AuthContext } from '../contexts/authContext/index.jsx';

const logoStyle = {
    width: '100px',
    height: '100px',
    textAlign: 'left',
    padding: '5px 5px 5px 15px'
};


function Header({page}) {

    const navigate = useNavigate();
    const {userLoggedIn, doSignOut} = useContext(AuthContext);

    const handleClickLoginPage = () => {
        console.log(page)
        if (buttonHome3.name === 'Log-in') {
            navigate("/login")
        } else {
            navigate("/")
        }
    };
    const handleClickSigupPage = () => {
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
        onClick: ()=>{navigate("/")}
    };

    const buttonHome2 = { 
        name:"Sign-up", 
        size: "large",
        variant: "text",
        onClick: ()=>{doSignOut(navigate)}
    };

    const buttonHome3 = {
        name: "Log-in",
        size: "large",
        variant: "text",
        onClick: handleClickLoginPage
    };
    
    const buttonHome4 = {
        name: "AreaPersonale / immagine del profilo",
        size: "large",
        variant: "text",
        onClick: handleClickLoginPage
    };

    return (
        <Box style={headerStyle} display="flex" alignItems="center">
            <img src="/logos/parking_logo.png" alt="logo" style={logoStyle} />
            <Box style={buttonGroupStyle}>
                <ButtonGroup variant="text">
                    <CustomButton {...buttonHome1} />
                    <CustomButton {...buttonHome2} />
                    <CustomButton {...buttonHome3} />
                </ButtonGroup>
                <div>
                    {`User Logged In: ${userLoggedIn ? "Yes" : "No"}`}
                </div>
            </Box>
        </Box>
    );
}

export default Header;