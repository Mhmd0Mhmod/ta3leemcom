import { useState } from 'react';
import Button from '../../UI-Global/Button.jsx';
import Heading from '../../UI-Global/Heading.jsx';
import { sumbitContactForm } from './helpers.js';
import toast from 'react-hot-toast';

export default function ContactWithUs() {
  const inputStyle = 'h-12 p-2 border-[1px] border-[#0884A24D] bg-[#0884A21A]  rounded-md ';
  const labelStyle = 'flex flex-col gap-2 flex-grow text-[#6D757D] text-[20px]';
  const [bodyData, setBodyData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBodyData((prev) => ({ ...prev, [name]: value }));
  };
  const submitForm = (e) => {
    e.preventDefault();

    sumbitContactForm(bodyData).then((res) => {
      if (res.status === 200) {
        toast.success('تم ارسال الرسالة بنجاح');
        setBodyData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        toast.error('حدث خطأ ما');
      }
    });
  };
  return (
    <div className={'font-almaria-bold'}>
      <Heading as={'h1'} className={'text-center text-[46px]'}>
        تواصل معنا
      </Heading>
      <p className={'my-16 text-[26px] text-[#0884A2]'}>نحن هنا للمساعدة، تواصل معنا</p>
      <div className={'grid grid-cols-2 items-center justify-items-center'}>
        <form onSubmit={submitForm} className="w-3/4">
          <div className={'flex w-full flex-col gap-5'}>
            <div className={'flex gap-5'}>
              <label className={labelStyle}>
                الاسم
                <input required type="text" name="name" value={bodyData.name} className={inputStyle} onChange={handleChange} />
              </label>
              <label className={labelStyle}>
                البريد الالكتروني
                <input required type="email" name="email" value={bodyData.email} className={inputStyle} onChange={handleChange} />
              </label>
            </div>
            <label className={labelStyle}>
              الموضوع
              <input required type="text" name="subject" value={bodyData.subject} className={inputStyle} onChange={handleChange} />
            </label>
            <label className={labelStyle}>
              الرسالة
              <textarea className={inputStyle + 'h-40 resize-none'} value={bodyData.message} name="message" onChange={handleChange} />
            </label>
            <div className={'self-center'}>
              <Button type={'primary'} icon={<img src="/public/Icons/sendmessaage.svg" className={'w-full'} />} iconStyle={'w-[35px]'} className={'flex-row-reverse items-center justify-center'}>
                إرسال الرسالة
              </Button>
            </div>
          </div>
        </form>
        <div>
          <img src="/public/Icons/contactusphoto.svg" />
        </div>
      </div>
    </div>
  );
}
