import firebase from "firebase";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAn0z9zt-tORO8Fx7KKcKZtB87zWJaPBPo",
  authDomain: "udemy-geo-ninjas-3fc51.firebaseapp.com",
  databaseURL: "https://udemy-geo-ninjas-3fc51.firebaseio.com",
  projectId: "udemy-geo-ninjas-3fc51",
  storageBucket: "",
  messagingSenderId: "1018038369653",
  appId: "1:1018038369653:web:c1e7c48064f640c2"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
