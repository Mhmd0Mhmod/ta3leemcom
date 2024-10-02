import React, { useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Toolbar from '../../components/Toolbar.jsx';
// import MathModal from "./MathModal";
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Define custom blots if needed (e.g., MathBlot)
const Inline = Quill.import('blots/inline');
import 'katex/dist/katex.min.css'; // Import KaTeX styles

import { Grip, Plus, Trash2Icon, X } from 'lucide-react';
import { DEFAULT_QUESTION } from './AddOnlineTest.jsx';
import { Reorder } from 'framer-motion';

import { Button } from '../../components/ui/button.jsx';
import { Switch } from '../../components/ui/switch.jsx';
import { Label } from '../../components/ui/label.jsx';

import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from '../../components/ui/tooltip.jsx';

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

MathBlot.blotName = 'math';
MathBlot.tagName = 'span';
MathBlot.className = 'ql-math';

Quill.register(MathBlot);

const Editor = ({ currentQuestion, setCurrentQuestion, questions, setQuestions }) => {
  const [font, setFont] = useState('sans-serif');
  const [size, setSize] = useState('normal');
  const [color, setColor] = useState('#000000');
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
        quill.insertEmbed(cursorPosition, 'math', value);
        quill.setSelection(cursorPosition + 1);
      }
    }
  };

  const applyStyles = () => {
    if (activeEditorRef.current) {
      const quill = activeEditorRef.current.getEditor();
      if (quill) {
        quill.format('font', font);
        quill.format('size', size);
        quill.format('color', color);
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
    if (typeof index === 'number') {
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
            : question.answers,
        ),
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
    if (typeof index === 'number') {
      setQuestions((prev) =>
        prev.map((question, i) =>
          i === index
            ? {
                ...question,
                text: value,
              }
            : question,
        ),
      );
    } else {
      const updatedAnswers = currentQuestion.answers.map((answer, index) => (index === i ? { ...answer, text: value } : answer));
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
    if (typeof index === 'number') {
      setQuestions((prev) =>
        prev.map((question, i) =>
          i === index
            ? {
                ...question,
                answers: [
                  ...question.answers,
                  {
                    text: '',
                    isCorrect: false,
                    id: '3',
                  },
                ],
              }
            : question,
        ),
      );
    } else {
      setCurrentQuestion((prev) => ({
        ...prev,
        answers: [...prev.answers, { text: '', isCorrect: false, id: (prev.answers.length + 1).toString() }],
      }));
    }
  };

  const deleteAnswer = (index) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      answers: prev.answers.filter((_, i) => i !== index),
    }));
  };

  const handelIncrease = () => {
    if (currentQuestion.required) {
      setCurrentQuestion((prev) => ({ ...prev, deg: prev.deg + 1, bouns: 0 }));
    } else {
      setCurrentQuestion((prev) => ({ ...prev, bouns: prev.bouns + 1, deg: 1 }));
    }
  };
  const handelDecrease = () => {
    if (currentQuestion.required && currentQuestion.deg > 0) {
      setCurrentQuestion((prev) => ({ ...prev, deg: prev.deg - 1 }));
    } else {
      if (currentQuestion.bouns > 0) setCurrentQuestion((prev) => ({ ...prev, bouns: prev.bouns - 1, deg: 0 }));
    }
    if (currentQuestion.required) {
      setCurrentQuestion((prev) => ({ ...prev, bouns: 0 }));
    }
  };

  const dubblicateQuestion = () => {
    currentQuestion.id = (questions.length + 1).toString();
    setQuestions((prev) => [...prev, currentQuestion]);
  };

  const handelQuestionImages = (newImages) => {
    let fakeImages = ['./../../public/imgs/test_image.svg'];
    setCurrentQuestion((prev) => ({
      ...prev,
      images: [...prev.images, ...fakeImages],
    }));
  };

  console.log(currentQuestion);

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
        handelQuestionImages={handelQuestionImages}
      />
      {/*  Question Text Editor */}
      <div className="flex flex-col gap-2 rounded-md border border-r-8 border-accent-l-50 border-r-secondary-l px-4 py-6">
        <div className="flex items-start gap-12">
          <div className="flex-grow rounded-lg border-b-4 border-secondary-l" onClick={() => (activeEditorRef.current = questionTextRef.current)}>
            <ReactQuill
              ref={questionTextRef}
              placeholder="اكتب سوالك هنا ..."
              theme="snow"
              value={currentQuestion.text}
              onChange={(value) => handelQuestionProp('text', value)}
              modules={{ toolbar: false }} // Disable default toolbar
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg bg-accent-l-1000 px-4 py-2">
              <div className="flex flex-col justify-between gap-1">
                <button className="transition-all duration-300 hover:scale-110" onClick={() => handelIncrease()}>
                  <img src="../../../public/Icons/arrow_rounded.svg" alt="up" />
                </button>
                <button className="transition-all duration-300 hover:scale-110" onClick={() => handelDecrease()}>
                  <img src="../../../public/Icons/arrow_rounded.svg" alt="down" className="rotate-180" />
                </button>
              </div>
              <span>{currentQuestion.required ? currentQuestion.deg : currentQuestion.bouns}</span>
            </div>
            <span> {currentQuestion.required ? 'درجة' : 'بونص'}</span>
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
          className="grid grid-cols-12 overflow-clip"
        >
          <div className="col-span-8">
            {currentQuestion?.answers?.map((answer, i) => (
              <Reorder.Item value={answer} key={answer.id} className="grid grid-cols-12 items-center">
                <div className="col-span-12 grid grid-cols-12 items-center">
                  <div className="col-span-2 flex items-center justify-around">
                    <X onClick={() => deleteAnswer(i)} />
                    <input className="h-5 w-5" type="radio" name="current-answers" checked={answer.isCorrect} onChange={(e) => handelCheck(e, i)} />
                  </div>

                  <div className="col-span-9 min-w-[50%]" onClick={() => (activeEditorRef.current = answerRefs.current[i])}>
                    <ReactQuill
                      ref={(el) => (answerRefs.current[i] = el)}
                      theme="snow"
                      value={answer.text}
                      placeholder={`خيار ${i + 1}`}
                      className="px-2 py-3"
                      onChange={(value) => handelType(value, i)}
                      modules={{ toolbar: false }} // Disable default toolbar
                    />
                  </div>
                  <img src="../../../public/Icons/grip_icon.svg" alt="drag" draggable={false} />
                </div>
              </Reorder.Item>
            ))}
          </div>
          <Reorder.Group
            values={currentQuestion?.images}
            onReorder={(newValues) =>
              setCurrentQuestion((prev) => ({
                ...prev,
                images: newValues,
              }))
            }
            className="col-span-4 grid grid-cols-2"
          >
            {currentQuestion?.images?.map((image, i) => (
              <Reorder.Item drag value={image} key={image} className="col-span-1">
                <div className="relative">
                  <img draggable={false} src={image} alt={`image-${i}`} />
                  <div className="absolute right-1 top-0">
                    <Button variant="ghost" size="icon">
                      <Grip />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2Icon />
                    </Button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          <div></div>
          <Button variant="ghost" className="col-span-2 flex items-center gap-2 font-almaria text-lg text-secondary-l hover:text-secondary-l" onClick={addAnswer}>
            <Plus />
            <span>اضافة اختيار</span>
          </Button>
        </Reorder.Group>
        {/* </Reorder.Group> */}

        {/* Explanation Editor */}
        <div className="mt-6 flex items-center gap-4">
          <span className="font-almaria-bold">تفسير الاجابة</span>
          <div className="flex-grow" onClick={() => (activeEditorRef.current = explanationRef.current)}>
            <ReactQuill
              ref={explanationRef}
              theme="snow"
              value={currentQuestion.explain}
              placeholder="اكتب تفسيرك هنا"
              onChange={(value) => handelQuestionProp('explain', value)}
              modules={{ toolbar: false }} // Disable default toolbar
            />
          </div>
          <p>( اختياري )</p>
        </div>
        <hr className="mt-2" />
        <div className="flex items-center justify-between">
          <div className="ltr flex items-center space-x-2">
            <Label htmlFor="airplane-mode" className={'font-almaria-bold'}>
              اجباري
            </Label>
            <Switch
              id="airplane-mode"
              checked={currentQuestion.required}
              onCheckedChange={(val) => {
                setCurrentQuestion((prev) => ({
                  ...prev,
                  required: val,
                }));
                e.target.checked ? handelIncrease() : handelDecrease();
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    className="hover:bg-accent-1000 rounded-lg p-2 transition-all"
                    onClick={() => {
                      setCurrentQuestion(DEFAULT_QUESTION);
                    }}
                  >
                    <img src="../../../public/Icons/trash_icon_gray.svg" alt="" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center" sideOffset={10}>
                  <p>حذف</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <button className="hover:bg-accent-1000 rounded-lg p-2 transition-all" onClick={dubblicateQuestion}>
                    <img src="../../../public/Icons/copy_icon_gray.svg" alt="" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center" sideOffset={10}>
                  <p>نسخ</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
