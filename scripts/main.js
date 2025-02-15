import { fetchBooks } from "./api.js";
import { saveSearchTerm, getSearchTerm } from "./storage.js";

document.addEventListener("DOMContentLoaded", async () => {
    const bookList = document.getElementById("bookList");
    const searchBar = document.getElementById("searchBar");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalAuthor = document.getElementById("modal-author");
    const modalImage = document.getElementById("modal-image");
    const modalLink = document.getElementById("modal-link");
    const closeModal = document.querySelector(".close");

    let books = await fetchBooks();

    function displayBooks(filteredBooks) {
        bookList.innerHTML = "";
        filteredBooks.forEach((book) => {
            const li = document.createElement("li");
            li.classList.add("book");
            li.innerHTML = `
                <img src="${book.c || 'default-c.jpg'}" alt="${book.t}">
                <h3>${book.t}</h3>
                <p>by ${book.a}</p>
            `;

            li.addEventListener("click", () => {
                modal.style.display = "block";
                modalTitle.textContent = book.t;
                modalAuthor.textContent = `By ${book.a}`;
                modalImage.src = book.c || "default-c.jpg";
                modalImage.alt = `Cover of ${book.t}`;

                if (book.p) {
                    modalLink.href = book.p;
                    modalLink.textContent = "Read the Book";
                    modalLink.target = "_blank";
                } else {
                    modalLink.href = "#";
                    modalLink.textContent = "No PDF Available";
                }
            });

            bookList.appendChild(li);
        });
    }

    function filterBooks() {
        const searchTerm = searchBar.value.toLowerCase();
        saveSearchTerm(searchTerm);
        const filtered = books.filter(book =>
            book.t.toLowerCase().includes(searchTerm) ||
            book.a.toLowerCase().includes(searchTerm)
        );
        displayBooks(filtered);
    }

    searchBar.addEventListener("keyup", filterBooks);
    searchBar.value = getSearchTerm();

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    displayBooks(books);
});
