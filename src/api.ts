import ky from 'ky'
import { IAppData, IBucket } from './interfaces/AppData';
export const service_url:string = process.env.REACT_APP_SERVICE_URL || '';

const options = { prefixUrl: service_url, timeout: 60000 };
const kyBase = ky.create(options);
let kyAuth = kyBase;

const verbose = true;

const log = (message: string) => {
  if(verbose) {
    console.log(message);
  }
}

export const serviceCheck = async():Promise<boolean> => {
    console.log(process.env.NODE_ENV);
    try{
        if(!service_url) {
            console.log("Service URL is not set");
            return false;
        }
        await ky.get('');
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
  return kyBase('googleurl').text();
}

export const handleAcessCode = async(code: string):Promise<any> => {
  log('Logging in with google access code: ' + code);
  return kyBase('googlecode?code=' + code).json();
}

export const signInWithToken = async(accessToken: string):Promise<any> => {
  kyAuth = kyBase.extend({
    hooks: {
      beforeRequest: [
        request => {
          request.headers.set('Authorization', 'Bearer' + accessToken);
        }
      ]
    }
  });
  log('signing in with token');
  return kyAuth('users/me').json();
}

export const signOut = async():Promise<any> => {
  log('signing out');
  const result = kyAuth('users/logout');
  kyAuth = kyBase;
  return result;
}

export const getData = async():Promise<IAppData> => {
  log('getting data');
  return kyAuth('appdata').json();
}

  export const deleteTask = (bucketId: string, taskId: string):Promise<IBucket> => {
    return kyAuth.delete(`bucket/${bucketId}/task/${taskId}`).json();
  }

  export const completeTask = (bucketId: string, taskId: string):Promise<IBucket> => {
    return kyAuth(`bucket/${bucketId}/task/${taskId}/complete`).json();
  }

  export const addTask = (bucketId: string, name: string):Promise<IBucket> => {
    return kyAuth.post(`bucket/${bucketId}/task`, { json: {name: name}}).json();
  }

  export const deleteBucket = (bucketId: string) => {
    return kyAuth.delete(`bucket/${bucketId}`);
  }

  export const addBucket = (name: string):Promise<IBucket> => {
    return kyAuth.post(`bucket`, { json: {name: name}}).json();
  }

  export const moveBucket = (targetBucketId:string, destBucketId: string): Promise<IBucket[]> => {
    return kyAuth.get(`bucket/${targetBucketId}/moveBefore/${destBucketId}`).json();
  }
