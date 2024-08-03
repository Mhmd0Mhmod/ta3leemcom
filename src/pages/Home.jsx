import Brief from "../components/Brief";
import DownloadApp from "../components/DownloadApp";
import Carousel from "../components/HomeCarousel";
import Heading from "../components/ui/Heading";
import Testimonial from "../components/ui/Testimonial";
import Header from "../components/Header";
import Footer from "../components/Footer";

const slides = [
 "https://via.placeholder.com/800x400?text=Slide+1",
 "https://via.placeholder.com/800x400?text=Slide+2",
 "https://via.placeholder.com/800x400?text=Slide+3",
];
const images = [
 "imgs/home-bg-1.png",
 "imgs/home-bg-2.png",
 "imgs/home-bg-3.png",
];
const OPTIONS = { loop: true, duration: 100 };
// const SLIDE_COUNT = 5;
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
 return (
  <>
   <div className="container mx-auto">
    <Carousel slides={images} />
    <Brief />
   </div>
   <div className="bg-accent-500">
    <div className="  container mx-auto">
     <div className="w-[50%] mx-auto my-12 text-center ">
      <Heading as={"h4"} className={"text-secondary my-4"}>
       ماذا يقول عملائنا
      </Heading>
      <Heading as={"h1"} className={"font-almaria-bold"}>
       ملاحظات المستخدمين
      </Heading>
      <span className="h-[2px] w-36 block bg-secondary my-6 mr-32"></span>

      <Testimonial />
     </div>
    </div>
   </div>
   <DownloadApp />
   {/* <Footer /> */}
  </>
 );
}
