import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import Button from "../../UI/Button.jsx";
import PlayStore from "/public/Icons/google.svg";
import AppStore from "/public/Icons/apple.svg";
import SignupButton from "../../UI/SignupButton.jsx";
import { useNavigate } from "react-router-dom";
import KnowMore from "../../UI/KnowMore.jsx";
import { useSelector } from "react-redux";

const images = ["imgs/home-bg-1.png", "imgs/home-bg-2.png", "imgs/home-bg-3.png"];

function SwiperHome() {
  const { isLogin } = useSelector((state) => state.Auth);

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
        className="mySwiper"
      >
        <div className="gap-18 absolute top-0 z-[5] flex h-full w-full flex-col justify-items-center space-y-5 px-16 text-center sm:text-right xl:space-y-20 xl:py-10">
          <h1 className={"mt-5 font-Almarai-bold text-4xl leading-normal text-white xl:text-5xl xl:leading-loose"}>
            <span className="ml-2 font-Almarai-extraBold text-5xl text-Secondary-500 xl:text-8xl">مرحباً بكم</span> في منصتكم <br />
            التعليمية المتكاملة!
          </h1>

          <p className="font-Almarai-light leading-loose text-white xl:text-2xl">
            انضموا إلينا واستمتعوا بتعليم افضل وإدارة اسهل
            <br /> للدروس الخصوصية
          </p>

          <div className={"flex items-center justify-center sm:justify-between"}>
            <div className="flex gap-12 self-start text-3xl">
              {!isLogin && <SignupButton id={"homeSignup"} />}
              <KnowMore type="normal" className={"border px-6 py-3"} title={"تعرف اكثر"} />
            </div>
            <div className={"hidden flex-col gap-10 md:flex"}>
              <Button type="light" className={"flex gap-8 p-2 opacity-75 shadow-2xl"}>
                <div>
                  <p>تحميل تطبيق</p>
                  <p>ولي الأمر</p>
                </div>
                <PlayStore />
              </Button>
              <Button type="light" className={"flex gap-8 p-2 opacity-75 shadow-2xl"}>
                <div>
                  <p>تحميل تطبيق</p>
                  <p>ولي الأمر</p>
                </div>
                <AppStore />
              </Button>
            </div>
          </div>
        </div>

        {images.map((index) => (
          <SwiperSlide key={index}>
            <img src={index} alt={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperHome;
