// Import Firebase Auth and Database
import { auth, database } from "./firebase-config.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signInWithPopup, 
    GoogleAuthProvider,
    signOut
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// ✅ Google Provider Setup
const provider = new GoogleAuthProvider();


window.onload = function () {
    if (localStorage.getItem("loginStatus") === "true") {
        window.location.href = "homepage.html";
    }
};

// ✅ Login Function
window.login = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("loginStatus","true");
            alert("Login Successful!");
            window.location.href = "homepage.html";
        })
        .catch(error => alert("Login Failed: " + error.message));
};

// ✅ Google Login
window.googleLogin = function() {
    signInWithPopup(auth, provider)
        .then(() => {
            localStorage.setItem("loginStatus","true");
            alert("Google Login Successful!");
            window.location.href = "homepage.html";
        })
        .catch(error => alert("Google Login Failed: " + error.message));
};

// ✅ Register Function
window.register = function() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const userType = document.getElementById("userType").value;

    if (!fullName || !email || !password || !phoneNumber) {
        alert("Please fill in all fields.");
        return;
    }
    
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store user details in Firebase Database
            set(ref(database, "users/" + user.uid), {
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                userType: userType
            });

            alert("Registration Successful! Please log in.");
            window.location.href = "index.html";
        })
        .catch(error => alert("Registration Failed: " + error.message));
};

// ✅ Password Recovery
window.recoverPassword = function() {
    const email = prompt("Enter your email for password recovery:");
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => alert("Password reset link sent!"))
            .catch(error => alert("Error: " + error.message));
    }
};

// ✅ Logout Function
window.logout = function() {
    signOut(auth).then(() => {
        alert("Logged out!");
        window.location.href = "index.html";
    }).catch(error => alert("Logout Failed: " + error.message));
};

// ✅ Show User Info on Homepage
if (window.location.pathname.includes("homepage.html")) {
    auth.onAuthStateChanged(user => {
        if (user) {
            document.getElementById("userEmail").innerText = `Logged in as: ${user.email}`;
        } else {
            window.location.href = "index.html";
        }
    });
}
