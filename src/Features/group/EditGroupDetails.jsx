import React, { useState } from 'react';
import Group from '/public/Icons/group.svg';
import FormInput from './ui/FormInput.jsx';
import DropList from './ui/DropList.jsx';
import { FakeStudent, LEVELS } from '../../config.js';
import Button from '../../components/ui/button.jsx';
import { useNavigate } from 'react-router-dom';
export default function EditGroupDetails() {
  const student = FakeStudent;
  const [groupName, setGroupName] = useState(student[0].group);
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(-1);
  };
  return (
    <>
      <h2 className="text-center font-almaria-bold text-3xl">تعديل المجموعة</h2>
      <div className="mt-16 w-[75%]">
        <h3 className="mb-4 font-almaria-bold text-2xl">اسم المجموعة </h3>
        <FormInput type={'text'} name={'name'} className={'w-11/12'} Icon={Group} divClassName={'bg-white w-3/4 justify-around'} />
      </div>
      <div className="mb-40 mt-14 flex gap-40">
        <div>
          <h3 className="mb-6 font-almaria-bold text-xl"> المرحلة الدراسية</h3>
          <DropList title={'اختر المرحلة الدراسية'} options={LEVELS.levels} value={level} setValue={setLevel} optionsValue={Object.keys(LEVELS).slice(1)} />
        </div>
        <div>
          <h3 className="mb-6 font-almaria-bold text-xl"> الصف الدراسي</h3>
          {level === '' ? (
            <DropList title={'اختر الصف الدراسي'} options={[LEVELS.middle[0], LEVELS.middle[1], LEVELS.middle[2]]} />
          ) : (
            <DropList title={'اختر الصف الدراسي'} options={LEVELS[level]} value={levelNumber} setValue={setLevelNumber} optionsValue={LEVELS[level].map((_, i) => i + 1)} />
          )}
        </div>
      </div>
      <div className="w-[100%] text-center">
        <Button type={'outline'} className={'h-[4.063rem] min-w-[8.75rem] self-center'} onClick={handleButtonClick}>
          حفظ
        </Button>
      </div>
    </>
  );
}
