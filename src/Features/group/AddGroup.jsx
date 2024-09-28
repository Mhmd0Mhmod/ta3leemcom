
import Heading from '../../UI-Global/Heading.jsx';
import FormInput from '../../UI-Global/FormInput.jsx';
import Group from '../../../public/Icons/group.svg';
import DropList from '../../UI-Global/DropList.jsx';
import Button from '../../UI-Global/Button.jsx';
import { useState } from 'react';
// import { LEVELS } from '../../config.js';
import { useSearchParams } from 'react-router-dom';
import GroupDetails from './GroupDetails.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { LEVELS } from '@/config.js';

function AddGroup() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [groupName, setGroupName] = useState('');
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');

  if (searchParams.get('groupID')) return <GroupDetails />;

  // const { levels } = LEVELS;
  const user = useAuthUser()
  console.log(user)
  console.log(user.teacherId)

  const onChangeGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    if (!groupName || !level || !levelNumber) {
      toast.error('يرجى تعبئة جميع الحقول');
      return;
    }
  
    try {
      const bodyData = {
        groupName,
        level,
        levelNumber,
      };
  
      const response = await axios.post(import.meta.env.VITE_API_URL + '/Group/Add',bodyData);
      if (response.status === 200) {
        toast.success(response.data);
      }
      if (response.status === 200) {
        toast.success('تم إضافة المجموعة بنجاح!');
        setGroupName('');
        setLevel('');
        setLevelNumber('');
      } 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'فشل في إضافة المجموعة';
      
      toast.error(`خطأ: ${errorMessage}`);
      console.error('Error adding group:', error);
    }
  };
  if (searchParams.get('groupID')) return <GroupDetails />;
  const { levels, primary, middle, high } = LEVELS;

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
            <DropList title={'اختر المرحلة الدراسية'} options={levels} value={level} setValue={setLevel} optionsValue={Object.keys(LEVELS).slice(1)} />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>الصف الدراسي</Heading>
            {level === '' ? (
              <DropList title={'اختر الصف الدراسي'} options={[]} />
            ) : (
              <DropList title={'اختر الصف الدراسي'} options={LEVELS[level]} value={levelNumber} setValue={setLevelNumber} optionsValue={LEVELS[level].map((_, i) => i + 1)} />
            )}
          </div>
        </div>
        <Button type={'outline'} className={'mt-40 w-fit self-center'}>
          اضافة
        </Button>
      </form>
    </div>
  );
}

export default AddGroup;