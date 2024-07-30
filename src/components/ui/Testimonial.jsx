import Heading from "./Heading";

export default function Testimonial() {
 return (
  <div className="">
   <div className="shadow-2xl rounded-xl ">
    <div className="relative p-8">
     <p className="text-accent-100 p-20 text-justify">
      قد كانت تجربتي مع هذه المنصة رائعة ومثمرة للغاية. كمعلم، كانت إدارة الصفوف
      والمجموعات الدراسية سلسة ومنظمة بشكل كبير.ميزة التواصل المباشر مع أولياء
      الأمور عبر الشات ساعدتني في الحفاظ على تواصل مستمر مع أولياء الأمور
      وإطلاعهم على أداء أبنائهم.فضل هذه المنصة، أصبحت إدارة العملية التعليمية
      أكثر فعالية وتنظيمًا. أوصي بشدة باستخدام هذه المنصة لكل معلم يبحث عن حلول
      تسهل عليه إدارة الصفوف الدراسية والتواصل مع الطلاب وأولياء الأمور.
     </p>
     {/* <div className="absolute -right-16"> */}
     <div className="absolute inset-0 inset-x-10 inset-y-16 flex items-end">
      <img src="imgs/quotation-mark.svg" alt="" />
     </div>
     {/* <div className="absolute -left-16 -top-6 rotate-180"> */}
     <div className="absolute inset-x-10 inset-y-16 flex items-end rotate-180">
      <img src="imgs/quotation-mark.svg" alt="" />
     </div>
    </div>
   </div>
   <div className="-mt-14">
    <div className=" shadow-xl rounded-xl ">
     <div className="pt-24 pb-10">
      <div className="flex w-full justify-center gap-3 my-6">
       {[1, 2, 3, 4, 5].map((index) => (
        <img src={"imgs/star-gold.svg"} alt="star" key={index} />
       ))}
      </div>
      <div className="flex justify-center gap-32">
       <button>
        <img src="imgs/arrow-small.svg" alt="arrow" />
       </button>
       <Heading as={"h4"}>ابراهيم مشرف</Heading>
       <button>
        <img src="imgs/arrow-small.svg" alt="arrow" className="rotate-180" />
       </button>
      </div>
      <Heading as={"h5"} className={"text-gray-600 my-4"}>
       مهندس
      </Heading>
      <div className="flex gap-3 items-center justify-center mt-12">
       {Array.from({ length: 16 }).map((e) => (
         <button className="h-3 w-3 bg-accent-50 rounded-full" key={e}></button>
        ))}
        <button className="h-3 w-10 bg-primary rounded-full"></button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
