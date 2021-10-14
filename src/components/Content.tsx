import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import * as api from '../api'
import About from './About';
import AppData from './AppData';
import Header from './Header';

const Content = (props: any) => {
    const [isServiceOk, setIsServiceOk] = useState(false);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const fetchData = async() => {
            try {
            const serviceCheckResult: boolean = await api.serviceCheck();
            
            setIsServiceOk(serviceCheckResult);
            if(!serviceCheckResult) {
                return;
            }
            
            let hasToken: boolean = false;
            
            if(sessionStorage.getItem('accessToken')) {
                hasToken = true;
            }
            else if(props.googleAccessCode) {
                const result: any = await api.handleAcessCode(props.googleAccessCode);
                sessionStorage.setItem('accessToken', result.token);
                hasToken = true;
            }
            
            if(hasToken) {
                //get user info
                const userInfo = await api.signInWithToken();
                console.log(userInfo);
                setUser(userInfo);
                //fetch data
            }
    
            } catch(error){
                console.log(error)
            }
        }
        fetchData();
    }, [props.googleAccessCode])

    const handleSignOut = async() => {
        try {
            await api.signOut();
            sessionStorage.removeItem('accessToken');
            setUser(undefined);
        } catch(error) {
            console.log('Failed to sign out', error)
        }
    }

    return (
            
          <React.Fragment>
            <Header user = {user} signOut={handleSignOut}></Header>
            <Box sx={{mt:1}}>
                {!isServiceOk && <div>Service is currently not available. Please try later</div>}
                {user ? <AppData></AppData> : <About></About>}
            </Box>
          </React.Fragment>
      )
}

export default Content