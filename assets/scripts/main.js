const root = document.documentElement;
const newBkDialog = document.querySelector('#bk-dialog');
const newBkBtn = document.querySelector('#bk-btn');
const confirmBkBtn = document.querySelector('#confirm-btn')


newBkBtn.addEventListener('click', () => {
  newBkDialog.showModal();
});

confirmBkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // ...code
});



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