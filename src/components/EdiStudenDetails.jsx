import React, { useState } from "react";
import profile from "../../public/Icons/profile.svg";
import FormInput from "./ui/FormInput.jsx";
import DropList from "./ui/DropList.jsx";
import { FakeStudent, LEVELS } from "../config";
import Button from "./ui/Button.jsx";
export default function EdiStudenDetails() {
    const student = FakeStudent
    const [studentName,setStudentName] = useState(student.name)

    const [level, setLevel] = useState("");
    const [levelNumber, setLevelNumber] = useState("");
    return (
        <>
        <h2 className="text-center text-3xl font-almaria-bold mt-6">
            تعديل بيانات الطالب
        </h2>
        <div className="w-[45%]">
            <h3 className="text-2xl font-almaria-bold mb-4">الإسم رباعي</h3>
            <FormInput
            type={"text"}
            name={"name"}
            icon={profile}
            className={ "text-xl "}
            value={studentName} onChange={(e)=>setStudentName(e.target.value)}
            />
        </div>
        <div className="flex gap-40 mt-4 mb-40">
            <div>
            <h3 className="text-xl font-almaria-bold mb-4"> المرحلة الدراسية</h3>
            <DropList
                title={"اختر المرحلة الدراسية"}
                options={LEVELS.levels}
                value={level}
                setValue={setLevel}
                optionsValue={Object.keys(LEVELS).slice(1)}
            />
            </div>
            <div>
                <h3 className="text-xl font-almaria-bold mb-4"> الصف الدراسي</h3>
                {level === "" ? (
                    <DropList title={"اختر الصف الدراسي"} options={[LEVELS.middle[0] , LEVELS.middle[1] , LEVELS.middle[2]]} />
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
                <h3 className="text-xl font-almaria-bold mb-4"> المجموعة</h3>
                <DropList title={"اختر المجموعة"} options={[student[0].group , student[1].group]} />
            </div>
        </div>
        <div className="w-[100%] text-center mb-40">
            <Button
                    type={"outline"}
                    className={"w-fit  self-center"}
                >
                حفظ
            </Button>
        </div>
        </>
    );
    }
