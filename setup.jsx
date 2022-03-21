import * as React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCnhPH5s-27opkpSercjTdiA-9ISXDDXK4',
  authDomain: 'noddy--customer.firebaseapp.com',
  projectId: 'noddy--customer',
  storageBucket: 'noddy--customer.appspot.com',
  messagingSenderId: '467972202681',
  appId: '1:467972202681:web:41cbd986df9a2f1a067b68',
  measurementId: 'G-XW2BRHC278',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default () => {
  return { firebase, auth };
};
