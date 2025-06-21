import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCQYhjDaYLpbAjf8Irz5Q-IOmZy6p1IRw0",
    authDomain: "growwclone-914ed.firebaseapp.com",
    projectId: "growwclone-914ed",
    storageBucket: "growwclone-914ed.firebasestorage.app",
    messagingSenderId: "92561946534",
    appId: "1:92561946534:web:7e8ba7cae6b007dde38167"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'; 

const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById('google_login'); 

googleLogin.addEventListener('click', function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href = "../main/logged.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});