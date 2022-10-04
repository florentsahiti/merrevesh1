let firebaseConfig = {
  apiKey: "AIzaSyCYOL0Ntp7saVixp5UHqK2aaAC5FcKAQVs",
  authDomain: "merrevesh.firebaseapp.com",
  projectId: "merrevesh",
  storageBucket: "merrevesh.appspot.com",
  messagingSenderId: "224630501453",
  appId: "1:224630501453:web:daa4501daf3ebd7f246c04",
};


firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
let db = firebase.firestore();

const logoutUser = () => {
  auth.signOut();
  location.reload();
}










