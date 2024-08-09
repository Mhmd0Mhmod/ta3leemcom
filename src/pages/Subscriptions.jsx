import Subscription from "../components/ui/Subscription.jsx";

export default function Subscriptions() {
  return (
    <div className={"relative font-almaria"}>
      <div className={"w-[50%] absolute left-0 z-0"}>
        <img src="../../public/Icons/circles.svg" alt="circles" className={"w-[100%]"} />
      </div>
      <div>
        <div className={"relative z-10 flex flex-col gap-10"}>
          <div className={"flex  gap-[17rem]"}>
            <div className={"flex flex-col w-fit gap-[10px]"}>
              <img src="../../public/Icons/lamp.svg" alt="lamp" className={"w-[96px]"} />
              <p className={"text-gray-400 text-[24px]"}>لا تقلق حول التكلفه</p>
              <p className={"text-5xl "}>اشتركات تناسب ميزانيتك</p>
            </div>
            <h1 className={"text-center text-[48px] font-almaria-bold"}>الاشتركات</h1>
          </div>
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
