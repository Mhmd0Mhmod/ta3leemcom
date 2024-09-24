import React, { useState } from "react";
import Modal from "react-modal";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import Button from "../UI-Global/Button.jsx";
import Heading from "../UI-Global/Heading.jsx";

Modal.setAppElement("#root"); // This should be the ID of your app root element

const MathModal = ({ isOpen, onRequestClose, onSubmit }) => {
 const [mathValue, setMathValue] = useState("");

 const handleSubmit = () => {
  if (mathValue) {
   onSubmit(mathValue);
   setMathValue(""); // Clear input after submission
   onRequestClose(); // Close the modal
  }
 };

 return (
  <Modal
   isOpen={isOpen}
   onRequestClose={onRequestClose}
   contentLabel="Math Equation Input"
   className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm w-full h-full"
  >
   <div className="m-auto w-[60vh] h-[25vw] border border-gray-300 rounded-lg p-6 flex flex-col gap-4  justify-between bg-white">
    <Heading as="h2">Insert Math Equation</Heading>
    <textarea
     value={mathValue}
     rows={5}
     onChange={(e) => setMathValue(e.target.value)}
     placeholder="Enter LaTeX code"
     className="text-xl border border-gray-300 w-full p-2 rounded-md resize-none"
    />
    <div className="flex gap-4">
     <Button onClick={handleSubmit}>Insert</Button>
     <Button type="outline" onClick={onRequestClose}>
      Cancel
     </Button>
    </div>
   </div>
  </Modal>
 );
};

export default MathModal;
