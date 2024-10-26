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

export async function getStudentTestsResult(id, auth) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/Quiz/GetStudentSolutionByStudentQuizId?studentQuizId=${id}`, {
    headers: {
      Authorization: auth,
    },
  });
  return res.data;
}
