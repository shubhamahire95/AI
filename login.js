import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Login.js loaded!"); // Debugging

  const loginForm = document.getElementById("login-form");

  if (!loginForm) {
    console.error("Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Login button clicked!"); // Debugging

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successful:", userCredential);
      alert("Login Successful!");
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
    }
  });
});

console.log("Login Successful:", userCredential);

