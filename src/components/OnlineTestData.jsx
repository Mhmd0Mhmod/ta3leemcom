import React from "react";
import Heading from "./ui-local/Heading";

// const RES = {
//  title: "اختبار بدون عنوان",
//  studentsNum: 12,
//  studentsDidntTakeNum: 5,
//  questionsNum: 15,
//  bouns: 2,
//   degs: 20,

// };

export default function OnlineTestData() {
 return (
  <div>
   <div className="flex justify-between my-4  text-xl font-almaria-bold">
    <div className="flex gap-4 items-start"></div>
   </div>
   <div className="mx-auto container   rounded-lg -mt-5 w-full md:w-[95%] lg:w-[85%] pt-16">
    <div>
     <Heading as={"h4"}></Heading>
    </div>
   </div>
  </div>
 );
}
