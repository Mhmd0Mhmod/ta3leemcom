import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('_auth');
export async function getGroups(teacherId, subLevelId) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/GetAllGroupsOfTeacherId?teacherId=${teacherId}&levelYearId=${subLevelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      toJSON: true,
    },
  });
  return res.data;
}
export async function addGroup(bodyData) {
  try {
    const res = await axios.post(import.meta.env.VITE_API_URL + '/Group/Add', bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function deleteGroup(groupID) {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/Group/Delete?id=${groupID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
