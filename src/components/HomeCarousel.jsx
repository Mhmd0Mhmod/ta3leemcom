import Heading from "./../components/ui/Heading";
import Button from "./../components/ui/Button";
Button;
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { EffectFade, Pagination, Autoplay } from "swiper/modules";

export default function Carousel({ slides }) {
 return (
  <>
   <Swiper
    spaceBetween={30}
    effect={"fade"}
    // navigation={true}
    autoplay={true}
    pagination={{
     clickable: true,
    }}
    modules={[EffectFade, Pagination, Autoplay]}
    className="mySwiper "
   >
    <div className="absolute top-0 z-10  h-full w-full mt-[5%] mx-16">
     <span>
      <Heading as={"h1"} className={"text-white font-almaria-bold leading-[2] text-[64px] "}>
       <span className="font-almaria-extrabold text-secondary ml-2 text-[96px]">
        مرحباً بكم
       </span>{" "}
       في منصتكم <br />
       التعليمية المتكاملة!
      </Heading>
     </span>
     <span>
      <Heading as={"h4"} className={"text-white font-almaria-bold leading-[3] mt-10"}>
       <span className="font-almaria-light text-accent-50 text-[32px] leading-[2] ">
        انضموا إلينا واستمتعوا بتعليم افضل وإدارة اسهل
        <br /> للدروس الخصوصية
       </span>
      </Heading>
     </span>
     <div className="flex gap-12 mt-[8%] ">
      <Button className={"text-3xl rounded-[15px]  px-[39px]   min-w-[209px] min-h-[86px]"}>انضم الينا</Button>
      <Button
       type="outline"
       className={"text-3xl  border-white text-white hover:bg-transparent rounded-[15px]  px-[39px]   min-w-[209px] min-h-[86px]"}
      >
       تعرف اكثر
      </Button>
     </div>
     <div className="absolute left-0 bottom-14 translate-x-[50%] -translate-y-[80%]  ">
      <div className="mb-[45px]">
       <Button type="store" icon={"Icons/google.svg"}>
        <p>تحميل تطبيق</p>
        <p>ولي الأمر</p>
       </Button>
      </div>
      <Button type="store" icon={"Icons/apple.svg"}>
       <p>تحميل تطبيق</p>
       <p>ولي الأمر</p>
      </Button>
     </div>
    </div>
    {slides.map((index) => (
     <SwiperSlide key={index}>
      <img src={index} />
     </SwiperSlide>
    ))}
   </Swiper>
  </>
 );
}
