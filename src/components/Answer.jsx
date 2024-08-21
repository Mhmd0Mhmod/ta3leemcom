import { GripIcon, X } from "lucide-react";
import { useState } from "react";

export default function Answer({ value, check, onCheck, onType, index }) {
 return (
  <div className="flex gap-3 items-center font-almaria-bold w-full ">
   <X />
   <input
    type="radio"
    className="h-5 w-5"
    name="name"
    value={check}
    onChange={(e, index) => onCheck(e, index)}
   />
   <input
    type="text"
    placeholder="خيار 1"
    className="px-2 py-3 min-w-[50%]"
    value={value}
    onChange={(e, index) => onType(e, index)}
   />
   <GripIcon />
  </div>
 );
}
