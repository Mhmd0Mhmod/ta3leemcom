import React, { useState } from "react";
import Group from "../../public/Icons/group.svg";
import FormInput from "./ui/FormInput.jsx";
import DropList from "./ui/DropList.jsx";
import { FakeStudent, LEVELS } from "../config";
import Button from "./ui/button.jsx";
import { useNavigate } from "react-router-dom";
export default function EditGroupDetails() {
 const student = FakeStudent;
 const [groupName, setGroupName] = useState(student[0].group);
 const [level, setLevel] = useState("");
 const [levelNumber, setLevelNumber] = useState("");
 const navigate = useNavigate();
 const handleButtonClick = () => {
  navigate(-1);
 };
 return (
  <>
   <h2 className="text-center text-3xl font-almaria-bold ">تعديل المجموعة</h2>
   <div className="w-[75%] mt-16">
    <h3 className="text-2xl font-almaria-bold mb-4">اسم المجموعة </h3>
    <FormInput
     type={"text"}
     name={"name"}
     className={"w-11/12"}
     Icon={Group}
     divClassName={"bg-white w-3/4 justify-around"}
    />
   </div>
   <div className="flex gap-40 mt-14 mb-40">
    <div>
     <h3 className="text-xl font-almaria-bold mb-6"> المرحلة الدراسية</h3>
     <DropList
      title={"اختر المرحلة الدراسية"}
      options={LEVELS.levels}
      value={level}
      setValue={setLevel}
      optionsValue={Object.keys(LEVELS).slice(1)}
     />
    </div>
    <div>
     <h3 className="text-xl font-almaria-bold mb-6"> الصف الدراسي</h3>
     {level === "" ? (
      <DropList
       title={"اختر الصف الدراسي"}
       options={[LEVELS.middle[0], LEVELS.middle[1], LEVELS.middle[2]]}
      />
     ) : (
      <DropList
       title={"اختر الصف الدراسي"}
       options={LEVELS[level]}
       value={levelNumber}
       setValue={setLevelNumber}
       optionsValue={LEVELS[level].map((_, i) => i + 1)}
      />
     )}
    </div>
   </div>
   <div className="w-[100%] text-center">
    <Button
     type={"outline"}
     className={"min-w-[8.75rem]  self-center h-[4.063rem]"}
     onClick={handleButtonClick}
    >
     حفظ
    </Button>
   </div>
  </>
 );
}
