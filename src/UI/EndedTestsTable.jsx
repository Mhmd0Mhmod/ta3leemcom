import { compareAsc, parseISO } from "date-fns";
import EndedTestRow from "./EndedTestRow";
import { Table, TableBody, TableHead, TableHeadCell } from "./Table";

function EndedTestsTable({ tests }) {
  const sortedTests = tests.sort((a, b) => compareAsc(parseISO(a.startDate), parseISO(b.startDate)));

  return (
    <div className="overflow-auto">
      <Table className="w-full min-w-[50rem] whitespace-nowrap">
        <TableHead>
          <TableHeadCell>اسم الاختبار</TableHeadCell>
          <TableHeadCell>الدرجة</TableHeadCell>
          <TableHeadCell>الحاله</TableHeadCell>
          <TableHeadCell>نوع الاختبار</TableHeadCell>
          <TableHeadCell>التاريخ</TableHeadCell>
        </TableHead>
        <TableBody>
          {sortedTests.map((test) => (
            <EndedTestRow test={test} key={test.quizId} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default EndedTestsTable;
