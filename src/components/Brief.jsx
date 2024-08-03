import Button from "./ui/Button";
import Heading from "./ui/Heading";
import EmblaCarousel from "./EmblaCarousel";

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
     <img src="imgs/logo.png" alt="logo" />
     <Heading as={"h3"} className="leading-[3]">
      منصة مصممة لتلبية احتياجات المدرسين، الطلاب، وأولياء الأمور. تهدف <br />
      إلى توفير بيئة تعليمية شاملة ومتكاملة تسهل العملية التعليمية والتواصل
      <br /> بين جميع الأطراف المعنية.
     </Heading>
     <Button type="normal" circle className={"mt-8"}>
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
