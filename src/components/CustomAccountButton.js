import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from '../contexts/authContext/index.jsx';
import theme from "../style/palette";
import { BorderColor } from '@mui/icons-material';

function CustomAccountButton({ src }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { doSignOut } = useContext(AuthContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickProfile = () => {
        setAnchorEl(null);
        navigate("/profile");
    };

    const handleClickLog = () => {
        setAnchorEl(null);
        doSignOut(navigate);
    };

    const propsIconButton = {
        onClick: handleClick,
        size: 'small',
        sx: {
            ml: 'auto',
            p: 0,
        },
    }

    const propsMenu = {
        PaperProps: {
            elevation: 3,
            sx: {
                bgcolor: theme.palette.secondary.light,
                BorderColor:theme.palette.secondary.dark,
                overflow: 'visible',
                filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.1))',
                mt: 1.5,
                borderRadius: 2,
                minWidth: 200,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
            },
        },
        transformOrigin: { horizontal: 'right', vertical: 'top' },
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' }
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton {...propsIconButton}>
                    <Avatar
                        alt={currentUser?.displayName || "User"}
                        src={currentUser?.photoURL || '/default-profile.png'}
                        sx={{ width: 40, height: 40, margin: 'auto', border: `2px solid ${theme.palette.secondary.dark}` }}
                    />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                {...propsMenu}
            >
                <MenuItem onClick={handleClickProfile}>
                    <Avatar
                        alt={currentUser?.displayName || "User"}
                        src={currentUser?.photoURL || '/default-profile.png'}
                        sx={{ width: 35, height: 35, margin: 'auto', border: `2px solid ${theme.palette.primary.main}` }}
                    />
                    <span style={{ color: theme.palette.primary.dark, fontWeight: 500 }}>Profile</span>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClickLog}>
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: theme.palette.primary.dark }} />
                    </ListItemIcon>
                    <span style={{ color: theme.palette.primary.dark, fontWeight: 500 }}>Logout</span>
                </MenuItem>
            </Menu>
        </>
    );
}

export default CustomAccountButton;
