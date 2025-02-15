let books = []; // Empty array to store books from JSON

// Function to Load Books from JSON
async function loadBooks() {
    try {
        const response = await fetch("data/books.json"); // Load JSON file
        books = await response.json(); // Convert response to JSON
        displayBooks(books); // Display books
    } catch (error) {
        console.error("Error loading books:", error);
    }
}

// Function to Display Books
function displayBooks(bookArray) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = ""; // Clear previous results

    bookArray.forEach(book => {
        let li = document.createElement("li");
        li.className = "book-item";
        li.innerHTML = `
            <div class="book-card">
                <a href="${book.link}" target="_blank">
                    <img src="${book.image || 'fallback.jpg'}" alt="${book.title}" class="book-image">
                </a>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p><em>by ${book.author}</em></p>
                </div>
            </div>
        `;
        bookList.appendChild(li);
    });

    // Lazy loading images (applies after books are added)
    document.querySelectorAll("img[data-src]").forEach(img => {
        img.src = img.dataset.src;
    });
}

// Function to Search Books
function searchBook() {
    let query = document.getElementById("searchBar").value.toLowerCase();
    let filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
}

// Load books when page loads
document.addEventListener("DOMContentLoaded", loadBooks);
