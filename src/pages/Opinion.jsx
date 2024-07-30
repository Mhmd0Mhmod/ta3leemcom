import Heading from "./../components/ui/Heading";
import Button from "./../components/ui/Button";
import Testimonial from "../components/ui/Testimonial";

export default function Opinion() {
 return (
  <div className="text-center">
   <Heading as={"h5"} className={"text-secondary"}>
    ماذا يقول عملائنا
   </Heading>
   <Heading as={"h1"} className={"font-almaria-bold my-4"}>
    ملاحظات المستخدمين
   </Heading>
   <div className="flex items-center gap-4">
    <Heading as={"h2"} className={"font-almaria-bold text-secondary my-4"}>
     رايك يهمنا
    </Heading>
    <span>
     <img src="imgs/qout.svg" alt="" />
    </span>
   </div>
   <div className="grid grid-cols-12 my-4 ">
    <div className="col-span-5 mr-8 flex flex-col">
     <Heading as={"h2"} className={"text-start"}>
      ما رأيك في تجربتك معنا؟
     </Heading>
     <Heading as={"h2"} className={"text-accent-50 text-start mt-2"}>
      تقيمك
     </Heading>
     <div className="flex items-center justify-center gap-4 w-full my-6">
      {[1, 2, 3, 4, 5].map((index) => (
       <img src={`imgs/star-${index}.png`} alt="star" key={index} />
      ))}
     </div>
     <Heading as={"h2"} className={"text-accent-50 text-start mt-2"}>
      اكتب رايك
     </Heading>
     <input
      type="text"
      className="bg-accent-300 w-full border border-accent-50 my-6 rounded-lg flex-1"
     />
     <Button>إرسال</Button>
    </div>
    <div className="col-span-1"></div>
    <div className="col-span-6 ">
     <Testimonial />
    </div>
   </div>
  </div>
 );
}
