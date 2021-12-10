import 'firebase/firestore';
import 'firebase/auth';

import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider, getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB5sXxRaXc62OPF2c_YELlT2eEEN9UmmlI",
  authDomain: "aeroh-87cb8.firebaseapp.com",
  projectId: "aeroh-87cb8",
  storageBucket: "aeroh-87cb8.appspot.com",
  messagingSenderId: "23411923477",
  appId: "1:23411923477:web:6997e7a5a57b91d01a4c1c"
};

const firebaseApp = initializeApp(firebaseConfig);
const authInstance = getAuth(firebaseApp);
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
  db,
  googleAuthProvider,
  authInstance
}