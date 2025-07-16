import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://readjourney.b.goit.study/api',
});

export const registerUser = async (data) => {
  const res = await instance.post('/users/signup', data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await instance.post('/users/signin', data);
  return res.data;
};