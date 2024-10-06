import axios from 'axios';
import Cookies from 'js-cookie';

export async function getGroups(teacherId, subLevelId) {
  const res = await axios.get(`${import.meta.env}/GetAllGroupsOfTeacherId?teacherId=${teacherId}&levelYearId=${subLevelId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('_auth')}`,
      'Content-Type': 'application/json',
      toJSON: true,
    },
  });
}
