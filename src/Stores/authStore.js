import axios from "axios";
import toast from "react-hot-toast";

export async function studentLogin(code) {
  try {
    const { data } = await axios.post(import.meta.env.VITE_TA3LEMCOM_API_URL + "/Authentication/student-login", {
      code: code.code.trim(),
    });

    return data;
  } catch (_) {
    toast.error("حدث خطأ ما , يرجى المحاولة مرة أخرى");
  }
}

export async function teacherLogin({ email, password }) {
  try {
    const { data } = await axios.post(import.meta.env.VITE_TA3LEMCOM_API_URL + "/Authentication/login", {
      email,
      password,
    });
    return data;
  } catch (_) {
    toast.error("حدث خطأ ما , يرجى المحاولة مرة أخرى");
  }
}
