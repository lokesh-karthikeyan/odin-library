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

displayBooks();
