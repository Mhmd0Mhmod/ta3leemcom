import Search from "./Search.jsx";
import TestFilterOperations from "./TestFilterOperations.jsx";
import { Table, TableBody, TableHead, TableHeadCell } from "./Table.jsx";
import { useGroupsTest } from "../Features/TeacherTests/useGroupsTest.js";
import Loading from "./Loading.jsx";

import TeacherTestRow from "./TeacherTestRow.jsx";

function TestsTable() {
  const { tests, isLoading, setSearch, search } = useGroupsTest();

  if (isLoading) return <Loading />;

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
                <TeacherTestRow key={test.id} test={test} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default TestsTable;
