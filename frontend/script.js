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
document.getElementById("projectForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Collect form data
  const projectName = document.getElementById("projectName").value;
  const projectState = document.getElementById("projectState").value;
  const projectValue = document.getElementById("projectValue").value;
  const projectStage = document.getElementById("projectStage").value;

  // Create a project card
  const projectCard = document.createElement("div");
  projectCard.classList.add("project-card");
  projectCard.innerHTML = `
    <h3>${projectName}</h3>
    <p>State: ${projectState}</p>
    <p>Value: $${parseFloat(projectValue).toLocaleString()}</p>
  `;

  // Append to the correct stage
  const stageContent = document.querySelector(`#${projectStage.toLowerCase().replace(" ", "-")} .stage-content`);
  if (stageContent) {
    stageContent.appendChild(projectCard);
  }

  // Clear the form and close the modal
  document.getElementById("projectForm").reset();
  document.getElementById("projectModal").style.display = "none";
});

