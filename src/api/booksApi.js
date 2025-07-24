import axios from 'axios';

const BASE_URL = 'https://readjourney.b.goit.study/api';

export const getRecommendedBooks = async ({ page = 1, limit = 8 }) => {
  const response = await axios.get(`${BASE_URL}/books/recommend`, {
    params: { page, limit },
  });
  return response.data;
};