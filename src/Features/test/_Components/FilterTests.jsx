import { Calendar } from '@/components/ui/calendar.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import CalendarIcon from '/public/Icons/calender.svg';
import ArrowFilled from '/public/Icons/arrow_list_icon.svg';
import { cn } from '@/lib/utils.js';
import { X } from 'lucide-react';
import SearchIcon from '/public/Icons/search_icon.svg';
import Button from '@/UI-Global/Button';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTableContext } from './TestsTable';
import FilterList from './FilterList';
function FilterTests() {
  const [search, setSearch] = useState('');
  const { setFilteredTests, tests } = useTableContext();

  const [testType, setTestType] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(Date.now());
  useEffect(() => {
    setFilteredTests(tests.filter((test) => test.title.includes(search)));
  }, [search]);
  useEffect(() => {
    if (!testType) {
      setFilteredTests([...tests]);
      return;
    }
    setFilteredTests(tests.filter((test) => test.type === testType));
  }, [testType]);

  useEffect(() => {
    if (!fromDate || !toDate) {
      setFilteredTests([...tests]);
      return;
    }
    setFilteredTests(
      tests.filter((test) => {
        const testDate = new Date(test.startDate);
        return testDate >= new Date(fromDate) && testDate <= new Date(toDate);
      }),
    );
  }, [fromDate, toDate, tests]);
  function reset() {
    setFromDate('');
    setToDate(Date.now());
    setTestType('');
    setSearch('');
  }

  return (
    <>
      <div className="mb-6 mt-16 flex items-center gap-4 font-almaria-bold">
        <div className="flex w-[30rem] gap-5 rounded-lg border-2 border-accent-l-50 bg-white p-3">
          {search ? <X className="cursor-pointer" onClick={() => setSearch('')} /> : <SearchIcon />}
          <input type="text" placeholder="اسم الاختبار" className="w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <FilterList>
          <FilterList.Trigger>
            <CalendarIcon />
            <span> التاريخ</span>
          </FilterList.Trigger>
          <FilterList.List>
            <div className="flex flex-col gap-4">
              <FilterList.Item className={'border p-2'}>
                من
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center">
                      <CalendarIcon className="ml-2" />
                      {fromDate ? format(fromDate, 'dd/MM/yyyy') : <span className="whitespace-nowrap">اختر تاريخ </span>}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-0">
                    <Calendar mode="single" className={'flex justify-center'} selected={fromDate} onSelect={setFromDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </FilterList.Item>
              <FilterList.Item className={'border p-2'}>
                الي
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center">
                      <CalendarIcon className="ml-2" />
                      {toDate ? format(toDate, 'dd/MM/yyyy') : <span className="whitespace-nowrap">اختر تاريخ </span>}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-0">
                    <Calendar mode="single" className={'flex justify-center'} selected={toDate} onSelect={setToDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </FilterList.Item>
            </div>
          </FilterList.List>
        </FilterList>

        <FilterList>
          <FilterList.Trigger>
            <span> نوع الاختبار</span>
          </FilterList.Trigger>
          <FilterList.List>
            <div className="flex flex-col gap-4">
              <FilterList.Item>
                <button onClick={() => setTestType('اونلاين')} className="w-full rounded-[7px] border border-[#b4d3e0] p-2 text-start transition-all duration-500 hover:bg-accent-l-900">
                  اونلاين
                </button>
              </FilterList.Item>
              <FilterList.Item>
                <button onClick={() => setTestType('اوفلاين')} className="w-full rounded-[7px] border border-[#b4d3e0] p-2 text-start transition-all duration-500 hover:bg-accent-l-900">
                  اوفلاين
                </button>
              </FilterList.Item>
              <FilterList.Item onClick={() => setTestType('')} className={'cursor-pointer !text-secondary-l underline'}>
                الغاء
              </FilterList.Item>
            </div>
          </FilterList.List>
        </FilterList>
        <button className="text-secondary-l" onClick={reset}>
          إلغاء الكل
        </button>
      </div>
    </>
  );
}
export default FilterTests;
// <Button type="ghost" className={'relative bg-accent-l-900 py-6 font-almaria text-lg text-black hover:bg-accent-l-900'}>
//   <div className="flex items-center gap-2 font-almaria-light text-lg !text-black">
//     {/* <span>{filterByTestType ? filterByTestType : 'تصفية بنوع الاختبار'}</span> */}
//     {/* <Arrow className={`${filterByTestTypeUl ? 'rotate-90 transition-all duration-300' : '-rotate-90 transition-all duration-300'} `} /> */}
//   </div>
//   {/* <div className={`absolute bottom-20 left-0 mt-4 rounded-[7px] border border-[#b4d3e0] bg-white text-black opacity-0 transition-all duration-300 ${filterByTestTypeUl ? 'opacity-100' : 'pointer-events-none'}`}> */}
//   <div className={`absolute bottom-20 left-0 mt-4 rounded-[7px] border border-[#b4d3e0] bg-white text-black opacity-0 transition-all duration-300`}>
//     <div onClick={(e) => e.stopPropagation()} className="relative flex w-56 flex-col gap-2 p-4 text-start font-almaria text-lg">
//       <ArrowFilled className="absolute -bottom-12 left-0 h-16 w-16" />

//       <button
//         // disabled={!filterByTestTypeUl}
//         onClick={(e) => {
//           e.stopPropagation();
//         }}
//         className="hover:bg-accent-900 rounded-[7px] border border-[#b4d3e0] p-3 text-start transition-all duration-500 hover:bg-accent-l-900"
//       >
//         اونلاين
//       </button>
//       <button
//         // disabled={!filterByTestTypeUl}
//         onClick={(e) => {
//           e.stopPropagation();
//         }}
//         className="hover:bg-accent-900 rounded-[7px] border border-[#b4d3e0] p-3 text-start transition-all duration-500 hover:bg-accent-l-900"
//       >
//         اوفلاين
//       </button>
//       <button
//         className="mt-2 w-fit text-start text-secondary-l underline"
//         onClick={(e) => {
//           e.stopPropagation();
//         }}
//       >
//         الغاء
//       </button>
//     </div>
//   </div>
// </Button>
