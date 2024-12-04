import axios from "axios";

export async function getTestDesc(testId, token) {
  const { data, status } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Quiz/GetDescreptionOfQuiz?quizId=${testId}`, {
    headers: { Authorization: token },
  });
  if (status === 200) {
    return data;
  }
  throw new Error("Failed to fetch data");
}
export async function getStudentNotAttendedTest(testId, token) {
  const { data, status } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Student/GetAllStudnetDidntEnterQuizId?quizid=${testId}`, {
    headers: { Authorization: token },
  });
  if (status === 200) {
    return data;
  }
  throw new Error("Failed to fetch data");
}
export async function getStudentResults(testId, token) {
  const { data, status } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Quiz/GetAllResultsOfQuizId?quizid=${testId}`, {
    headers: { Authorization: token },
  });
  if (status === 200) {
    return data;
  }
  throw new Error("Failed to fetch data");
}
export async function getStudentStatistics(testId, token) {
  const { data, status } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Quiz/GetAllStatsOfQuizId?quizid=${testId}`, {
    headers: { Authorization: token },
  });
  if (status === 200) {
    return data;
  }
  throw new Error("Failed to fetch data");
}
