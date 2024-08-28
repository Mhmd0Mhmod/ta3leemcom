import { useEffect, useState } from "react";

const COLORS = [
 "#000000", // Black
 "#FF0000", // Red
 "#00FF00", // Green
 "#0000FF", // Blue
 "#FFFF00", // Yellow
 "#FFA500", // Orange
 "#800080", // Purple
];

const ColorPickerButton = ({ editor }) => {
 const [color, setColor] = useState("#000000");
 const [showColorPicker, setShowColorPicker] = useState(false);

 const handleColorChange = (e) => {
  const newColor = e.target.value;
  setColor(newColor); // Update local state
  editor.chain().focus().setColor(newColor).run(); // Apply color to editor
 };

 useEffect(() => {
  setColor(editor.getAttributes("textStyle").color || "#000000");
 }, [editor.getAttributes("textStyle").color]);

 return (
  <div className="relative inline-block text-left">
   <button
    type="button"
    onClick={() => setShowColorPicker((prev) => !prev)}
    className={`relative p-3 rounded-full text-white shadow-md focus:outline-none ${
     color ? "ring-2 ring-offset-2 ring-indigo-500" : ""
    }`}
    style={{ backgroundColor: color }}
   >
    <div
     className={`flex flex-row-reverse gap-2 bg-white px-4 py-2 rounded-xl absolute left-[50%] -translate-x-[50%]  transition-all duration-500 ${
      showColorPicker
       ? "opacity-100 -translate-y-[180%]"
       : "opacity-0 -translate-y-[120%]"
     } `}
    >
     {COLORS.map((cl) => (
      <button
       key={cl}
       type="button"
       className={`w-6 h-6 rounded-full shadow-md focus:outline-none      ${
        cl === color ? "ring-2 ring-offset-2 ring-indigo-500" : ""
       }
`}
       style={{ backgroundColor: cl }}
       onClick={() => {
        setColor(color);
        editor.chain().focus().setColor(cl).run();
       }}
      ></button>
     ))}
    </div>
   </button>
   <input
    value={color}
    type="color"
    id="colorInput"
    className="hidden"
    onChange={handleColorChange}
   />
  </div>
 );
};

export default ColorPickerButton;
