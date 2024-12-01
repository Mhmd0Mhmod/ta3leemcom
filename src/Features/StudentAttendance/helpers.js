import axios from "axios";

export async function getStudentAttendance(studentId, token) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Student/GetMonthDataForStudent?studentId=${studentId}`, {
      headers: {
        Authorization: token,
      },
    });

    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
}
