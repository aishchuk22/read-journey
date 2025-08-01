import axios from 'axios';

const BASE_URL = 'https://readjourney.b.goit.study/api';

export const getRecommendedBooks = async ({ page = 1, limit = 8, title = '', author = '' }) => {
  const params = { page, limit };
  
  if (title.trim()) {
    params.title = title.trim();
  }
  if (author.trim()) {
    params.author = author.trim();
  }

  const response = await axios.get(`${BASE_URL}/books/recommend`, {
    params,
  });
  return response.data;
};

export const addToLibrary = async (bookData) => {
  const response = await axios.post(`${BASE_URL}/books/add`, bookData);
  return response.data;
};

export const getUsersBooks = async () => {
  const response = await axios.get(`${BASE_URL}/books/own`);
  return response.data;
};

export const removeFromLibrary = async (bookId) => {
  const response = await axios.delete(`${BASE_URL}/books/remove/${bookId}`);
  return response.data;
};

export const getBookById = async (bookId) => {
  const response = await axios.get(`${BASE_URL}/books/${bookId}`);
  return response.data;
};

export const startReadingBook = async (bookId, { page }) => {
  const response = await axios.post(`${BASE_URL}/books/reading/start`, {
    id: bookId,
    page
  });
  return response.data;
};

export const finishReadingBook = async (bookId, { page }) => {
  const response = await axios.post(`${BASE_URL}/books/reading/finish`, {
    id: bookId,
    page
  });
  return response.data;
}; 

export const deleteReadingSession = async (bookId, readingId) => {
  
  const response = await axios.delete(`${BASE_URL}/books/reading`, {
    params: {
      bookId: bookId,
      readingId: readingId
    }
  });
  return response.data;
};