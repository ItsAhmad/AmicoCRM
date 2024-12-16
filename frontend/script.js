// Get Elements
const addProjectButton = document.getElementById("addProjectButton");
const projectModal = document.getElementById("projectModal");
const closeButton = document.querySelector(".close-button");
const projectForm = document.getElementById("projectForm");

// Open Modal
addProjectButton.addEventListener("click", () => {
  projectModal.style.display = "flex";
});

// Close Modal
closeButton.addEventListener("click", () => {
  projectModal.style.display = "none";
});

// Add Project to Pipeline
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Collect Form Data
  const projectName = document.getElementById("projectName").value;
  const projectState = document.getElementById("projectState").value;
  const projectValue = document.getElementById("projectValue").value;
  const projectStage = document.getElementById("projectStage").value;

  // Create a New Project Box
  const projectBox = document.createElement("div");
  projectBox.className = "project-box";
  projectBox.innerHTML = `
    <strong>${projectName}</strong><br>
    ${projectState}<br>
    $${projectValue}
  `;

  // Append to the Selected Stage
  const stageElement = document.querySelector(`.stage:contains(${projectStage})`);
  if (stageElement) {
    stageElement.appendChild(projectBox);
  }

  // Close Modal and Reset Form
  projectModal.style.display = "none";
  projectForm.reset();
});
