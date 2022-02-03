import { Box } from '@mui/system';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../api'
import { DataContext } from '../App';
import About from './About';
import AppData from './AppData';

const Content = (props: any) => {

    const history = useHistory();
    const { userContext: {user, loginUser} } = useContext(DataContext);
    const [isServiceOk, setIsServiceOk] = useState(false);
    const login = useRef(loginUser);

    useEffect(() => {      
        const navigateRoot = () => {
            history.push('/');
        }

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
                    sessionStorage.setItem('accessToken', result.token);
                    console.log('Received Access Token:', result.token);
                }
                catch(error){
                    console.log('Failed exchanging access code for token. Code might be expired', error);
                }
                navigateRoot();
            }
            
            if(accessToken) {
                //get user info
                try{
                    const userInfo = await api.signInWithToken(accessToken);
                    console.log(userInfo);
                    login.current(userInfo);
                }
                catch(error: any){
                    if(error.response && error.response.status === 401) {
                        sessionStorage.removeItem('accessToken');
                        await api.signOut();
                    }
                    console.log('Failed to sign in with token', error);
                    navigateRoot();
                }
            }
        }
        fetchData();
    }, [props.googleAccessCode, history, login])

    return (
            
          <React.Fragment>
            <Box sx={{mt:1, width:'100%'}}>
                {!isServiceOk && <div>Service is currently not available. Please try later</div>}
                {user.email ? <AppData></AppData> : <About></About>}
            </Box>
          </React.Fragment>
      )
}

export default Content