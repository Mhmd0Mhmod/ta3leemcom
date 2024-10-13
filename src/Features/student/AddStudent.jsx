import Heading from '../../UI-Global/Heading.jsx';
import FormInput from '../../UI-Global/FormInput.jsx';
import Profile from '../../../public/Icons/profile.svg';
import DropList from '../../UI-Global/DropList.jsx';
import Button from '../../UI-Global/Button.jsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';
import StudentDetails from './StudentDetails.jsx';
import Alert from './Alert.jsx';
import { useTeacherDashboard } from '@/Context/TeacherDashboard/TeacherProvider.jsx';

function AddStudent() {
  const [studentName, setStudentName] = useState('');
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  const [groupId, setGroupId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [studentDetails, setStudentDetails] = useState(null);
  const [alertData, setAlertData] = useState({});

  const allLevels = useTeacherDashboard();
  const token = Cookies.get('_auth');

  let selectedLevelGroups = allLevels?.groupsOfSelectedlevel || [];

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (levelNumber) {
      allLevels?.selectYearIdFunc(levelNumber);
    }
  }, [levelNumber, allLevels]);

  useEffect(() => {
    if (level) {
      setLevelNumber('');
      setGroupId('');
    }
  }, [level]);

  useEffect(() => {
    if (levelNumber) {
      setGroupId('');
    }
  }, [levelNumber]);
  useEffect(() => {
    if (location?.state?.isDeleted) {
      setAlertData({
        title: 'تم حذف الطالب بنجاح',
        type: 'success',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
      navigate('/dashboard/addStudent', { state: { isDeleted: false } });
    }
  }, [location]);
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
      setIsLoading(true);
      const bodyData = {
        name: studentName,
        groupId,
      };

      const { data, status } = await axios.post(`${import.meta.env.VITE_API_URL}/Student/create`, bodyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
        setAlertData({
          title: 'تم اضافه الطالب بنجاح',
          type: 'success',
          open: true,
          setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
          navigate: () => navigate('/dashboard/studentDetails/' + data.id),
        });
        clear();
        setStudentDetails(data);
      }
    } catch (error) {
      toast.error('حدث خطأ', { id: 'validation' });
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
    <div className={'relative font-almaria'}>
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
            <DropList title={'اختر المرحلة الدراسية'} value={level} setValue={setLevel} options={allLevels?.mainLevels.map((el) => `${el.name}ة`) || []} optionsValue={allLevels?.mainLevels.map((el) => el.id) || []} />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>الصف الدراسي</Heading>

            <DropList title={'اختر الصف الدراسي'} value={levelNumber} setValue={setLevelNumber} options={allLevels?.levels[level]?.map((el) => el.name) || []} optionsValue={allLevels?.levels[level]?.map((el) => el.id) || []} />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>المجموعة</Heading>
            <DropList title={'اختر المجموعة'} value={groupId} setValue={setGroupId} options={levelNumber ? selectedLevelGroups.map((el) => el.groupName) : []} optionsValue={levelNumber ? selectedLevelGroups.map((el) => el.groupId) : []} />
          </div>
        </div>
        <div className="relative text-center">
          <Button type={'outline'} className={'mt-40 w-fit self-center disabled:cursor-not-allowed disabled:opacity-50'} onClick={handleAddStudent} disabled={!studentName || !groupId || isLoading}>
            اضافة
          </Button>
          <Alert {...alertData} />
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
