import Heading from "./ui/Heading.jsx";
import FormInput from "./ui/FormInput.jsx";
import Group from "../../public/Icons/group.svg";
import DropList from "./ui/DropList.jsx";
import Button from "./ui/Button.jsx";
import { useState } from "react";
import { LEVELS } from "../config.js";

function AddGroup() {
  const [level, setLevel] = useState("");
  const [levelNumber, setLevelNumber] = useState("");
  const { levels, primary, middle, high } = LEVELS;
  return (
    <div className={"font-almaria"}>
      <Heading as={"h1"} className={"text-center  font-almaria-bold"}>
        إنشاء مجموعة جديدة
      </Heading>
      <div className={"flex gap-10 flex-col mt-10 font-cairo-bold"}>
        <Heading as={"h4"} className={"text-[24px]"}>
          اسم المجموعة
        </Heading>
        <FormInput type={"text"} name={"name"} className={"w-11/12"} icon={Group} divClassName={"bg-white w-3/4 justify-around"} />
        <div className={"grid grid-cols-3"}>
          <div className={"flex flex-col gap-5"}>
            <Heading as={"h4"}>المرحلة الدراسية</Heading>
            <DropList title={"اختر المرحلة الدراسية"} options={levels} value={level} setValue={setLevel} optionsValue={Object.keys(LEVELS).slice(1)} />
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
        </div>
        <Button type={"outline"} className={"w-fit mt-40 self-center"}>
          اضافة
        </Button>
      </div>
    </div>
  );
}

export default AddGroup;
