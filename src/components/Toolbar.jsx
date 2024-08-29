import { color } from "framer-motion";
import {
 AlignCenter,
 AlignLeft,
 AlignRight,
 Baseline,
 Bold,
 Italic,
 List,
 ListOrdered,
 Sigma,
 Subscript,
 Superscript,
 Underline,
} from "lucide-react";
import { useState } from "react";
import PicIcon from "./../../public/Icons/pic_icon.svg";
import { Button } from "./ui/button";

const Toolbar = ({
 formatText,
 setFont,
 setSize,
 setColor,
 color,
 insertMath,
 handelQuestionImages,
}) => {
 const fontOptions = ["sans-serif", "serif", "monospace"];
 const sizeOptions = ["small", "large", "huge"];
 const commonColors = [
  "#000000", // Black
  "#FFFFFF", // White
  "#FF0000", // Red
  "#0000FF", // Blue
  "#00FF00", // Green
  "#808080", // Gray
  "#FFFF00", // Yellow
 ];

 const [showColorPicker, setShowColorPicker] = useState(false);

 return (
  <div
   id="toolbar"
   className="ltr flex gap-4  mb-10 bg-white rounded-xl px-6 py-2 relative"
  >
   {/* Math Equation Button */}
   {/* <button className="px-2 py-1 bg-gray-300 rounded-md" onClick={openMathModal}>
    Math
   </button> */}

   <div
    className={`absolute flex gap-2  bg-white px-3 py-2 rounded-lg  left-0 border transition-all duration-300  ${
     showColorPicker ? "-top-12 opacity-100" : "-top-8 opacity-0"
    }`}
   >
    {commonColors.map((c, index) => (
     <button
      onClick={() => {
       setColor(c);
       setShowColorPicker(false);
      }}
      key={index}
      className={`h-6 w-6 rounded-full cursor-pointer ring-2 ring-gray-300 borcer-2 border-transparent ${
       c === color ? "ring-blue-500 ring-3 ring-offset-1" : ""
      }`}
      style={{
       backgroundColor: c,
      }}
     ></button>
    ))}
   </div>

   <button
    className="px-1 py-1  rounded-md flex items-center justify-center"
    onClick={() => setShowColorPicker(!showColorPicker)}
   >
    <Baseline />
   </button>
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("bold")}
   >
    <Bold />
   </button>
   {/* Italic */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("italic")}
   >
    <Italic />
   </button>
   {/* Underline */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("underline")}
   >
    <Underline />
   </button>
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("script", "super")}
   >
    <Superscript />
   </button>
   {/* Subscript */}
   <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("script", "sub")}
   >
    <Subscript />
   </button>
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
   {/* <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("list", "ordered")}
   >
    <ListOrdered />
   </button> */}
   {/* Bullet List */}
   {/* <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("list", "bullet")}
   >
    <List />
   </button> */}
   {/* Align Left */}
   {/* <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("align", "left")}
   >
    <AlignLeft />
   </button> */}
   {/* Align Center */}
   {/* <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("align", "center")}
   >
    <AlignCenter />
   </button> */}
   {/* Align Right */}
   {/* <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("align", "right")}
   >
    <AlignRight />
   </button> */}
   {/* Code Block */}
   {/* <button
    className="px-2 py-1  rounded-md flex items-center justify-center"
    onClick={() => formatText("code")}
   >
    <HiOutlineCode />
   </button> */}
   {/* Superscript */}
   {/* Font Family */}
   {/* <select
    className="px-2 py-1  rounded-md"
    onChange={(e) => setFont(e.target.value)}
   >
    {fontOptions.map((font, index) => (
     <option key={index} value={font}>
      {font}
     </option>
    ))}
   </select> */}
   {/* Font Size */}
   <select
    className="px-2 py-1  rounded-md border border-gray-300"
    onChange={(e) => setSize(e.target.value)}
   >
    {sizeOptions.map((size, index) => (
     <option key={index} value={size}>
      {size}
     </option>
    ))}
   </select>
   <input
    type="file"
    hidden
    id="q_pic"
    onChange={(e) => {
     // handel images with cloud service
     handelQuestionImages(e.target.files);
    }}
    multiple
   />
   <label htmlFor="q_pic">
    <Button variant="outline" size="icon" className="p-1" asChild>
     <PicIcon />
    </Button>
   </label>
  </div>
 );
};

export default Toolbar;
