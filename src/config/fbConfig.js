import firebase from 'firebase/app';
import 'firebase/firestore';
 import 'firebase/auth';

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBl12X9U7a53r9ytcxoLGfgJ8pMQAzsfQQ",
    authDomain: "restaurant-c2531.firebaseapp.com",
    databaseURL: "https://restaurant-c2531.firebaseio.com",
    projectId: "restaurant-c2531",
    storageBucket: "restaurant-c2531.appspot.com",
    messagingSenderId: "209782168475",
    appId: "1:209782168475:web:6e7351d713144251df9f3e",
    measurementId: "G-72T9HD184C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore()

  export default firebase;