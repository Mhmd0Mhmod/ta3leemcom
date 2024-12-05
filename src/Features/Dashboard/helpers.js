import axios from "axios";

export async function fetchLevels(token) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/LevelYear`, {
      headers: {
        Authorization: token,
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

export async function fetchGroups(token, levelYearId) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Group/GetAllGroupsOfTeacherId?levelYearId=${levelYearId}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function addStudent(token, bodyData) {
  const { data, status } = await axios.post(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Student/create`, bodyData, {
    headers: {
      Authorization: token,
    },
  });

  if (status === 200) {
    return data;
  } else {
    throw new Error("حدث خطأ ما , يرجى المحاوله مره اخرى");
  }
}

export async function addGroup(token, bodyData) {
  const { data, status } = await axios.post(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Group/Add`, bodyData, {
    headers: {
      Authorization: token,
    },
  });
  if (status === 200) {
    return data;
  } else {
    throw new Error("حدث خطأ ما , يرجى المحاوله مره اخرى");
  }
}

export async function getStudent(token, studentId) {
  const { data, status } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Student/GetStudent?id=${studentId}`, {
    headers: {
      Authorization: token,
    },
  });
  if (status === 200) {
    return data;
  }
  throw new Error("حدث خطأ ما , يرجى المحاوله مره اخرى");
}

export async function getGroup(token, groupId) {
  const { data, status } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Group/GetGroup?id=${groupId}`, {
    headers: {
      Authorization: token,
    },
  });
  if (status === 200) {
    return data;
  }
  throw new Error("حدث خطأ ما , يرجى المحاوله مره اخرى");
}

export async function editStudent(token, bodyData) {
  const { data, status } = await axios.put(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Student/Edit`, bodyData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });
  if (status === 200) {
    return data;
  } else {
    throw new Error("حدث خطأ ما , يرجى المحاوله مره اخرى");
  }
}

export async function editGroup(token, bodyData) {
  const { data, status } = await axios.put(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Group/Edit`, bodyData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });
  if (status === 200) {
    return data;
  } else {
    throw new Error("حدث خطأ ما , يرجى المحاوله مره اخرى");
  }
}

export async function deleteGroup(token, groupId) {
  const { status } = await axios.delete(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Group/Delete?id=${groupId}`, {
    headers: {
      Authorization: token,
    },
  });
  if (status === 200) {
    return true;
  } else {
    throw new Error("حدث خطأ ما , يرجى المحاوله مره اخرى");
  }
}
