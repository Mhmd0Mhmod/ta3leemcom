import React, { useEffect, useState } from 'react';
import Group from '/public/Icons/group.svg';
import { FakeStudent, LEVELS } from '../../config.js';
import { useNavigate, useParams } from 'react-router-dom';
// import { FormInput } from 'lucide-react';
import DropList from '@/UI-Global/DropList.jsx';
import { Button } from '@/components/ui/button.jsx';
import FormInput from '@/UI-Global/FormInput.jsx';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Alert from '../student/Alert.jsx';
import { getGroup } from '@/lib/helpers.js';
import { useTeacherDashboard } from '@/Context/TeacherDashboard/TeacherProvider.jsx';

export default function EditGroupDetails() {
  const [groupData, setGroupData] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  const userLevels = useTeacherDashboard();
  const [alertData, setAlertData] = useState({
    title: 'تم التعديل بنجاح',
    type: 'success',
    open: false,
  });
  let levels = userLevels.mainLevels;
  let keysLevelsNum = userLevels.levels[level];

  useEffect(() => {
    if (groupData) {
      setGroupName(groupData.name);
      setLevel(groupData.levelId);
      setLevelNumber(groupData.levelYearId);
      // console.log(groupData);
    }
  }, [groupData]);
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
  const handleGroChange = (e) => {
    setGroupName(e.target.value);
    // console.log(e.target.value);
  };
  const user = useAuthUser();
  let teacherId = user.teacherId;
  const bodyData = {
    Id: groupID,
    Name: groupName,
    LevelYearId: levelNumber,
    TeacherId: teacherId,
  };
  const handleSubmit = async () => {
    if (!groupName) {
      toast.error('يجب إدخال اسم المجموعة ');
      return;
    }

    if (!level && !levelNumber) {
      toast.error('يجب إدخال جميع البيانات');
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/Group/Edit`, bodyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status >= 200 && response.status < 300) {
        navigate(`/dashboard/addGroup/${groupID}`);
        setTimeout(() => {
          setAlertData({
            title: 'تم التعديل بنجاح',
            type: 'success',
            open: true,
            setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
            navigate: () => navigate(-1),
          });
        }, 1000);
      }
    } catch (error) {
      setAlertData({
        title: 'حدث خطأ . يرجى المحاولة مرة أخرى.',
        type: 'error',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    }
  };

  return (
    <>
      <h2 className="text-center font-almaria-bold text-3xl">تعديل المجموعة</h2>
      <div className="mt-16 w-[75%]">
        <h3 className="mb-4 font-almaria-bold text-2xl">اسم المجموعة </h3>
        <FormInput type={'text'} name={'name'} value={groupName} onChange={handleGroChange} className={'w-11/12'} Icon={Group} divClassName={'bg-white w-3/4 justify-around'} />
      </div>
      <div className="mb-40 mt-14 flex gap-40">
        <div>
          <h3 className="mb-6 font-almaria-bold text-xl"> المرحلة الدراسية</h3>
          <DropList title={'اختر المرحلة الدراسية'} options={levels.map((e) => e.name)} value={level} setValue={setLevel} optionsValue={levels.map((e) => e.id)} />
        </div>
        <div>
          <h3 className="mb-6 font-almaria-bold text-xl"> الصف الدراسي</h3>
          <DropList title={'اختر الصف الدراسي'} options={keysLevelsNum ? keysLevelsNum?.map((e) => e.name) : []} value={levelNumber} setValue={setLevelNumber} optionsValue={keysLevelsNum ? keysLevelsNum?.map((e) => e.id) : []} />
        </div>
      </div>
      <div className="w-[100%] text-center">
        <Button type={'outline'} className={'h-[4.063rem] min-w-[8.75rem] self-center'} onClick={handleSubmit}>
          حفظ
        </Button>
        <Alert {...alertData} />
      </div>
    </>
  );
}
