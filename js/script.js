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
let newBook2 = new Book("Tffeest", "Testgw", 1560, true);
let newBook3 = new Book("Tes5456t", "Testgw", 10, false);
let newBook4 = new Book("Testgrw", "Teswwt", 134, false);

myLibrary.push(newBook1, newBook2, newBook3, newBook4);

/*******************************************************************************************
 * Function Objective: Loops through the "myLibrary" & add it to DOM.                      *
 *******************************************************************************************/

function displayBooks() {
  let container = document.querySelector(".books-list");

  for (let book of myLibrary) {
    console.log(book);
  }
}

/*******************************************************************************************
 * Helper Function: Creates card title.                                                    *
 *******************************************************************************************/

function createCardContents(book) {}

displayBooks();
