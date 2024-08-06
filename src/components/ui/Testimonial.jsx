import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
// import AutoPlay from "embla-carousel-autoplay";
import {
 usePrevNextButtons,
 //  PrevButton,
 //  NextButton,
} from "../EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "../EmblaCarouselDotButton";
import "../../embla.css";
// import Button from "./Button";
import Heading from "./Heading";
import { useEffect } from "react";

export default function Testimonial({
 setRef = () => {},
 slides,
 type = "primary",
}) {
 const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);

 const { selectedIndex, scrollSnaps, onDotButtonClick } =
  useDotButton(emblaApi);

 const {
  prevBtnDisabled,
  nextBtnDisabled,
  onPrevButtonClick,
  onNextButtonClick,
 } = usePrevNextButtons(emblaApi);

 useEffect(() => {
  setRef({
   prevBtnDisabled,
   nextBtnDisabled,
   onPrevButtonClick,
   onNextButtonClick,
  });
 }, [
  setRef,
  prevBtnDisabled,
  nextBtnDisabled,
  onPrevButtonClick,
  onNextButtonClick,
 ]);

 return (
  <div className="carousel-container overflow-hidden mx-8">
   <div className="embla ">
    <div className="embla__viewport" ref={emblaRef}>
     <div className="embla__container">
      {[1, 2, 3, 4, 5].map((el) => (
       <div className="embla__slide " key={el}>
        <div className=" w-full h-full p-8">
         <div>
          <div>
           <div className="shadow-2xl rounded-xl d-rtl">
            <div className="relative p-8">
             <p className="text-accent-100 p-20 text-justify">
              قد كانت تجربتي مع هذه المنصة رائعة ومثمرة للغاية. كمعلم، كانت
              إدارة الصفوف والمجموعات الدراسية سلسة ومنظمة بشكل كبير.ميزة
              التواصل المباشر مع أولياء الأمور عبر الشات ساعدتني في الحفاظ على
              تواصل مستمر مع أولياء الأمور وإطلاعهم على أداء أبنائهم.فضل هذه
              المنصة، أصبحت إدارة العملية التعليمية أكثر فعالية وتنظيمًا. أوصي
              بشدة باستخدام هذه المنصة لكل معلم يبحث عن حلول تسهل عليه إدارة
              الصفوف الدراسية والتواصل مع الطلاب وأولياء الأمور.
             </p>
             {/* <div className="absolute -right-16"> */}
             <div className="absolute inset-0 inset-x-10 inset-y-16 flex items-end">
              <img src="Icons/quotation-mark.svg" alt="" />
             </div>
             {/* <div className="absolute -left-16 -top-6 rotate-180"> */}
             <div className="absolute inset-x-10 inset-y-16 flex items-end rotate-180">
              <img src="Icons/quotation-mark.svg" alt="" />
             </div>
            </div>
           </div>
           <div className="-mt-14">
            <div className=" shadow-xl rounded-xl ">
             <div className="pt-24 pb-10">
              <div className="flex w-full justify-center gap-3 my-6">
               {[1, 2, 3, 4, 5].map((index) => (
                <svg
                 key={index}
                 width="22"
                 height="22"
                 viewBox="0 0 22 22"
                 fill={index <= 4 ? "#FFA033" : "none"}
                 xmlns="http://www.w3.org/2000/svg"
                >
                 <path
                  d="M11.0002 1.83398L13.8327 7.57232L20.1668 8.49815L15.5835 12.9623L16.6652 19.269L11.0002 16.2898L5.33516 19.269L6.41683 12.9623L1.8335 8.49815L8.16766 7.57232L11.0002 1.83398Z"
                  stroke="#FFA033"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                 />
                </svg>
               ))}
              </div>
              <div className="flex justify-center gap-32">
               {type === "sec" && (
                <button onClick={onPrevButtonClick} disabled={prevBtnDisabled}>
                 <img
                  src="Icons/arrow-small.svg"
                  alt="arrow"
                  className="rotate-180 "
                 />
                </button>
               )}
               <Heading as={"h4"}>ابراهيم مشرف</Heading>
               {type === "sec" && (
                <button onClick={onNextButtonClick} disabled={nextBtnDisabled}>
                 <img src="Icons/arrow-small.svg" alt="arrow" />
                </button>
               )}
              </div>
              <Heading as={"h5"} className={"text-gray-600 my-4"}>
               مهندس
              </Heading>
              {type === "sec" && (
               <div className="flex gap-3 items-center justify-center mt-12">
                {scrollSnaps.map((_, index) => (
                 <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot ".concat(
                   index === selectedIndex
                    ? "transition-all duration-300 embla__dot--selected "
                    : ""
                  )}
                 />
                ))}
               </div>
              )}
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      ))}
     </div>
    </div>
    <div className="embla__controls w-full flex   justify-end mt-0"></div>

    {type === "primary" && (
     <div className="flex gap-3 items-center justify-center mt-28 mb-16">
      {scrollSnaps.map((_, index) => (
       <DotButton
        key={index}
        onClick={() => onDotButtonClick(index)}
        className={"embla__dot ".concat(
         index === selectedIndex
          ? "transition-all duration-300 bg-accent-700 "
          : ""
        )}
       />
      ))}
     </div>
    )}
   </div>
  </div>
 );
}
