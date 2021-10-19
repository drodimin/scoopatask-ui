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
            }catch(error){
                console.log('Failed to check service status', error);
            }
            
            let accessToken = sessionStorage.getItem('accessToken');

            if(!accessToken && props.googleAccessCode) {
                try{
                    const result = await api.handleAcessCode(props.googleAccessCode);
                    accessToken = result.token;
                    sessionStorage.setItem('accessToken', result.token);
                }
                catch(error){
                    console.log('Failed exchanging access code for token', error);
                }
            }
            
            if(accessToken) {
                //get user info
                try{
                    const userInfo = await api.signInWithToken(accessToken);
                    console.log(userInfo);
                    setUser(userInfo);
                }
                catch(error: any){
                    if(error.response && error.response.status === 401) {
                        sessionStorage.removeItem('accessToken');
                        await api.signOut();
                    }
                    console.log('Failed to sign in with token', error);
                }
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