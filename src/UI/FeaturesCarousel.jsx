import StudentManagement from "/public/Icons/studentManagment.svg";
import Offline from "/public/Icons/offline.svg";
import Peopleconnection from "/public/Icons/peopleconnection.svg";
import StudentTrue from "/public/Icons/studentTrue.svg";
import Dollar from "/public/Icons/dollar.svg";
import FollowStudent from "/public/Icons/followingStudent.svg";
import OnlineBook from "/public/Icons/OnlineBook.svg";
import UploadCloud from "/public/Icons/UploadCloud.svg";
import Certification from "/public/Icons/Certification.svg";
import ArrowLeft from "/public/Icons/arrow-l-red.svg";
import ArrowRight from "/public/Icons/arrow-r-red.svg";
import FeaturesCard from "./FeaturesCard.jsx";
import Button from "./Button.jsx";
import { useState } from "react";

const features = [
  { text: "إدارة شاملة للطلاب", icon: <StudentManagement /> },
  { text: "اختبارات أوفلاين", icon: <Offline /> },
  { text: "التواصل مع أولياء الأمور", icon: <Peopleconnection /> },
  { text: "متابعة أداء الطلاب", icon: <StudentTrue /> },
  { text: "مراقبه اداء الابناء", icon: <FollowStudent /> },
  { text: "اختبارات اونلين", icon: <OnlineBook /> },
  { text: "باقات اشتراكات متنوعة", icon: <Dollar /> },
  { text: "متابعة شاملة", icon: <FollowStudent /> },
  { text: "رفع الملفات والفيديوهات", icon: <UploadCloud /> },
  { text: "التواصل مع المدرسين", icon: <Peopleconnection /> },
  { text: "إنشاء شهادات تقدير", icon: <Certification /> },
];

function FeaturesCarousel() {
  const [current, setCurrent] = useState(0);

  function increase() {
    setCurrent((current + 1) % 3);
  }

  function decrease() {
    if (current === 0) setCurrent(2);
    else setCurrent(current - 1);
  }

  return (
    <div className={"space-y-7 overflow-hidden"}>
      <div
        className={`grid grid-cols-[45%_45%_45%_45%_45%_45%] grid-rows-2 gap-[5%]`}
        style={{ transform: `translateX(${current * 100}%)` }}
      >
        {features.map((feature) => (
          <FeaturesCard key={feature.text} feature={feature} />
        ))}
      </div>
      <Button
        type={"normal"}
        className={"mr-auto block border border-secondary text-secondary"}
      >
        عرض التفاصيل
      </Button>
      <div className={"flex w-fit cursor-pointer"}>
        <Button type={"normal"} onClick={decrease}>
          <ArrowRight />
        </Button>
        <Button type={"normal"} onClick={increase}>
          <ArrowLeft />
        </Button>
      </div>
    </div>
  );
}

export default FeaturesCarousel;
