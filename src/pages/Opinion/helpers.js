import axios from 'axios';

export function sendOpinion(rate, comment) {
  const bodyData = {
    stars: rate,
    message: comment,
  };
  const res = axios.post(`${import.meta.env.VITE_API_URL}/Comments/AddFeedback`, bodyData);
  return res;
}
