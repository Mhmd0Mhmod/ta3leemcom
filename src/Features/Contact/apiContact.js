import axios from "axios";

export async function submitContact(bodyData) {
  const res = await axios.post(
    `${import.meta.env.VITE_TA3LEMCOM_API_URL}/Comments/Contact`,
    bodyData,
  );
  return res;
}
