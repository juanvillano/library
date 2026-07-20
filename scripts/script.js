const listContainer = document.getElementById('list-container');
const form = document.getElementById('add-book');

const myLibrary = [];

function Book(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
}

function displayBook(book) {
    // Corrected to insertAdjacentHTML to handle string injection
    const listItem = `
        <article class="book-card" data-id="${book.id}">
            <div class="book__heading">
                <p>${book.title}</p>
                <p>by ${book.author}</p>
            </div>
            <div class="book__content">
                <!-- No info -->
            </div>
            <div class="book__actions">
                <div>
                    <label class="switch">
                        <input type="checkbox" ${book.read ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                    <span>Mark as read</span>
                </div>
                <button class="erase-btn" type="button">
                    <img alt="trash icon" src="./assets/trash-icon.svg">
                </button>
            </div>
        </article>
    `;

    listContainer.insertAdjacentHTML('beforeend', listItem);

    // listContainer.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
    //     const card = e.target.closest('.book-card');
    //     const book = myLibrary.find(book => book.id === card.dataset.id);
    //     if (book) {
    //         book.read = e.target.checked;
    //     }
    // });

}

function addBookToLibrary(title, author) {
    const book = new Book(crypto.randomUUID(), title, author, false);
    myLibrary.push(book);

    // Call the single display function instead of duplicating HTML
    displayBook(book);

    // log 
    console.log(myLibrary);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('book-title');
    const author = formData.get('book-author');

    addBookToLibrary(title, author);

    // Clear the form inputs after successful submission
    form.reset();
});

listContainer.addEventListener('change', (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
        const card = e.target.closest('.book-card');
        const book = myLibrary.find(book => book.id === card.dataset.id);
        if (book) {
            book.read = e.target.checked;
        }
        console.log(myLibrary);
    }
});

listContainer.addEventListener('click', (e) => {
    const button = e.target.closest('button.erase-btn');
    if (!button) return;
    const card = button.closest('.book-card');
    const book = myLibrary.find(b => b.id === card.dataset.id);
    if (!book) return;
    const index = myLibrary.indexOf(book);
    if (index !== -1) myLibrary.splice(index, 1);
    card.remove();
    console.log(myLibrary);
});