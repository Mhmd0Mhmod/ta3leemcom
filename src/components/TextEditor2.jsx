import React, { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Toolbar from "./Toolbar";
// import MathModal from "./MathModal";
import katex from "katex";
import "katex/dist/katex.min.css";

// Define custom blots if needed (e.g., MathBlot)
const Inline = Quill.import("blots/inline");
import "katex/dist/katex.min.css"; // Import KaTeX styles
import Button from "./ui/Button";
import { Plus, X } from "lucide-react";
import Heading from "./ui/Heading";
import { DEFAULT_QUESTION } from "./AddOnlineTest";
import { Reorder } from "framer-motion";

class MathBlot extends Inline {
 static create(value) {
  const node = super.create();
  katex.render(value, node);
  return node;
 }

 static value(node) {
  return node.textContent;
 }
}

MathBlot.blotName = "math";
MathBlot.tagName = "span";
MathBlot.className = "ql-math";

Quill.register(MathBlot);

const Editor = ({
 currentQuestion,
 setCurrentQuestion,
 questions,
 setQuestions,
}) => {
 const [font, setFont] = useState("sans-serif");
 const [size, setSize] = useState("normal");
 const [color, setColor] = useState("#000000");
 //  const [isModalOpen, setIsModalOpen] = useState(false);

 const questionTextRef = useRef(null);
 const answerRefs = useRef([]);
 const explanationRef = useRef(null);
 const activeEditorRef = useRef(null);

 //  const handleEditorChange = (value, index = null, isAnswer = false) => {
 //   if (isAnswer && index !== null) {
 //    const newAnswers = [...answers];
 //    newAnswers[index].text = value;
 //    setAnswers(newAnswers);
 //   } else if (index === null) {
 //    setQuestionText(value);
 //   } else {
 //    setExplanation(value);
 //   }
 //  };

 const formatText = (command, value = true) => {
  if (activeEditorRef.current) {
   const quill = activeEditorRef.current.getEditor();
   if (quill) {
    quill.format(command, value);
   }
  }
 };

 const insertMath = (value) => {
  if (activeEditorRef.current) {
   const quill = activeEditorRef.current.getEditor();
   if (quill) {
    const cursorPosition = quill.getSelection().index;
    quill.insertEmbed(cursorPosition, "math", value);
    quill.setSelection(cursorPosition + 1);
   }
  }
 };

 const applyStyles = () => {
  if (activeEditorRef.current) {
   const quill = activeEditorRef.current.getEditor();
   if (quill) {
    quill.format("font", font);
    quill.format("size", size);
    quill.format("color", color);
   }
  }
 };

 // Apply styles whenever font, size, or color changes
 React.useEffect(() => {
  if (!activeEditorRef.current) {
   activeEditorRef.current = questionTextRef.current;
  }
  applyStyles();
 }, [font, size, color]);
 //  React.useEffect(() => {}, [font, size, color]);

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

 const handelType = (value, i, index) => {
  if (typeof index === "number") {
   setQuestions((prev) =>
    prev.map((question, i) =>
     i === index
      ? {
         ...question,
         text: value,
        }
      : question
    )
   );
  } else {
   const updatedAnswers = currentQuestion.answers.map((answer, index) =>
    index === i ? { ...answer, text: value } : answer
   );
   setCurrentQuestion((prev) => ({
    ...prev,
    answers: updatedAnswers,
   }));
  }
 };

 const handelQuestionProp = (key, val) => {
  setCurrentQuestion((prev) => ({ ...prev, [key]: val }));
 };

 const addAnswer = (index) => {
  if (typeof index === "number") {
   setQuestions((prev) =>
    prev.map((question, i) =>
     i === index
      ? {
         ...question,
         answers: [
          ...question.answers,
          {
           text: "",
           isCorrect: false,
           id: "3",
          },
         ],
        }
      : question
    )
   );
  } else {
   setCurrentQuestion((prev) => ({
    ...prev,
    answers: [
     ...prev.answers,
     { text: "", isCorrect: false, id: (prev.answers.length + 1).toString() },
    ],
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

 const dubblicateQuestion = () => {
  currentQuestion.id = (questions.length + 1).toString();
  setQuestions((prev) => [...prev, currentQuestion]);
 };

 //  const addAnswer = () => {
 //   setAnswers([
 //    ...answers,
 //    { text: "", isCorrect: false, id: Date.now().toString() },
 //   ]);
 //  };

 return (
  <div>
   {/* Custom Toolbar */}
   <Toolbar
    formatText={formatText}
    setColor={setColor}
    setFont={setFont}
    setSize={setSize}
    color={color}
    // openMathModal={() => setIsModalOpen(true)}
    insertMath={insertMath}
   />
   {/*  Question Text Editor */}
   <div className="px-4 py-6 flex flex-col gap-2 border border-accent-50 rounded-md border-r-8 border-r-secondary">
    <div className="flex gap-12 items-start ">
     <div
      className="flex-grow border-b-4 border-secondary rounded-lg "
      onClick={() => (activeEditorRef.current = questionTextRef.current)}
     >
      <ReactQuill
       ref={questionTextRef}
       placeholder="اكتب سوالك هنا ..."
       theme="snow"
       value={currentQuestion.text}
       onChange={(value) => handelQuestionProp("text", value)}
       modules={{ toolbar: false }} // Disable default toolbar
      />
     </div>
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
         <img src="Icons/arrow_rounded.svg" alt="down" className="rotate-180" />
        </button>
       </div>
       <span>{currentQuestion.bouns}</span>
      </div>
      <span>بونص</span>
     </div>
    </div>

    {/* Answers Editors */}
    {/* <Reorder.Group
     values={currentQuestion.answers}
     onReorder={(newAnsers) => {
      setCurrentQuestion((prev) => ({ ...prev, answers: newAnsers }));
     }}
    > */}
    <Reorder.Group
     axis="y"
     values={currentQuestion.answers}
     onReorder={(newAnsers) => {
      setCurrentQuestion((prev) => ({ ...prev, answers: newAnsers }));
     }}
     className="grid grid-cols-12 overflow-clip  "
    >
     {currentQuestion?.answers?.map((answer, i) => (
      <Reorder.Item
       value={answer}
       key={answer.id}
       className="col-span-12 grid grid-cols-12 items-center"
      >
       <div key={i} className="col-span-12 grid grid-cols-12 items-center">
        <div className="flex items-center col-span-1 justify-around">
         <X onClick={() => deleteAnswer(i)} />
         <input
          className="h-5 w-5"
          type="radio"
          name="current-answers"
          checked={answer.isCorrect}
          onChange={(e) => handelCheck(e, i)}
         />
        </div>

        <div
         className=" min-w-[50%] col-span-6"
         onClick={() => (activeEditorRef.current = answerRefs.current[i])}
        >
         <ReactQuill
          ref={(el) => (answerRefs.current[i] = el)}
          theme="snow"
          value={answer.text}
          placeholder={`خيار ${i + 1}`}
          className="px-2 py-3  "
          onChange={(value) => handelType(value, i)}
          modules={{ toolbar: false }} // Disable default toolbar
         />
        </div>
        <img src="Icons/grip_icon.svg" alt="drag" draggable={false} />
       </div>
      </Reorder.Item>
     ))}
     <div></div>
     {/* <div></div> */}
     <Button
      type="outlineSecondary"
      className="col-span-2 "
      onClick={addAnswer}
      icon={<Plus />}
     >
      <span>اضافة اختيار</span>
     </Button>
    </Reorder.Group>
    {/* </Reorder.Group> */}

    {/* Explanation Editor */}
    <div className="flex gap-4 items-center">
     <span className="font-almaria-bold">تفسير الاجابة</span>
     <div
      className="flex-grow"
      onClick={() => (activeEditorRef.current = explanationRef.current)}
     >
      <ReactQuill
       ref={explanationRef}
       theme="snow"
       value={currentQuestion.explain}
       placeholder="اكتب تفسيرك هنا"
       onChange={(value) => handelQuestionProp("explain", value)}
       modules={{ toolbar: false }} // Disable default toolbar
      />
     </div>
     <p>( اختياري )</p>
    </div>
    <hr className="mt-2" />
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
       onChange={(e) => {
        setCurrentQuestion((prev) => ({
         ...prev,
         required: e.target.checked,
        }));
        e.target.checked ? handelBounsIncrease() : handelBounsDecrease();
       }}
      />
      <Heading as={"h5"} className={" font-almaria-bold"}>
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
       onClick={dubblicateQuestion}
      >
       <img src="Icons/copy_icon_gray.svg" alt="" />
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Editor;
