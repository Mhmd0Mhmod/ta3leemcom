import Heading from "./ui/Heading";

export default function DownloadApp() {
 return (
  <div className="bg-accent-600">
   <div className=" container mx-auto grid grid-cols-5 ">
    <div className="col-span-2 my-auto pr-8">
     <Heading as={"h1"} className={"font-almaria-bold"}>
      حمل تطبيق ولي الأمر الآن
     </Heading>
     <Heading as={"h4"} className={"font-almaria-light mt-12 mb-24"}>
      تابع أداء وتقدم ابنك الدراسي بكل سهولة.
     </Heading>
     <img src="imgs/store2.png" alt="store" />
    </div>
    <div className="col-span-3">
     <img src="imgs/mobiles.png" alt="" />
    </div>
   </div>
  </div>
 );
}
