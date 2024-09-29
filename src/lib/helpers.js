import axios from "axios";
import Cookies from "js-cookie";

export const handleBack = (e) => {
    e?.preventDefault();
    window.history.back();
}

export async function fetchLevels() {
    const token = Cookies.get('_auth');
    return  await axios.get(`${import.meta.env.VITE_API_URL}/LevelYear`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}