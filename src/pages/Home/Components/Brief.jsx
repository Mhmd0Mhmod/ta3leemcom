import Button from "../../../UI-Global/Button.jsx";
import Heading from "../../../UI-Global/Heading.jsx";
import EmblaCarousel from "./EmblaCarousel.jsx";

const slides = [
 "https://via.placeholder.com/800x400?text=Slide+1",
 "https://via.placeholder.com/800x400?text=Slide+2",
 "https://via.placeholder.com/800x400?text=Slide+3",
];

export default function Brief() {
 return (
  <>
   <div className="flex relative overflow-hidden">
    <div className="flex-1 ">
     <div className="px-14 pb-8">
      <img src="Icons/logo.svg" alt="logo" />
      <img src="Icons/decore.svg" alt="decore" className="mr-72" />
     </div>
     <Heading as={"h3"} className="leading-[3] font-almaria-bold text-[24px]">
      منصة مصممة لتلبية احتياجات المدرسين، الطلاب، وأولياء الأمور. تهدف <br />
      إلى توفير بيئة تعليمية شاملة ومتكاملة تسهل العملية التعليمية والتواصل
      <br /> بين جميع الأطراف المعنية.
     </Heading>
     <Button
      type="normal"
      circle
      className={
       "mt-8 font-almaria-extrabold px-[3rem] py-[0.4rem] min-h-[fit-content] min-w-fit text-[20px] bg-[#B4D3E01A]"
      }
     >
      اعرف اكثر
     </Button>
    </div>
    <div className="flex-1 mt-28 z-10 w-full h-full">
     <EmblaCarousel slides={slides} options={{ loop: true }} />
    </div>
    <img
     src="imgs/shape.png"
     alt="shape"
     className="absolute -left-52 -top-24 z-0 "
    />
   </div>
  </>
 );
}
