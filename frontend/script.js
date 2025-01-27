// DOM Elements
const modal = document.getElementById("projectModal");
const closeButton = document.querySelector(".close-button");
const form = document.getElementById("projectForm");
const addProjectButtonDeals = document.querySelectorAll(".addProjectButton-deals");
const addProjectButtonSpecified = document.querySelectorAll(".addProjectButton-specified");
const addProjectButtonQuoted = document.querySelectorAll(".addProjectButton-quoted");
const addProjectButtonNegotiation = document.querySelectorAll(".addProjectButton-negotiation");
const addProjectButton5YardLine = document.querySelectorAll(".addProjectButton-5yardline");
const leadSource = document.getElementById("lead-source");
const hospitalNameContainer = document.getElementById("hospitalNameContainer")


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
addProjectButtonDeals.forEach(button => {
  button.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

addProjectButtonSpecified.forEach(button => {
  button.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

addProjectButtonQuoted.forEach(button => {
  button.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

addProjectButtonNegotiation.forEach(button => {
  button.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

addProjectButton5YardLine.forEach(button => {
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
  let projectName = ""; 

  if ($('#agencyNameContainer').is(':visible') && $('#agencyName').val().trim() !== "") {
    projectName = document.getElementById("agencyName").value;
    console.log("Agency Name:", projectName);
  } else if ($('#hospitalNameContainer').is(':visible') && $('#hospitalName').val().trim() !== "") {
    projectName = document.getElementById("hospitalName").value;
    console.log("Hospital Name:", projectName);
  } else if ($('#distributorNameContainer').is(':visible') && $('#distributorName').val().trim() !== "") {
    projectName = document.getElementById("distributorName").value;
    console.log("Distributor:", projectName);
  } else if ($('#leadWebsiteName').is(':visible') && $('#leadWebsiteName').val().trim() !== "") {
    projectName = document.getElementById("leadWebsiteName").value;
    console.log("Lead Website Name:", projectName);
  }

  const hospitalName = document.getElementById("hospitalName").value;
  const projectValue = document.getElementById("projectValue").value;
  const projectStage = document.getElementById("projectStage").value.trim();

  console.log("Selected Project Stage:", projectStage); // Debugging

  // Find the correct column
  const stageToColumnClass = {
    "Deals": "kanban-column-deals",
    "Specified": "kanban-column-specified",
    "Quoted": "kanban-column-quoted",
    "Negotiation": "kanban-column-negotiation",
    "5 Yard Line": "kanban-column-5yardline"
  };

  const columnClass = stageToColumnClass[projectStage];
  const column = document.querySelector(`.${columnClass} .kanban-cards`);

  if (!columnClass) {
    alert(`Error: Invalid project stage "${projectStage}".`);
    return;
  }

  console.log("Mapped Column Class:", columnClass); // Debugging

  if (column) {
    // Create the deal card element
    const dealCard = document.createElement("div");
    dealCard.classList.add("kanban-card", "deal-card");
    dealCard.setAttribute("draggable", "true");
    dealCard.dataset.id = generateUniqueId();
    dealCard.innerHTML = `
        <div class="deal-header">
      <div class="dropdown">
        <button class="dropdown-button">⋮</button>
        <div class="dropdown-menu">
        <button class="dropdown-item view-modal">View Modal</button>
        <button class="dropdown-item delete-deal">Delete Deal</button>
        </div>
      </div>
      <h3 class="deal-title">${hospitalName}</h3>
      </div>
    <p><strong>Value:</strong> $${projectValue}</p>
    `;

    const dropdownButton = dealCard.querySelector(".dropdown-button");
    const dropdownMenu = dealCard.querySelector(".dropdown-menu");

    dropdownButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent clicks from bubbling up
      dropdownMenu.classList.toggle("show"); // Toggle menu visibility
    });
    
    // Close dropdown when clicking outside
    document.addEventListener("click", () => dropdownMenu.classList.remove("show"));

    // Add drag event listeners to the new deal card
    dealCard.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", dealCard.dataset.id || ""); 
      dealCard.classList.add("dragging");
    });

    const kanbanColumns = document.querySelectorAll('.kanban-cards');
    const column = document.querySelector(`.${columnClass} .kanban-cards`);

    kanbanColumns.forEach((column) => {
      column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.classList.add('drag-over');
      });
    
      column.addEventListener('dragleave', () => {
        column.classList.remove('dragover'); //remove visual feedback
      });
    
      column.addEventListener('drop', (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData('text/plain');
        const draggedCard = document.querySelector(`.deal-card[data-id="${cardId}"]`);

        if (draggedCard) {
          column.appendChild(draggedCard);

        dealCard.addEventListener("dragend", () => {
          dealCard.classList.remove("dragging");
        });
    
        } else {
          console.error("Dragged card not found");
        }
    
        column.classList.remove('drag-over'); //remove visual feedback
      }); 
    });

    const deleteDealButton = dealCard.querySelector(".delete-deal");
    deleteDealButton.addEventListener("click", () => deleteDealCard(dealCard));

    // Append the new deal card to the column's list
    column.prepend(dealCard);
    modal.style.display = "none";
    form.reset();
  } else {
    alert(`Error: Could not find the specified column for "${projectStage}".`);
  }
});


//Dragging Functionality 

// Add dragover and drop events to group columns

// Get modal and close button
const dealModal = document.getElementById("dealModal");
const exitButton = dealModal.querySelector(".exit-button");

// Open modal when a deal is clicked
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-modal")) {
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
    stage: "",
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
