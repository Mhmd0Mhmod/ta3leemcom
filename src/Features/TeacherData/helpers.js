import axios from "axios";

export async function updateTeacherData(bodyData, token) {
  const { data, status } = await axios.put(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Teacher`, bodyData, {
    headers: {
      Authorization: token,
    },
  });
  if (status === 200) {
    return data;
  }
  throw new Error(data.message || "حدث خطأ ما أثناء تحديث البيانات");
}

export async function updateTeacherPassword(bodyData, token) {
  const { data, status } = await axios.put(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Authentication/update-password`, bodyData, {
    headers: {
      Authorization: token,
    },
  });
  if (status === 200) {
    return data;
  }
  throw new Error(data.message || "حدث خطأ ما أثناء تحديث كلمة المرور");
}
