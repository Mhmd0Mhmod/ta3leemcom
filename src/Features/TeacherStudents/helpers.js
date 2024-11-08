import axios from "axios";

export async function getStudents({ groupsIds, token }) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Student/GetAllStudentOfGroupsIds?ids=${groupsIds.join("&ids=")}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (e) {
    throw new Error(e?.response?.data?.message || e?.message);
  }
}
