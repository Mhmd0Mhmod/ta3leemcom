import React from 'react'
import Heading from './ui-local/Heading'
import Poster from '../../public/imgs/ProfileSubscription.svg'
import Button from './ui-local/Button'
import SideImage from '../../public/imgs/SideImage.svg'
import { useSearchParams } from 'react-router-dom'
export default function ProfileSubscription() {
const [searchParams, setSearchParams] = useSearchParams();
const activeTab = searchParams.get("tab");
  if (!searchParams.get("Profile")) return;
  return (
    <div className='mt-10 ms-6'>
      <Heading as ={"h3"} className={"font-cairo-bold flex items-center"}>الاشتراك الحالي</Heading>
      <div className='mt-12 flex gap-40'>
        <div>
          <div className='flex gap-16'>
            <Heading as={"h4"} className={"font-cairo-bold"} >الخطة الحالية</Heading>
            <div className='w-[12.5rem] bg-[#EFEFEF] h-[2.5rem] flex items-center ps-2 rounded-md'>
            الباقة الأساسية
            </div>
          </div>
          <div className='flex'>
            <SideImage className={'relative top-[5rem] right-[-0.625rem]'}/>
            <div>
              <div className='mt-20'>
                <Heading as={"h4"} className={"font-cairo-bold"}>تاريخ بدء الاشتراك</Heading>
                <div className='w-[12.5rem] bg-[#EFEFEF] h-[2.5rem] flex items-center ps-2 rounded-md mt-4'>
                01/10/2024
                </div>
              </div>

              <div className='mt-20'>
                <Heading as={"h4"} className={"font-cairo-bold"}>تاريخ الانتهاء</Heading>
                <div className='w-[12.5rem] bg-[#EFEFEF] h-[2.5rem] flex items-center ps-2 rounded-md mt-4'>
                1/11/2024
                </div>
              </div>
            </div>
          </div>
          <button className="bg-[#0884A2] text-white w-[6.875rem] h-[2.5rem] ml-20 rounded-lg
          font-cairo-bold mt-12"           
          onClick={() =>
            setSearchParams({ tab: "UpgradeSubscription", Profile: true })}>ترقية الاشتراك</button>
        </div>


        <div className='flex'>
          <Poster className={'relative top-[-4.375rem]'}/>
        </div>
      </div>
    </div>
  ) 
}
