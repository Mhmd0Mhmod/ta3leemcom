import Heading from '../../UI-Global/Heading.jsx';
import FormInput from '../../UI-Global/FormInput.jsx';
import Profile from '../../../public/Icons/profile.svg';
import DropList from '../../UI-Global/DropList.jsx';
import Button from '../../UI-Global/Button.jsx';
import { useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';
import StudentDetailes from './StudentDetailes.jsx';
import { FakeGroups, LEVELS } from '../../config.js';
import toast from 'react-hot-toast';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import axios from 'axios';

function AddStudent() {
  const [studentName, setStudentName] = useState('');
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  const [groupId, setGroupId] = useState('');
  const [allGroups, setAllGroups] = useState([]);
  const { id } = useParams();

  const auth = useAuthUser();

  const token = document.cookie
    ?.split(';')
    .map((cookie) => cookie.trim())
    ?.find((cookie) => cookie.startsWith('_auth'))
    ?.split('=')[1];

  const fetchGroups = async () => {
    try {
      if (!token) {
        return;
      }

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/Group/GetAllGroupsOfTeacherId?teacherId=${auth.teacherId}&levelYearId=${levelNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllGroups(data);
      toast.success('Groups are fetched', { id: 'validation' });
    } catch (error) {
      toast.error('حدث خطأ', { id: 'validation' });
    }
  };

  useEffect(() => {
    if (levelNumber) {
      fetchGroups();
    }
  }, [levelNumber, level]);

  if (id) return <StudentDetailes />;

  function clear() {
    setStudentName('');
    setGroupId('');
    setLevel('');
    setLevelNumber('');
    setAllGroups([]);
  }

  const handleAddStudent = async () => {
    console.log({ level, levelNumber, groupId: groupId, studentName });

    if (studentName.split(' ').length < 4 || studentName.trim().length < 12) {
      toast.error('يجب إدخال الإسم رباعى', { id: 'validation' });
      return;
    }

    if (!groupId) {
      toast.error('يجب إدخال جميع البيانات', { id: 'validation' });
      return;
    }

    //! ERROR: Unauthorized !
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/Student/create`, {
        data: {
          name: studentName,
          groupId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('تمت إضافة الطالب بنجاح', { id: 'validation' });
      console.log({ data });
      clear();
    } catch (error) {
      toast.error('حدث خطأ', { id: 'validation' });
    }
  };

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
            <DropList title={'اختر المرحلة الدراسية'} options={LEVELS.levels} value={level} setValue={setLevel} optionsValue={Object.keys(LEVELS).slice(1)} />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>الصف الدراسي</Heading>

            <DropList title={'اختر الصف الدراسي'} options={level ? LEVELS[level] : []} value={levelNumber} setValue={setLevelNumber} optionsValue={LEVELS[level]?.map((_, i) => i + 1) || ''} />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>المجموعة</Heading>
            <DropList title={'اختر المجموعة'} options={levelNumber && allGroups.length > 0 ? allGroups.map((group) => group.name) : []} value={groupId} setValue={setGroupId} optionsValue={allGroups.map((group) => group.id) || ''} />
          </div>
        </div>
        <Button type={'outline'} className={'mt-40 w-fit self-center disabled:cursor-not-allowed disabled:opacity-50'} onClick={handleAddStudent} disabled={!studentName || !groupId}>
          اضافة
        </Button>
      </div>
    </div>
  );
}

export default AddStudent;
