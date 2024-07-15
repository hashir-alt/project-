// Function to load books from local storage
function loadBooksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

// Function to save books to local storage
function saveBooksToLocalStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to add a new book
function addBook(author, name, description) {
    let books = loadBooksFromLocalStorage();
    const newBook = { author, name, description };
    books.push(newBook);
    saveBooksToLocalStorage(books);
}

// Function to edit a book
function editBook(index, author, name, description) {
    let books = loadBooksFromLocalStorage();
    books[index] = { author, name, description };
    saveBooksToLocalStorage(books);
}

// Function to delete a book
function deleteBook(index) {
    let books = loadBooksFromLocalStorage();
    books.splice(index, 1);
    saveBooksToLocalStorage(books);
}

// Function to display books in the table on library.html
function displayBooksOnLibrary() {
    const books = loadBooksFromLocalStorage();
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';

    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.description}</td>
            <td class="actions">
                <button class="edit-btn" onclick="handleEditBook(${index})">Edit</button>
                <button class="delete-btn" onclick="handleDeleteBook(${index})">Delete</button>
            </td>
        `;
        booksList.appendChild(row);
    });
}

// Function to load book details into edit form on edit.html
function loadBookDetails(index) {
    const books = loadBooksFromLocalStorage();
    const book = books[index];

    // Fill edit form fields with selected book details
    document.getElementById('edit-index').value = index;
    document.getElementById('edit-author-name').value = book.author;
    document.getElementById('edit-book-name').value = book.name;
    document.getElementById('edit-book-description').value = book.description;
}

// Function to handle saving edited book from edit.html
function handleSaveChanges() {
    const index = document.getElementById('edit-index').value;
    const author = document.getElementById('edit-author-name').value;
    const name = document.getElementById('edit-book-name').value;
    const description = document.getElementById('edit-book-description').value;

    if (!author || !name || !description) {
        alert('Please fill in all fields.');
        return;
    }

    editBook(index, author, name, description);
    window.location.href = 'library.html'; // Redirect to library page after edit
}

// Function to handle adding a book from index.html
function handleAddBook() {
    const author = document.getElementById('author-name').value;
    const name = document.getElementById('book-name').value;
    const description = document.getElementById('book-description').value;

    if (!author || !name || !description) {
        alert('Please fill in all fields.');
        return;
    }

    addBook(author, name, description);
    // Optionally, redirect to library.html after adding a book
    window.location.href = 'library.html';
}