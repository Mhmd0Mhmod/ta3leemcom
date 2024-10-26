import axios from 'axios';
import toast from 'react-hot-toast';

export const getNotifications = async (token, Id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/Notification/GetAllNotificationOfTeacher?TeacherId=${Id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (e) {
    toast.error('حدث خطأ اثناء تحميل الاشعارات');
  }
};

export const setAllNotificationsAsRead = async (Id) => {
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/Notification/UpdateAllNotificationsToBeReaded?TeacherId=${Id}`);
  } catch (e) {
    toast.error('حدث خطأ اثناء تحديث الاشعارات');
  }
};
