import axios from 'axios';
import toast from 'react-hot-toast';

export async function getTests() {}
export async function getToppers(studentId) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/Student/GetTopStudents?studentId=${studentId}`);
    return res.data;
  } catch (error) {
    toast.error('حدث خطأ ما');
  }
}
export async function getAttendance() {}
