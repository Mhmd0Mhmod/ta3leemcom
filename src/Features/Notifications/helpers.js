import axios from "axios";

export async function getNotifications(token, teacherId) {
  const { data, status } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Notification/GetAllNotificationOfTeacher?TeacherId=${teacherId}`, {
    headers: {
      Authorization: token,
    },
  });

  if (status === 200) {
    return data;
  }
  throw new Error("Error in getting notifications");
}

export async function setAllRead(teacherId) {
  const { status } = await axios.put(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Notification/UpdateAllNotificationsToBeReaded?TeacherId=${teacherId}`);
  if (status === 200) {
    return;
  }
  throw new Error("Error in setting all read");
}
