import axios from 'axios';
export function sumbitContactForm(bodyData) {
  const res = axios.post(`${import.meta.env.VITE_API_URL}/Comments/Contact`, bodyData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
}
