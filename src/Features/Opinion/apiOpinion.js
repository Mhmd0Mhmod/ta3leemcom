import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export async function sendOpinion(rate, comment) {
  const userString = Cookies.get("_auth_state");
  if (!userString) {
    toast.error("يجب تسجيل الدخول اولا");
    return;
  }
  const user = JSON.parse(userString);

  const bodyData = {
    stars: rate,
    name: user.name,
    userRole: user.role,
    message: comment,
  };
  console.log(bodyData);
  const token = Cookies.get("_auth");
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/Comments/AddFeedback`,
    bodyData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res;
}

export async function getOpinions() {
  const { data, error } = await axios.get(
    `${import.meta.env.VITE_TA3LEMCOM_API_URL}/Comments/GetAllFeedBacks`,
  );
  if (error) {
    throw new Error("حدث خطأ ما");
  }
  return data;
}
