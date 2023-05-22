import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from"firebase/database";
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: "AIzaSyC87xvmhX9Udb_ZNmHuFBrn-mBof6XTqjE",
  authDomain: "demoalta57.firebaseapp.com",
  databaseURL: "https://demoalta57-default-rtdb.firebaseio.com",
  projectId: "demoalta57",
  storageBucket: "demoalta57.appspot.com",
  messagingSenderId: "552341730986",
  appId: "1:552341730986:web:45b50881bde017aa3942d3"
};

// Initialize Firebase
const app = initializeApp(config);
export const auth = getDatabase(app);
export const auth2 = getAuth(app);
export const storage = getStorage(app);

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.ts');
  } else {
    return config;
  }
}

//
