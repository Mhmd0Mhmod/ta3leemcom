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
  // console.log(res);
  console.log(res);

  return res.data;
}
export async function getTest(quizId, training) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/Quiz/GetQuizById?QuizId=${quizId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (training) {
    if (new Date(res.data.endDate) > new Date(Date.now())) {
      throw new Error(`لم ينتهي وقت الاختبار بعد , يمكنك بدا التجربة التدريبية  : ${new Date(res.data.endDate).toLocaleString()}`);
    } else {
      return res.data;
    }
  }

  if (res.data.isAttending) {
    throw new Error('لقد قمت بحل الاختبار مسبقا');
  }
  if (new Date(res.data.startDate) > new Date(Date.now())) {
    throw new Error('لم يحن وقت الاختبار');
  }
  if (new Date(res.data.endDate) < new Date(Date.now())) {
    throw new Error('انتهى وقت الاختبار');
  }

  // throw new Error('انتهى وقت الاختبار');
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
