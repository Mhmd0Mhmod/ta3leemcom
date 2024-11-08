import axios from "axios";

export async function getToppers({ groupsIds, token }) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Student/GetAllTopStudentOfGroupsIds?ids=${groupsIds.join("&ids=")}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
