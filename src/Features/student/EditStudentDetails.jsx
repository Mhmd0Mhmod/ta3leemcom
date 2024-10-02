import { useEffect, useState } from 'react';
import Profile from '../../../public/Icons/profile.svg';
import FormInput from '@/UI-Global/FormInput';
import { Button } from '../../components/ui/button.jsx';
import { useNavigate } from 'react-router-dom';
import DropList from '@/UI-Global/DropList';
import { useLevels } from '@/pages/Dashboard/Dashboard';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Alert from './Alert';

export default function EdiStudentDetails({ student, setStudent }) {
  const allLevels = useLevels();
  const currentMainLevel = allLevels?.mainLevels.find((el) => el.name === student.levelName).id;
  const currentLevelNumber = allLevels?.levels[currentMainLevel]?.find((el) => el.name === student.levelYearName).id;
  const selectedLevelGroups = allLevels?.groupsOfSelectedlevel || [];

  const [studentName, setStudentName] = useState(student?.name || '');
  const [level, setLevel] = useState(currentMainLevel || '');
  const [levelNumber, setLevelNumber] = useState(currentLevelNumber || '');
  const [groupId, setGroupId] = useState(student?.groupId || '');
  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    title: 'تم التعديل بنجاح',
    type: 'success',
    open: false,
  });

  const navigate = useNavigate();
  const token = Cookies.get('_auth');


  const updateStudent = async () => {
    if (!studentName.trim() || !level || !levelNumber || !groupId) {
      toast.error('يجب ادخال جميع البيانات', { id: 'validation' });
      return;
    }

    if (studentName.trim() === student.name && level === student.levelId && levelNumber === student.levelYearId && groupId === student.groupId) {
      navigate(-1);
      return;
    }

    try {
      setAlertData((data) => ({...data, open: false}))
      setIsLoading(true)
      const bodyData = {
        id: student.id,
        name: studentName.trim(),
        groupId: groupId,
      };

      const res = await axios.put(`${import.meta.env.VITE_API_URL}/Student/Edit`, bodyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setAlertData({
        title: 'تم التعديل بنجاح',
        type: 'success',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
        navigate: () => navigate(-1),
      });
      setStudent((prev) => ({ ...prev, ...res.data }));
    } catch (error) {
      setAlertData({
        title: 'حدث خطأ . يرجى المحاولة مرة أخرى.',
        type: 'error',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (levelNumber) {
      allLevels?.selectYearIdFunc(levelNumber);
    }
    
  }, [levelNumber]);

  

  return (
    <>
      <h2 className="mt-6 text-center font-almaria-bold text-3xl">تعديل بيانات الطالب</h2>
      <div className="mt-16 w-[77%]">
        <h3 className="mb-4 font-almaria-bold text-2xl">الإسم رباعي</h3>
        <FormInput value={studentName} onChange={(e) => setStudentName(e.target.value)} type={'text'} name={'name'} className={'w-11/12'} Icon={Profile} divClassName={'bg-white w-3/4 justify-around'} />
      </div>
      <div className="mb-40 mt-14 flex gap-40">
        <div>
          <h3 className="mb-6 font-almaria-bold text-xl"> المرحلة الدراسية</h3>
          <DropList
            onClick={() => {
              setLevelNumber('');
              setGroupId('');
            }}
            title={'اختر المرحلة الدراسية'}
            options={allLevels?.mainLevels.map((el) => el.name)}
            value={level}
            setValue={setLevel}
            optionsValue={levelNumber ? allLevels?.mainLevels.map((el) => el.id) : []}
          />
        </div>
        <div>
          <h3 className="mb-6 font-almaria-bold text-xl"> الصف الدراسي</h3>

          <DropList
            title={ 'اختر الصف الدراسي'}
            options={allLevels?.levels[level]?.map((el) => el.name) || []}
            value={levelNumber}
            setValue={setLevelNumber}
            optionsValue={level ? allLevels?.levels[level]?.map((el) => el.id) : []}
          />
        </div>
        <div>
          <h3 className="mb-6 font-almaria-bold text-xl"> المجموعة</h3>
          <DropList title={'اختر المجموعة'} options={selectedLevelGroups.map((el) => el.groupName)} value={groupId} setValue={setGroupId} optionsValue={selectedLevelGroups.map((el) => el.groupId) || []} />
        </div>
      </div>
      <div className="relative w-[100%] text-center">
        <Button type={'outline'} className={'h-[4.063rem] min-w-[8.75rem] self-center'} onClick={updateStudent} disabled={!studentName || !level || !levelNumber || !groupId || isLoading}>
          حفظ
        </Button>
        <Alert {...alertData}/>
      </div>
    </>
  );
}
