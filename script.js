document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle");
  themeToggle?.addEventListener("click", () => {
    const body = document.body;
    if (body.classList.contains("light-mode")) {
      body.classList.remove("light-mode");
      body.classList.add("blue-mode");
    } else if (body.classList.contains("blue-mode")) {
      body.classList.remove("blue-mode");
    } else {
      body.classList.add("light-mode");
    }
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Start Building Button
  const startBtn = document.querySelector(".start-btn");
  startBtn?.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "login.html";
  });

  // Navbar Scroll Background
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  hamburger?.addEventListener("click", () => {
    mobileNav?.classList.toggle("open");
  });
});


 // Smooth Scrolling
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Start Building Button
const startBtn = document.querySelector(".start-btn");
startBtn?.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "login.html";
});

// Navbar Scroll Background
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});




const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  hamburger.classList.toggle("open");
});
