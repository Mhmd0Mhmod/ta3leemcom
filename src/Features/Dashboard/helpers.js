import axios from "axios";

export async function fetchLevels(Authorization) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/LevelYear`, {
      headers: {
        Authorization,
      },
    });
    const levels = data.reduce((acc, level) => {
      if (acc[level.levelId]) {
        acc[level.levelId].push({
          id: level.id,
          name: level.name,
        });
      } else {
        acc[level.levelId] = [
          {
            id: level.id,
            name: level.name,
          },
        ];
      }
      return acc;
    }, {});
    return levels;
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchGroups(Authorization, levelYearId) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Group/GetAllGroupsOfTeacherId?levelYearId=${levelYearId}`, {
      headers: {
        Authorization,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
