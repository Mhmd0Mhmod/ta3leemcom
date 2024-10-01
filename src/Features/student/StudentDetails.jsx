import {  Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import toast from "react-hot-toast";
import EdiStudentDetails from "./EditStudentDetails.jsx";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

function StudentDetails({studentData}) {
  const [student, setStudent] = useState(studentData)
  const [studentName, setStudentName] = useState("");
  const [studentMainLevel,setStudentMainLevel] = useState( "");
  const [studentSubLevel,setStudentSubLevel] = useState( "");
  const [studentGroup,setStudentGroup] = useState("");
  const [searchParams, setSearchParams] = useSearchParams()
  
  const token = Cookies.get('_auth');
  const id = searchParams.get("studentId")
  const navigate = useNavigate();

  
  const getStudent = async() => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/Student/GetStudent?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(data);
        setStudentDetails(data);
      } catch (error) {
        navigate('/dashboard/addStudent', { replace: true });
      }
  } 

    useEffect(() => {
      if (student) return;
      getStudent();
    }, []);

    useEffect(()=> {
      if(student) {
        setStudentDetails(student);
      }
    }, [student])

  function setStudentDetails(data) {
    setStudentName(data.name);
    setStudentMainLevel(data.levelName);
    setStudentSubLevel(data.levelYearName);
    setStudentGroup(data.groupName);
  }

  
  const deleteStudent = async() => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/Student?id=${id}` , {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "/"
          },
        });
        toast.success('تم حذف الطالب بنجاح', { id: 'msg' });
        navigate("/dashboard/addStudent", {replace: true});
      } catch (error) {
        toast.error('حدث خطأ', { id: 'msg' });
      }
  }
  

  if (!student) {
    return null
  }
  
  if (searchParams.get('editStudent')) {
    return <EdiStudentDetails student={student} setStudent={setStudent} />;
  }

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="mt-6 font-almaria-bold text-3xl">بيانات الطالب</h3>
          <div className="mb-8 mt-6 flex gap-6">
            <button onClick={() => setSearchParams({ studentId: student.id, editStudent: 'true' })} className={`flex h-10 w-28 items-center justify-center rounded-lg bg-[#0884A2] font-almaria-bold text-xl text-white`}>
              تعديل
            </button>
            {/* <button className={`h-10 w-28 rounded-lg bg-[#F54547] font-almaria-bold text-xl text-white`} onClick={deleteStudent}>
              حذف
            </button> */}
            <AlertDialog>
              <AlertDialogTrigger className={`h-10 w-28 rounded-lg bg-[#F54547] font-almaria-bold text-xl text-white`}>حذف</AlertDialogTrigger>
              <AlertDialogContent className={'!min-h-[10vh] w-1/5 rounded-xl'}>
                <AlertDialogHeader className={'!text-right'}>
                  <AlertDialogTitle className="text-xl">تأكيد حذف الطالب</AlertDialogTitle>
                  <AlertDialogDescription className="text-lg">ستؤدي هذه العملية إلى إزالة جميع البيانات المتعلقة بالطالب نهائيًا. هل أنت متأكد؟</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className={'!justify-between'}>
                  <AlertDialogAction onClick={deleteStudent}>نعم، حذف!</AlertDialogAction>
                  <AlertDialogCancel>لا، إلغاء</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <form>
            <h3 className="mb-4 font-almaria-bold text-lg">الاسم بالكامل</h3>
            <input type="text" disabled className="h-10 w-[43.75rem] rounded-lg bg-[#EFEFEF] p-2 text-[1.125rem]" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
            <div className="mt-10 flex gap-10">
              <div>
                <h3 className="mb-4 mt-8 font-almaria-bold text-lg">المرحلة الدراسية</h3>
                <input type="text" disabled className="h-10 w-52 rounded-lg bg-[#EFEFEF] p-2 text-[1.125rem]" value={studentMainLevel} onChange={(e) => setStudentMainLevel(e.target.value)} />
              </div>
              <div>
                <h3 className="mb-4 mt-8 font-almaria-bold text-lg"> الصف الدراسي</h3>
                <input type="text" disabled className="h-10 w-52 rounded-lg bg-[#EFEFEF] p-2 text-[1.125rem]" value={studentSubLevel} onChange={(e) => setStudentSubLevel(e.target.value)} />
              </div>
              <div>
                <h3 className="mb-4 mt-8 font-almaria-bold text-lg"> المجموعة</h3>
                <input type="text" disabled className="h-10 w-52 rounded-lg bg-[#EFEFEF] p-2 text-[1.125rem]" value={studentGroup} onChange={(e) => setStudentGroup(e.target.value)} />
              </div>
            </div>
          </form>
        </div>
        {/* ------------- */}
        <div>
          <div>
            <img src="../../../public/imgs/id.svg" alt="Id" />
            <div>
              <div className="relative rounded-b-md border-2 border-t-0 border-[#B0B0B0] bg-[#EEEEEE] bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: "url('../../public/imgs/id-bg.svg')" }}>
                <div className="absolute left-10 top-[-2.813rem] flex h-[5.625rem] w-[5.625rem] justify-center rounded-full border-[0.313rem] border-white bg-[#D9D9D9]">
                  <img src="../../../public/imgs/profile.svg" alt="profile" className="w-[50%]" />
                </div>
                <h2 className="text-center font-almaria-bold text-lg">كود الطالب</h2>
                <p className="mb-6 mt-4 text-center text-lg text-[#979797]">{student?.code}</p>
                <div>
                  <div className="flex text-lg">
                    <div className="mt-2 w-40 font-almaria-bold">الاسم</div> <span className="mt-2">:</span> <div className="mr-3 mt-3 text-sm text-[#979797]">{student?.name}</div>
                  </div>

                  <div className="flex text-lg">
                    <div className="mt-2 w-40 font-almaria-bold">المجموعة</div> <span className="mt-2">:</span> <div className="mr-3 mt-3 text-sm text-[#979797]">{student?.groupName}</div>
                  </div>

                  <div className="flex text-lg">
                    <div className="mt-2 w-40 font-almaria-bold">المرحلة الدراسية</div> <span className="mt-2">:</span> <div className="mr-3 mt-3 text-sm text-[#979797]">{student?.levelName}</div>
                  </div>

                  <div className="flex text-lg">
                    <div className="mt-2 w-40 font-almaria-bold">الصف الدراسي</div> <span className="mt-2">:</span> <div className="mr-3 mt-3 text-sm text-[#979797]">{student?.levelYearName}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ---------------------- */}
      </div>
      <div className="mt-8 flex justify-between">
        <img src="../../../public/imgs/line.svg" alt="line" width={800} />
        <div>
          <div className="flex gap-2 text-lg text-[#0884A2]">
            <img src="../../../public/imgs/download.svg" alt="" />
            <p>
              <Link>تنزيل</Link>
            </p>
          </div>
        </div>
      </div>
      {/* --------- */}
      <div className="w-[50rem]">
        <h2 className="font-almaria-bold text-2xl">بيانات ولي الامر</h2>
        <p className="mt-4 text-center text-xl text-[#979797]">لا توجد بيانات لولي الأمر متاحة حاليًا.</p>
      </div>
    </>
  );
}

export default StudentDetails;
