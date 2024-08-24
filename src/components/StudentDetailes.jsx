import { Form, Link, useSearchParams } from "react-router-dom";
import { FakeStudent, LEVELS } from "../config";
import Button from "./ui/Button";
import { FormInput } from "lucide-react";
import { useState } from "react";
function StudentDetailes() {
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("studentId");
  const student = FakeStudent.find(el => el.code == studentId)
  const [studentName,setStudentName] = useState(student.name)
  const [studentMainLevel,setStudentMainLevel] = useState(student.mainLevel)
  const [studentSubLevel,setStudentSubLevel] = useState(student.subLevel)
  const [studentGroup,setStudentGroup] = useState(student.group)
  if (!student) return null;
  return (
    <>
        <div className="flex justify-between">
            <div>
              <h3 className="text-3xl font-almaria-bold mt-6">بيانات الطالب</h3>
              <div className="flex gap-6 mt-6 mb-8">
                <button className={`bg-[#0884A2] text-white rounded-lg w-28 h-10 text-xl font-almaria-bold`}>تعديل</button>
                <button className={`bg-[#F54547] text-white rounded-lg w-28 h-10 text-xl font-almaria-bold`}>حذف</button>
              </div>
              <form>
                <h3 className="text-lg font-almaria-bold mb-4">الاسم بالكامل</h3>
                <input type="text" className="bg-[#EFEFEF] w-[43.75rem] h-10 p-2 text-[1.125rem] rounded-lg" value={studentName} onChange={(e)=>setStudentName(e.target.value)}/>
                <div className="flex gap-10 mt-10">
                  <div>
                    <h3 className="text-lg font-almaria-bold mt-8 mb-4">المرحلة الدراسية</h3>
                    <input type="text" className="bg-[#EFEFEF] w-52 h-10 p-2 text-[1.125rem] rounded-lg" value={studentMainLevel} onChange={(e)=>setStudentMainLevel(e.target.value)}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-almaria-bold mt-8 mb-4"> الصف الدراسي</h3>
                    <input type="text" className="bg-[#EFEFEF] w-52 h-10 p-2 text-[1.125rem] rounded-lg" value={studentSubLevel} onChange={(e)=>setStudentSubLevel(e.target.value)}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-almaria-bold mt-8 mb-4"> المجموعة</h3>
                    <input type="text" className="bg-[#EFEFEF] w-52 h-10 p-2 text-[1.125rem] rounded-lg" value={studentGroup} onChange={(e)=>setStudentGroup(e.target.value)}/>
                  </div>
                </div>
              </form>

            </div>
            {/* ------------- */}
            <div>
              <div >
               <img src="../../public/imgs/id.svg" alt="Id"/>
                <div>
                  <div className="border-2 border-[#B0B0B0] rounded-b-md border-t-0 p-4 bg-[#EEEEEE]   relative   bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('../../public/imgs/id-bg.svg')" }}>

                  <div className="w-[5.625rem] h-[5.625rem] bg-[#D9D9D9] absolute left-10 top-[-2.813rem] rounded-full border-[0.313rem] border-white flex justify-center ">
                    <img src="../../public/imgs/profile.svg" alt="profile"  className="w-[50%]" />
                  </div>
                  <h2 className="text-center text-lg font-almaria-bold ">كود الطالب</h2>
                  <p className="text-center text-[#979797] text-lg mt-4 mb-6">{student.code}</p>
                  <div>
                      <div className="flex text-lg">
                       <div className="w-40 mt-2 font-almaria-bold">الاسم</div> <span className="mt-2">:</span> <div className="mt-3 mr-3 text-sm text-[#979797]">{student.name}</div>
                      </div>
                      
                      <div className="flex  text-lg">
                        <div className="w-40 mt-2 font-almaria-bold">المجموعة</div> <span className="mt-2">:</span> <div className="mt-3 mr-3 text-sm text-[#979797]">{student.group}</div>
                      </div>
                      
                      <div className="flex  text-lg">
                        <div className="w-40 mt-2 font-almaria-bold">المرحلة الدراسية</div> <span className="mt-2">:</span> <div className="mt-3 mr-3 text-sm text-[#979797]">{student.mainLevel}</div>
                      </div>
                      
                      <div className="flex  text-lg">
                        <div className="w-40 mt-2 font-almaria-bold">الصف الدراسي</div> <span className="mt-2">:</span> <div className="mt-3 mr-3 text-sm text-[#979797]">{student.subLevel}</div>

                      </div>
                      
                  </div>
                </div>

                </div>
              </div>
            </div>
            {/* ---------------------- */}
        </div>
        <div className="mt-8 flex justify-between">
          <img src="../../public/imgs/line.svg" alt="line" width={800} />
          <div>
            <div className="flex gap-2 text-lg text-[#0884A2]">
              <img src="../../public/imgs/download.svg" alt="" />
              <p><Link>تنزيل</Link></p>
            </div>
          </div>
        </div>
        {/* --------- */}
        <div className="w-[50rem]">
          <h2 className="text-2xl font-almaria-bold">بيانات ولي الامر</h2>
          <p className="text-[#979797] text-center text-xl mt-4">لا توجد بيانات لولي الأمر متاحة حاليًا.</p>
        </div>
    </>
  );
}

export default StudentDetailes;
