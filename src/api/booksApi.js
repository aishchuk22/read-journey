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