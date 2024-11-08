import axios from "axios";

export async function studentLogin(code) {
  const res = await axios.post(import.meta.env.VITE_TA3LEMCOM_API_URL + "/Authentication/student-login", {
    code: code.code.trim(),
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("حدث خطأ ما , يرجى المحاولة مرة أخرى");
  }
}

export async function teacherLogin({ email, password }) {
  const res = await axios.post(import.meta.env.VITE_TA3LEMCOM_API_URL + "/Authentication/login", {
    email,
    password,
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("حدث خطأ ما , يرجى المحاولة مرة أخرى");
  }
}