import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'Chave',
  authDomain: 'Dominio',
  projectId: 'ID',
  storageBucket: 'Bucket',
  messagingSenderId: 'ID',
  appId: 'ID',
};

const app = initializeApp(firebaseConfig);

const auth_mod = getAuth(app);

export {auth_mod};
