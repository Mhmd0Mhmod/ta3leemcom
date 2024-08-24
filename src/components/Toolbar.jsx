import {
 FaBold,
 FaItalic,
 FaUnderline,
 FaListOl,
 FaListUl,
 FaSuperscript,
 FaSubscript,
} from "react-icons/fa";
import {
 MdFormatAlignLeft,
 MdFormatAlignCenter,
 MdFormatAlignRight,
} from "react-icons/md";
import { HiOutlineCode } from "react-icons/hi";
import { Baseline, Sigma } from "lucide-react";

const Toolbar = ({
 formatText,
 setFont,
 setSize,
 setColor,
 openMathModal,
 insertMath,
}) => {
 const fontOptions = ["sans-serif", "serif", "monospace"];
 const sizeOptions = ["small", "normal", "large", "huge"];
 const commonColors = [
  "#000000", // Black
  "#FFFFFF", // White
  "#FF0000", // Red
  "#0000FF", // Blue
  "#00FF00", // Green
  "#808080", // Gray
  "#FFFF00", // Yellow
 ];
 return (
  <div
   id="toolbar"
   className="ltr flex gap-4  mb-10 bg-white rounded-xl px-6 py-2"
  >
   {/* Math Equation Button */}
   {/* <button className="px-2 py-1 bg-gray-300 rounded-md" onClick={openMathModal}>
    Math
   </button> */}

   <button
    className="px-1 py-1  rounded-md"
    onClick={() => {
     const value = prompt("Enter math formula in LaTeX format:");
     if (value) {
      insertMath(value);
     }
    }}
   >
    <Sigma />
   </button>

   <button
    className="px-1 py-1  rounded-md flex items-center justify-center"
    onClick={() => setColor("#FBC84B")}
   >
    <Baseline />
   </button>
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("bold")}
   >
    <FaBold />
   </button>
   {/* Italic */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("italic")}
   >
    <FaItalic />
   </button>
   {/* Underline */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("underline")}
   >
    <FaUnderline />
   </button>
   {/*
   Header 1
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("header", 1)}
   >
    H1
   </button>

   {/* Header 2
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("header", 2)}
   >
    H2
     </button>
     */}
   {/* Ordered List */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("list", "ordered")}
   >
    <FaListOl />
   </button>
   {/* Bullet List */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("list", "bullet")}
   >
    <FaListUl />
   </button>
   {/* Align Left */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("align", "left")}
   >
    <MdFormatAlignLeft />
   </button>
   {/* Align Center */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("align", "center")}
   >
    <MdFormatAlignCenter />
   </button>
   {/* Align Right */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("align", "right")}
   >
    <MdFormatAlignRight />
   </button>
   {/* Code Block */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("code")}
   >
    <HiOutlineCode />
   </button>
   {/* Superscript */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("script", "super")}
   >
    <FaSuperscript />
   </button>
   {/* Subscript */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("script", "sub")}
   >
    <FaSubscript />
   </button>
   {/* Font Family */}
   <select
    className="px-2 py-1  rounded-md"
    onChange={(e) => setFont(e.target.value)}
   >
    {fontOptions.map((font, index) => (
     <option key={index} value={font}>
      {font}
     </option>
    ))}
   </select>
   {/* Font Size */}
   <select
    className="px-2 py-1  rounded-md"
    onChange={(e) => setSize(e.target.value)}
   >
    {sizeOptions.map((size, index) => (
     <option key={index} value={size}>
      {size}
     </option>
    ))}
   </select>
  </div>
 );
};

export default Toolbar;
