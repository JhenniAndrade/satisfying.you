import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDpAmWTfbJTPf950VbsKJhHqG7nHfZWyc0',
  authDomain: 'as65d-projeto-2.firebaseapp.com',
  projectId: 'as65d-projeto-2',
  storageBucket: 'as65d-projeto-2.firebasestorage.app',
  messagingSenderId: '716842351922',
  appId: '1:716842351922:web:8f7f37782bb42675236b2b',
};

const app = initializeApp(firebaseConfig);

const auth_mod = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app); 

export {auth_mod};
