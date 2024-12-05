import { TableCell, TableRow } from "./Table.jsx";
import EditIcon from "/public/Icons/edit_icon.svg";
import DeleteIcon from "/public/Icons/trash_icon.svg";

import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Context/Modal.jsx";
import AlertWindow from "./AlertWindow.jsx";
import toast from "react-hot-toast";
import { useDeleteTest } from "../Features/TeacherTests/useDeleteTest.js";
import { translateToArabic } from "../Config/config.js";
import { isAfter, isBefore } from "date-fns";
function TeacherTestRow({ test }) {
  const { id, title, type, startDate, endDate } = test;

  const { deleteTest, isPending, error } = useDeleteTest();
  const { levelYearId } = useParams();
  const navigate = useNavigate();

  let testStatus = "";
  if (isBefore(new Date(), new Date(startDate))) {
    testStatus = "notStarted";
  } else if (isAfter(new Date(), new Date(endDate))) {
    testStatus = "ended";
  } else {
    testStatus = "started";
  }

  const handleDelete = () => {
    deleteTest(id, {
      onSuccess: () => {
        toast.success("تم حذف الاختبار بنجاح");
      },
      onError: () => {
        toast.error("حدث خطأ");
      },
    });
  };
  const handleEdit = () => {
    if (testStatus === "started") return toast.error("لا يمكن تعديل الاختبار وهو قيد التقديم");
    navigate(`/TDashboard/test/${levelYearId}/${id}/edit`);
  };
  const showTestResult = () => {
    navigate(`/TDashboard/test/${id}/results`);
  };
  function formatArabicDate(date) {
    return Intl.DateTimeFormat("ar-EG").format(new Date(date));
  }

  return (
    <TableRow className={(testStatus === "started" && "bg-green-400 hover:bg-green-400") || (testStatus === "notStarted" && "bg-gray-300 hover:!bg-gray-300")}>
      <TableCell>
        <div className={"flex w-full justify-between"}>
          <EditIcon onClick={handleEdit} />
          <span className="flex-grow text-center" onClick={showTestResult}>
            {title}
          </span>
          {testStatus !== "started" ? (
            <>
              <Modal.Trigger id={`test-${id}`}>
                <DeleteIcon />
              </Modal.Trigger>
              <Modal.Content id={`test-${id}`}>
                <AlertWindow title={"حذف الاختبار"} description={"هل تريد حذف الاختبار؟"} onConfirm={handleDelete} disabled={isPending} />
              </Modal.Content>
            </>
          ) : (
            <DeleteIcon onClick={() => toast.error("  لا يمكن حذف الاختبار وهو قيد التقديم")} />
          )}
        </div>
      </TableCell>
      <TableCell align="center">{translateToArabic(type)}</TableCell>
      <TableCell align="center">{formatArabicDate(startDate)}</TableCell>
    </TableRow>
  );
}
export default TeacherTestRow;
