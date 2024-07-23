// Initial shopping list array
let shoppingList = [
  "cooking oil",
  "soap",
  "brushes",
  "milk",
  "eggs",
  "biscuits",
  "yourgut",
  "spaggetti",
  "indomie",
  "ketchup sauce",
  "roll on",
  "tea bags",
  "shampoo"
];

// Get references to HTML elements
const newItemInput = document.getElementById("new-item");
const addButton = document.getElementById("add-button");
const shoppingListUl = document.getElementById("shopping-list");
const markPurchasedButton = document.getElementById("mark-purchased");
const clearListButton = document.getElementById("clear-list");

// Function to update the displayed shopping list
function updateList() {
  shoppingListUl.innerHTML = ""; // Clear existing list items

  shoppingList.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      listItem.dataset.index = index; // Store item index in data attribute

      // Add edit button (optional)
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => editItem(index));
      listItem.appendChild(editButton);

      listItem.classList.toggle("purchased", false); // Initially false
      listItem.addEventListener("click", () => togglePurchased(index));
      shoppingListUl.appendChild(listItem);
  });
}

// Function to add a new item to the shopping list
function addItem() {
  const newItem = newItemInput.value.trim();
  if (newItem) {
      shoppingList.push(newItem); // Push only the text of the item
      newItemInput.value = "";
      updateList();
      saveToLocalStorage(); // Save updated list to localStorage
  }
}

// Function to edit an item in the shopping list
function editItem(index) {
  const listItem = shoppingListUl.querySelector(`li[data-index="${index}"]`);
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = shoppingList[index]; // Use shoppingList array directly
  listItem.textContent = ""; // Clear existing content
  listItem.appendChild(editInput);

  editInput.addEventListener("blur", () => {
      shoppingList[index] = editInput.value.trim(); // Update shoppingList array
      updateList(); // Update the displayed list
      saveToLocalStorage(); // Save updated list to localStorage
  });
}

// Function to toggle the purchased state of an item
function togglePurchased(index) {
  shoppingList[index] = {
      text: shoppingList[index],
      purchased: !shoppingList[index].purchased
  };
  updateList();
  saveToLocalStorage(); // Save updated list to localStorage
}

// Function to clear the entire shopping list
function clearList() {
  shoppingList = []; // Clear array
  updateList();
  saveToLocalStorage(); // Save updated list to localStorage
}

// Event listeners for buttons
addButton.addEventListener("click", addItem);
markPurchasedButton.addEventListener("click", function() {
  const selectedItem = shoppingListUl.querySelector("li.selected");
  if (selectedItem) {
      togglePurchased(selectedItem.dataset.index); // Use data attribute to get index
  }
});
clearListButton.addEventListener("click", clearList);

// Function to save shoppingList to localStorage
function saveToLocalStorage() {
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

// Load from localStorage on page load
window.addEventListener("DOMContentLoaded", function() {
  const storedList = localStorage.getItem("shoppingList");
  if (storedList) {
      shoppingList = JSON.parse(storedList);
      updateList();
  }
});

// Save to localStorage before page unload
window.addEventListener("beforeunload", saveToLocalStorage);

// Initial call to update the list when the page loads
updateList();