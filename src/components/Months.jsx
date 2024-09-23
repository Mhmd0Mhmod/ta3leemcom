import HeadingLevelsPages from "./ui-local/HeadingLevelsPages.jsx";
import AddMonthsButton from "./ui-local/AddMonthsButton.jsx";
import DropList from "./ui-local/DropList.jsx";
import Trash from "../../public/Icons/trash_icon.svg";
import { AllStudent, FakeGroups, MonthsInArabic } from "../config.js";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Search from "/public/Icons/search_icon.svg";
import RemoveSearched from "/public/Icons/removeSeach.svg";
import Heading from "./ui-local/Heading.jsx";
import Paid from "../../public/Icons/paidDone.svg";
import NotPaid from "../../public/Icons/notPaid.svg";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StudentNotPaid from "../../public/Icons/notPaidCircle.svg";
import StudentPaid from "../../public/Icons/paidCircle.svg";
import { TableColumnsSplit } from "lucide-react";

function Months() {
  const months = MonthsInArabic;
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const currentYear = new Date().getFullYear();
  const [searchParams] = useSearchParams();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const groups = searchParams.get("group")?.split("_") || [];
  const [studentSearch, setStudentSearch] = useState("");
  const [students, setStudents] = useState(AllStudent);
  useEffect(() => {
    if (selectedGroup) {
      setStudents(
        FakeGroups.find((group) => group.id === selectedGroup).students,
      );
    } else {
      setStudents(AllStudent);
    }
  }, [selectedGroup]);
  useEffect(() => {
    if (studentSearch) {
      setStudents(
        AllStudent.filter((student) => student?.name.includes(studentSearch)),
      );
    } else {
      setStudents(AllStudent);
    }
  }, [studentSearch]);

  function handleStudentSearch(e) {
    setStudentSearch(e.target.value);
  }

  return (
    <div className="Months flex flex-col gap-6">
      <HeadingLevelsPages title="الاشهر" />
      <div className="flex gap-40 items-center ">
        <AddMonthsButton />
        <div className="flex gap-6">
          <DropList
            title="اختر الشهر"
            setValue={setSelectedMonth}
            options={months.map((el) => `${el} - ${currentYear}`)}
            optionsWithJSX={months.map((month) => (
              <>
                <span>{month}</span>
                <span className={"mr-auto"}>{currentYear}</span>
                <Trash />
              </>
            ))}
            optionsValue={months}
            classNameButton="flex flex-row-reverse justify-around"
            classNameItem={"flex gap-5"}
            classNameUl={"max-h-[190px]  overflow-auto"}
          />
          <DropList
            title={"اختر المجموعه"}
            options={groups}
            setValue={setSelectedGroup}
            optionsValue={groups}
            classNameButton="flex flex-row-reverse justify-around"
            classNameItem={"flex gap-5"}
            classNameUl={"max-h-[190px] overflow-auto"}
          />
        </div>
        <div className="flex flex-col mr-auto gap-4 text-lg">
          <div className="bg-[#B4D3E0] px-6 py-4 flex gap-4 rounded-lg">
            <Paid />
            <span>
              <span className="font-almaria-bold">تم</span> الدفع :
            </span>
            <span className="font-almaria-bold">{70}</span>
          </div>
          <div className="bg-[#B4D3E0] px-6 py-4 flex gap-4 rounded-lg">
            <NotPaid />
            <span>
              <span className="font-almaria-bold">لم</span> يتم الدفع :
            </span>
            <span className="font-almaria-bold">{12}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-[auto_auto] grid-cols-2 gap-x-20 gap-y-10">
        <div className="mt-8 ">
          <div className="flex gap-5 bg-white p-3 w-[30rem] border-2 rounded-lg ">
            <Search />
            <input
              type="text"
              placeholder="اسم الطالب"
              className="w-full"
              value={studentSearch}
              onChange={handleStudentSearch}
            />
            {studentSearch && <RemoveSearched />}
          </div>
        </div>
        <Heading as={"h2"} className="font-almaria-bold mt-8 text-center">
          الحصص
        </Heading>
        <div className={"flex col-span-2 relative  max-h-[50lvh]"}>
          <Table
            className={"grid grid-cols-[1fr_2fr_auto] overflow-y-auto gap-10"}
          >
            <div className={"mt-5"}>
              <TableHeader>
                <TableRow className="hover:bg-[#A8A8A833] rounded-2xl  border-b-[#f3f4f6]">
                  <th className={""}>اسم الطالب</th>
                  <th className={""}>الدفع</th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, idx) => (
                  <TableRow
                    key={student.id}
                    className="bg-white border-b-[#f3f4f6]"
                  >
                    <TableCell className="whitespace-nowrap">
                      {idx + 1} . {student.name}
                    </TableCell>
                    <TableCell>
                      {student.paid ? (
                        <StudentPaid className="m-auto" />
                      ) : (
                        <StudentNotPaid className="m-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </div>
            <div className={" overflow-x-scroll rotateX-180 "}>
              <div className={"rotateX-180"}>
                <TableHeader className={"sticky top-0"}>
                  {Array.from({ length: 11 }).map((number, idx) => (
                    <th key={idx} className={""}>
                      <div className="flex justify-center gap-4">
                        <span className="whitespace-nowrap">
                          الحصه {idx + 1}
                        </span>
                        <Trash />
                      </div>
                    </th>
                  ))}
                </TableHeader>
                <TableBody>
                  {students.map((student, idx) => (
                    <TableRow key={idx} className=" rounded-2xl bg-white">
                      {Array.from({ length: 11 }).map((month, idx) => (
                        <TableCell key={idx}>
                          {student.paid ? (
                            <StudentPaid className="m-auto" />
                          ) : (
                            <StudentNotPaid className="m-auto" />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </div>
            </div>

            <div className={"mt-5"}>
              <TableHeader>
                <TableRow className="border-b-[#f3f4f6]">
                  <th className={""}> اجمالي : 12</th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, idx) => (
                  <TableRow
                    key={student.id}
                    className="bg-[#0884A2] hover:bg-[#0884A2] text-center text-xl text-white"
                  >
                    <TableCell>
                      <p className="m-auto min-h-[31px]  bg-[#0884A2]  hover:bg-[#0884A2">
                        10
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </div>
          </Table>
        </div>
      </div>
      <div className={"flex gap-5 items-center justify-end max-w-[95%]"}>
        <button className="bg-white border-2 text-black rounded-lg px-6 py-4">
          الغاء
        </button>
        <button className="bg-[#0884A2] text-white rounded-lg px-6 py-4">
          حفظ
        </button>
      </div>
    </div>
  );
}

export default Months;
