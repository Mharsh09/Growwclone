import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'; 

const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById('google_login'); 

googleLogin.addEventListener('click', function () {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);

      try {
        const res = await fetch("http://localhost:5050/api/auth/check-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }

        const data = await res.json();
        console.log("✅ User check response:", data);

        if (res.ok && data.exists) {
          localStorage.setItem("token", data.token || "");
          window.location.href = "../main/stockss/stockshomepage.html";
        } else {
          console.warn("User not registered or invalid response:", data);
          alert("User not registered. Please register first.");
        }
      } catch (err) {
        console.error("User check failed:", err);
        alert("Server error. Please try again.");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});