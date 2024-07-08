const form = document.querySelector(".shopping");
const newItem = document.getElementById("item");
const submitButton = document.querySelector(".add-item");
const itemContainer = document.querySelector(".items");
const list = document.querySelector(".list");
let elementEditing;
const appKeyName = "MyGroceryApp";
const clearButton = document.querySelector(".clear");

let editing = false;

form.addEventListener("submit", addItem);

clearButton.onclick = clear;

init();

function init() {
  const dict = localStorage.getItem(appKeyName);
  if (!dict) {
    localStorage.setItem(appKeyName, JSON.stringify({}));
  } else {
    const data = JSON.parse(dict);
    for (const [key, value] of Object.entries(data)) {
      const markup = createArticle(value, key);
      const delButton = markup.querySelector(".delete");
      const editButton = markup.querySelector(".edit");
      delButton.onclick = deleteItem;
      editButton.onclick = editItem;
      list.appendChild(markup);
    }
    if (Object.keys(data).length > 0) {
      itemContainer.classList.add("show-groceries");
    }
  }
}

newItem.addEventListener("input", () => {
  if (newItem.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
});

function addItem(e) {
  e.preventDefault();
  const value = newItem.value;
  let dict = JSON.parse(localStorage.getItem(appKeyName));
  if (editing) {
    const id = elementEditing.getAttribute("data-id");
    const pElement = elementEditing.querySelector("p");
    pElement.innerText = newItem.value;
    dict[id] = newItem.value;
    localStorage.setItem(appKeyName, JSON.stringify(dict));
    postModal();
    submitButton.innerText = "add-item";
    newItem.value = "";
    editing = false;
  } else {
    const id = new Date().getTime().toString();
    const article = createArticle(value, id);
    list.appendChild(article);
    const delButton = article.querySelector(".delete");
    const editButton = article.querySelector(".edit");
    delButton.onclick = deleteItem;
    editButton.onclick = editItem;
    dict[id] = value;
    localStorage.setItem(appKeyName, JSON.stringify(dict));
    displayMessage(${value} successfully added to the list, "success");
  }
}