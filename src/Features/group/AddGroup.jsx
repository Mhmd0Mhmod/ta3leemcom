import Heading from '../../UI-Global/Heading.jsx';
import FormInput from '../../UI-Global/FormInput.jsx';
import Group from '../../../public/Icons/group.svg';
import DropList from '../../UI-Global/DropList.jsx';
import Button from '../../UI-Global/Button.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Cookies from 'js-cookie';
import { useLevels } from '@/pages/Dashboard/Dashboard.jsx';
import Alert from '../student/Alert.jsx';

function AddGroup() {
  const [groupName, setGroupName] = useState('');
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataGroup, setDataGroup] = useState(null);
  const [alertData, setAlertData] = useState({});

  const userLevels = useLevels();
  let keysLevelsNum = userLevels.levels[level];
  let levels = userLevels.mainLevels;
  const user = useAuthUser();
  let teacherId = user.teacherId;
  const token = Cookies.get('_auth');
  const navigate = useNavigate();
  const onChangeGroupName = (e) => {
    setGroupName(e.target.value);
  };
  const bodyData = {
    name: groupName,
    levelYearId: levelNumber,
    teacherId,
  };
  let response;
  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();

    if (!groupName) {
      toast.error('يجب إدخال اسم المجموعة ', { id: 'validation' });
      return;
    }

    if (!level) {
      toast.error('يجب إدخال جميع البيانات', { id: 'validation' });
      return;
    }
    if (!levelNumber) {
      toast.error('يجب إدخال جميع البيانات', { id: 'validation' });
      return;
    }
    setLoading(true);
    response = await axios.post(import.meta.env.VITE_API_URL + '/Group/Add', bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      setDataGroup(response);
    }

    setLoading(false);
  };
  useEffect(() => {
    if (loading === false) {
      if (dataGroup.status >= 200 && dataGroup.status < 300) {
        setAlertData({
          title: 'تم اضافه الطالب بنجاح',
          type: 'success',
          open: true,
          setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
          navigate: () => navigate('/dashboard/addGroup/' + dataGroup.data.id),
          edit: ()=> navigate('/dashboard/editGroup/' + dataGroup.data.id)
          
        });
        navigate('/dashboard/addGroup', { state: { isDeleted: false } });
      } else {
        toast.error('توجد مشكلة فى اضافة المجموعة')
      }
    }
  }, [loading]);
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

            <DropList title={'اختر المرحلة الدراسية'} options={levels.map((e) => e.name)} value={level} setValue={setLevel} optionsValue={levels.map((e) => e.id)} />
          </div>
          <div className={'flex flex-col gap-5'}>
            <Heading as={'h4'}>الصف الدراسي</Heading>
            <DropList title={'اختر الصف الدراسي'} options={keysLevelsNum ? keysLevelsNum?.map((e) => e.name) : []} value={levelNumber} setValue={setLevelNumber} optionsValue={keysLevelsNum ? keysLevelsNum?.map((e) => e.id) : []} />
          </div>
        </div>
        <Button type={'outline'} className={'mt-40 w-fit self-center'}>
          اضافة
        </Button>
      </form>
      <Alert {...alertData} />
    </div>
  );
}

export default AddGroup;







































// import Heading from '../../UI-Global/Heading.jsx';
// import FormInput from '../../UI-Global/FormInput.jsx';
// import Group from '../../../public/Icons/group.svg';
// import DropList from '../../UI-Global/DropList.jsx';
// import Button from '../../UI-Global/Button.jsx';
// import { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import GroupDetails from './GroupDetails.jsx';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
// import Cookies from 'js-cookie';
// import { useLevels } from '@/pages/Dashboard/Dashboard.jsx';
// import Alert from '../student/Alert.jsx';

// function AddGroup() {
//   const [groupName, setGroupName] = useState('');
//   const [level, setLevel] = useState('');
//   const [levelNumber, setLevelNumber] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [dataGroup, setDataGroup] = useState(null);
//   const [alertData, setAlertData] = useState({});

//   const userLevels = useLevels();
//   let keysLevelsNum = userLevels.levels[level];
//   let levels = userLevels.mainLevels;
//   const user = useAuthUser();
//   let teacherId = user.teacherId;
//   const token = Cookies.get('_auth');
//   const navigate = useNavigate();
//   const onChangeGroupName = (e) => {
//     setGroupName(e.target.value);
//   };
//   const bodyData = {
//     name: groupName,
//     levelYearId: levelNumber,
//     teacherId,
//   };
//   let response;
//   const handleSubmit = async (e) => {
//     console.log(e);
//     e.preventDefault();

//     if (!groupName) {
//       toast.error('يجب إدخال اسم المجموعة ', { id: 'validation' });
//       return;
//     }

//     if (!level) {
//       toast.error('يجب إدخال جميع البيانات', { id: 'validation' });
//       return;
//     }
//     if (!levelNumber) {
//       toast.error('يجب إدخال جميع البيانات', { id: 'validation' });
//       return;
//     }
//     setLoading(true);
//     response = await axios.post(import.meta.env.VITE_API_URL + '/Group/Add', bodyData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (response.status >= 200 && response.status < 300) {
//       setDataGroup(response);
//     }

//     setLoading(false);
//   };
//   useEffect(() => {
//     if (loading === false) {
//       if (dataGroup.status >= 200 && dataGroup.status < 300) {
//         setAlertData({
//           title: 'تم اضافه الطالب بنجاح',
//           type: 'success',
//           open: true,
//           setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
//           navigate: () => navigate('/dashboard/addGroup/' + dataGroup.data.id),
//           edit: ()=> navigate('/dashboard/editGroup/' + dataGroup.data.id)
          
//         });
//         navigate('/dashboard/addGroup', { state: { isDeleted: false } });
//       } else {
//         toast.error('توجد مشكلة فى اضافة المجموعة')
//       }
//     }
//   }, [loading]);
//   return (
//     <div className={'font-almaria'}>
//       <Heading as={'h1'} className={'text-center font-almaria-bold'}>
//         إنشاء مجموعة جديدة
//       </Heading>
//       <form onSubmit={handleSubmit} className={'mt-10 flex flex-col gap-10 font-cairo-bold'}>
//         <Heading as={'h4'} className={'text-[24px]'}>
//           اسم المجموعة
//         </Heading>
//         <FormInput type={'text'} name={'name'} className={'w-11/12'} Icon={Group} divClassName={'bg-white w-3/4 justify-around'} onChange={onChangeGroupName} />
//         <div className={'grid grid-cols-3'}>
//           <div className={'flex flex-col gap-5'}>
//             <Heading as={'h4'}>المرحلة الدراسية</Heading>

//             <DropList title={'اختر المرحلة الدراسية'} options={levels.map((e) => e.name)} value={level} setValue={setLevel} optionsValue={levels.map((e) => e.id)} />
//           </div>
//           <div className={'flex flex-col gap-5'}>
//             <Heading as={'h4'}>الصف الدراسي</Heading>
//             <DropList title={'اختر الصف الدراسي'} options={keysLevelsNum ? keysLevelsNum?.map((e) => e.name) : []} value={levelNumber} setValue={setLevelNumber} optionsValue={keysLevelsNum ? keysLevelsNum?.map((e) => e.id) : []} />
//           </div>
//         </div>
//         <Button type={'outline'} className={'mt-40 w-fit self-center'}>
//           اضافة
//         </Button>
//       </form>
//       <Alert {...alertData} />
//     </div>
//   );
// }

// export default AddGroup;

