import Search from "./Search.jsx";
import TestFilterOperations from "./TestFilterOperations.jsx";
import EditIcon from "/public/Icons/edit_icon.svg";
import DeleteIcon from "/public/Icons/trash_icon.svg";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "./Table.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGroupsTest } from "../Features/TeacherTests/useGroupsTest.js";
import Loading from "./Loading.jsx";
import Modal from "../Context/Modal.jsx";
import AlertWindow from "./AlertWindow.jsx";
import toast from "react-hot-toast";
import { useDeleteTest } from "../Features/TeacherTests/useDeleteTest.js";
import { translateToArabic } from "../Config/config.js";

function TestsTable() {
  const { tests, isLoading, setSearch, search } = useGroupsTest();
  const { deleteTest, isPending, error } = useDeleteTest();
  const { levelYearId } = useParams();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  const handleDelete = (id) => {
    deleteTest(id, {
      onSuccess: () => {
        toast.success("تم حذف الاختبار بنجاح");
      },
      onError: () => {
        toast.error("حدث خطأ");
      },
    });
  };
  const handleEdit = (id) => {
    navigate(`/TDashboard/test/${levelYearId}/${id}/edit`);
  };
  const showTestResult = (id) => {
    navigate(`/TDashboard/test/${id}/results`);
  };
  function formatArabicDate(date) {
    return Intl.DateTimeFormat("ar-EG").format(new Date(date));
  }

  return (
    <>
      <div className={"flex max-h-screen w-full flex-wrap items-center gap-10 xl:w-10/12"}>
        <Search search={search} placeholder={"اسم الاختبار"} setSearch={setSearch} className={"flex-grow"} />
        <TestFilterOperations />
        <div className="h-96 w-full overflow-auto">
          <Table>
            <TableHead className={"sticky top-0"}>
              <TableHeadCell>الاسم الاختبار</TableHeadCell>
              <TableHeadCell>نوع الاختبار</TableHeadCell>
              <TableHeadCell>التاريخ</TableHeadCell>
            </TableHead>
            <TableBody>
              {tests?.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>
                    <div className={"flex w-full justify-between"}>
                      <EditIcon onClick={() => handleEdit(test.id)} />
                      <span onClick={() => showTestResult(test.id)}>{test.title}</span>
                      <Modal.Trigger id={`test-${test.id}`}>
                        <DeleteIcon />
                      </Modal.Trigger>
                      <Modal.Content id={`test-${test.id}`}>
                        <AlertWindow title={"حذف الاختبار"} description={"هل تريد حذف الاختبار؟"} onConfirm={() => handleDelete(test.id)} disabled={isPending} />
                      </Modal.Content>
                    </div>
                  </TableCell>
                  <TableCell align="center">{translateToArabic(test.type)}</TableCell>
                  <TableCell align="center">{formatArabicDate(test.startDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default TestsTable;
