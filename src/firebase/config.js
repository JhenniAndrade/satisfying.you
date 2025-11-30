import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'api',
  authDomain: 'domain',
  projectId: 'id',
  storageBucket: 'storage',
  messagingSenderId: 'id',
  appId: 'id',
};

const app = initializeApp(firebaseConfig);

const auth_mod = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app); 

export {auth_mod, db, storage};
