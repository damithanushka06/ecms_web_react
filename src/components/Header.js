import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../redux/actions/authactions";

export default function ButtonAppBar() {

    const userType = useSelector(state => state.auth.userType);
    const tokenValue = useSelector(state => state.auth.token);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('/login')
    }
    const handleHome = () => {
        if (userType === "ROLE_ADMIN") {
            navigate('/admindash')
        }else if(userType === "ROLE_WILDLIFE_OFFICER" || userType === "ROLE_FOREST_OFFICER"){
            navigate('/officerdash')
        }else {
            navigate('/')
        }
    }

    const handleLogout=(e)=>{
        e.preventDefault()
        dispatch(logoutUser())
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/*<MenuIcon />*/}
                        <HomeIcon onClick={handleHome}/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Welcome to ECMS
                    </Typography>
                    {tokenValue ? <Button color="inherit" onClick={handleLogout}>Log out</Button> : <Button color="inherit" onClick={handleLogin}>Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}