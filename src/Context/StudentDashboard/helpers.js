import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';

const token = Cookies.get('_auth');

export async function getTests(studentId) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/Quiz/GetQuizesStatusOfStudentId?studentId=${studentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);

  return res.data;
}
export async function getToppers(groupId) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/Student/GetAllTopStudentOfGroupsIds?ids=${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    toast.error('حدث خطأ ما');
  }
}
export async function getAttendance(studentId) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/Student/GetMonthDataForStudent?studentId=${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    toast.error('حدث خطأ ما');
  }
}
