import React, { useState } from "react";
import Profile from "../../../public/Icons/profile.svg";
import FormInput from "./ui/FormInput.jsx";
import DropList from "./ui/DropList.jsx";
import { FakeStudent, LEVELS } from "../../config.js";
import Button from "../../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";
export default function EdiStudenDetails() {
 const student = FakeStudent;
 const [studentName, setStudentName] = useState(student.name);
 const navigate = useNavigate();
 const handleButtonClick = () => {
  navigate(-1);
 };
 const [level, setLevel] = useState("");
 const [levelNumber, setLevelNumber] = useState("");
 return (
  <>
   <h2 className="text-center text-3xl font-almaria-bold mt-6">
    تعديل بيانات الطالب
   </h2>
   <div className="w-[77%] mt-16">
    <h3 className="text-2xl font-almaria-bold mb-4">الإسم رباعي</h3>
    <FormInput
     type={"text"}
     name={"name"}
     className={"w-11/12"}
     Icon={Profile}
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
    <div>
     <h3 className="text-xl font-almaria-bold mb-6"> المجموعة</h3>
     <DropList
      title={"اختر المجموعة"}
      options={[student[0].group, student[1].group]}
     />
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
