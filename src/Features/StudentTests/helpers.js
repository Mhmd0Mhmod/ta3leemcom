import axios from "axios";

export async function getTests(token, studentId) {
  const { data, status } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Quiz/GetQuizesStatusOfStudentId?studentId=${studentId}`, {
    headers: {
      Authorization: token,
    },
  });
  if (status === 200) {
    return data;
  } else {
    throw new Error("Error in getting tests");
  }
}
