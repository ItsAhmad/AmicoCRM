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

/*const leadsource = getElementById("lead-source")

leadsource.addEventListener("click", () => {
  if (value="agency") {
    display
  }
}); */ 

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
      <a href="#" class="deal-link" data-id="${dealCard.dataset.id}"> 
        <span href="#" class="deal-link" data-id="${dealCard.dataset.id}"</span>
        <span class="exit-button">&times;</span>
        <h3 class="deal-title">${projectName}</h3>
        <p><strong>Value:</strong> $${projectValue}</p>
      <a>  
    `;

    // Add drag event listeners to the new deal card
    dealCard.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", dealCard.dataset.id || ""); 
      dealCard.classList.add("dragging"); // Add visual feedback
    });

    dealCard.addEventListener("dragend", () => {
      dealCard.classList.remove("dragging"); // Remove visual feedback
    });

    const deleteIcon = dealCard.querySelector(".exit-button");
    if (deleteIcon) {
      deleteIcon.addEventListener("click", () => deleteDealCard(dealCard));
    } else {
      console.warn("Exit button not found in deal card.");
    }

  // Append the new deal card to the column
    column.appendChild(dealCard);

    /* if (column = "Quoted"){ 
      const projectState = document.getElementById("projectState").value;
    }*/ 

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

// Get modal and close button
const dealModal = document.getElementById("dealModal");
const exitButton = dealModal.querySelector(".exit-button");

// Open modal when a deal is clicked
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deal-link")) {
    e.preventDefault();
    const dealId = e.target.dataset.id;

    // Fetch and populate the deal details (replace with actual logic to fetch data)
    const dealData = fetchDealData(dealId); // Replace with your data fetching logic
    populateModal(dealData);

    // Show the modal
    dealModal.style.display = "block";
  }
});

// Close modal
exitButton.addEventListener("click", () => {
  dealModal.style.display = "none";
});

// Example function to fetch deal data
function fetchDealData(dealId) {
  // Replace this with logic to fetch data from the server or state
  return {
    title: "Sample Deal",
    user: "John Doe",
    stage: "Negotiation",
    amount: "5000",
    contacts: [
      { name: "Jane Smith", email: "jane@example.com", phone: "123-456-7890" }
    ],
    products: [
      { name: "Product A", quantity: 2, unitPrice: 1000, total: 2000 },
      { name: "Product B", quantity: 3, unitPrice: 1000, total: 3000 }
    ],
    notes: [
      { timestamp: "2024-12-19 10:00", content: "Initial discussion." },
      { timestamp: "2024-12-19 11:00", content: "Sent follow-up email." }
    ]
  };
}

// Populate modal with deal data
function populateModal(deal) {
  document.getElementById("dealTitle").textContent = deal.title;
  document.getElementById("dealUser").textContent = deal.user;
  document.getElementById("dealStage").textContent = deal.stage;
  document.getElementById("dealAmount").textContent = deal.amount;

  // Populate contacts
  const contactsList = document.getElementById("dealContacts");
  contactsList.innerHTML = "";
  deal.contacts.forEach((contact) => {
    const li = document.createElement("li");
    li.textContent = `${contact.name} (${contact.email}, ${contact.phone})`;
    contactsList.appendChild(li);
  });

  // Populate products
  const productsTable = document.getElementById("dealProducts");
  productsTable.innerHTML = "";
  deal.products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>${product.unitPrice}</td>
      <td>${product.total}</td>
    `;
    productsTable.appendChild(row);
  });

  // Populate notes
  const notesSection = document.getElementById("dealNotes");
  notesSection.innerHTML = "";
  deal.notes.forEach((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.innerHTML = `<span>${note.timestamp}</span> - ${note.content}`;
    notesSection.appendChild(noteDiv);
  });
}

// SEARCH FUNCTION 
document.getElementById("searchBox").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();

  // Get all deal modals (or the data sources if not all modals are open)
  const deals = document.querySelectorAll(".deal-card");

  deals.forEach(deal => {
    const title = deal.querySelector(".deal-title")?.textContent.toLowerCase() || "";
    const contacts = deal.dataset.contacts?.toLowerCase() || ""; // Assuming contacts are stored in dataset
    const notes = deal.dataset.notes?.toLowerCase() || ""; // Assuming notes are stored in dataset
    const files = deal.dataset.files?.toLowerCase() || ""; // Assuming files are stored in dataset

    // Combine searchable content
    const combinedContent = `${title} ${contacts} ${notes} ${files}`;

    // Show or hide deals based on the search term
    if (combinedContent.includes(searchTerm)) {
      deal.style.display = "block"; // Show matching deal
    } else {
      deal.style.display = "none"; // Hide non-matching deal
    }
  });
});
