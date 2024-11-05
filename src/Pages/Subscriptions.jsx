import Subscription from "../UI/Subscription.jsx";
import Circles from "/public/Icons/circles.svg";
import LightLamp from "/public/Icons/lightLamp.svg";
import Heading from "../UI/Heading.jsx";

export default function Subscriptions() {
  return (
    <div className={"relative"}>
      <LightLamp alt="lamp" className={"absolute right-0 top-0 w-fit"} />
      <Circles alt="circles" className={"absolute left-0 top-0 -z-10 w-fit"} />

      <div className={"relative z-10 flex flex-col"}>
        <Heading className={"text-center font-Almarai-bold"}>الاشتركات</Heading>
      </div>
      <div className={"mt-28 space-y-8 p-10 xl:my-20"}>
        <p className={"text-xl text-gray-400"}>لا تقلق حول التكلفه</p>
        <p className={"text-5xl"}>اشتركات تناسب ميزانيتك</p>
      </div>
      <div
        className={
          "m-auto grid grid-cols-1 justify-around gap-10 px-10 md:grid-cols-2 xl:grid-cols-3"
        }
      >
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
  );
}
