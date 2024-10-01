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
import { useLevels } from '@/pages/Dashboard/Dashboard.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export default function EditGroupDetails() {
  const [groupData , setGroupData] = useState('')
  const [groupName, setGroupName] = useState('');
  const [level, setLevel] = useState('');
  const [levelNumber, setLevelNumber] = useState('');
  useEffect(()=>{
     if(groupData){
      setGroupName(groupData.name)
      setLevel(groupData.levelId)
      setLevelNumber(groupData.levelYearId)
      console.log(groupData)
     }
  },[groupData])

  console.log("Level ID ,  " , level)
  console.log("levelNumber " , levelNumber)
  const navigate = useNavigate();
  // const handleButtonClick = () => {
  //   navigate(-1);
  // };

  const { id: groupID } = useParams();
  const token = Cookies.get('_auth');
  console.log(token)
  useEffect(() => {
    const get = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + `/Group/GetGroup?id=${groupID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          setGroupData(response.data)
        }
      } catch (error) {
        toast.error('حدث خطأ في جلب البيانات!');
      }
    };
    if (groupID && token) {
      get();
    }
  }, [groupID, token]);
   const handleGroChange = (e)=>{
    setGroupName(e.target.value)
    console.log(e.target.value)
   }
    const user = useAuthUser();
    let teacherId = user.teacherId;
     const handleSubmit = async()=>{
      try {
  
        const response = await axios.put(import.meta.env.VITE_API_URL + `/Group/Edit?Id=${groupID}&Name=${groupName}&LevelYearId=${level}&TeacherId=${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        toast.success("تم التعديل المجموعة بنجاح");
        console.log(response.data)
        if (response.status >= 200 && response.status < 300) {
          toast.success('تم تعديل المجموعة بنجاح!');
          // window.location.reload(false)
          setTimeout(() => {
             navigate(`/dashboard/addGroup/${response.data.id}`)
          }, 300);
        }else {
          toast.error(`هناك مشكلة فى عملية الاضافة`);
        }
      } catch (error) {
        console.error('Error adding group:', error);
      }
       
     }
   const userLevels = useLevels();
   console.log(userLevels)

  
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
          <DropList title={'اختر المرحلة الدراسية'} options={userLevels[1].map((e) => e.name)} value={level} setValue={setLevel} optionsValue={userLevels[1].map((e) => e.levelId)} />
          </div>
        <div>
          <h3 className="mb-6 font-almaria-bold text-xl"> الصف الدراسي</h3>
          {level === '' ? (
              <DropList title={'اختر الصف الدراسي'} options={[]} />
            ) : (
              <DropList title={'اختر الصف الدراسي'} options={userLevels[0].filter((e) => e.levelId === level).map((e) => e.name)} value={levelNumber} setValue={setLevelNumber} optionsValue={userLevels[0].filter((e) => e.levelId === level).map((e) => e.levelId)} />
            )}
        </div>
      </div>
      <div className="w-[100%] text-center">
        <Button type={'outline'} className={'h-[4.063rem] min-w-[8.75rem] self-center'} onClick={handleSubmit}>
          حفظ
        </Button>
      </div>
    </>
  );
}
