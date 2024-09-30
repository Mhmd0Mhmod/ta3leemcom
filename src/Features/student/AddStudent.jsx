import Heading from '../../UI-Global/Heading.jsx';
import FormInput from '../../UI-Global/FormInput.jsx';
import Profile from '../../../public/Icons/profile.svg';
import DropList from '../../UI-Global/DropList.jsx';
import Button from '../../UI-Global/Button.jsx';
import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import StudentDetailes from './StudentDetailes.jsx';
import { LEVELS } from '../../config.js';
import toast from 'react-hot-toast';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import axios from 'axios';
import Cookies from 'js-cookie';

function AddStudent() {
  const [studentName, setStudentName] = useState('');
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  const [groupId, setGroupId] = useState('');
  const [allGroups, setAllGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam, setSearchParams] = useSearchParams();

  const auth = useAuthUser();
  const token = Cookies.get('_auth');
  const getLevelKey = () => Object.keys(LEVELS).slice(1)[level - 1];


  const fetchGroups = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/Group/GetAllGroupsOfTeacherId?teacherId=${auth.teacherId}&levelYearId=${levelNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllGroups(data);
    } catch (error) {
      toast.error('حدث خطأ', { id: 'validation' });
    }
  };

  useEffect(() => {
    if (levelNumber) {
      fetchGroups();
    }
  }, [levelNumber, level]);
  
  
  if (searchParam.get('studentId')) return <StudentDetailes />;


  const handleAddStudent = async () => {

    if (studentName.split(' ').length < 4 || studentName.trim().length < 12) {
      toast.error('يجب إدخال الإسم رباعى', { id: 'validation' });
      return;
    }

    if (!groupId) {
      toast.error('يجب إدخال جميع البيانات', { id: 'validation' });
      return;
    }

    try {
      setIsLoading(true)
      const bodyData = {
          name: studentName,
          groupId,
        }

      const {data, status} = await axios.post(`${import.meta.env.VITE_API_URL}/Student/create`, bodyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if(status === 200){
        toast.success('تمت إضافة الطالب بنجاح', { id: 'validation' });
        clear();
         setSearchParams({ studentId: data.id });
      }

    } catch (error) {
      toast.error('حدث خطأ', { id: 'validation' });
    } finally{
      setIsLoading(false)
    }
  };

  function clear() {
    setStudentName('');
    setGroupId('');
    setLevel('');
    setLevelNumber('');
    setAllGroups([]);
  }

  return (
    <div className={'font-almaria'}>
      <Heading as={'h1'} className={'text-center font-almaria-bold'}>
        بيانات الطالب
      </Heading>
      <div className={'mt-10 flex flex-col gap-10 font-cairo-bold'}>
        <Heading as={'h4'} className={'text-[24px]'}>
          الإسم رباعي
        </Heading>
        <FormInput type={'text'} value={studentName} onChange={(e) => setStudentName(e.target.value)} name={'name'} className={'w-11/12'} Icon={Profile} divClassName={'bg-white w-3/4 justify-around'} />
        <div className={'grid grid-cols-3'}>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>المرحلة الدراسية</Heading>
            <DropList
              title={'اختر المرحلة الدراسية'}
              options={LEVELS.levels || []}
              value={level}
              setValue={setLevel}
              optionsValue={
                Object.keys(LEVELS)
                  .slice(1)
                  .map((_, i) => i + 1) || []
              }
            />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>الصف الدراسي</Heading>

            <DropList title={'اختر الصف الدراسي'} options={level ? LEVELS[getLevelKey()] : []} value={levelNumber} setValue={setLevelNumber} optionsValue={LEVELS[getLevelKey()]?.map((_, i) => i + 1) || []} />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>المجموعة</Heading>
            <DropList title={'اختر المجموعة'} options={levelNumber && allGroups.length > 0 ? allGroups.map((group) => group.name) : []} value={groupId} setValue={setGroupId} optionsValue={allGroups.map((group) => group.id) || []} />
          </div>
        </div>
        <Button type={'outline'} className={'mt-40 w-fit self-center disabled:cursor-not-allowed disabled:opacity-50'} onClick={handleAddStudent} disabled={!studentName || !groupId || isLoading}>
        اضافة
        </Button>
      </div>
    </div>
  );
}

export default AddStudent;
