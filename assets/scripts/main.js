const root = document.documentElement;
root.className = 'theme-light';

const myLibrary = [];

function Book(id, title, author, numOfPages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.read = read;  
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
}