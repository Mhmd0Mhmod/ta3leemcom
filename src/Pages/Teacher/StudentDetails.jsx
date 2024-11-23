import { Link, useNavigate } from "react-router-dom";
import { BiDownload } from "react-icons/bi";
import StudentID from "../../UI/StudentID.jsx";
import { useStudent } from "../../Features/Dashboard/useStudent.js";
import Loading from "../../UI/Loading.jsx";
import Heading from "../../UI/Heading.jsx";
import Button from "../../UI/Button.jsx";
import ModalWithRoutes from "../../Context/ModalWithRoutes.jsx";
import Modal from "../../Context/Modal.jsx";
import DeleteStudentWindow from "../../UI/AlertWindow.jsx";

function StudentDetails() {
  const { student, isLoading, error } = useStudent();
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error?.message}</div>;
  }
  const { name, groupName, levelName, levelYearName } = student || {};
  return (
    <div className={"space-y-5"}>
      <Heading as={"h2"} className="font-Almarai-bold">
        بيانات الطالب
      </Heading>
      <hr />
      <div className={"relative z-10 flex gap-5"}>
        <Link to="edit" className={"flex items-center justify-center rounded bg-Secondary-500 px-4 text-white"}>
          تعديل
        </Link>
        <Modal.Trigger id={"deleteStudent"}>
          <Button>حذف</Button>
        </Modal.Trigger>
        <Modal.Content id={"deleteStudent"}>
          <DeleteStudentWindow />
        </Modal.Content>
      </div>
      <div className="grid grid-cols-1 gap-40 lg:grid-cols-2">
        <div className={"order-1 space-y-8 lg:order-none"}>
          <h3 className="font-almaria-bold mb-4 text-lg">الاسم بالكامل</h3>
          <p className="w-full rounded-lg bg-gray-200 p-2 text-xl">{name}</p>
          <div className={"flex gap-5"}>
            <div className={"w-full"}>
              <h3 className="font-almaria-bold mb-4 mt-8 text-lg">المرحلة الدراسية</h3>
              <p className="rounded-lg bg-gray-200 p-2 text-xl">{levelName}</p>
            </div>
            <div className={"w-full"}>
              <h3 className="font-almaria-bold mb-4 mt-8 text-lg"> الصف الدراسي</h3>
              <p className="rounded-lg bg-gray-200 p-2 text-xl">{levelYearName}</p>
            </div>
            <div className={"w-full"}>
              <h3 className="font-almaria-bold mb-4 mt-8 text-lg"> المجموعة</h3>
              <p className="rounded-lg bg-gray-200 p-2 text-xl">{groupName}</p>
            </div>
          </div>
        </div>
        {/* ------------- */}

        <StudentID student={student} />

        {/* ---------------------- */}
      </div>
      <div className="flex justify-between">
        <hr className={"w-3/4"} />
        <div className="flex items-center gap-2 text-lg text-Secondary-100">
          <BiDownload />
          <Link>تنزيل</Link>
        </div>
      </div>
      <div>
        <h2 className="font-almaria-bold text-2xl">بيانات ولي الامر</h2>
        <p className="text-center text-xl text-gray-500">لا توجد بيانات لولي الأمر متاحة حاليًا.</p>
      </div>
    </div>
  );
}

export default StudentDetails;
