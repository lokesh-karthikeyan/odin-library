const myLibrary = [];

/*******************************************************************************************
 * Object Constructor: Create instances of Books.                                          *
 *******************************************************************************************/

function Book(author, title, totalPages, readStatus) {
  if (!new.target) {
    throw Error("Use `new` keyword to instantiate the object.");
  }
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.totalPages = totalPages;
  this.readStatus = readStatus;
}

/*******************************************************************************************
 * Helper Function: Takes in the params for "Books" and creates instances & stores it.     *
 *******************************************************************************************/

function addBookToLibrary(author, title, totalPages, readStatus) {}

let newBook1 = new Book("Test", "Test", 190, true);
let newBook2 = new Book(
  "Tffeesttttttttttttttttttttttttttttttttttt",
  "Testgw",
  1560,
  true,
);
let newBook3 = new Book(
  "Tes5456t",
  "Testgwyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
  10,
  false,
);
let newBook4 = new Book("Testgrw", "Teswwt", 134, false);

myLibrary.push(newBook1, newBook2, newBook3, newBook4);

/*******************************************************************************************
 * Function Objective: Loops through the "myLibrary" & adds it to DOM.                     *
 *******************************************************************************************/

document.addEventListener("DOMContentLoaded", displayBooks());

function displayBooks() {
  let container = document.querySelector(".books-list");
  let template = document.getElementById("book-template");

  for (let book of myLibrary) {
    let newBook = template.content.cloneNode(true);
    newBook.querySelector(".card").id = `book-${book.id}`;
    newBook.getElementById("book-status").id = `book-status-${book.id}`;
    newBook.getElementById("remove-book").id = `remove-book-${book.id}`;

    newBook.querySelector(".book-title").textContent = book.title;
    newBook.querySelector(".book-author.value").textContent = book.author;
    newBook.querySelector(".book-total-pages.value").textContent =
      book.totalPages;
    newBook.getElementById(`book-status-${book.id}`).textContent =
      book.readStatus ? "Completed" : "Start Reading";

    newBook
      .getElementById(`book-status-${book.id}`)
      .classList.remove("read", "unread");
    newBook
      .getElementById(`book-status-${book.id}`)
      .classList.add(book.readStatus ? "read" : "unread");

    container.appendChild(newBook);
  }
}

/*******************************************************************************************
 * Event Listener: Open / Close Modal Form.                                                *
 *******************************************************************************************/

let openModal = document.querySelector(".add-book");
let modalContainer = document.getElementById("modal-container");

openModal.addEventListener("click", () => {
  modalContainer.classList.toggle("show");
});

window.addEventListener("click", (event) => {
  if (event.target === modalContainer) {
    modalContainer.classList.toggle("show");
  }
});

/*******************************************************************************************
 * Event Listener: Delegates click event to <main> element.                                *
 *******************************************************************************************/

let booksContainer = document.querySelector(".books-list");

booksContainer.addEventListener("click", (event) => {
  let button = event.target.closest("button");
  if (!button) return;

  if (button.classList.contains("read-status")) {
    toggleReadStatus(button);
    return;
  }

  if (button.classList.contains("delete")) {
    let id = fetchElementId(button);
    let bookNode = document.getElementById(`book-${id}`);

    removeBookById(id);
    bookNode.remove();
  }
});

/*******************************************************************************************
 * Function Objective: Toggles book.readStatus.                                            *
 *******************************************************************************************/

function toggleReadStatus(element) {
  if (element.classList.contains("read")) {
    element.classList.remove("read");
    element.classList.add("unread");
    element.textContent = "Start Reading";
  } else if (element.classList.contains("unread")) {
    element.classList.remove("unread");
    element.classList.add("read");
    element.textContent = "Completed";
  }

  let id = fetchElementId(element);
  let selectedBook = findBookById(id);

  if (selectedBook.readStatus) {
    selectedBook.readStatus = false;
  } else {
    selectedBook.readStatus = true;
  }
}

/*******************************************************************************************
 * Function Objective: Fetch the book ID from element's ID.                                *
 *******************************************************************************************/

function fetchElementId(element) {
  let elementId = element.id;
  return elementId.replace(/^(remove-book-|book-status-)/, "");
}

/*******************************************************************************************
 * Function Objective: Find the book object by ID.                                         *
 *******************************************************************************************/

function findBookById(bookId) {
  return myLibrary.find((book) => book.id === bookId);
}

/*******************************************************************************************
 * Function Objective: Remove the book object by ID.                                       *
 *******************************************************************************************/

function removeBookById(bookId) {
  let index = myLibrary.findIndex((book) => book.id === bookId);
  if (index === -1) return;

  myLibrary.splice(index, 1);
}
