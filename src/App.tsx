import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Shell from './components/Shell';
import { Box, createTheme, ThemeProvider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IDataContext, IUser } from './interfaces/DataContext';
import Agreement from './components/Agreement';
import * as api from './api'
import Header from './components/Header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition, MouseTransition } from 'react-dnd-multi-backend';
import { ViewportProvider } from './utils/ViewportContext';

const CustomHTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition
    },
    {
      backend: TouchBackend,
      // Note that you can call your backends with options
      options: { enableMouseEvents: true, enableHoverOutsideTarget: true },
      transition: TouchTransition,
      // will not dispatch a duplicate `touchstart` event when this backend is activated
      skipDispatchOnTransition: true
    }
  ]
};

export const DataContext = React.createContext<IDataContext>({userContext:{ user:{}, loginUser: ()=>{}, handleSignOut: () => Promise.resolve()}} );

export const DataContextProvider: React.FC<React.ReactNode> = ( { children } ) => {
  const [user, setUser] = useState<IUser>({});

  const handleSignOut = async(): Promise<void> => {
      try {
          await api.signOut();
          sessionStorage.removeItem('accessToken');
          setUser({});
      } catch(error) { 
          console.log('Failed to sign out', error)
      }
  }

  const loginUser = (newUser: IUser) : void => {
    console.log('User logged in', newUser);
    setUser(newUser);
  } 

  return (
    <DataContext.Provider value={{
      userContext:{user, loginUser, handleSignOut}
    }}>
      {children}
    </DataContext.Provider>
  )
}

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
      'Roboto Condensed',
    ].join(','),
  },});

theme.typography.h3 = {
  fontSize: '1.2rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.8rem',
  },
};


const App = () => { 

  if(process.env.REACT_APP_BLOCK && process.env.REACT_APP_BLOCK === 'Yes') {
    return <Typography sx={{m:"auto"}} width="fit-content" variant="h4">Service Not Available</Typography>
  }
  else {
    return <Router>
          <ThemeProvider theme={theme}>
            <ViewportProvider>         
              <DataContextProvider> 
                <Header></Header> 
                <DndProvider backend={MultiBackend} options={CustomHTML5toTouch}>                
                      <Route exact path="/">
                        <Shell/>
                      </Route>
                      <Route exact path="/agreement">
                        <Agreement/>
                      </Route>                       
                </DndProvider>
            </DataContextProvider>
          </ViewportProvider>  
        </ThemeProvider>    
        </Router>
  }
}

export default App;
  