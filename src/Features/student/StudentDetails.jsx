import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import EdiStudentDetails from './EditStudentDetails.jsx';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

function StudentDetails({ studentData }) {
  const [student, setStudent] = useState(studentData);
  const [studentName, setStudentName] = useState('');
  const [studentMainLevel, setStudentMainLevel] = useState('');
  const [studentSubLevel, setStudentSubLevel] = useState('');
  const [studentGroup, setStudentGroup] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: studentId } = useParams();

  const token = Cookies.get('_auth');
  const id = studentId || searchParams.get('studentId');
  const navigate = useNavigate();

  const getStudent = async () => {
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
  };

  useEffect(() => {
    if (student) return;
    getStudent();
  }, []);

  useEffect(() => {
    if (student) {
      setStudentDetails(student);
    }
  }, [student]);

  function setStudentDetails(data) {
    setStudentName(data.name);
    setStudentMainLevel(data.levelName);
    setStudentSubLevel(data.levelYearName);
    setStudentGroup(data.groupName);
  }

  const deleteStudent = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/Student?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '/',
        },
      });
      toast.success('تم حذف الطالب بنجاح', { id: 'msg' });
      navigate('/dashboard/addStudent', { replace: true, state: { isDeleted: true } });
    } catch (error) {
      toast.error('حدث خطأ', { id: 'msg' });
    }
  };

  if (!student) {
    return null;
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
            <AlertDialog>
              <AlertDialogTrigger className={`h-10 w-28 rounded-lg bg-[#F54547] font-almaria-bold text-xl text-white`}>حذف</AlertDialogTrigger>
              <AlertDialogContent className={'!min-h-[10vh] w-[450px] max-w-full rounded-xl'}>
                <AlertDialogHeader className={'!text-right'}>
                  <AlertDialogTitle className="my-4 text-center text-3xl font-extrabold">
                    <p className="relative mb-4 flex justify-center">
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <svg width="40" height="33" viewBox="0 0 40 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M39.4285 26.922L23.8132 2.22555C23.423 1.6205 22.8659 1.11882 22.1972 0.77024C21.5285 0.421659 20.7714 0.238281 20.0009 0.238281C19.2304 0.238281 18.4733 0.421659 17.8046 0.77024C17.1359 1.11882 16.5788 1.6205 16.1886 2.22555L0.573315 26.922C0.197863 27.5072 0 28.1728 0 28.8506C0 29.5284 0.197863 30.194 0.573315 30.7792C0.958528 31.3879 1.51464 31.8923 2.18459 32.2407C2.85454 32.5891 3.6142 32.7688 4.38562 32.7615H35.6162C36.387 32.7682 37.1459 32.5882 37.8152 32.2399C38.4844 31.8915 39.04 31.3874 39.4249 30.7792C39.8009 30.1943 39.9994 29.5288 40 28.851C40.0006 28.1733 39.8034 27.5075 39.4285 26.922ZM18.5724 13.2476C18.5724 12.9026 18.7229 12.5717 18.9908 12.3277C19.2587 12.0838 19.622 11.9467 20.0009 11.9467C20.3798 11.9467 20.7431 12.0838 21.011 12.3277C21.2789 12.5717 21.4294 12.9026 21.4294 13.2476V19.7523C21.4294 20.0973 21.2789 20.4282 21.011 20.6722C20.7431 20.9161 20.3798 21.0532 20.0009 21.0532C19.622 21.0532 19.2587 20.9161 18.9908 20.6722C18.7229 20.4282 18.5724 20.0973 18.5724 19.7523V13.2476ZM20.0009 27.5578C19.5771 27.5578 19.1628 27.4434 18.8104 27.2289C18.4581 27.0145 18.1834 26.7097 18.0212 26.3532C17.8591 25.9966 17.8166 25.6043 17.8993 25.2257C17.982 24.8472 18.1861 24.4995 18.4857 24.2266C18.7854 23.9537 19.1672 23.7678 19.5829 23.6925C19.9985 23.6172 20.4293 23.6559 20.8209 23.8036C21.2124 23.9513 21.5471 24.2014 21.7825 24.5223C22.018 24.8432 22.1436 25.2205 22.1436 25.6064C22.1436 26.124 21.9179 26.6203 21.516 26.9863C21.1142 27.3522 20.5692 27.5578 20.0009 27.5578Z"
                            fill="#F34257"
                          />
                        </svg>
                      </span>
                      <svg width="80" height="75" viewBox="0 0 80 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="40" cy="37.5" rx="40" ry="37.5" fill="#FEF5F6" />
                      </svg>
                    </p>
                    <span>تأكيد حذف الطالب</span>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-lg">ستؤدي هذه العملية إلى إزالة جميع البيانات المتعلقة بالطالب نهائيًا. هل أنت متأكد؟</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className={'mt-4 !justify-between gap-4'}>
                  <AlertDialogAction className="p-5" style={{ width: '100%', padding: '10px', borderRadius: '20px' }} onClick={deleteStudent}>
                    نعم، حذف!
                  </AlertDialogAction>
                  <AlertDialogCancel className="p-5" style={{ width: '100%', padding: '10px', borderRadius: '20px' }}>
                    لا، إلغاء
                  </AlertDialogCancel>
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
