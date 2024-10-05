import Heading from '../../UI-Global/Heading.jsx';
import FormInput from '../../UI-Global/FormInput.jsx';
import Group from '../../../public/Icons/group.svg';
import DropList from '../../UI-Global/DropList.jsx';
import Button from '../../UI-Global/Button.jsx';
import { useState } from 'react';
import { LEVELS } from '../../config.js';
import { useSearchParams } from 'react-router-dom';
import GroupDetails from './GroupDetails.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

function AddGroup() {
  const [searchParmas, setSearchParmas] = useSearchParams();
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  if (searchParmas.get('groupID')) return <GroupDetails />;
  const { levels, primary, middle, high } = LEVELS;

  return (
    <div className={'font-almaria'}>
      <Heading as={'h1'} className={'text-center font-almaria-bold'}>
        إنشاء مجموعة جديدة
      </Heading>
      <div className={'mt-10 flex flex-col gap-10 font-cairo-bold'}>
        <Heading as={'h4'} className={'text-[24px]'}>
          اسم المجموعة
        </Heading>
        <FormInput type={'text'} name={'name'} className={'w-11/12'} Icon={Group} divClassName={'bg-white w-3/4 justify-around'} />
        <div className={'grid grid-cols-3'}>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>المرحلة الدراسية</Heading>
            <DropList title={'اختر المرحلة الدراسية'} options={levels} value={level} setValue={setLevel} optionsValue={Object.keys(LEVELS).slice(1)} />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>الصف الدراسي</Heading>

            {level === '' ? <DropList title={'اختر الصف الدراسي'} options={[]} /> : <DropList title={'اختر الصف الدراسي'} options={LEVELS[level]} value={levelNumber} setValue={setLevelNumber} optionsValue={LEVELS[level].map((_, i) => i + 1)} />}
          </div>
        </div>
        <Button type={'outline'} className={'mt-40 w-fit self-center'}>
          اضافة
        </Button>
      </div>
    </div>
  );
}

export default AddGroup;
