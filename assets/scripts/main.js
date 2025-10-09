const root = document.documentElement;
const newBkDialog = document.querySelector('#bk-dialog');
const newBkBtn = document.querySelector('#bk-btn');
const confirmBkBtn = document.querySelector('#confirm-btn');



newBkBtn.addEventListener('click', () => {
  newBkDialog.showModal();
});

confirmBkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // ...code
});



root.className = 'theme-light';
const myLibrary = [];

addBookToLibrary("48 Laws Of Power", "Robert Green", 354, true);
addBookToLibrary("Atomic Habbits", "James Clear", 274, false);
addBookToLibrary("Rich Dad Poor Dad", "Robert Kiyosaki and Sharon Lechter", 200, true);
addBookToLibrary("Game of Thrones", "George RR Martin", 487, true);
addBookToLibrary("Inside the Object", "David M. Papurt", 500, false);
displayBooks(myLibrary);


const readToggles = document.querySelectorAll('.read-toggle');
readToggles.forEach(readToggle => {
  readToggle.addEventListener('click', (e) =>{
    const bookId = e.target.id;
    const book = myLibrary.find(book => book.id === bookId);
    book.read = !book.read;
    const statusSpan = e.target.closest('.read').querySelector('.status');
    statusSpan.textContent = book.read === true ? 'unread' : 'read';

    const checkboxInput = e.target.closest('.read').querySelector('input[type="checkbox"]');
    if(book.read) {
      checkboxInput.setAttribute('checked', '');
    } else {
      checkboxInput.removeAttribute('checked');
    }
  
  });
});


function Book(title, author, numOfPages, read) {
  if(!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.read = read;  
}


function addBookToLibrary(title, author, numOfPages, read) {
  const book = new Book(title, author, numOfPages, read);
  myLibrary.push(book);
}


function setBookCardHTML(book) {
  return `
        <div class="card-content">
            <h1 class="title">${book.title}</h1>
            <p class="author">by <span class="name">${book.author}</span></p>
            <p class="num-of-pages">${book.numOfPages} pages</p>
        </div>
        <div class="card-footer">
            <section class="read">
                <span class="read-label">Mark as <span class="status">${book.read === true ? 'unread' : 'read'}</span>:</span>
                <label for="${book.id}" class="read-toggle">
                    <input type="checkbox" id="${book.id}" ${book.read === true ? 'checked' : ''}>
                    <span class="checkbox-control"></span>
                </label>
            </section>
            <section class="remove-card">
                <button class="remove-card-btn">Remove</button>
            </section>
        </div>
  `;
}

function displayBooks(myLibrary) {
  myLibrary.forEach(book => {
    addBookToDisplay(book);
  });
}

function addBookToDisplay(book) {
  const bookListSection = document.querySelector('#book-list');
  const bookCard = document.createElement('div');
  bookCard.classList.add('card');
  bookCard.setAttribute('data-id', book.id);
  bookCard.innerHTML = setBookCardHTML(book);
  bookListSection.appendChild(bookCard);

}