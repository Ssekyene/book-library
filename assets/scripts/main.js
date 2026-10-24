const root = document.documentElement;
const newBkDialog = document.querySelector('#bk-dialog');
const newBkBtn = document.querySelector('#bk-btn');
const bookForm = document.querySelector('#bk-form');

const bookTitle = document.querySelector('#bk-title');
const bookTitleError = document.querySelector('#bk-title + span.error');
const author = document.querySelector('#author');
const authorError = document.querySelector('#author + span.error');
const numberOfPages = document.querySelector('#pages');
const numberOfPagesError = document.querySelector('#pages + span.error');

const confirmBtn = document.querySelector('#confirm-btn');
const removeBookBtns = document.querySelectorAll('.remove-card-btn');
const darkThemeIcon = document.querySelector('#dark-theme-icon');
const lightThemeIcon = document.querySelector('#light-theme-icon');
const themeToggleBtn = document.querySelector('#theme-toggle-btn');
const newBkDialogCheckboxControl = newBkDialog.querySelector('.checkbox-control');
const checkboxInput = newBkDialogCheckboxControl.previousElementSibling;

// Toggle checkbox with Space when checkbox control is focused
newBkDialogCheckboxControl.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.key === ' ') {
    e.preventDefault();
    checkboxInput.checked = !checkboxInput.checked;
    checkboxInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
});

themeToggleBtn.addEventListener('click', setTheme);


newBkBtn.addEventListener('click', () => {
  // reset input controls when opening the form dialog
  const inputs = bookForm.querySelectorAll("input");
  inputs.forEach(input => {
    input.value = "";
  });
  checkboxInput.checked = false;
  checkboxInput.dispatchEvent(new Event('change', { bubbles: true }));

  newBkDialog.showModal();
});

newBkDialog.addEventListener('close', () => {
  const errorMessages = document.querySelectorAll('span.error');
  errorMessages.forEach(msg => {
    msg.className = 'error';
  });

  const inputElements = bookForm.querySelectorAll('input');
  inputElements.forEach(elem => {
    elem.classList.remove('invalid');
  });
});

confirmBtn.addEventListener('click', submitBookForm);

root.className = 'theme-dark';
if (root.className === 'theme-dark') {
    lightThemeIcon.classList.remove('hidden');
    darkThemeIcon.classList.add('hidden');
} else {
  darkThemeIcon.classList.remove('hidden');
  lightThemeIcon.classList.add('hidden');
}

const myLibrary = [];

addBookToLibrary("48 Laws Of Power", "Robert Green", 354, true);
addBookToLibrary("Atomic Habbits", "James Clear", 274, false);
addBookToLibrary("Rich Dad Poor Dad", "Robert Kiyosaki and Sharon Lechter", 200, true);
addBookToLibrary("Game of Thrones", "George RR Martin", 487, true);
addBookToLibrary("Inside the Object", "David M. Papurt", 500, false);
displayBooks(myLibrary);

// book title validation
bookTitle.addEventListener("input", (event) => {
  if (bookTitle.validity.valid) {
    clearError(bookTitle, bookTitleError);
  } else {
    showBookTitleError();
  }
});

// author validation
author.addEventListener("input", (event) => {
  if(author.validity.valid) {
    clearError(author, authorError)
  } else {
    showAuthorError();
  }
});

// number of pages validation
numberOfPages.addEventListener("input", (event) => {
  if(numberOfPages.validity.valid) {
    clearError(numberOfPages, numberOfPagesError)
  } else {
    showNumberOfPagesError();
  }
});


function clearError(inputElement, errorSpan) {
  errorSpan.textContent = "";
  errorSpan.className = "error";
  inputElement.classList.remove("invalid");
}

function showBookTitleError() {
  if (bookTitle.validity.valueMissing) {
    showError(bookTitle, bookTitleError, "You need to enter a book title.");
  } else if (bookTitle.validity.tooShort) {
    showError(bookTitle, bookTitleError, `Book title should be at least ${bookTitle.minLength} characters; you entered ${bookTitle.value.length}.`);
  } else if (bookTitle.validity.tooLong) {
    showError(bookTitle, bookTitleError, `Book title should be at most ${bookTitle.maxLength} characters; you entered ${bookTitle.value.length}.`);
  }
}

function showAuthorError() {
  if(author.validity.valueMissing) {
    showError(author, authorError, "You need to enter an author.");
  } else if (author.validity.tooShort) {
    showError(author, authorError, `Author should be at least ${author.minLength} characters; you entered ${author.value.length}.`);
  } else if (author.validity.tooLong) {
    showError(author, authorError, `Author should be at most ${author.maxLength} characters; you entered ${author.value.length}.`);
  }
}

function showNumberOfPagesError() {
  if(numberOfPages.validity.valueMissing) {
    showError(numberOfPages, numberOfPagesError, "You need to enter number of pages.");
  } else if (numberOfPages.validity.rangeUnderflow) {
    showError(numberOfPages, numberOfPagesError, `Number of pages should be at least ${numberOfPages.min}.`);
  } else if (numberOfPages.validity.rangeOverflow) {
    showError(numberOfPages, numberOfPagesError, `Number of pages should be at most ${numberOfPages.max}.`);
  }
}

function showError(inputElement, errorSpan, message) {
  inputElement.classList.add('invalid');
  errorSpan.textContent = message;
  errorSpan.className = "error active";
}

function submitBookForm(e) {
   e.preventDefault(); // stop form submission/reload

  // Validate all fields
  const isBookTitleValid = bookTitle.validity.valid;
  const isAuthorValid = author.validity.valid;
  const isNumberOfPagesValid = numberOfPages.validity.valid;

  let hasErrors = false;

  if (!isBookTitleValid) {
    showBookTitleError();
    hasErrors = true;
    console.log("book title error");
  }

  if (!isAuthorValid) {
    showAuthorError();
    hasErrors = true;
    console.log("author error");
  }

  if (!isNumberOfPagesValid) {
    showNumberOfPagesError();
    hasErrors = true;
    console.log("pages error");
  }

  if (hasErrors) {
    console.log("has errors");
    return;
  }


  if(bookForm.checkValidity()) {
    console.log("get data");
    const formData = new FormData(bookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const numOfPages = parseInt(formData.get('pages'), 10);
    
    const readCheckbox = bookForm.querySelector('input[name="read"]');
    const read = readCheckbox ? readCheckbox.checked : false;
    
    console.log("formData.get('read')", formData.get('read'));
    console.log("title, author, numOfPages, read", title, author, numOfPages, read);

    addBookToLibrary(title, author, numOfPages, read);
    const newBook = myLibrary[myLibrary.length - 1];
    addBookToDisplay(newBook);

    // console.log("read status", newBook.read);

    newBkDialog.close();
    bookForm.reset();
  } else {
    bookForm.reportValidity();
  }
}


function setTheme() {
  const root = document.documentElement;
  root.className = root.className === 'theme-dark' ? 'theme-light' : 'theme-dark';

  if (root.className === 'theme-dark') {
      lightThemeIcon.classList.remove('hidden');
      darkThemeIcon.classList.add('hidden');
  } else {
    darkThemeIcon.classList.remove('hidden');
    lightThemeIcon.classList.add('hidden');
  }
}


function removeBookFromLibrary(book)  {
  book.remove();
  removeBookFromDisplay(book);
}

function removeBookFromDisplay(book) {
  const bookListSection = document.querySelector('#book-list');
  const bookCard = bookListSection.querySelector(`div.card[data-id="${book.id}"]`);
  if(bookCard) {
    bookCard.classList.add('removing');
    bookCard.addEventListener('transitionend', () => {
        bookListSection.removeChild(bookCard);
    });
  }
}



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

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
}

Book.prototype.remove = function() {
  const bookIndex = myLibrary.findIndex(book => book.id === this.id);
  if(bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
  }
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
                <label for="${book.id}" class="read-toggle" tabindex="0">
                    <input type="checkbox" id="${book.id}" ${book.read === true ? 'checked' : ''} tabindex="-1">
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
  addReadToggleEventListener(book);
  addRemoveEventListener(book);

}


function addReadToggleEventListener(book) {
  const bookCard = document.querySelector(`div.card[data-id="${book.id}"]`);
  const checkboxInput = bookCard.querySelector('.read-toggle input[type="checkbox"]');
  const label = bookCard.querySelector('.read-toggle');

  // Toggle when checkbox state changes
  checkboxInput.addEventListener('change', (e) => {
    book.toggleReadStatus();
    const statusSpan = e.target.closest('.read').querySelector('.status');
    statusSpan.textContent = book.read === true ? 'unread' : 'read';

    // toggle checkbox attribute based on the book read status
    if(book.read) {
      checkboxInput.setAttribute('checked', '');
    } else {
      checkboxInput.removeAttribute('checked');
    }
    
  });

  // Toggle with Space when label is focused
  label.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      checkboxInput.checked = !checkboxInput.checked;
      // trigger the change event
      checkboxInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
}

function addRemoveEventListener(book) {
  const bookCard = document.querySelector(`div.card[data-id="${book.id}"]`);
  const removeBtn = bookCard.querySelector('.remove-card-btn');
  removeBtn.addEventListener('click', () => {
    confirm('Are you sure you want to remove this book?') &&
    removeBookFromLibrary(book);
  });
}
