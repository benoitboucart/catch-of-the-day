import Rebase from "re-base";
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBuAXnQLmrkkhu68NqEovepYS9TJyJw4Nk",
  authDomain: "catch-of-the-day-bnwa.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-bnwa.firebaseio.com",
  // projectId: "catch-of-the-day-bnwa",
  // storageBucket: "catch-of-the-day-bnwa.appspot.com",
  // messagingSenderId: "4146787365"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
