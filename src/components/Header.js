import CustomButton from "./CustomButton";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {useNavigate, useLocation} from "react-router-dom";
import { headerStyle, buttonGroupStyle} from '../style/styles.js';
import { useContext } from "react";
import { AuthContext } from '../contexts/authContext/index.jsx';
import CustomAccountButton from "./CustomAccountButton.js";
import theme from "../style/palette.js";

const logoStyle = {
    width: '100px',
    height: '100px',
    textAlign: 'left',
    padding: '5px 5px 5px 15px'
};


function Header({page}) {

    const navigate = useNavigate();
    const {userLoggedIn, doSignOut} = useContext(AuthContext);
    const location = useLocation();

    const handleClickHome = {
        name: location.pathname === "/" ? (<b style={{ color: theme.palette.secondary.dark}}>Home</b>) : "Home",
        size: "large",
        variant: "text",
        onClick: ()=>{navigate("/")}
    };

    const handleClickSignup= { 
        name: location.pathname === "/signup" ? (<b style={{ color: theme.palette.secondary.dark}}>Sign-Up</b>) : "Sign-Up",
        size: "large",
        variant: "text",
        onClick: ()=>{navigate("/signup")}
    };

    const handleClickLogin = {
        name: location.pathname === "/login" ? (<b style={{ color: theme.palette.secondary.dark}}>Log-In</b>) : "Log-In",
        size: "large",
        variant: "text",
        onClick: ()=>{navigate("/login")}
    };
    

    return (
        <Box style={headerStyle} display="flex" alignItems="center">
            <img src="/logos/parking_logo.png" alt="logo" style={logoStyle} />
            <Box style={buttonGroupStyle}>
            {userLoggedIn ? (
                <ButtonGroup variant="text">
                    <CustomButton {...handleClickHome} />
                    <CustomAccountButton />
                </ButtonGroup>
                    ):(
                <ButtonGroup variant="text">
                    <CustomButton {...handleClickHome} />
                    <CustomButton {...handleClickSignup} />
                    <CustomButton {...handleClickLogin} />
                </ButtonGroup>
            )}
            </Box>
        </Box>
    );
}

export default Header;