import { useSearchParams } from "react-router-dom";
import Heading from "./ui-local/Heading";
import { constraints } from "@/config";
import { ShowTest } from "./ShowTest";

//
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Tab from "./ui-local/Tab";
import OldButton from "./ui-local/Button";
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "@/components/ui/tooltip";
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { Button } from "./ui/Button";

import OnlineIcon from "../../public/Icons/online_icon.svg";
import TimeIcon from "../../public/Icons/time_icon.svg";
import TimeIcon2 from "../../public/Icons/time_icon_2.svg";
import CalenderIcon from "../../public/Icons/calender_icon_2.svg";
import CopyIcon from "../../public/Icons/copy_icon_gray.svg";
import TrashIcon from "../../public/Icons/trash_icon_gray.svg";
import PickTime from "./PickTime";
import { PopoverClose } from "@radix-ui/react-popover";
import { convertTo12HourFormat } from "@/lib/time";
import PickDuration from "./PickDuration";

import TestSent from "../../public/Icons/test_sent_icon.svg";
import Trash from "../../public/Icons/trash_icon_gray.svg";
import Print from "../../public/Icons/print_icon.svg";
import { SolidLogo } from "./ui-local/SolidLogo";
import FileUpload from "./ui-local/Loader";
import UploadBox from "./FileUploaderTest";

const QUESTIONS = [
 {
  text: "ما هو أكبر كوكب في المجموعة الشمسية؟",
  bouns: 0,
  deg: 1,
  answers: [
   { text: "المشتري", isCorrect: true, id: "1" },
   { text: "المريخ", isCorrect: false, id: "2" },
  ],
  images: [],
  explain: "المشتري هو أكبر كوكب في المجموعة الشمسية.",
  required: true,
  id: "1",
 },
 {
  text: "ما هي عاصمة فرنسا؟",
  bouns: 1,
  deg: 0,
  answers: [
   { text: "باريس", isCorrect: true, id: "1" },
   { text: "برلين", isCorrect: false, id: "2" },
  ],
  images: [],
  explain: "باريس هي عاصمة فرنسا.",
  required: false,
  id: "2",
 },
 {
  text: "ما هو الحيوان الأسرع في العالم؟",
  bouns: 0,
  deg: 1,
  answers: [
   { text: "الفهد", isCorrect: true, id: "1" },
   { text: "الأسد", isCorrect: false, id: "2" },
  ],
  images: [],
  explain: "الفهد هو الحيوان الأسرع في العالم.",
  required: true,
  id: "3",
 },
 //  {
 //   text: "ما هو الحيوان الأسرع في العالم 2؟",
 //   bouns: 0,
 //   deg: 1,
 //   answers: [
 //    { text: "الفهد", isCorrect: true, id: "1" },
 //    { text: "الأسد", isCorrect: false, id: "2" },
 //    { text: "الثعلب", isCorrect: false, id: "3" },
 //    { text: "القطة", isCorrect: false, id: "4" },
 //   ],
 //   images: [
 //    "../../public/imgs/test_image.svg",
 //    "../../public/imgs/video.svg",
 //    "../../public/imgs/home-bg-1.png",
 //    "../../public/imgs/home-bg-2.png",
 //   ],
 //   explain: "الفهد هو الحيوان الأسرع في العالم.",
 //   required: true,
 //   id: "4",
 //  },
];
export const DEFAULT_QUESTION = {
 text: "",
 bouns: 0,
 deg: 0,
 answers: [
  { text: "", isCorrect: false, id: "1" },
  { text: "", isCorrect: false, id: "2" },
 ],
 images: [],
 explain: "",
 required: false,
 id: "",
};
const MINS = [
 { value: 0, label: "00" },
 { value: 5, label: "05" },
 { value: 10, label: "10" },
 { value: 15, label: "15" },
 { value: 20, label: "20" },
 { value: 25, label: "25" },
 { value: 30, label: "30" },
 { value: 35, label: "35" },
 { value: 40, label: "40" },
 { value: 45, label: "45" },
 { value: 50, label: "50" },
 { value: 55, label: "55" },
];
const HOURS = [
 { value: 1, label: "01" },
 { value: 2, label: "02" },
 { value: 3, label: "03" },
 { value: 4, label: "04" },
 { value: 5, label: "05" },
 { value: 6, label: "06" },
 { value: 7, label: "07" },
 { value: 8, label: "08" },
 { value: 9, label: "09" },
 { value: 10, label: "10" },
 { value: 11, label: "11" },
 { value: 12, label: "12" },
];
//

function AddOfflineTest({ test }) {
 const [searchParams, setSearchParams] = useSearchParams();
 const [title, setTitle] = useState("اختبار بدون عنوان");
 const [openModel, setOpenModel] = useState(false);
 const [questionsFiles, setQuestionsFiles] = useState([]);
 const [answerFiles, setAnswerFiles] = useState([]);
 const [date, setDate] = useState(new Date());
 const [timeStart, setTimeStart] = useState(
  test?.timeStart || {
   hour: 1,
   minute: 15,
   mode: "AM",
  }
 );
 const [timeDuration, setTimeDuration] = useState(
  test?.timeDuration || {
   hour: 1,
   minute: 15,
   mode: "AM",
   day: 0,
  }
 );
 let timeStartString = convertTo12HourFormat(timeStart.hour, timeStart.minute);
 let timeDurationString = convertTo12HourFormat(
  timeDuration.hour,
  timeDuration.minute,
  timeDuration.day
 );

 const [uploadState, setUploadState] = useState("loading");
 const [progress, setProgress] = useState(0);

 useEffect(() => {
  if (uploadState === "loading") {
   const interval = setInterval(() => {
    setProgress((prev) => {
     let newProgress = prev + Math.floor(Math.random() * 100);
     if (newProgress >= 100) {
      clearInterval(interval);
      newProgress = 100;
      Math.floor(Math.random() * 10) % 2 === 0
       ? setUploadState("finished")
       : //  ? setUploadState("failed")
         setUploadState("failed");
     }
     return newProgress;
    });
   }, 500);

   return () => clearInterval(interval); // Cleanup the interval on unmount
  }
 }, [uploadState]);

 const handleCancel = () => {
  // Logic to cancel the upload
  setUploadState("failed");
 };
 const tabs_1 = [
  {
   text:
    constraints[searchParams.get("level")].content[
     searchParams.get("subLevel")
    ],
   path: "Icons/level_icon.svg",
  },
  {
   text: searchParams.get("group").split("_").length,
   path: "Icons/group_icon.svg",
  },
  { text: "12 طالب", path: "Icons/students_icon.svg" },
 ];

 const backToLevel = () => {
  setSearchParams({ tab: "level", level: "primary" });
 };
 const setAsOnlineTest = () => {
  searchParams.set("test", "online");
  setSearchParams(searchParams);
 };

 return (
  <div className="px-12 py-16">
   <button className="flex gap-1" onClick={backToLevel}>
    <img src="Icons/rev_arrow.svg" alt="" />
    <Heading
     as={"h3"}
     className={"text-secondary-l underline font-almaria-bold"}
    >
     العوده الي المراحل الدراسية
    </Heading>
   </button>
   <Heading as={"h1"} className={"my-6 text-black font-almaria-bold"}>
    اختبار جديد
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
     <span>{searchParams.get("group")?.replaceAll("_", " / ")}</span>
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
     <div className="flex items-center justify-between mb-6">
      <SolidLogo />
      <div className="flex gap-2">
       <TooltipProvider delayDuration={100}>
        <Tooltip>
         <TooltipTrigger>
          <Button variant="outline" size="icon">
           <CopyIcon />
          </Button>
         </TooltipTrigger>
         <TooltipContent side="bottom" align="center" sideOffset={10}>
          <p>انشاء نسخة</p>
         </TooltipContent>
        </Tooltip>
       </TooltipProvider>

       <TooltipProvider delayDuration={100}>
        <Tooltip>
         <TooltipTrigger>
          <Button variant="outline" size="icon">
           <TrashIcon />{" "}
          </Button>
         </TooltipTrigger>
         <TooltipContent side="bottom" align="center" sideOffset={10}>
          <p>حذف</p>
         </TooltipContent>
        </Tooltip>
       </TooltipProvider>
      </div>
     </div>
     <div className="flex my-4 ">
      <div className="mr-8">
       <img src="imgs/test_image.svg" alt="test" />
      </div>
      <div className="flex-grow ml-8  ">
       <div className="flex flex-grow gap-3 items-center mr-6 ">
        <div className=" flex-grow  ">
         <Heading as={"h3"} className={"font-almaria-bold mb-12"}>
          {title}
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
         <Popover>
          <PopoverTrigger>
           <TooltipProvider>
            <Tooltip delayDuration={100}>
             <TooltipTrigger className="w-full">
              <Button
               variant="secondary"
               className="pr-1 w-full justify-start gap-2"
              >
               <OnlineIcon />
               <span>اوفلاين</span>
              </Button>
             </TooltipTrigger>
             <TooltipContent side="right" align="center" sideOffset={10}>
              <p>نوع الاختبار</p>
             </TooltipContent>
            </Tooltip>
           </TooltipProvider>
          </PopoverTrigger>
          <PopoverContent
           side={"right"}
           align="start"
           alignOffset={10}
           sideOffset={10}
           className="w-fit p-0 m-0 rounded-lg shadow-none  border-0"
          >
           <Button
            variant="outline"
            className="pl-10"
            onClick={setAsOnlineTest}
           >
            اوفلاين
           </Button>
          </PopoverContent>
         </Popover>

         <Popover>
          <PopoverTrigger>
           <TooltipProvider>
            <Tooltip delayDuration={100}>
             <TooltipTrigger className="w-full">
              <Button
               variant="secondary"
               className="pr-1 w-full justify-start gap-2"
              >
               <CalenderIcon />
               <span>{date?.toLocaleDateString()}</span>
              </Button>
             </TooltipTrigger>
             <TooltipContent side="right" align="center" sideOffset={10}>
              <p>تاريخ الاختبار</p>
             </TooltipContent>
            </Tooltip>
           </TooltipProvider>
          </PopoverTrigger>
          <PopoverContent className="p-0 ltr">
           <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            footer={
             <PopoverClose className=" w-full mt-2">
              <Button variant="outline" className="w-full  ">
               حفظ
              </Button>
             </PopoverClose>
            }
           />
          </PopoverContent>
         </Popover>
        </div>
       </div>
       <div className="flex gap-4 justify-between mt-6">
        <div className="flex gap-6">
         {/* <ShowTest
          openModel={openModel}
          setOpenModel={setOpenModel}
          test={{
           title,
           questions: questions,
           timeStart,
           timeDuration,
           date,
          }}
          dummyQuestions={dummyQuestions}
          setDummyQuestions={setDummyQuestions}
          timeStartString={timeStartString}
          setShowTestAlert={setShowTestAlert}
         /> */}
         {/* <Tab text={"النتائج"} path={"Icons/res_icon.svg"} className="pr-4" /> */}
        </div>
        <div className="flex gap-6">
         <OldButton
          type={"outline"}
          icon={<img src={"../../public/Icons/share_icon_2.svg"} />}
         >
          مشاركة مع المجموعة
         </OldButton>
         <OldButton
          type={"outline"}
          icon={<img src={"../../public/Icons/share_icon.svg"} />}
         >
          مشاركة
         </OldButton>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div className="w-full md:w-[85%] lg:w-[70%] p-4 mx-auto">
    <Heading as={"h2"} className={"mt-12 text-black font-almaria-bold"}>
     رفع نموذج لالسالة
    </Heading>
    <div className=" ">
     {/* <div className="">
     </div> */}
     <UploadBox files={questionsFiles} setFiles={setQuestionsFiles} />
    </div>
    <Heading as={"h2"} className={"mt-12 text-black font-almaria-bold"}>
     رفع نموذج الاجابة
    </Heading>
    <div>
     <UploadBox files={questionsFiles} setFiles={setQuestionsFiles} />
    </div>
   </div>
  </div>
 );
}

export default AddOfflineTest;
