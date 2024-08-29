import React from "react";

export default function Tooltip({ children, text }) {
 return (
  <div className="relative">
   <div className="absolute min-w-32 bg-black text-white px-6 py-2 rounded-lg">
    <p>{text}</p>
   </div>
   {children}
  </div>
 );
}
