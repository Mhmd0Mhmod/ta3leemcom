import axios from "axios";

export async function getGroupMonths(token, groupId) {
  const { data, status } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Month/GetAllMonthsOfGroups?ids=${groupId}`, {
    headers: {
      Authorization: token,
    },
  });
  if (status === 200) {
    return data;
  } else throw new Error("حدث خطأ ما أثناء جلب البيانات");
}

export async function getMonthData(token, monthId) {
  const { data, status } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Month/GetMonthData?monthId=${monthId}`, {
    headers: {
      Authorization: token,
    },
  });
  if (status === 200) {
    return data;
  } else throw new Error("حدث خطأ ما أثناء جلب البيانات");
}

export async function addSession(token, bodyData) {
  const { data, status } = await axios.post(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Day`, bodyData, {
    headers: { Authorization: token },
  });
  console.log(status);
  if (status === 200) {
    return data;
  } else throw new Error("حدث خطأ ما أثناء إضافة الحصة");
}

export async function deleteSession(token, id) {
  const { status } = await axios.delete(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Day/?dayId=${id}`, {
    headers: { Authorization: token },
  });
  if (status === 200) {
    return null;
  } else throw new Error("حدث خطأ ما أثناء حذف الحصة");
}

export async function saveChanges(token, bodyData) {
  const { data, status } = await axios.put(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Month/SaveChanges`, bodyData, {
    headers: {
      Authorization: token,
    },
  });
  if (status === 200) {
    return data;
  }
  throw new Error("حدث خطأ ما أثناء حفظ التغييرات");
}

export async function addMonths(token, groupId, months) {
  try {
    const createMonthsPromises = months.map((month) => {
      return axios.post(
        `${import.meta.env.VITE_TA3LEMCOM_API_URL}/Month`,
        {
          groupId,
          name: month.name,
          year: month.year,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
    });
    const data = await Promise.allSettled(createMonthsPromises);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("حدث خطأ ما أثناء إضافة الشهور");
  }
}
