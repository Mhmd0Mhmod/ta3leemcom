import React from 'react';
import Profile from '/public/imgs/Profile (2).svg';
import { useSearchParams } from 'react-router-dom';
export default function PersonalProfile({teacher}) {
  const [searchParams, setSearchParams] = useSearchParams();
  function  handleEditButton(e){
    setSearchParams({...Object.fromEntries(searchParams.entries()),tab:'EditTeacherProfile'});
  }
  return (
    <>
      <div className="mt-10 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <Profile />
          <div>
            <p className="font-cairo-bold text-lg">{teacher.name}</p>
            <p className="text-lg">{teacher.email}</p>
          </div>
        </div>
        <div>
          <button className="ml-20 h-[2.5rem] w-[6.25rem] rounded-lg bg-[#0884A2] font-cairo-bold text-white" onClick={handleEditButton}>
            تعديل
          </button>
        </div>
      </div>

      <div className="ms-10 mt-10">
        <div>
          <h2 className="font-cairo-bold text-xl">الاسم الكامل</h2>
          <div className="mt-3 flex h-[2.5rem] w-[65%] items-center rounded-sm bg-[#EFEFEF] p-6 text-lg">{teacher.name}</div>
        </div>

        <div className="mt-6 flex gap-16">
          <div>
            <h2 className="font-cairo-bold text-xl">رقم الهاتف</h2>
            <div className="mt-3 flex h-[2.5rem] w-[20rem] items-center rounded-sm bg-[#EFEFEF] p-6 text-lg">{teacher.phone}</div>
          </div>
          <div>
            <h2 className="font-cairo-bold text-xl">البريد الالكتروني</h2>
            <div className="mt-3 flex h-[2.5rem] w-[22.813rem] items-center rounded-sm bg-[#EFEFEF] p-6 text-lg">{teacher.email}</div>
          </div>
        </div>
      </div>
    </>
  );
}
