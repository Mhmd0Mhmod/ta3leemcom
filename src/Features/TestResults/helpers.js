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
