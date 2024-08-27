import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import "katex/dist/katex.min.css"; // KaTeX styles
import katex from "katex";

const Inline = Quill.import("blots/inline");
class MathBlot extends Inline {
 static create(value) {
  const node = super.create(value);
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

const fontOptions = ["sans-serif", "serif", "monospace"];
const sizeOptions = ["small", false, "large", "huge"]; // false represents the default size

const modules = {
 toolbar: {
  container: [
   [{ color: [] }, { background: [] }],
   ["bold", "italic", "underline", "strike"],
   [{ script: "sub" }, { script: "super" }],
   [{ formula: true }], // Math equation button
   [{ list: "ordered" }, { list: "bullet" }],
   [{ align: [] }],
   [{ font: fontOptions }, { size: sizeOptions }], // Custom fonts and sizes
   //  ["link", "image", "video"],
   ["clean"],
  ],
  handlers: {
   formula: function () {
    const value = prompt("Enter math formula in LaTeX format:");
    if (value) {
     const cursorPosition = this.quill.getSelection().index;
     this.quill.insertEmbed(cursorPosition, "math", value);
     this.quill.setSelection(cursorPosition + 1);
    }
   },
  },
 },
};

const Editor = ({ onType, value }) => {
 // const [value, setValue] = useState("اكتب سوالك هنا ...");

 return (
  <div className="ltr ">
   <ReactQuill
    // placeholder="اكتب سوالك هنا ..."
    value={value}
    onChange={(val) => onType(val)}
    modules={modules}
    theme="snow"
   />
  </div>
 );
};

{
 /* <div dangerouslySetInnerHTML={{ __html: value }} /> */
}
export default Editor;
