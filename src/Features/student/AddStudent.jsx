import Heading from '../../UI-Global/Heading.jsx';
import FormInput from '../../UI-Global/FormInput.jsx';
import Profile from '../../../public/Icons/profile.svg';
import DropList from '../../UI-Global/DropList.jsx';
import Button from '../../UI-Global/Button.jsx';
import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import axios from 'axios';
import Cookies from 'js-cookie';
import StudentDetails from './StudentDetails.jsx';

function AddStudent() {
  const [studentName, setStudentName] = useState('');
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  const [groupId, setGroupId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allLevels, setAllLevels] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams()
  const [studentDetails, setStudentDetails] = useState(null);

  const auth = useAuthUser();
  const token = Cookies.get('_auth');

  const levelYears = allLevels[level - 1]?.levelYears || [];
  const levelGroups = levelYears[levelNumber - 1]?.levelGroups|| [];


  useEffect(() => {
    async function getAllLevels() {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/Level/GetAllLevels?teacherId=${auth.teacherId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setAllLevels(data);
    }
    getAllLevels()
  }, []);


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
        setSearchParams({studentId: data.id})
        setStudentDetails(data)
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
  }

  if (searchParams.get('studentId')) {
    return <StudentDetails studentData={studentDetails} />;
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
              value={level}
              setValue={setLevel}
              options={allLevels.map((level) => level.levelNames) || []}
              optionsValue={allLevels.map((level) => level.levelId) || []}
            />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>الصف الدراسي</Heading>

            <DropList
              title={'اختر الصف الدراسي'}
              value={levelNumber}
              setValue={setLevelNumber}
              options={levelYears.map((el) => el.levelYearName)}
              optionsValue={levelYears.map((_, i) => i+1)}
            />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>المجموعة</Heading>
            <DropList
              title={'اختر المجموعة'}
              value={groupId}
              setValue={setGroupId}
              options={levelGroups.map((group) => group.groupName) || []}
              optionsValue={levelGroups.map((group) => group.groupId) || []}
            />
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
