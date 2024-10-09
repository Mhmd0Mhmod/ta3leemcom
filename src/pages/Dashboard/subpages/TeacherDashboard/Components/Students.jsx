import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Table from '@/UI-Global/Table/Table.jsx';
import THead from '@/UI-Global/Table/THead.jsx';
import TR from '@/UI-Global/Table/TR.jsx';
import TH from '@/UI-Global/Table/TH.jsx';
import TBody from '@/UI-Global/Table/TBody.jsx';
import TD from '@/UI-Global/Table/TD.jsx';
import Sort from '/public/Icons/sort.svg';
import Edit from '/public/Icons/edit_icon.svg';
import Trash from '/public/Icons/trash_icon.svg';
import Search from '/public/Icons/search_icon.svg';
import RemoveSearched from '/public/Icons/removeSeach.svg';
import HeadingLevelsPages from '../../../../../UI-Global/HeadingLevelsPages.jsx';
import { getStudents } from '@/Features/student/helpers.js';
import { Spinner } from '@/UI-Global/Spinner.jsx';

function Students() {
  const [searchParams, setSearchParams] = useSearchParams();
  const groups = searchParams.get('group').split('_');
  const [search, setSearch] = useState('');
  const [allStudent, setAllStudent] = useState([]);
  const [students, setStudents] = useState(allStudent);
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(false);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    getStudents(groups)
      .then((res) => {
        setAllStudent([...res.data]);
        setStudents([...res.data]);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const filteredStudents = allStudent.filter((student) => student.name.toLowerCase().includes(search.toLowerCase()));
      setStudents(filteredStudents);
    } else {
      setStudents([...allStudent]);
    }
  }, [search]);

  const handleSort = () => {
    const sortedStudents = [...students].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setStudents(sortedStudents);
  };
  if (loading) return <Spinner />;
  return (
    <div className={'flex flex-col gap-6'}>
      <HeadingLevelsPages title={'الطلاب'} />
      <div className={'flex items-center justify-between'}>
        <div className={'flex gap-4'}>
          <div className="flex w-[30rem] gap-5 rounded-lg border-2 bg-white p-3">
            <Search />
            <input type="text" placeholder="اسم الطالب" className="w-full" value={search} onChange={handleSearch} />
            {search && <RemoveSearched onClick={() => setSearch('')} />}
          </div>
        </div>
        <div>
          <span className={'bg-accent-900 h- rounded px-6 py-4 font-almaria text-xl !text-black'}>
            عدد الطلاب :<span className={'font-almaria-bold'}>{' ' + students.length}</span>
          </span>
        </div>
      </div>
      <Table className={'!w-1/2'}>
        <THead>
          <TR className={'cursor-pointer rounded bg-[#A8A8A833] p-2'}>
            <TH className={'flex items-center justify-center gap-4'} onClick={handleSort}>
              <span>اسم الطالب</span>
              <Sort />
            </TH>
          </TR>
        </THead>
        <TBody className={'mt-2 h-[380px] overflow-auto'}>
          {students?.map((el, i) => {
            return (
              <TR key={el.id}>
                <TD>
                  <div className={'flex items-center gap-4 rounded border-b-4 bg-white p-2'}>
                    <Edit alt={'edit'} className={'!w-5'} />
                    <span>
                      {i + 1}.{el.name}
                    </span>
                    <Trash alt={'delete'} className={'mr-auto !w-5'} />
                  </div>
                </TD>
              </TR>
            );
          })}
        </TBody>
      </Table>
    </div>
  );
}

export default Students;
