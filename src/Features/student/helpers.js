import axios from "axios";
import Cookies from "js-cookie";

export async function getStudents(groupsId) {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/Student/GetAllStudentOfGroupsIds?ids=${groupsId.join('&ids=')}`, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('_auth')}`,
            'Content-Type': "application/json"
        }
    });
    return res;
}
