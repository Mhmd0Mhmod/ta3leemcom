import React, { useState } from 'react';
import { Teacher } from '@/config.js';
import Profile from '../../../../public/imgs/Profile (2).svg';
import Back from '../../../../public/Icons/arrow_back.svg';
import { Link, useNavigate } from 'react-router-dom';
import Heading from '@/UI-Global/Heading.jsx';
import FormInput from '@/UI-Global/FormInput.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import toast from 'react-hot-toast';
export default function EditTeacherProfile() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const token = useAuthHeader();
  const teacher = useAuthUser();
  const [reWriteNewPassword, setReWriteNewPassworde] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  function handleFormData(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  function submitForm(e) {
    e.preventDefault();
    if (formData.currentPassword === '' || formData.newPassword === '' || reWriteNewPassword === '') {
      toast.error('الرجاء ملئ جميع الحقول');
      return;
    }
    if (formData.newPassword !== reWriteNewPassword) {
      toast.error('كلمة السر غير متطابقة');
      return;
    }
    // send the data to the server
    updatePassword().then((res) => {
      if (res?.status === 200) toast.success('تم تغير كلمة السر بنجاح');
    });
  }
  async function updatePassword() {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/Authentication/update-password`,
        { id: teacher.teacherId, ...formData },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return res;
    } catch (err) {
      toast.error('حدث خطأ ما الرجاء المحاولة مرة اخرى');
    }
  }
  return (
    <>
      <Back className={'absolute left-8 top-4 cursor-pointer'} onClick={goBack} />
      <div className="ms-8 mt-8 flex items-center gap-4">
        <Profile />
        <div>
          <p className="font-cairo-bold text-lg">{teacher.name}</p>
          <p className="text-lg text-[#808080]">{teacher.email}</p>
        </div>
      </div>
      {/* <div className="ms-8 mt-8 w-[90%] rounded-md border-2 border-[#E7E7E7] py-4">
        <Heading as={'h2'} className={'border-b-2 border-[#E7E7E7] pb-3 ps-4 font-almaria-bold'}>
          تعديل الملف الشخصي
        </Heading>
        <div>
          <Heading as={'h3'} className={'mt-4 ps-4 font-almaria-bold'}>
            الاسم الكامل
          </Heading>
          <div className={'ms-4 mt-6 flex w-[70%] gap-10'}>
            <input className="flex h-[60px] w-[22%] items-center justify-center rounded-lg border-2 border-[#B5B5B5] text-2xl text-[#B5B5B5]" />
            <input className="flex h-[60px] w-[22%] items-center justify-center rounded-lg border-2 border-[#B5B5B5] text-2xl text-[#B5B5B5]" />
            <input className="flex h-[60px] w-[22%] items-center justify-center rounded-lg border-2 border-[#B5B5B5] text-2xl text-[#B5B5B5]" />
          </div>
          <div className="ms-4 mt-4">
            <Heading as={'h3'} className={'mt-6 font-almaria-bold'}>
              رقم الهاتف
            </Heading>
            <input className="mt-4 flex h-[60px] w-[55%] items-center justify-end rounded-lg border-2 border-[#B5B5B5] pe-2 text-2xl text-[#B5B5B5]" />
          </div>
          <div className="flex justify-end">
            <button className="mx-6 mt-6 h-[60px] w-[15%] rounded-lg bg-[#0884A2] font-almaria-bold text-xl text-white">حفظ التغير</button>
          </div>
        </div>
      </div> */}
      {/* ------------------------ */}
      <div className="my-8 ms-8 w-[90%] rounded-md border-2 border-[#E7E7E7] py-4">
        <Heading as={'h2'} className={'border-b-2 border-[#E7E7E7] pb-3 ps-4 font-almaria-bold'}>
          تغير كلمة السر
        </Heading>
        <div>
          <Heading as={'h4'} className={'m-4 font-almaria-bold'}>
            كلمة السر الحالية
          </Heading>
          <div className="ms-4 mt-2 w-[70%]">
            <FormInput type={'password'} onChange={handleFormData} name={'currentPassword'} placeholder={'كلمة المرور'} className={'w-full'} />
            <div className="mt-2 flex justify-end text-[#0884A2] underline">
              <Link>نسيت كلمة المرور ؟</Link>
            </div>
          </div>
        </div>
        <div>
          <Heading as={'h4'} className={'m-4 font-almaria-bold'}>
            كلمة السر الجديدة
          </Heading>
          <div className="ms-4 mt-2 w-[70%]">
            <FormInput type={'password'} onChange={handleFormData} name={'newPassword'} placeholder={'كلمة المرور'} className={'w-full'} />
          </div>
        </div>
        <div>
          <Heading as={'h4'} className={'m-4 font-almaria-bold'}>
            تاكيد كلمة السر الجديدة
          </Heading>
          <div className="ms-4 mt-2 w-[70%]">
            <FormInput type={'password'} onChange={(e) => setReWriteNewPassworde(e.target.value)} name={'password'} placeholder={'كلمة المرور'} className={'w-full'} />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={submitForm} className="mx-6 mt-6 h-[60px] w-[15%] rounded-lg bg-[#0884A2] font-almaria-bold text-xl text-white">
            تغير كلمة السر
          </button>
        </div>
      </div>
    </>
  );
}
