import Search from "./Search.jsx";
import TestFilterOperations from "./TestFilterOperations.jsx";
import EditIcon from "/public/Icons/edit_icon.svg";
import DeleteIcon from "/public/Icons/trash_icon.svg";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "./Table.jsx";
import { useNavigate } from "react-router-dom";
import { useGroupsTest } from "../Features/TeacherTests/useGroupsTest.js";
import Loading from "./Loading.jsx";

function TestsTable() {
  const { tests, isLoading, setSearch, search } = useGroupsTest();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  const handleEdit = (id) => {
    navigate(`/TDashboard/test/${id}/edit`);
  };
  const showTestResult = (id) => {
    navigate(`/TDashboard/test/${id}/details`);
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
                      <span>{test.title}</span>
                      <DeleteIcon onClick={() => showTestResult(test.id)} />
                    </div>
                  </TableCell>
                  <TableCell align="center">{test.type}</TableCell>
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
