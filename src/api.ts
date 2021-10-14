/*  const SERVICE_URL=process.env.REACT_APP_API_KEY;
  const SERVICE_URL_LOCAL="http://localhost:3005";
  //const SERVICE_URL_LOCAL="https://scoopatask-test.herokuapp.com";


  let service_url = SERVICE_URL;
  if (location.hostname === "localhost") {
    service_url = SERVICE_URL_LOCAL;
  }
*/

import ky from 'ky'
import { IAppData } from './interfaces/AppData';
export const service_url:string = process.env.REACT_APP_SERVICE_URL || '';

const verbose = true;

export const serviceCheck = async():Promise<boolean> => {
    console.log(process.env.NODE_ENV);
    try{
        if(!service_url) {
            console.log("Service URL is not set");
            return false;
        }
        await ky(service_url);
        console.log("Service check successful.");
        return true;
    }
    catch(error: any){
        console.log("Service check failed.", error);
    }
    return false;
  }

export const getGoogleLink = async():Promise<string> => {
  log('getting google link');
  return ky(service_url + '/googleurl').text();
}

export const signInWithToken = async():Promise<any> => {
  log('getting user info');
  return withAuthorizationHeader()(service_url + '/users/me').json();
}

export const signOut = async():Promise<any> => {
  log('signing out');
  return withAuthorizationHeader()(service_url + '/users/logout');
}

export const handleAcessCode = async(code: string):Promise<any> => {
  log('Logging in with google access code.');
  return ky(service_url + '/googlecode?code=' + code).json();
}

export const getData = async():Promise<IAppData> => {
  log('getting data');
  return withAuthorizationHeader()(service_url + '/appdata').json();
}

const withAuthorizationHeader = ():typeof ky => {
  return ky.extend({
    hooks: {
      beforeRequest: [
        request => {
          if(sessionStorage.getItem('accessToken'))
          {
            request.headers.set('X-Requested-With', 'ky');
          }
          request.headers.set('Authorization', 'Bearer' + sessionStorage.accessToken);
        }
      ]
    }
  });
}

const log = (message: string) => {
  if(verbose) {
    console.log(message);
  }
}