import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box'
import logo from '../assets/scoop-a-task.png';
import login from '../assets/btn_google_signin_dark_normal_web.png'
import { useEffect, useState } from 'react';
import * as api from '../api'
import { createStyles, makeStyles } from '@mui/styles';
import UserMenu from './UserMenu';

const useStyles = makeStyles(() => createStyles({
    toolBar: {
        padding: 0
    }
}));

const LoginWithGoogle = (props: any)=> {
    return <a href={props.googleLink}><img src={login} alt="Login with Google"/></a>
}

const Header = (props: any) =>
{
    const classes = useStyles(props);

    const [googleLink, setGoogleLink] = useState('#')

    const fetch = async() => {
        const link = await api.getGoogleLink();
        setGoogleLink(link);
    }

    useEffect(() => {
        fetch();
    }, [])

    let loginContent: JSX.Element;
    if(props.user) {
        loginContent = <UserMenu userName = {props.user.email} signOut={props.signOut}></UserMenu>
    } else {
        loginContent = <LoginWithGoogle googleLink = {googleLink}></LoginWithGoogle>
    }
  
    return  <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
            <Toolbar className = {classes.toolBar} disableGutters = {true}>
                <img src={logo} alt="Logo" />
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    {loginContent}
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
}

export default Header;