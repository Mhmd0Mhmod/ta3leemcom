import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Heading from "./ui/Heading";
import Tab from "./ui/Tab";
import { constraints } from "../config";
import Button from "./ui/Button";
import Editor from "./TextEditor2";
import {
 Delete,
 Edit,
 GripIcon,
 Plus,
 SkipBack,
 Trash2,
 Undo2,
 X,
} from "lucide-react";

const QUESTIONS = [
 {
  text: "ما هو أكبر كوكب في المجموعة الشمسية؟",
  bouns: 5,
  answers: [
   { text: "المشتري", isCorrect: true },
   { text: "المريخ", isCorrect: false },
  ],
  explain: "المشتري هو أكبر كوكب في المجموعة الشمسية.",
  required: true,
 },
 {
  text: "ما هي عاصمة فرنسا؟",
  bouns: 3,
  answers: [
   { text: "باريس", isCorrect: true },
   { text: "برلين", isCorrect: false },
  ],
  explain: "باريس هي عاصمة فرنسا.",
  required: false,
 },
 {
  text: "ما هو الحيوان الأسرع في العالم؟",
  bouns: 4,
  answers: [
   { text: "الفهد", isCorrect: true },
   { text: "الأسد", isCorrect: false },
  ],
  explain: "الفهد هو الحيوان الأسرع في العالم.",
  required: true,
 },
];

const tabs_2 = [
 { text: "أونلاين", path: "Icons/online_icon.svg" },
 { text: "4:45 PM", path: "Icons/time_icon.svg" },
 { text: "30 دقيقة", path: "Icons/time_icon_2.svg" },
 { text: "31 / 7 /2024", path: "Icons/calender_icon_2.svg" },
];

const DEFAULT_QUESTION = {
 text: "",
 bouns: 0,
 answers: [
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
 ],
 explain: "",
 required: false,
};

function AddOnlineTest() {
 const [searchParams, setSearchParams] = useSearchParams();
 const [questions, setQuestions] = useState(QUESTIONS);
 const [currentQuestion, setCurrentQuestion] = useState(DEFAULT_QUESTION);
 const [onEdit, setOnEdit] = useState(false);
 const [onEditIndex, setOnEditIndex] = useState(null);

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
  {
   text: questions.reduce((acc, el) => acc + el.bouns, 0),
   path: "Icons/bouns_icon.svg",
  },
 ];

 const handelCheck = (event, i, index) => {
  if (typeof index === "number") {
   setQuestions((prev) =>
    prev.map((question, i) =>
     i === index
      ? {
         ...question,
         answers: questions[index].answers.map((answer, index) => ({
          ...answer,
          isCorrect: index === i,
         })),
        }
      : question.answers
    )
   );
  } else {
   const updatedAnswers = currentQuestion.answers.map((answer, index) => ({
    ...answer,
    isCorrect: index === i, // Set the clicked answer as correct and others as false
   }));
   setCurrentQuestion((prev) => ({
    ...prev,
    answers: updatedAnswers,
   }));
  }
 };

 const handelType = (event, i, index) => {
  if (typeof index === "number") {
   setQuestions((prev) =>
    prev.map((question, i) =>
     i === index
      ? {
         ...question,
         text: event.target.value,
        }
      : question
    )
   );
  } else {
   const updatedAnswers = currentQuestion.answers.map((answer, index) =>
    index === i ? { ...answer, text: event.target.value } : answer
   );
   setCurrentQuestion((prev) => ({
    ...prev,
    answers: updatedAnswers,
   }));
  }
 };

 const handelQuestionText = (text) => {
  setCurrentQuestion((prev) => ({ ...prev, text }));
 };

 const addAnswer = (index) => {
  if (typeof index === "number") {
   setQuestions((prev) =>
    prev.map((question, i) =>
     i === index
      ? {
         ...question,
         answers: [...question.answers, { text: "", isCorrect: false }],
        }
      : question
    )
   );
  } else {
   setCurrentQuestion((prev) => ({
    ...prev,
    answers: [...prev.answers, { text: "", isCorrect: false }],
   }));
  }
 };

 const deleteAnswer = (index) => {
  setCurrentQuestion((prev) => ({
   ...prev,
   answers: prev.answers.filter((_, i) => i !== index),
  }));
 };

 const handelBounsIncrease = (index) => {
  if (typeof index === "number") {
   setQuestions((prev) =>
    prev.map((question, i) =>
     i === index ? { ...question, bouns: question.bouns + 1 } : question
    )
   );
  } else {
   setCurrentQuestion((prev) => ({ ...prev, bouns: prev.bouns + 1 }));
  }
 };
 const handelBounsDecrease = (index) => {
  if (typeof index === "number" && questions[index].bouns > 0) {
   setQuestions((prev) =>
    prev.map((question, i) =>
     i === index ? { ...question, bouns: question.bouns - 1 } : question
    )
   );
  } else {
   if (currentQuestion.bouns > 0)
    setCurrentQuestion((prev) => ({ ...prev, bouns: prev.bouns - 1 }));
  }
 };

 const addQuestion = () => {
  setQuestions((prev) => [...prev, currentQuestion]);
  setCurrentQuestion(DEFAULT_QUESTION);
 };

 const editQuestion = () => {
  setQuestions((prev) =>
   prev.map((question, i) => (i === onEditIndex ? currentQuestion : question))
  );
  setOnEdit(false);
  setCurrentQuestion(DEFAULT_QUESTION);
 };
 const edit = (index) => {
  document.querySelector("#editSection").scrollIntoView({
   behavior: "smooth",
   block: "start",
  });

  setOnEdit(true);
  setOnEditIndex(index);
  setCurrentQuestion(questions[index]);
 };

 const deleteQuestion = (index) => {
  setQuestions((prev) => prev.filter((_, i) => i !== index));
 };
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
     <div className="flex gap-1 items-end">
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
    <div className="mt-8 " id="editSection">
     <Editor onType={handelQuestionText} value={currentQuestion.text} />
     <div className=" border-l border-r-8 border-accent-50 border-r-secondary bg-accent-1100 pt-2 ">
      <hr className="  mx-12 border-4 border-secondary rounded-bl-lg rounded-br-lg bg-white h-0 " />
     </div>

     <div className="px-8 bg-accent-1100 border-b border-l border-r-8 border-accent-50 border-r-secondary rounded-lg rounded-tr-none rounded-tl-none p-4">
      <div className="flex items-start">
       <form className="flex-grow ">
        {currentQuestion?.answers?.map((answer, index) => (
         <div
          key={index}
          className="grid grid-cols-12 gap-3 items-center font-almaria-bold w-full mb-2"
         >
          <button type="button" onClick={() => deleteAnswer(index)}>
           <X />
          </button>
          <input
           type="radio"
           className="h-5 w-5 "
           name="correctAnswer" // Use a consistent name attribute for radio buttons
           checked={answer.isCorrect} // Use the isCorrect flag to check the right option
           onChange={(e) => handelCheck(e, index)}
          />
          <div className="col-span-10  ">
           <div className="flex items-center gap-2  ">
            <input
             type="text"
             placeholder={`خيار ${index + 1}`}
             className="px-2 py-3 min-w-[50%] "
             value={answer.text}
             onChange={(e) => handelType(e, index)}
            />
            <GripIcon />
           </div>
          </div>
          <div></div>
          <div></div>
          {index === currentQuestion.answers.length - 1 && (
           <button
            type="button"
            className="col-span-10 flex gap-1 items-end mt-4"
            onClick={addAnswer}
           >
            <Plus className="text-secondary h-5" />
            <span className="text-secondary font-almaria-bold">
             اضافة اختبار
            </span>
           </button>
          )}
         </div>
        ))}
       </form>

       <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center px-3 py-1 rounded-lg bg-accent-1000">
         <div className="flex flex-col justify-between gap-1">
          <button
           className="hover:scale-110 duration-300 transition-all"
           onClick={() => handelBounsIncrease()}
          >
           <img src="Icons/arrow_rounded.svg" alt="up" />
          </button>
          <button
           className="hover:scale-110 duration-300 transition-all"
           onClick={() => handelBounsDecrease()}
          >
           <img
            src="Icons/arrow_rounded.svg"
            alt="down"
            className="rotate-180"
           />
          </button>
         </div>
         <span>{currentQuestion.bouns}</span>
        </div>
        <span>بونص</span>
       </div>
      </div>
      <div className="flex items-center  gap-4">
       <Heading as={"h5"} className={" font-almaria-bold"}>
        تفسير الاجابة
       </Heading>
       <input type="text" className="px-2 py-3 flex-grow rounded-lg" />
       <span>( اختياري )</span>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
       <div className="flex gap-4 items-center">
        <label
         htmlFor="required"
         className="relative inline-flex items-center cursor-pointer "
        >
         <div
          className={`w-11 h-6 ${
           currentQuestion.required ? "bg-secondary" : "bg-white"
          }  rounded-full shadow-inner border border-accent-50 `}
         ></div>
         <div
          className={`dot absolute top-[50%] -translate-y-[50%] w-5 h-5 rounded-full transition-all duration-300 transform bg-white ${
           currentQuestion.required
            ? "translate-x-full left-0"
            : "!bg-[#D9D9D9] left-1"
          }`}
         ></div>
        </label>
        <input
         type="checkbox"
         id="required"
         className="hidden"
         checked={currentQuestion.required}
         onChange={(e) =>
          setCurrentQuestion((prev) => ({
           ...prev,
           required: e.target.checked,
          }))
         }
        />
        <Heading as={"h5"} className={" font-almaria-bold"}>
         {" "}
         اجباري
        </Heading>
       </div>
       <div className="flex gap-4 items-center">
        <button
         className="hover:bg-accent-1000 transition-all p-2 rounded-lg"
         onClick={() => {
          setCurrentQuestion(DEFAULT_QUESTION);
         }}
        >
         <img src="Icons/trash_icon_gray.svg" alt="" />
        </button>
        <button
         className="hover:bg-accent-1000 transition-all p-2 rounded-lg"
         onClick={() => {
          setQuestions((prev) => [...prev, currentQuestion]);
         }}
        >
         <img src="Icons/copy_icon_gray.svg" alt="" />
        </button>
       </div>
      </div>
     </div>
     <div className="flex gap-3">
      <Button
       type="Secondary"
       icon={<Plus />}
       className={"gap-0 my-4"}
       onClick={() => {
        onEdit ? editQuestion() : addQuestion();
       }}
      >
       <span className="font-almaria-light text-xl">
        {onEdit ? "نطبيق التعديل" : "اضافة جديد"}
       </span>
      </Button>
      {onEdit && (
       <Button
        type="outlineSecondary"
        className={"gap-0 my-4 bg-white border border-accent-1000"}
        onClick={() => {
         setOnEdit(false);
         setOnEditIndex(null);
         setCurrentQuestion(DEFAULT_QUESTION);
        }}
       >
        <span className="font-almaria text-xl text-black">تخطي</span>
       </Button>
      )}
     </div>
     <ul className="flex flex-col gap-4 ">
      {questions.map((question, index) => (
       <li key={index} className="bg-white px-3 pt-4 pb-8 rounded-lg">
        <div className="flex items-center w-full">
         <span>{index + 1}.</span>
         {/* <span className="mr-2 flex-grow">{question.text}</span> */}
         <div
          className="mr-2 flex-grow font-almaria-bold text-lg"
          dangerouslySetInnerHTML={{ __html: question?.text }}
         />
         <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center px-3  py-1 rounded-lg bg-accent-1000">
           <div className="flex flex-col justify-between gap-1">
            <button
             className="hover:scale-110 duration-300 transition-all"
             onClick={() => handelBounsIncrease(index)}
            >
             <img src="Icons/arrow_rounded.svg" alt="up" />
            </button>
            <button
             className="hover:scale-110 duration-300 transition-all"
             onClick={() => handelBounsDecrease(index)}
            >
             <img
              src="Icons/arrow_rounded.svg"
              alt="down"
              className="rotate-180"
             />
            </button>
           </div>
           <span>{question.bouns}</span>
          </div>
          <span>بونص</span>
         </div>{" "}
        </div>
        <ul className="mr-12 flex flex-col gap-00">
         {question?.answers?.map((answer, i) => (
          <>
           <div
            key={index}
            className="flex  gap-3 items-center font-almaria-bold w-full "
           >
            <input
             type="radio"
             className="h-5 w-5 "
             name={answer.text}
             checked={answer.isCorrect}
            />
            <div>
             <div className="flex items-center gap-2  ">
              <input
               type="text"
               placeholder={`خيار ${index + 1}`}
               className="px-2 py-3 min-w-[30%] "
               value={answer.text}
              />
             </div>
            </div>
           </div>
           <div className="flex gap-4">
            {i === question.answers.length - 1 && (
             <>
              <button
               type="button"
               className="col-span-10 flex gap-1 mt-4 items-center"
               onClick={() => edit(index)}
              >
               <Edit className="text-secondary h-5" />
               <span className="text-secondary font-almaria-bold">تعديل</span>
              </button>
              <button
               type="button"
               className="col-span-10 flex gap-1 mt-4 items-start"
               onClick={() => deleteQuestion(index)}
              >
               <img src="Icons/trash_icon.svg" alt="delete" />
               <span className="text-primary font-almaria-bold">حذف</span>
              </button>
             </>
            )}
           </div>
          </>
         ))}
        </ul>
       </li>
      ))}
     </ul>
    </div>
   </div>
  </div>
 );
}

export default AddOnlineTest;
