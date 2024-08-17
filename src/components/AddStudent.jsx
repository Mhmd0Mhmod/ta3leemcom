import Heading from "./ui/Heading.jsx";
import FormInput from "./ui/FormInput.jsx";
import profile from "../../public/Icons/profile.svg";
import DropList from "./ui/DropList.jsx";
import Button from "./ui/Button.jsx";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import StudentDetailes from "./StudentDetailes.jsx";

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
              options={["الابتدائيه", "الاعداديه", "الثانويه"]}
              value={level}
              setValue={setLevel}
              optionsValue={["primary", "middle", "high"]}
            />
          </div>
          <div className={"flex flex-col gap-5"}>
            <Heading as={"h4"}>الصف الدراسي</Heading>
            {level === "primary" && (
              <DropList
                title={"اختر الصف الدراسي"}
                options={[
                  "الصف الاول",
                  "الصف الثاني",
                  "الصف الثالث",
                  "الصف الرابع",
                  "الصف الخامس",
                  "الصف السادس",
                ]}
                value={levelNumber}
                setValue={setLevelNumber}
                optionsValue={[1, 2, 3, 4, 5, 6]}
              />
            )}
            {level === "middle" && (
              <DropList
                title={"اختر الصف الدراسي"}
                options={["الصف الاول", "الصف الثاني", "الصف الثالث"]}
                value={levelNumber}
                setValue={setLevelNumber}
                optionsValue={[1, 2, 3]}
              />
            )}
            {level === "high" && (
              <DropList
                title={"اختر الصف الدراسي"}
                options={["الصف الاول", "الصف الثاني", "الصف الثالث"]}
                value={levelNumber}
                setValue={setLevelNumber}
                optionsValue={[1, 2, 3]}
              />
            )}
            {level === "" && <DropList title={"اختر الصف الدراسي"} options={[]} />}
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
