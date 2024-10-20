import axios from 'axios';
import toast from 'react-hot-toast';

export const getNotifications = async (token, Id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/Notification/GetAllNotificationOfTeacher?TeacherId=${Id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (e) {
    toast.error('حدث خطأ اثناء تحميل الاشعارات');
  }
};