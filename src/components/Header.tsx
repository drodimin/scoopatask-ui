import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box'
import logo from '../assets/scoop-a-task.png';
import login from '../assets/btn_google_signin_dark_normal_web.png'
import { useContext, useEffect, useState } from 'react';
import * as api from '../api'
import { createStyles, makeStyles } from '@mui/styles';
import UserMenu from './UserMenu';
import { DataContext } from '../App';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => createStyles({
    toolBar: {
        padding: 0
    }
}));

const LoginWithGoogle = (props: any)=> {
    return <a href={props.googleLink}><img src={login} alt="Login with Google"/></a>
}

const Header = () =>
{
    const { userContext: {user, handleSignOut} } = useContext(DataContext);
    
    const classes = useStyles();

    const [googleLink, setGoogleLink] = useState('#')

    const fetch = async() => {
        try{
            const link = await api.getGoogleLink();
            setGoogleLink(link);
        }
        catch(error: any){
            console.log('failed fetching google login link', error);
        }
    }

    useEffect(() => {
        fetch();
    }, [])

    let loginContent: JSX.Element;
    if(user.email) {
        loginContent = <UserMenu userName = {user.email} signOut={handleSignOut}></UserMenu>
    } else {
        loginContent = <LoginWithGoogle googleLink = {googleLink}></LoginWithGoogle>
    }
  
    return  <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
            <Toolbar className = {classes.toolBar} disableGutters = {true}>
                <Box sx={{ml:{sm:0,md:1,lg:2}}}><Link component={RouterLink} to="/"><img src={logo} alt="Logo" /></Link></Box>
                <Box sx={{ flexGrow: 1 }}>
                </Box>
                <Box sx={{m:{sm:0,md:1,lg:2}}}>
                    {loginContent}
                </Box>
            </Toolbar>
            <Box sx={{m:'auto'}}>
                        <Typography color='warning.main'>Scoop-a-task is a work in progress.
                        By using it you agree to the <Link component={RouterLink} to="/agreement">Terms of Use.</Link></Typography>              
            </Box>
        </AppBar>
    </Box>
}

export default Header;