import Profile from "../../public/Icons/profile.svg"
import {FakeGroups, LEVELS, Student} from "@/config.js";
import FormInput from "@/components/ui-local/FormInput.jsx";

function StudentProfile() {
    const student = Student;
    return (
        <div className={"p-10 flex flex-col gap-20"}>
            <div className={"flex items-center gap-10  "}>
                {/*<img src={Profile} alt={"User Picture"}/>*/}
                <Profile width={95} height={95} className={"rounded-full bg-accent-l-700 p-2"}/>
                <p className={"text-2xl "}>{student.name}</p>
            </div>
            <div className={"flex flex-col font-almaria-bold gap-4 w-3/4" }>
                <div className={"flex flex-col gap-4"}>
                    <label htmlFor="" className={"text-xl"}> الاسم بالكامل </label>
                    <input disabled name={"name"} value={student.name} className={"bg-[#EFEFEF] p-4 rounded cursor-not-allowed"} />
                </div>

                <div className={"flex flex-col gap-4"}>
                    <label htmlFor="" className={"text-xl"}> الكود </label>
                    <input disabled name={"name"} value={student.id} className={"bg-[#EFEFEF] p-4 rounded cursor-not-allowed"} />
                </div>
                <div className={"grid grid-cols-3 gap-4 "}>
                    <div className={"flex flex-col gap-4"}>
                        <label htmlFor="" className={"text-xl"}> المرحله الدراسيه </label>
                        <input disabled name={"name"} value={student.level} className={"bg-[#EFEFEF] p-4 rounded cursor-not-allowed"}/>
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <label htmlFor="" className={"text-xl"}> الصف الدراسي </label>
                        <input disabled name={"name"} value={`${student.subLevel} ${student.level.split(" ").at(1)}`} className={"bg-[#EFEFEF] p-4 rounded cursor-not-allowed"}/>
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <label htmlFor="" className={"text-xl"}> االمجموعه </label>
                        <input disabled name={"name"} value={FakeGroups.find(el=>el.id===student.groupId).name} className={"bg-[#EFEFEF] p-4 rounded cursor-not-allowed"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;