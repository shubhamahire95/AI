import { auth } from "../firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const userEmailDisplay = document.getElementById("user-email");
  const footerEmail = document.getElementById("footer-email");
  const welcomeHeading = document.getElementById("welcome");

  // 🔐 Auth Check
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      const email = user.email;
      const userName = email.split("@")[0];
      userEmailDisplay.textContent = email;
      footerEmail.textContent = email;
      welcomeHeading.textContent = `Welcome, ${userName} 💼`;
    }
  });

  // 🚪 Logout
  logoutBtn?.addEventListener("click", handleLogout);
});

// 🌗 Theme Toggle
window.setTheme = function (theme) {
  document.body.classList.remove("light", "dark", "blue");
  document.body.classList.add(theme);
};

// 🧠 Launch Resume Builder
window.launchBuilder = function () {
  window.location.href = "builder.html";
};

// 📄 Upload Resume and Show Result
window.uploadResume = function () {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please Selected Your resume.");
    return;
  }

  document.getElementById("resumeName").innerText = file.name;

  // Show result section
  const resultSection = document.getElementById("resultSection");
  resultSection.style.display = "block";

  // Simulate AI Evaluation (can be replaced with real backend call)
  setTimeout(() => {
    document.getElementById("aiScore").innerText = "87 / 100";
    document.getElementById("suggestions").innerHTML = `
      <li>Add strong action verbs</li>
      <li>Include metrics to show impact</li>
      <li>Customize resume to specific job roles</li>
    `;
  }, 1000);
};

// 📥 Download Report (Demo)
window.downloadReport = function () {
  alert("📥 Report downloaded! (Feature under development)");
};

// 🔁 Logout Function
async function handleLogout() {
  try {
    await signOut(auth);
    alert("Successfully logged out.");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
}
