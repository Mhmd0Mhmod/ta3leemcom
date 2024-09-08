import Heading from "./ui-local/Heading.jsx";
import FormInput from "./ui-local/FormInput.jsx";
import profile from "../../public/Icons/profile.svg";
import DropList from "./ui-local/DropList.jsx";
import Button from "./ui-local/Button.jsx";
import { useState } from "react";

import { useSearchParams } from "react-router-dom";
import StudentDetailes from "./StudentDetailes.jsx";
import { LEVELS } from "../config.js";

function AddStudent() {
 const [searchParam, setSearchParmas] = useSearchParams();
 const [level, setLevel] = useState("");
 const [levelNumber, setLevelNumber] = useState("");
 if (searchParam.get("studentId")) return <StudentDetailes />;

 return (
  <div className={"font-almaria"}>
   <Heading as={"h1"} className={"text-center  font-almaria-bold"}>
    بيانات الطالب
   </Heading>
   <div className={"flex gap-10 flex-col mt-10 font-cairo-bold"}>
    <Heading as={"h4"} className={"text-[24px]"}>
     الإسم رباعي
    </Heading>
    <FormInput
     type={"text"}
     name={"name"}
     className={"w-11/12"}
     icon={profile}
     divClassName={"bg-white w-3/4 justify-around"}
    />
    <div className={"grid grid-cols-3"}>
     <div className={"flex flex-col gap-5"}>
      <Heading as={"h4"}>المرحلة الدراسية</Heading>
      <DropList
       title={"اختر المرحلة الدراسية"}
       options={LEVELS.levels}
       value={level}
       setValue={setLevel}
       optionsValue={Object.keys(LEVELS).slice(1)}
      />
     </div>
     <div className={"flex flex-col gap-5"}>
      <Heading as={"h4"}>الصف الدراسي</Heading>

      {level === "" ? (
       <DropList title={"اختر الصف الدراسي"} options={[]} />
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
     <div className={"flex flex-col gap-5"}>
      <Heading as={"h4"}>المجموعة</Heading>
      <DropList title={"اختر المجموعة"} options={[]} />
     </div>
    </div>
    <Button
     type={"outline"}
     className={"w-fit mt-40 self-center"}
     onClick={() => {
      setSearchParmas({ tab: "addStudent", studentId: 1 });
     }}
    >
     اضافة
    </Button>
   </div>
  </div>
 );
}

export default AddStudent;
