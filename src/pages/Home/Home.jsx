import Brief from "./Components/Brief.jsx";
import DownloadApp from "./Components/DownloadApp.jsx";
import Carousel from "./Components/HomeCarousel.jsx";
import Heading from "../../UI-Global/Heading.jsx";
import Testimonial from "../../UI-Global/Testimonial.jsx";
import {  useState } from "react";
import {Outlet} from "react-router-dom";

// const slides = [
//     "https://via.placeholder.com/800x400?text=Slide+1",
//     "https://via.placeholder.com/800x400?text=Slide+2",
//     "https://via.placeholder.com/800x400?text=Slide+3",
// ];
const images = [
 "imgs/home-bg-1.png",
 "imgs/home-bg-2.png",
 "imgs/home-bg-3.png",
];
// const OPTIONS = {loop: true, duration: 100};

// const SLIDE_COUNT = 5;
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
 const [ref, setRef] = useState(null);

 return (
  <>
    <Outlet />
   <div className="container mx-auto"></div>
   <div className="container mx-auto mb-8">
    <Carousel slides={images} />
    <Brief />
   </div>
   <div className="bg-accent-500 ">
    <div className="  container mx-auto pt-1">
     <div className=" mx-auto my-12 text-center ">
      <Heading as={"h4"} className={"text-secondary-l my-4"}>
       ماذا يقول عملائنا
      </Heading>
      <Heading as={"h1"} className={"font-almaria-bold"}>
       ملاحظات المستخدمين
      </Heading>
      <span className="h-[2px] w-44 block bg-secondary my-6 mr-[32%]"></span>
      <div className="flex gap-32 justify-center">
       <button
        className="col-span-1 mb-44"
        onClick={ref?.onNextButtonClick}
        disabled={ref?.nextBtnDisabled}
       >
        <img src="Icons/arrow-white.svg" alt="arrow" />
       </button>
       <div className="w-[50%]">
        <Testimonial setRef={setRef} />
       </div>
       <button
        className="col-span-1 mb-44"
        onClick={ref?.onPrevButtonClick}
        disabled={ref?.prevBtnDisabled}
       >
        <img src="Icons/arrow-white.svg" alt="arrow" className="rotate-180" />
       </button>
      </div>
     </div>
    </div>
   </div>
   <DownloadApp />
   {/* <Footer /> */}
  </>
 );
}
