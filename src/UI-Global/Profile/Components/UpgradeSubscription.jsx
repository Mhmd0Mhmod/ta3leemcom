import Heading from '@/UI-Global/Heading.jsx';
import Subscription from '@/pages/Subscriptions/Components/Subscription.jsx';
import Back from "../../../../public/Icons/arrow_back.svg";
import { useNavigate } from "react-router-dom";
export default function UpgradeSubscription() {
    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1);
    };
  
  return (
    <>
      <Back className={"absolute left-8 top-4 cursor-pointer"} onClick={goBack}/>
      <div className="mt-8 ms-8 mb-">
        <Heading as={"h2"} className={"font-almaria-bold"}>
          ترقية الاشتراك
        </Heading>
        <p className="mt-8 text-lg">
          اختر من بين خطط الاشتراك التالية لترقية أو تغيير خطتك
        </p>
        <div className={"grid grid-cols-3 gap-12 w-[90%] mt-8"}>
          <Subscription
            title={"الباقة المتقدمة "}
            price={200}
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
            price={300}
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
    </>
  );
}
