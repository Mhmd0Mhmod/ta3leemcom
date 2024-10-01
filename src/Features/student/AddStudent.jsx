import Heading from '../../UI-Global/Heading.jsx';
import FormInput from '../../UI-Global/FormInput.jsx';
import Profile from '../../../public/Icons/profile.svg';
import DropList from '../../UI-Global/DropList.jsx';
import Button from '../../UI-Global/Button.jsx';
import { useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import StudentDetailes from './StudentDetailes.jsx';
import { LEVELS } from '../../config.js';
import PopUp from '@/UI-Global/PopUp.jsx';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

function AddStudent() {
  const [searchParam, setSearchParmas] = useSearchParams();
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  if (searchParam.get('studentId')) return <StudentDetailes />;

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
            <DropList title={'اختر المجموعة'} options={[]} />
          </div>
        </div>
        <Button
          type={'outline'}
          className={'mt-40 w-fit self-center'}
          onClick={() => {
            setSearchParmas({ tab: 'addStudent', studentId: 1 });
          }}
        >
          اضافة
        </Button>
      </div>
      <PopUp className={'absolute bottom-24 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
        <span>تم إضافة المجموعة بنجاح</span>
      </PopUp>
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent className={'!min-h-[10vh] w-1/5 rounded-xl'}>
          <AlertDialogHeader className={'!text-right'}>
            <AlertDialogTitle>تأكيد حذف المجموعة</AlertDialogTitle>
            <AlertDialogDescription>ستؤدي هذه العملية إلى إزالة جميع البيانات المتعلقة بها نهائيًا. هل أنت متأكد؟</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={'!justify-between'}>
            <AlertDialogAction>نعم، حذف!</AlertDialogAction>
            <AlertDialogCancel>لا، إلغاء</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AddStudent;
