import { Plus } from "lucide-react";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const FormComponent = ({
 currentQuestion,
 setCurrentQuestion,
 addAnswer,
 deleteAnswer,
 handelCheck,
 handelType,
}) => {
 const handleOnDragEnd = (result) => {
  if (!result.destination) return;

  const items = Array.from(currentQuestion.answers);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  setCurrentQuestion((prev) => ({
   ...prev,
   answers: items,
  }));
 };

 return (
  <DragDropContext onDragEnd={handleOnDragEnd}>
   <Droppable droppableId="answers">
    {(provided) => (
     <form
      className="flex-grow"
      ref={provided.innerRef}
      {...provided.droppableProps}
     >
      {currentQuestion?.answers?.map((answer, index) => (
       <Draggable key={index} draggableId={`answer-${index}`} index={index}>
        {(provided) => (
         <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="grid grid-cols-12 gap-3 items-center font-almaria-bold w-full mb-2"
         >
          <button type="button" onClick={() => deleteAnswer(index)}>
           <X />
          </button>
          <input
           type="radio"
           className="h-5 w-5"
           name="correctAnswer"
           checked={answer.isCorrect}
           onChange={(e) => handelCheck(e, index)}
          />
          <div className="col-span-10">
           <div className="flex items-center gap-2">
            <input
             type="text"
             placeholder={`خيار ${index + 1}`}
             className="px-2 py-3 min-w-[50%]"
             value={answer.text}
             onChange={(e) => handelType(e, index)}
            />
            {/* Handle for dragging */}
            <div {...provided.dragHandleProps}>
             <img src="Icons/grip_icon.svg" alt="drag" />
            </div>
           </div>
          </div>
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
        )}
       </Draggable>
      ))}
      {provided.placeholder}
     </form>
    )}
   </Droppable>
  </DragDropContext>
 );
};

export default FormComponent;
