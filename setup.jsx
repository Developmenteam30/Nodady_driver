import * as React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB_O_M3P7vmHO4HsoEpmXNemSYrWZ_EI6c',
  authDomain: 'noddy-delivers.firebaseapp.com',
  projectId: 'noddy-delivers',
  storageBucket: 'noddy-delivers.appspot.com',
  messagingSenderId: '736930000753',
  appId: '1:736930000753:web:c1c7a820325169901ed0d0',
  measurementId: 'G-TEEWSV9B73',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default () => {
  return { firebase, auth };
};
