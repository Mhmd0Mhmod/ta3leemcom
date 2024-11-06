import axios from "axios";

export async function fetchDashboardData({ Authorization, teahcerId }) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Level/GetAllLevels?teacherId=${teacherId}`, {
      headers: {
        Authorization,
      },
    });
    const mainLevels = data.map(({ levelId: id, levelNames: levelName }) => {
      return {
        id,
        levelName,
      };
    });
    const levels = data.
  } catch (error) {
    throw new Error(error);
  }
}
