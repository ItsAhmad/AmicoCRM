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
projectForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get form values
  const projectName = document.getElementById('projectName').value;
  const projectStage = document.getElementById('projectStage').value;

  // Create a button for the project
  const projectButton = document.createElement('button');
  projectButton.classList.add('project-button');
  projectButton.textContent = projectName;

  // Add click event to button (optional: to view/edit details later)
  projectButton.addEventListener('click', () => {
    alert(`Project: ${projectName}`);
  });

  // Find the correct stage <td> by data attribute
  const targetStage = document.querySelector(`.stage[data-stage="${projectStage}"]`);

  if (targetStage) {
    targetStage.appendChild(projectButton); // Append the button to the correct stage column
  } else {
    console.error('Stage not found:', projectStage);
  }

  // Close the modal
  projectModal.style.display = "none";

  // Clear form inputs
  projectForm.reset();
});