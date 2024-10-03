import axios from 'axios';
import Cookies from 'js-cookie';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export async function getGroups(teacherId, subLevelId) {
  const res = await axios.get(`${import.meta.env}/GetAllGroupsOfTeacherId?teacherId=${teacherId}&levelYearId=${subLevelId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('_auth')}`,
      'Content-Type': 'application/json',
      toJSON: true,
    },
  });
}
export async function addGroup() {}
