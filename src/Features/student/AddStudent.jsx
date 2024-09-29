import Heading from '../../UI-Global/Heading.jsx';
import FormInput from '../../UI-Global/FormInput.jsx';
import Profile from '../../../public/Icons/profile.svg';
import DropList from '../../UI-Global/DropList.jsx';
import Button from '../../UI-Global/Button.jsx';
import { useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';
import StudentDetailes from './StudentDetailes.jsx';
import { FakeGroups, LEVELS } from '../../config.js';
import toast from 'react-hot-toast';

function AddStudent() {
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  const [groupName, setGroupName] = useState('');
  const { id } = useParams();

  if (id) return <StudentDetailes />;

  return (
    <div className={'font-almaria'}>
      <Heading as={'h1'} className={'text-center font-almaria-bold'}>
        بيانات الطالب
      </Heading>
      <div className={'mt-10 flex flex-col gap-10 font-cairo-bold'}>
        <Heading as={'h4'} className={'text-[24px]'}>
          الإسم رباعي
        </Heading>
        <FormInput type={'text'} name={'name'} className={'w-11/12'} Icon={Profile} divClassName={'bg-white w-3/4 justify-around'} />
        <div className={'grid grid-cols-3'}>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>المرحلة الدراسية</Heading>
            <DropList title={'اختر المرحلة الدراسية'} options={LEVELS.levels} value={level} setValue={setLevel} optionsValue={Object.keys(LEVELS).slice(1)} />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>الصف الدراسي</Heading>

            {level === '' ? <DropList title={'اختر الصف الدراسي'} options={[]} /> : <DropList title={'اختر الصف الدراسي'} options={LEVELS[level]} value={levelNumber} setValue={setLevelNumber} optionsValue={LEVELS[level].map((_, i) => i + 1)} />}
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>المجموعة</Heading>
            <DropList title={'اختر المجموعة'} options={levelNumber ? FakeGroups.map((group) => group.name) : []} value={groupName} setValue={setGroupName} optionsValue={FakeGroups.map((group) => group.id)} />
          </div>
        </div>
        <Button
          type={'outline'}
          className={'mt-40 w-fit self-center'}
          onClick={() => {
            console.log({ level, levelNumber, groupName });
          }}
        >
          اضافة
        </Button>
      </div>
    </div>
  );
}

export default AddStudent;
