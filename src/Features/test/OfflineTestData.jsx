import { useState } from "react";
import Table from "@/UI-Global/Table/Table.jsx";
import TBody from "@/UI-Global/Table/TBody.jsx";
import TH from "@/UI-Global/Table/TH.jsx";
import THead from "@/UI-Global/Table/THead.jsx";
import TR from "@/UI-Global/Table/TR.jsx";

const RES = [
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
 { name: "عمرو مصطفي محمد درويش", deg: 20 },
];

export default function OfflineTestData({ test }) {
 const [res, setRes] = useState(RES);
//  console.log(test);
 return (
  <div>
   <div className="flex justify-between my-4  text-xl font-almaria-bold">
    <div className="flex gap-4">
     <div className="flex gap-3 items-center ">
      <span>درجة</span>
      <span>:</span>
      <div className="bg-white px-10 text-secondary-l py-2">{"20"}</div>
     </div>
     <div className="flex gap-3 items-center ">
      <span>عدد الاسالة</span>
      <span>:</span>
      <div className="bg-white px-10 text-secondary-l py-2">{"15"}</div>
     </div>
    </div>
    <div className="flex gap-4 items-start"></div>
   </div>
   <div className="mx-auto container   rounded-lg -mt-5 w-full md:w-[85%] lg:w-[70%] pt-16">
    <div className="grid grid-cols-12 gap-4 mb-3">
     <div className="bg-accent-l-1000 text-center py-3 rounded-lg col-span-10">
      اسم الطالب
     </div>
     <div className="bg-accent-l-1000 text-center py-3 rounded-lg col-span-2">
      درجة
     </div>
    </div>
    <div className="grid grid-cols-12 gap-2">
     {res.map((item, index) => (
      <>
       <div className="bg-white px-4 py-3 rounded-lg col-span-10 hover:bg-accent-l-900 cursor-pointer ">
        {index+1}
        {". "}
        {item.name}
       </div>
       <div className="bg-white text-center text-secondary-l py-3 rounded-lg col-span-2">
        {item.deg}
       </div>
      </>
     ))}
    </div>
   </div>
  </div>
 );
}
