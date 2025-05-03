// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Save HR requirement data
document.getElementById("hrRequirementForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const experience = document.getElementById("experience").value;
  const skills = document.getElementById("skills").value;
  const location = document.getElementById("location").value;
  const education = document.getElementById("education").value;
  const description = document.getElementById("description").value;

  const requirement = {
    role,
    experience,
    skills: skills.split(',').map(skill => skill.trim().toLowerCase()),
    location,
    education,
    description,
  };

  // Save to localStorage
  localStorage.setItem("hrRequirement", JSON.stringify(requirement));

  alert("Requirement saved successfully!");
  document.getElementById("hrRequirementForm").reset();
});

// Single Resume Upload (Best Resume Check)
document.getElementById('resumeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('resumeFile');
  const resultDiv = document.getElementById('result');
  const requirement = JSON.parse(localStorage.getItem("hrRequirement"));

  // Check if the user has entered Job Requirements
  if (!requirement) {
    resultDiv.textContent = "❌ Please Enter Your Job Requirement.";
    resultDiv.className = "result fail";
    resultDiv.style.display = "block";
    return;
  }

  if (fileInput.files.length === 0) {
    alert('Please select a resume file.');
    return;
  }

  const fileName = fileInput.files[0].name.toLowerCase();
  const file = fileInput.files[0];

  analyzeResumeWithAI(file, requirement).then(result => {
    if (result.isBestResume) {
      resultDiv.textContent = "✅ Best Resume Analyzed: Selected 🎉";
      resultDiv.className = "result success";
    } else {
      resultDiv.textContent = "❌ Resume Analyzed: Not Selected 😕";
      resultDiv.className = "result fail";
    }
    resultDiv.style.display = "block";
  }).catch(error => {
    console.error('Error analyzing resume:', error);
  });
});

// Multiple Resume Upload (Using Firebase)
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage, db } from "./firebase-config.js";

document.getElementById("multiResumeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const selectedCount = parseInt(document.getElementById("resumeCount").value);
  const files = document.getElementById("multiResumeFiles").files;
  const status = document.getElementById("multiStatus");

  if (files.length !== selectedCount) {
    status.innerText = `⚠️ You've selected ${files.length}, but entered ${selectedCount}`;
    return;
  }

  status.innerText = "⏳ Uploading and analyzing resumes...";

  let successCount = 0;

  for (let file of files) {
    try {
      const storageRef = ref(storage, `resumes/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);

      await addDoc(collection(db, "resumeUploads"), {
        fileName: file.name,
        uploadedAt: Timestamp.now(),
        analyzed: false
      });

      // Analyze and determine "best" resume
      const analysisResult = await analyzeResumeWithAI(file, JSON.parse(localStorage.getItem("hrRequirement")));
      if (analysisResult.isBestResume) {
        console.log(`${file.name} is a best resume!`);
      }

      successCount++;
    } catch (error) {
      console.error(`❌ Error uploading ${file.name}:`, error);
    }
  }

  status.innerHTML = `✅ Uploaded and saved ${successCount}/${files.length} resumes successfully.`;
});

// Extract text from PDF file
async function extractTextFromPDF(file) {
  const pdf = await pdfjsLib.getDocument(file).promise;
  let fullText = '';
  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const textContent = await page.getTextContent();
    fullText += textContent.items.map(item => item.str).join(' ');
  }
  return fullText.toLowerCase();
}

// Analyze Resume with AI (Including HR Requirements)
async function analyzeResumeWithAI(file, requirement) {
  const fileExtension = file.name.split('.').pop().toLowerCase();
  let score = 0;

  // Analyze the file type
  if (fileExtension === 'pdf' || fileExtension === 'docx') {
    score += 50;
  }

  // Analyze PDF content if applicable
  if (fileExtension === 'pdf') {
    const resumeText = await extractTextFromPDF(file);
    const skillsMatch = requirement.skills.filter(skill => resumeText.includes(skill)).length;
    score += skillsMatch * 10;
    const experienceMatch = resumeText.includes(requirement.experience.toLowerCase()) ? 20 : 0;
    score += experienceMatch;
  }

  // Analyze DOCX content (future implementation can be added here)

  // Check the file size
  if (file.size > 1000000) {
    score += 30;
  } else {
    score -= 10;
  }

  // Set a threshold to determine if it's the best resume
  const isBestResume = score > 60;

  return { isBestResume, score };
}

// Display Results
function displayResult(fileName, result) {
  console.log(`File: ${fileName} - Best Resume: ${result.isBestResume}, Score: ${result.score}`);
}
