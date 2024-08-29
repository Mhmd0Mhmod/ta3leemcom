import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Edit, Plus, X } from "lucide-react"; // Adjust the imports as needed

const QuestionList = ({
 questions,
 handelBounsIncrease,
 handelBounsDecrease,
 edit,
 deleteQuestion,
 handelCheck,
 handelType,
 deleteAnswer,
 addAnswer,
}) => {
 const handleOnDragEnd = (result) => {
  if (!result.destination) return;

  const items = Array.from(questions);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  // Update the state with the reordered questions
  setQuestions(items);
 };

 return (
  <DragDropContext onDragEnd={handleOnDragEnd}>
   <Droppable droppableId="questions">
    {(provided) => (
     <ul
      className="flex flex-col gap-4"
      ref={provided.innerRef}
      {...provided.droppableProps}
     >
      {questions.map((question, index) => (
       <Draggable key={index} draggableId={`question-${index}`} index={index}>
        {(provided) => (
         <li
          className="bg-white px-3 pt-4 pb-8 rounded-lg"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
         >
          <div className="flex items-center w-full">
           <span>{index + 1}.</span>
           <div
            className="mr-2 flex-grow font-almaria-bold text-lg"
            dangerouslySetInnerHTML={{ __html: question?.text }}
           />
           <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center px-3 py-1 rounded-lg bg-accent-1000">
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
           </div>
          </div>
          <ul className="mr-12 flex flex-col gap-00">
           {question?.answers?.map((answer, i) => (
            <div
             key={i}
             className="flex gap-3 items-center font-almaria-bold w-full"
            >
             <input
              type="radio"
              className="h-5 w-5"
              name={answer.text}
              checked={answer.isCorrect}
              onChange={(e) => handelCheck(e, i)}
             />
             <div>
              <div className="flex items-center gap-2">
               <input
                type="text"
                placeholder={`خيار ${i + 1}`}
                className="px-2 py-3 min-w-[30%]"
                value={answer.text}
                onChange={(e) => handelType(e, i)}
               />
              </div>
             </div>
             {i === question.answers.length - 1 && (
              <div className="flex gap-4">
               <button
                type="button"
                className="col-span-10 flex gap-1 mt-4 items-center"
                onClick={() => edit(index)}
               >
                <Edit className="text-secondary-l h-5" />
                <span className="text-secondary-l font-almaria-bold">
                 تعديل
                </span>
               </button>
               <button
                type="button"
                className="col-span-10 flex gap-1 mt-4 items-start"
                onClick={() => deleteQuestion(index)}
               >
                <img src="Icons/trash_icon.svg" alt="delete" />
                <span className="text-primary-l font-almaria-bold">حذف</span>
               </button>
              </div>
             )}
            </div>
           ))}
          </ul>
         </li>
        )}
       </Draggable>
      ))}
      {provided.placeholder}
     </ul>
    )}
   </Droppable>
  </DragDropContext>
 );
};

export default QuestionList;
