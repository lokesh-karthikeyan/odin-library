const myLibrary = [];

/*******************************************************************************************
 * Object Constructor: Create instances of Books.                                          *
 *******************************************************************************************/

function Book(title, author, totalPages, readStatus) {
  if (!new.target) {
    throw Error("Use `new` keyword to instantiate the object.");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.readStatus = readStatus;
}

/*******************************************************************************************
 * Function Objective: Loops through the "myLibrary" & adds it to DOM.                     *
 *******************************************************************************************/

document.addEventListener("DOMContentLoaded", displayBooks());

function displayBooks() {
  let booksContainer = document.querySelector(".books-list");
  if (myLibrary.length === 0) {
    emptyLibrary(booksContainer);
    return;
  }

  for (let book of myLibrary) {
    if (book) {
      let newBookElement = createBookElement(book);
      addBookToDOM(newBookElement);

      if (findBookById(book.id)) continue;
      addBookToLibrary(book);
    }
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

modalContainer.addEventListener("click", (event) => {
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
    if (myLibrary.length < 1) emptyLibrary(booksContainer);
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
  let book = myLibrary.find((book) => book.id === bookId);
  return book ? book : false;
}

/*******************************************************************************************
 * Function Objective: Remove the book object by ID.                                       *
 *******************************************************************************************/

function removeBookById(bookId) {
  let index = myLibrary.findIndex((book) => book.id === bookId);
  if (index === -1) return;

  myLibrary.splice(index, 1);
}

/*******************************************************************************************
 * Function Objective: Adds different content if Library is empty.                         *
 *******************************************************************************************/

function emptyLibrary(booksContainer) {
  let template = document.getElementById("empty-library");
  let emptyBooksNotice = template.content.cloneNode(true);

  booksContainer.appendChild(emptyBooksNotice);
}

/*******************************************************************************************
 * Event Listener: Operate on submitted Form data.                                         *
 *******************************************************************************************/

let createNewBook = document.querySelector(".form-button");

createNewBook.addEventListener("click", (event) => {
  event.preventDefault();

  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let readStatus = document.getElementById("read-status").checked;

  if (title === "" || author === "" || pages === "") return;

  let modalContainer = document.getElementById("modal-container");
  let newBook = new Book(title, author, pages, readStatus);
  let newBookElement = createBookElement(newBook);

  addBookToDOM(newBookElement);
  addBookToLibrary(newBook);
  removeEmptyLibraryNotices();
  resetForm();
  modalContainer.click();
});

/*******************************************************************************************
 * Function Objective: Creates a new Book element form HTML template.                      *
 *******************************************************************************************/

function createBookElement(book) {
  let template = document.getElementById("book-template");
  let newBook = template.content.cloneNode(true);

  newBook.querySelector(".card").id = `book-${book.id}`;
  newBook.getElementById("book-status").id = `book-status-${book.id}`;
  newBook.getElementById("remove-book").id = `remove-book-${book.id}`;

  newBook.querySelector(".book-title").textContent = book.title;
  newBook.querySelector(".book-author.value").textContent = book.author;
  newBook.querySelector(".book-total-pages.value").textContent =
    book.totalPages;
  newBook.getElementById(`book-status-${book.id}`).textContent = book.readStatus
    ? "Completed"
    : "Start Reading";

  newBook
    .getElementById(`book-status-${book.id}`)
    .classList.remove("read", "unread");
  newBook
    .getElementById(`book-status-${book.id}`)
    .classList.add(book.readStatus ? "read" : "unread");

  return newBook;
}

/*******************************************************************************************
 * Helper Function: Adds the "Document Fragment" to DOM.                                   *
 *******************************************************************************************/

function addBookToDOM(bookElement) {
  let container = document.querySelector(".books-list");
  container.appendChild(bookElement);
}

/*******************************************************************************************
 * Function Objective: Appends the book object to the Library & myLibrary array.           *
 *******************************************************************************************/

function addBookToLibrary(...books) {
  myLibrary.push(...books);
}

/*******************************************************************************************
 * Helper Function: Removes the "No Book" information from DOM.                            *
 *******************************************************************************************/

function removeEmptyLibraryNotices() {
  let notice = document.querySelector(".no-books-present");

  if (notice === false || notice === null || notice === undefined) return;

  notice.remove();
}

/*******************************************************************************************
 * Function Objective: Resets the saved Form data for next form input.                     *
 *******************************************************************************************/

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read-status").checked = false;
}

/*******************************************************************************************
 * Event Listener: Hamburger Menu toggler.                                                 *
 *******************************************************************************************/

let menu = document.getElementById("hamburger-button");

menu.addEventListener("click", () => {
  let menuItem = document.querySelector(".right-side");
  menuItem.classList.toggle("is-active");

  if (menuItem.classList.contains("is-active")) {
    menu.innerHTML = "&#128473;";
  } else {
    menu.innerHTML = "&#9776;";
  }
});
