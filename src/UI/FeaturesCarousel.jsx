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
import Carousel from "./Carousel.jsx";

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
  return (
    <Carousel
      length={Math.ceil(features.length)}
      numInColumn={2}
      numOfShowsColumns={2}
      numOfShowsRows={2}
      containerClassName={`space-y-20`}
    >
      <Carousel.Items
        gridColumnSize={"45%"}
        className={"grid grid-rows-2 gap-[5%]"}
      >
        {features.map((feature) => (
          <FeaturesCard key={feature.text} feature={feature} />
        ))}
      </Carousel.Items>
      <Button
        type={"normal"}
        className={"mr-auto block border border-secondary text-secondary"}
      >
        عرض التفاصيل
      </Button>
      <div className={"text-center xl:text-right"}>
        <Carousel.RightButton>
          <ArrowRight />
        </Carousel.RightButton>
        <Carousel.LeftButton>
          <ArrowLeft />
        </Carousel.LeftButton>
      </div>
      <Carousel.Dotes />
    </Carousel>
  );
}

export default FeaturesCarousel;
