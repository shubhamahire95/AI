// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBy-Ibiu3q2W2ygOk4NyYLRoepz1_HdlGo",
  authDomain: "ai-resume-evaluator.firebaseapp.com",
  projectId: "ai-resume-evaluator",
  storageBucket: "ai-resume-evaluator.appspot.com",
  messagingSenderId: "166761139845",
  appId: "1:166761139845:web:ef0b20a6b1ab948458a3ec",
  measurementId: "G-J2QTGZ4RD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
