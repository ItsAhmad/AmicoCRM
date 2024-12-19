// DOM Elements
const modal = document.getElementById("projectModal");
const closeButton = document.querySelector(".close-button");
const form = document.getElementById("projectForm");
const addProjectButtons = document.querySelectorAll(".addProjectButton");

// Function to generate unique IDs 
function generateUniqueId() {
  return `deal-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Function to delete a deal card 
function deleteDealCard(dealCard) {
  if (confirm("Are you sure you want to delete this deal?")) {
    dealCard.remove();
  }
}

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
    dealCard.setAttribute("draggable", "true");
    dealCard.dataset.id = generateUniqueId();
    dealCard.innerHTML = `
      <h3 class="deal-title">${projectName}</h3>
      <p><strong>Value:</strong> $${projectValue}</p>
      <p><strong>State:</strong> ${projectState}</p>
      <i class="fas fa-trash-alt delete-icon"></i>
    `;

    // Add drag event listeners to the new deal card
    dealCard.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", dealCard.dataset.id || ""); 
      dealCard.classList.add("dragging"); // Add visual feedback
    });

    dealCard.addEventListener("dragend", () => {
      dealCard.classList.remove("dragging"); // Remove visual feedback
    });

    const deleteIcon = dealCard.querySelector(".delete-icon");
    deleteIcon.addEventListener("click", () => deleteDealCard(dealCard));

  // Append the new deal card to the column
    column.appendChild(dealCard);

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


//Dragging Functionality 
// Select all group columns
const groupColumns = document.querySelectorAll('.group-column-list');
console.log("Group Columns:", groupColumns);

// Add dragover and drop events to group columns
groupColumns.forEach((column) => {
  column.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping
    column.classList.add('drag-over'); // Add visual feedback for drop zone
  });

  column.addEventListener('dragleave', () => {
    column.classList.remove('drag-over'); // Remove visual feedback
  });

  column.addEventListener('drop', (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain'); // Get the dragged card's ID
    const draggedCard = document.querySelector(`.deal-card[data-id="${cardId}"]`);

    // Find the card list inside the column
    let cardList = column.querySelector(".group-column-list");

    // If no card list exists, create one dynamically
    if (!cardList) {
      cardList = document.createElement("div");
      cardList.classList.add("group-column-list", "sortable");
      cardList.dataset.name = column.dataset.name;
      column.appendChild(cardList);
      console.warn("Card list not found; dynamically created a new one.");
    }

    if (draggedCard) {
      cardList.appendChild(draggedCard);
    }

    column.classList.remove('drag-over'); // Remove visual feedback
  });
});
