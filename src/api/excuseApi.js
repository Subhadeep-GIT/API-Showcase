import axios from 'axios';

const BASE_URL = 'https:escape-plan-api.vercel.app'; // 🔁 Replace with your actual Vercel URL

// 🎯 Get Random Excuse
export const getRandomExcuse = async () => {
  const res = await axios.get(`${BASE_URL}/excuses/random`);
  return res.data;
};

// 🎯 Get Excuse by Category (e.g., romantic, work, family)
export const getExcuseByCategory = async (category) => {
  try {
    const res = await axios.get(`${BASE_URL}/excuses/${category}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return { error: "Category not found" };
    }
    throw err;
  }
};