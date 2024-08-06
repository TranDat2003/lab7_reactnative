import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const firebaseConfig = {
  projectId: "asmph39843",
  appId: "1:1030146136031:android:b343bb092113e43b33d66a",
  storageBucket: "asmph39843.appspot.com",
  apiKey: "AIzaSyCaGfPMSeqbQcVihrq8Feq3eCGJMEdSUjc",
  authDomain: "asmph39843.firebaseapp.com",
  messagingSenderId: "1030146136031",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

GoogleSignin.configure({
  webClientId: '1030146136031-q852055fvhucrlihj8k5fif0423mkb3j.apps.googleusercontent.com', // Thay thế bằng webClientId thực tế của bạn
});

export { firebase, auth, GoogleSignin };
