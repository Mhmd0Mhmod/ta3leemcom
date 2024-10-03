import axios from "axios";
import Cookies from "js-cookie";

export const handleBack = (e) => {
    e?.preventDefault();
    window.history.back();
}

export async function fetchLevels(teacherId) {
    const token = Cookies.get('_auth');
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/Level/GetAllLevels?teacherId=${teacherId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json"
        }
    });
    return res;
}

// export async function addGroup(){
//     const token = Cookies.get('_auth');
//     const res = await axios.post(import.meta.env.VITE_API_URL + '/Group/Add', bodyData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         return res;
// }
