import React, { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Toolbar from "./Toolbar";
import MathModal from "./MathModal";
import katex from "katex";
import "katex/dist/katex.min.css";

// Define custom blots if needed (e.g., MathBlot)
const Inline = Quill.import("blots/inline");
import "katex/dist/katex.min.css"; // Import KaTeX styles

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

const Editor = ({ editors, onChange }) => {
 const [font, setFont] = useState("sans-serif");
 const [size, setSize] = useState("normal");
 const [color, setColor] = useState("#000000");
 const [isModalOpen, setIsModalOpen] = useState(false);

 const refs = useRef([]);
 const activeEditorRef = useRef(null);

 const handleEditorChange = (value, index) => {
  const newEditors = [...editors];
  newEditors[index] = value;
  onChange(newEditors);
 };

 const formatText = (command, value = true) => {
  if (activeEditorRef.current) {
   const quill = activeEditorRef.current.getEditor();
   if (quill) {
    quill.format(command, value);
   }
  }
 };

 const insertMath = (value) => {
  // console.log("Math value being inserted:", value);
  // if (activeEditorRef.current) {
  //  const quill = activeEditorRef.current.getEditor();
  //  if (quill) {
  //   const selection = quill.getSelection();
  //   if (selection) {
  //    const cursorPosition = selection.index;
  //    console.log("Inserting math at position:", cursorPosition);
  //    quill.insertEmbed(cursorPosition, "math", value);
  //    quill.setSelection(cursorPosition + 1);
  //    setIsModalOpen(false); // Close the modal after inserting
  //   } else {
  //    console.error("No selection found.");
  //   }
  //  }
  // }

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
  applyStyles();
 }, [font, size, color]);

 return (
  <div>
   {/* Custom Toolbar */}
   <Toolbar
    formatText={formatText}
    setColor={setColor}
    setFont={setFont}
    setSize={setSize}
    openMathModal={() => setIsModalOpen(true)}
    insertMath={insertMath}
   />

   <MathModal
    isOpen={isModalOpen}
    onRequestClose={() => setIsModalOpen(false)}
    onSubmit={insertMath}
   />

   {/* Editors */}
   {editors.map((content, index) => (
    <div
     key={index}
     style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "5px" }}
     onClick={() => (activeEditorRef.current = refs.current[index])}
    >
     <ReactQuill
      ref={(el) => (refs.current[index] = el)}
      // onClick={() => {
      //  if (refs.current[index]) {
      //   activeEditorRef.current = refs.current[index];
      //  } else {
      //   console.error("Editor reference is not set.");
      //  }
      // }}
      theme="snow"
      value={content}
      onChange={(value) => handleEditorChange(value, index)}
      modules={{ toolbar: false }} // Disable default toolbar
     />
    </div>
   ))}
  </div>
 );
};

export default Editor;
