import Subscription from "./Subscription";

function SubscriptionsGrid() {
  return (
    <>
      <div className={"m-auto grid grid-cols-1 justify-around gap-10 px-10 md:grid-cols-2 xl:grid-cols-3"}>
        <Subscription
          title={"الباقة الأساسيه "}
          // price={"100"}
          support={["إداره شامله للطلاب", "اختبارات اوفلين", "متابعه اداء الطلاب", "التواصل مع اولياء الامور"]}
          notSupport={["انشاء شهادات تقدير", "رفع الملفات والفيديوهات"]}
        />
        <Subscription
          title={"الباقة المتقدمة "}
          // price={"200"}
          support={["إداره شامله للطلاب", "اختبارات اوفلين", "متابعه اداء الطلاب", "التواصل مع اولياء الامور", "انشاء شهادات تقدير"]}
          notSupport={["رفع الملفات والفيديوهات"]}
        />
        <Subscription
          title={"الباقة الاحترافية "}
          // price={"300"}
          support={["إداره شامله للطلاب", "اختبارات اوفلين", "متابعه اداء الطلاب", "التواصل مع اولياء الامور", "انشاء شهادات تقدير", "رفع الملفات والفيديوهات"]}
        />
      </div>
    </>
  );
}
export default SubscriptionsGrid;
