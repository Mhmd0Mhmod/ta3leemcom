import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useLevels } from '@/pages/Dashboard/Dashboard.jsx';
function GroupDetails() {
  const [groupData, setGroupData] = useState('');
  const param = useParams();
  console.log(param);
  const userLevels = useLevels();
  console.log(userLevels);

  const { id: groupID } = useParams();
  const token = Cookies.get('_auth');
  useEffect(() => {
    const get = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + `/Group/GetGroup?id=${groupID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          setGroupData(response.data);
        }
      } catch (error) {
        toast.error('حدث خطأ في جلب البيانات!');
      }
    };
    if (groupID && token) {
      get();
    }
  }, [groupID, token]);

   const handleDelete = async()=>{
    try {
      const response = await axios.delete(import.meta.env.VITE_API_URL + `/Group/Delete?id=${groupID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success('تم الحذف بنجاح');
        setTimeout(() => {
          window.location.href = '/dashboard/addGroup';
        }, 1000);
      }
    } catch (error) {
      toast.error('حدث خطأ في الحذف!');
    }
        
   }

  return (
    <>
      <div>
        <h3 className="mt-6 font-almaria-bold text-3xl"> المجموعة</h3>
        <div className="mb-8 mt-6 flex gap-6">
          <Link to={`/dashboard/editGroup/${groupID}`}>
            <button className={`h-10 w-28 rounded-lg bg-[#0884A2] text-xl text-white`}>تعديل</button>
          </Link>

          <button className={`h-10 w-28 rounded-lg bg-[#F54547] text-xl text-white`} onClick={handleDelete}>حذف</button>
        </div>
        <form action="">
          <h3 className="mb-4 font-almaria-bold text-lg"> اسم المجموعة</h3>
          <input type="text" className="h-10 w-[43.75rem] bg-[#EFEFEF] p-2" disabled value={groupData.name} />
          <div className="mt-10 flex gap-10">
            <div>
              <h3 className="mb-4 mt-8 font-almaria-bold text-lg">المرحلة الدراسية</h3>
              <input type="text" className="h-10 w-52 bg-[#EFEFEF] p-2" value={groupData.levelName} />
            </div>
            <div>
              <h3 className="mb-4 mt-8 font-almaria-bold text-lg"> الصف الدراسي</h3>
              <input type="text" className="h-10 w-52 bg-[#EFEFEF] p-2" value={groupData.levelYearName} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default GroupDetails;
