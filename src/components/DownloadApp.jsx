import Button from "./ui-local/Button";
import Heading from "./ui-local/Heading";

export default function DownloadApp() {
 return (
  <div className="bg-accent-600">
   <div className=" container mx-auto grid grid-cols-5 ">
    <div className="col-span-2 my-auto pr-8">
     <Heading as={"h1"} className={"font-almaria-bold"}>
      حمل تطبيق ولي الأمر الآن
     </Heading>
     <Heading as={"h4"} className={"font-almaria mt-12 mb-24 text-[#605E5E]"}>
      تابع أداء وتقدم ابنك الدراسي بكل سهولة.
     </Heading>
     <div className="flex gap-[45px]">
      <Button type="store" icon="Icons/google.svg">
       <p>قم بالتنزيل من </p>
       <p>جوجل بلاي</p>
      </Button>
      <Button type="store" icon="Icons/apple.svg">
       <p>قم بالتنزيل من </p>
       <p>متجر ابل</p>
      </Button>
     </div>
    </div>
    <div className="col-span-3">
     <img src="imgs/mobiles.svg" alt="" />
    </div>
   </div>
  </div>
 );
}
