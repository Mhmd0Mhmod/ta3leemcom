// import { User } from "lucide-react";

import Heading from "./ui-local/Heading";

export default function InstructionItem({ title, desc, icon }) {
 return (
  <div className="flex items-center shadow-[#feeedc] shadow-lg max-w-fit rounded-xl px-6 py-4">
   <div className="bg-primary w-fit p-2 rounded-full">
    <span>{icon}</span>
   </div>
   <div className="font-almaria flex flex-col gap-2 justify-between px-12">
    <Heading as={"h5"} className="text-primary-l">
     {title}
    </Heading>
    <p className="text-sm font-almaria-light">{desc}</p>
   </div>
  </div>
 );
}
