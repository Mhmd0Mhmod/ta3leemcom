import Heading from '../../UI-Global/Heading.jsx';
import FormInput from '../../UI-Global/FormInput.jsx';
import Group from '../../../public/Icons/group.svg';
import DropList from '../../UI-Global/DropList.jsx';
import Button from '../../UI-Global/Button.jsx';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GroupDetails from './GroupDetails.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { LEVELS } from '@/config.js';
import Cookies from 'js-cookie';
import { useLevels } from '@/pages/Dashboard/Dashboard.jsx';

function AddGroup() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [groupName, setGroupName] = useState('');
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');


  if (searchParams.get('groupID')) return <GroupDetails />;
  const navigate = useNavigate()
  const userLevels = useLevels();
  console.log(userLevels)
  const user = useAuthUser();
  let teacherId = user.teacherId;
  const token = Cookies.get('_auth');
  const onChangeGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const bodyData = {
    name: groupName,
    levelYearId: level,
    teacherId,
  };
   

  const clear =()=>{
    setGroupName('');
    setLevel('');
    setLevelNumber('');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (groupName === "") {
      toast.error("يرجى ادخال اسم المجموعة ");
      return;
    }
    if (!level) {
      toast.error("يرجى ادخال المرحلة الدراسية ");
      return;
    }
    if (!levelNumber) {
      toast.error("يرجى ادخال الصف الدراسي ");
      return;
    }

    try {
      console.log('Data : ', bodyData);

      const response = await axios.post(import.meta.env.VITE_API_URL + '/Group/Add', bodyData, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
      // toast.success("تم اضافة المجموعة بنجاح");
      console.log(bodyData)
      console.log(response.data.id)
      if (response.status >= 200 && response.status < 300) {
        toast.success('تم إضافة المجموعة بنجاح!');
        clear()
        // window.location.reload(false)
        setTimeout(() => {
           navigate(`/dashboard/addGroup/${response.data.id}`)
        }, 300);
      }else {
        toast.error(`لا يوجد LevelYear مع LevelYearId ${levelNumber}`);
      }
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };
  if (searchParams.get('groupID')) return <GroupDetails />;

   console.log(level)
   console.log(levelNumber)

  return (
    <div className={'font-almaria'}>
      <Heading as={'h1'} className={'text-center font-almaria-bold'}>
        إنشاء مجموعة جديدة
      </Heading>
      <form onSubmit={handleSubmit} className={'mt-10 flex flex-col gap-10 font-cairo-bold'}>
        <Heading as={'h4'} className={'text-[24px]'}>
          اسم المجموعة
        </Heading>
        <FormInput type={'text'} name={'name'} className={'w-11/12'} Icon={Group} divClassName={'bg-white w-3/4 justify-around'} onChange={onChangeGroupName} />
        <div className={'grid grid-cols-3'}>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>المرحلة الدراسية</Heading>

            <DropList title={'اختر المرحلة الدراسية'} options={userLevels[1].map((e) => e.name)} value={level} setValue={setLevel} optionsValue={userLevels[1].map((e) => e.levelId)} />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>الصف الدراسي</Heading>
            {level === '' ? (
              <DropList title={'اختر الصف الدراسي'} options={[]} />
            ) : (
              <DropList title={'اختر الصف الدراسي'} options={userLevels[0].filter((e) => e.levelId === level).map((e) => e.name)} value={levelNumber} setValue={setLevelNumber} optionsValue={userLevels[0].filter((e) => e.levelId === level).map((e) => e.levelId)} />
            )}
          </div>
        </div>
        <Button type={'outline'} className={'mt-40 w-fit self-center'} >
          اضافة
        </Button>
      </form>
    </div>
  );
}

export default AddGroup;
