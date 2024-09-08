import Button from "./ui-local/Button";
Button;
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { EffectFade, Autoplay, Navigation } from "swiper/modules";

export default function Carousel({ slides }) {
 return (
  <>
   <Swiper
    spaceBetween={30}
    effect={"fade"}
    navigation={true}
    autoplay={true}
    modules={[EffectFade, Autoplay, Navigation]}
    className="mySwiper"
   >
    {[1, 2, 3].map((index) => (
     <SwiperSlide key={index}>
      <div className="flex flex-wrap ">
       <div className="w-32 h-32">amr</div>
       <div className="w-32 h-32">amr</div>
       <div className="w-32 h-32">amr</div>
       <div className="w-32 h-32">amr</div>
      </div>
     </SwiperSlide>
    ))}
   </Swiper>
  </>
 );
}
