import Button from "../../UI-Global/Button.jsx";
import Heading from "../../UI-Global/Heading.jsx";

export default function ContactWithUs() {
 const inputStyle =
  "h-12 p-2 border-[1px] border-[#0884A24D] bg-[#0884A21A]  rounded-md ";
 const labelStyle = "flex flex-col gap-2 flex-grow text-[#6D757D] text-[20px]";

 return (
  <div className={"font-almaria-bold"}>
   <Heading as={"h1"} className={" text-center text-[46px]"}>
    تواصل معنا
   </Heading>
   <p className={" text-[26px]  text-[#0884A2] my-16"}>
    نحن هنا للمساعدة، تواصل معنا
   </p>
   <div className={"grid grid-cols-2 items-center justify-items-center"}>
    <div className={"flex flex-col gap-5 w-full"}>
     <div className={"flex gap-5"}>
      <label className={labelStyle}>
       الاسم
       <input type="text" className={inputStyle} />
      </label>
      <label className={labelStyle}>
       البريد الالكتروني
       <input type="email" className={inputStyle} />
      </label>
     </div>
     <label className={labelStyle}>
      الموضوع
      <input type="text" className={inputStyle} />
     </label>
     <label className={labelStyle}>
      الرسالة
      <textarea className={inputStyle + "h-40 resize-none"} />
     </label>
     <div className={"self-center"}>
      <Button
       type={"primary"}
       icon={
        <img src="../../../public/Icons/sendmessaage.svg" className={"w-full"} />
       }
       iconStyle={"w-[35px]"}
       className={"justify-center flex-row-reverse items-center"}
      >
       {" "}
       إرسال الرسالة{" "}
      </Button>
     </div>
    </div>
    <div>
     <img src="../../../public/Icons/contactusphoto.svg" />
    </div>
   </div>
  </div>
 );
}
