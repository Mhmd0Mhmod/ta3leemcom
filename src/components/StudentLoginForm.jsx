import React from 'react'
import exit from "../../public/Icons/exit.svg";
import Card from "../../public/Icons/card.svg"
import { Link, useNavigate } from 'react-router-dom';
import Button from "./ui/Button.jsx";
import FormInput from "./ui/FormInput.jsx";
export default function StudentLoginForm() {
const navigate = useNavigate();
  return (
    <>
        <div className='p-9  font-almaria relative'>
            <img src={exit} alt={"exitIcon"} className={"cursor-pointer"} onClick={(e) => {
                e.preventDefault();
                navigate("/");
            }}/>

            <h2 className='font-almaria-bold text-center text-3xl mt-16'>تسجيل الدخول</h2>

            <div>
                <form>
                    <div className='flex flex-col justify-center h-[500px] gap-10'>
                        <label htmlFor="" className='text-xl text-[#A6A6A6]'>كود االطالب</label>
                        <FormInput type={"text"} placeholder={"       XX   XXX  XXX"} className={"w-[330px]"} icon={Card}/>
                        <div>
                            <input type="checkbox" className='me-2'/>
                            <label>تذكرني</label>
                        </div>
                        <div className='text-center'>
                            <Button type='Secondary'>سجل الدخول</Button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='absolute bottom-6 right-8 underline text-[#A6A6A6]'>
                <Link>تسجيل الدخول كمعلم</Link>
            </div>
            
        </div>
    </>
  )
}
