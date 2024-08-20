import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Heading from "./ui/Heading";
import Tab from "./ui/Tab";
import { constraints } from "../config";
import Button from "./ui/Button";
import TextEditor, { MenuBar } from "./TextEditor";

const QUESTIONS = [];

const tabs_2 = [
 { text: "أونلاين", path: "Icons/online_icon.svg" },
 { text: "4:45 PM", path: "Icons/time_icon.svg" },
 { text: "30 دقيقة", path: "Icons/time_icon_2.svg" },
 { text: "31 / 7 /2024", path: "Icons/calender_icon_2.svg" },
];

function AddOnlineTest() {
 const [searchParams, setSearchParams] = useSearchParams();
 const [questions, setQuestions] = useState(QUESTIONS);

 const backToLevel = () => {
  setSearchParams({ tab: "level", level: "primary" });
 };

 const tabs_1 = [
  {
   text:
    constraints[searchParams.get("level")].content[
     searchParams.get("subLevel")
    ],
   path: "Icons/level_icon.svg",
  },
  { text: searchParams.get("group"), path: "Icons/group_icon.svg" },
  { text: "12 طالب", path: "Icons/students_icon.svg" },
  { text: questions.length, path: "Icons/question_icon.svg" },
  { text: "20 درجة", path: "Icons/flag_icon.svg" },
  { text: "2 بونص", path: "Icons/bouns_icon.svg" },
 ];

 return (
  <div className="px-12 py-16">
   <button className="flex gap-1" onClick={backToLevel}>
    <img src="Icons/rev_arrow.svg" alt="" />
    <Heading as={"h3"} className={"text-secondary underline font-almaria-bold"}>
     العوده الي المراحل الدراسية
    </Heading>
   </button>
   <Heading as={"h1"} className={"my-6 text-black font-almaria-bold"}>
    الاختبارات
   </Heading>
   <hr className="w-[70%]" />
   <div className="flex gap-2 mt-4 mb-12 font-almaria-light">
    <button
     className="flex gap-1"
     onClick={() => setSearchParams({ tab: "level" })}
    >
     <span>المراحل الدراسية</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button
     className="flex gap-1"
     onClick={() =>
      setSearchParams({ tab: "level", level: searchParams.get("level") })
     }
    >
     <span>{constraints[searchParams.get("level")].text}</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button className="flex gap-1">
     <span>
      {
       constraints[searchParams.get("level")].content[
        +searchParams.get("subLevel")
       ]
      }
     </span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button className="flex gap-1">
     <span>{searchParams.get("group").replaceAll("_", " / ")}</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <div className="flex gap-1">
     <span>الاختبارات</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </div>
    <div className="flex gap-1 font-almaria-bold">
     <span>اضافة اختبار</span>
    </div>
   </div>
   <div className="w-full md:w-[85%] lg:w-[70%] p-4 mx-auto">
    <div className="bg-white rounded-lg p-4">
     <div className="flex  gap-1 items-end">
      <span className="text-secondary font-almaria-extrabold text-[1rem]">
       تعليم{" "}
      </span>
      <span className="text-primary font-almaria-bold">كوم </span>
      <img src="Icons/logo_solid.svg" alt="logo" />
     </div>
     <div className="flex my-4 ">
      <div className="mr-8">
       <img src="imgs/test_image.svg" alt="test" />
      </div>
      <div className="flex-grow ml-8  ">
       <div className="flex flex-grow gap-3 items-center mr-6 ">
        <div className=" flex-grow  ">
         <Heading as={"h3"} className={"font-almaria-bold mb-12"}>
          اختبار بدون عنوان
         </Heading>
         <div className="grid grid-cols-3 gap-4 max-w-[500px] ">
          {tabs_1.map((item) => (
           <Tab
            key={item.text}
            type={"ghost"}
            text={item.text}
            path={item.path}
           />
          ))}
         </div>
        </div>
        <div className="my-auto flex flex-col gap-3  ">
         {tabs_2.map((item) => (
          <Tab key={item.text} text={item.text} path={item.path} />
         ))}
        </div>
       </div>
       <div className="flex gap-4 justify-between mt-6">
        <div className="flex gap-6">
         <Tab
          text={"عرض الاختبار"}
          path={"Icons/show_icon.svg"}
          className="pr-4"
         />
         <Tab text={"النتائج"} path={"Icons/res_icon.svg"} className="pr-4" />
        </div>
        <div className="flex gap-6">
         <Button
          type={"outline"}
          icon={<img src={"../../public/Icons/share_icon_2.svg"} />}
         >
          مشاركة مع المجموعة
         </Button>
         <Button
          type={"outline"}
          icon={<img src={"../../public/Icons/share_icon.svg"} />}
         >
          مشاركة
         </Button>
        </div>
       </div>
      </div>
     </div>
    </div>
    <div className="bg-white  mt-8  rounded-xl">
     <TextEditor />
     <div>amr</div>
     <div>amr</div>
     <div>amr</div>
    </div>
   </div>
  </div>
 );
}

export default AddOnlineTest;
