import Table from '@/UI-Global/Table/Table.jsx';
import THead from '@/UI-Global/Table/THead.jsx';
import TR from '@/UI-Global/Table/TR.jsx';
import TH from '@/UI-Global/Table/TH.jsx';
import TBody from '@/UI-Global/Table/TBody.jsx';
import TD from '@/UI-Global/Table/TD.jsx';
import TrashIcon from '/public/Icons/trash_icon.svg';
import EditIcon from '/public/Icons/edit_icon.svg';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DeleteConfirmation } from '@/components/DeleteConfirmation';
import { createContext, useContext, useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Link, useParams } from 'react-router-dom';
import FilterTests from './FilterTests';
import { deleteTest, fetchTests } from '../helpers';

const TableContext = createContext();
function TestsTable() {
  const { groupsId } = useParams();
  const [tests, setTests] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [filteredTests, setFilteredTests] = useState([]);
  const authHeader = useAuthHeader();
  useEffect(() => {
    fetchTests(groupsId, authHeader).then((data) => {
      setTests(data);
      setFilteredTests(data);
    });
  }, [authHeader, groupsId]);

  return (
    <TableContext.Provider
      value={{
        tests,
        setTests,
        filteredTests,
        setFilteredTests,
      }}
    >
      <FilterTests />
      <div className="my-12">
        <Table className="bg-accent-1000 min-w-full border-collapse border-spacing-2 rounded-lg text-center">
          <THead className="pl-4 pr-2">
            <TR className="mb-3 rounded-xl bg-accent-l-1000">
              <TH className="bg-accent-1000 rounded-tr-lg border-l border-[#D9D9D9] px-6 py-3 text-center text-black">اسم الاختبار</TH>
              <TH className="bg-accent-1000 border-l border-[#D9D9D9] px-6 py-3 text-center text-black">نوع الاختبار</TH>
              <TH className="bg-accent-1000 rounded-tl-lg px-6 py-3 text-center text-black">التاريخ</TH>
            </TR>
          </THead>
          <TBody className="max-h-[500px] overflow-y-scroll px-2">
            {filteredTests?.length > 0 ? (
              filteredTests?.map((test) => (
                <TR key={test.id} className="group mb-1 cursor-pointer">
                  <DeleteConfirmation open={showDelete} setOpen={setShowDelete} onDelete={deleteTest} />
                  <TD className="flex gap-4 rounded-br-xl rounded-tr-xl border-l bg-white px-6 py-2 transition-all group-hover:bg-accent-l-900">
                    <button onClick={() => {}}>
                      <EditIcon className="h-5" />
                    </button>
                    <Link to={`/dashboard/level/testData/${test.id}`}>{test.title}</Link>
                    <button className="mr-auto" onClick={() => deleteTest(test.id)}>
                      <TrashIcon className="h-5" />
                    </button>
                  </TD>
                  <TD className="border-l bg-white px-6 py-2 transition-all group-hover:bg-accent-l-900">{test.type}</TD>
                  <TD className="rounded-bl-xl rounded-tl-xl bg-white px-6 py-2 transition-all group-hover:bg-accent-l-900">{new Date(test.startDate).toLocaleDateString()}</TD>
                </TR>
              ))
            ) : (
              <p> لا يوجد اختبارت </p>
            )}
          </TBody>
        </Table>
      </div>
    </TableContext.Provider>
  );
}
export function useTableContext() {
  if (!TableContext) {
    throw new Error('useTableContext must be used within a TableContext.Provider');
  } else return useContext(TableContext);
}
export default TestsTable;
