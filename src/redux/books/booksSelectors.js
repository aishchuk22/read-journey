export const selectBooks = state => state.books.books;
export const selectMyLibraryBooks = state => state.books.myLibraryBooks;
export const selectBooksLoading = state => state.books.isLoading;
export const selectLibraryLoading = state => state.books.isLibraryLoading;
export const selectBooksError = state => state.books.error;
export const selectBooksPage = state => state.books.page;
export const selectBooksTotalPages = state => state.books.totalPages;
export const selectBooksFilters = state => state.books.filters;