export function saveSearchTerm(term) {
    localStorage.setItem("lastSearch", term);
}

export function getSearchTerm() {
    return localStorage.getItem("lastSearch") || "";
}
