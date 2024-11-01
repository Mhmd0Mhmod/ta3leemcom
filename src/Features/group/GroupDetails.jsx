import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Warn from '/public/Icons/warining.svg';
import { getGroup } from '@/lib/helpers';
import { deleteGroup } from './helpers';
function GroupDetails() {
  const [groupData, setGroupData] = useState('');
  const navigate = useNavigate();
  const { id: groupID } = useParams();
  const token = Cookies.get('_auth');
  useEffect(() => {
    const response = getGroup(groupID).then((response) => {
      setGroupData(response.data);
    });
    if (response.status >= 200 && response.status < 300) {
      setGroupData(response.data);
    }
  }, [groupID, token]);
  const handleDelete = () => {
    deleteGroup(groupID).then((response) => {
      toast.success('تم الحذف بنجاح');
      navigate('/dashboard/addGroup');
    });
  };

  return (
    <>
      <div>
        <h3 className="mt-6 font-almaria-bold text-3xl"> المجموعة</h3>
        <div className="mb-8 mt-6 flex gap-6">
          <Link to={`/dashboard/editGroup/${groupID}`}>
            <button className={`h-10 w-28 rounded-lg bg-[#0884A2] text-xl text-white`}>تعديل</button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger className={`h-10 w-28 rounded-lg bg-[#F54547] text-xl text-white`}>حذف</AlertDialogTrigger>
            <AlertDialogContent className={'!min-h-[10vh] w-[450px] max-w-full rounded-xl'}>
              <AlertDialogHeader className={'!text-right'}>
                <AlertDialogTitle className="my-4 text-center text-3xl font-extrabold">
                  <p className="relative mb-4 flex justify-center">
                    <Warn />
                  </p>
                  <span>تأكيد حذف المجموعة</span>
                </AlertDialogTitle>
                <AlertDialogDescription className="text-lg">ستؤدي هذه العملية إلى إزالة جميع البيانات المتعلقة بالمجموعة نهائيًا. هل أنت متأكد؟</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className={'mt-4 !justify-between gap-4'}>
                <AlertDialogAction className="p-5" style={{ width: '100%', padding: '10px', borderRadius: '20px' }} onClick={handleDelete}>
                  نعم، حذف!
                </AlertDialogAction>
                <AlertDialogCancel className="p-5" style={{ width: '100%', padding: '10px', borderRadius: '20px' }}>
                  لا، إلغاء
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <form action="">
          <h3 className="mb-4 font-almaria-bold text-lg"> اسم المجموعة</h3>
          <input type="text" className="h-10 w-[43.75rem] bg-[#EFEFEF] p-2" disabled value={groupData.name} />
          <div className="mt-10 flex gap-10">
            <div>
              <h3 className="mb-4 mt-8 font-almaria-bold text-lg">المرحلة الدراسية</h3>
              <input type="text" className="h-10 w-52 bg-[#EFEFEF] p-2" value={groupData.levelName} disabled />
            </div>
            <div>
              <h3 className="mb-4 mt-8 font-almaria-bold text-lg"> الصف الدراسي</h3>
              <input type="text" className="h-10 w-52 bg-[#EFEFEF] p-2" value={groupData.levelYearName} disabled />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default GroupDetails;
