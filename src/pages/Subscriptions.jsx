import Subscription from "../components/ui-local/Subscription.jsx";

export default function Subscriptions() {
 return (
  <div className={"relative font-almaria"}>
   <div className={"w-[55rem] absolute left-0 z-0"}>
    <img src="../../public/Icons/circles.svg" alt="circles" />
   </div>
   <div>
    <div className={"relative z-10 flex flex-col gap-10 mb-4"}>
     <h1 className={"text-center text-[46px] font-almaria-bold"}>الاشتركات</h1>

     <div className={"absolute flex flex-col w-fit gap-[1rem]"}>
      <img
       src="../../public/Icons/lamp.svg"
       alt="lamp"
       className={"w-[96px]"}
      />
      <p className={"text-gray-400 text-[24px]"}>لا تقلق حول التكلفه</p>
     </div>
     <p className={"text-5xl mt-16 "}>اشتركات تناسب ميزانيتك</p>
     <div className={"grid grid-cols-3 gap-12 justify-around w-[90%] m-auto"}>
      <Subscription
       title={"الباقة الأساسيه "}
       price={"100"}
       support={[
        "إداره شامله للطلاب",
        "اختبارات اوفلين",
        "متابعه اداء الطلاب",
        "التواصل مع اولياء الامور",
       ]}
       notSupport={["انشاء شهادات تقدير", "رفع الملفات والفيديوهات"]}
      />
      <Subscription
       title={"الباقة المتقدمة "}
       price={"200"}
       support={[
        "إداره شامله للطلاب",
        "اختبارات اوفلين",
        "متابعه اداء الطلاب",
        "التواصل مع اولياء الامور",
        "انشاء شهادات تقدير",
       ]}
       notSupport={["رفع الملفات والفيديوهات"]}
      />
      <Subscription
       title={"الباقة الاحترافية "}
       price={"300"}
       support={[
        "إداره شامله للطلاب",
        "اختبارات اوفلين",
        "متابعه اداء الطلاب",
        "التواصل مع اولياء الامور",
        "انشاء شهادات تقدير",
        "رفع الملفات والفيديوهات",
       ]}
      />
     </div>
    </div>
   </div>
  </div>
 );
}
