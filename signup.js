// signup.js
import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful!");
      window.location.href = "login.html"; // Signup झाल्यावर login page वर redirect करा
    } catch (error) {
      alert(error.message);
    }
  });
});
