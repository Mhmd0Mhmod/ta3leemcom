import Cookies from 'js-cookie';
import axios from 'axios';

const token = Cookies.get('_auth');

export async function submitTestAnswer(testData) {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/Quiz/AddStudentSolution`, testData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.status;
}
