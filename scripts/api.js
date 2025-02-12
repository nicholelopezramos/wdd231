export async function fetchBooks() {
    try {
        const response = await fetch("../data/books.json");
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}
