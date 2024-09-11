import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import AutoPlay from "embla-carousel-autoplay";
import {
 usePrevNextButtons,
 PrevButton,
 NextButton,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import "./../embla.css";
import Button from "./ui-local/Button";
import Heading from "./ui-local/Heading";

const data = [
 { text: "إدارة شاملة للطلاب", icon: "Icons/circle sec-1.svg" },
 { text: "اختبارات أوفلاين", icon: "Icons/circle sec-2.svg" },
 { text: "التواصل مع أولياء الأمور", icon: "Icons/circle sec-3.svg" },
 { text: "متابعة أداء الطلاب", icon: "Icons/circle sec-4.svg" },
];

const EmblaCarousel = ({ slides, options }) => {
 const [emblaRef, emblaApi] = useEmblaCarousel(options);

 const { selectedIndex, scrollSnaps, onDotButtonClick } =
  useDotButton(emblaApi);

 const {
  prevBtnDisabled,
  nextBtnDisabled,
  onPrevButtonClick,
  onNextButtonClick,
 } = usePrevNextButtons(emblaApi);

 return (
  <div className="carousel-container overflow-hidden mx-8">
   <div className="embla ">
    <div className="embla__viewport" ref={emblaRef}>
     <div className="embla__container">
      {[1, 2, 3].map((el) => (
       <div className="embla__slide " key={el}>
        <div className="grid grid-cols-2 gap-4 w-full h-full pb-8 pr-8">
         {data.map((row) => (
          <div
           key={row.text}
           className="d-rtl p-8  pb-14 w-full col-span-1 rounded-tl-xl rounded-br-xl shadow-xl bg-white"
          >
           <img src={row.icon} alt="icon" className="w-12 h-12 mb-8" />
           <Heading as={"h2"} className={" font-almaria-bold "}>
            {row.text}
           </Heading>
           <span className="h-[2px] w-12 block bg-secondary mt-2 "></span>
          </div>
         ))}
         {/* <div className="h-40 w-full col-span-1 rounded-tl-xl rounded-br-xl shadow-xl bg-white"></div>
         <div className="h-40 w-full col-span-1 rounded-tl-xl rounded-br-xl shadow-xl bg-white"></div>
         <div className="h-40 w-full col-span-1 rounded-tl-xl rounded-br-xl shadow-xl bg-white"></div> */}
        </div>
       </div>
      ))}
     </div>
    </div>
    <Button
     type="normal"
     className={
      "mt-8 font-almaria-bold px-[0.9rem] py-[0.4rem] min-h-[fit-content] min-w-fit text-[20px] bg-[#B4D3E01A]"
     }
    >
     عرض التفاصيل
    </Button>
    <div className="embla__controls w-full flex   justify-end mt-0">
     <div className="embla__buttons ">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
     </div>
    </div>
    <div className="embla__dots flex justify-center gap-2">
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
   </div>
  </div>
 );
};

export default EmblaCarousel;
