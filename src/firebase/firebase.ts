import  firebase  from '@firebase/app'
import "firebase/firestore";

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  NextOrObserver,
  User
} from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(getFirebaseConfig()); //Khởi tạo firebase
const auth = getAuth(app);
export const db = getFirestore(app);

export const signInUser = async (
  email: string, 
  password: string
) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const userStateListener = (callback:NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback)
}

export const SignOutUser = async () => await signOut(auth);