// DOM Elements
const modal = document.getElementById("projectModal");
const closeButton = document.querySelector(".close-button");
const form = document.getElementById("projectForm");
const addProjectButtons = document.querySelectorAll(".addProjectButton");

// Open Modal Functionality
addProjectButtons.forEach(button => {
  button.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

// Close Modal Functionality
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close Modal on Outside Click
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Add Project to Pipeline
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const projectName = document.getElementById("projectName").value;
  const projectValue = document.getElementById("projectValue").value;
  const projectState = document.getElementById("projectState").value;
  const projectStage = document.getElementById("projectStage").value;

  // Find the correct column
  const column = document.querySelector(`.group-column[data-name="${projectStage}"]`);

  if (column) {
    // Create the deal card element
    const dealCard = document.createElement("div");
    dealCard.classList.add("deal-card");
    dealCard.innerHTML = `
      <h3 class="deal-title">${projectName}</h3>
      <p><strong>Value:</strong> $${projectValue}</p>
      <p><strong>State:</strong> ${projectState}</p>
    `;

    // Append the deal card to the column's list
    const cardList = column.querySelector(".group-column-list");
    if (cardList) {
      cardList.prepend(dealCard);
      modal.style.display = "none";
      form.reset();
    } else {
      alert("Error: Could not find the card list container in the specified column.");
    }
  } else {
    alert("Error: Could not find the specified column.");
  }
});
