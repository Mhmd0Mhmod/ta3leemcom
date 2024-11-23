import Trash from "/public/Icons/trash_icon.svg";
import { useMonthData } from "../Features/TeacherMonths/useMonthData.js";
import Loading from "./Loading.jsx";
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeadCell } from "./Table.jsx";
import NotPaid from "/public/Icons/notPaidCircle.svg";
import Paid from "/public/Icons/paidCircle.svg";

import { format } from "date-fns";
import AddSession from "./AddSession.jsx";
import ToggleIcon from "./ToggleIcon.jsx";
import Modal from "../Context/Modal.jsx";
import AlertWindow from "./AlertWindow.jsx";
import { useDeleteSession } from "../Features/TeacherMonths/useDeleteSession.js";
import { useState } from "react";
import Button from "./Button.jsx";
import { useSaveChanges } from "../Features/TeacherMonths/useSaveChanges.js";

const Icon = ToggleIcon({ IconTrue: Paid, IconFalse: NotPaid });

function MonthsTable() {
  const [changes, setChanges] = useState({
    absenceStudents: [],
    monthStudents: [],
  });
  const { monthData, isLoading, error } = useMonthData();
  const { saveChanges, isPending } = useSaveChanges();
  const { deleteSession } = useDeleteSession();
  if (isLoading) return <Loading />;

  function confirmDelete(id) {
    deleteSession(id);
  }

  console.log("monthData", monthData);
  function handlePayStudent(student) {
    const { studentId, studentName, monthId, pay } = student;
    const studentIndex = changes.monthStudents.findIndex((s) => s.studentId === studentId);
    if (studentIndex === -1) {
      setChanges((prev) => ({
        ...prev,
        monthStudents: [
          ...prev.monthStudents,
          {
            studentId,
            studentName,
            monthId,
            pay: !pay,
          },
        ],
      }));
    } else {
      setChanges((prev) => ({
        ...prev,
        monthStudents: prev.monthStudents.filter((s) => s.studentId !== studentId),
      }));
    }
  }

  function handleAbsenceStudent(dayId, student, attended) {
    const { studentId, studentName } = student;
    const absenceIndex = changes.absenceStudents.findIndex((a) => a.dayId === dayId && a.studentId === studentId);
    if (absenceIndex === -1) {
      setChanges((prev) => ({
        ...prev,
        absenceStudents: [
          ...prev.absenceStudents,
          {
            dayId,
            studentId,
            studentName,
            attended: !attended,
          },
        ],
      }));
    } else {
      setChanges((prev) => ({
        ...prev,
        absenceStudents: prev.absenceStudents.filter((a) => a.dayId !== dayId || a.studentId !== studentId),
      }));
    }
  }

  function reset() {
    setChanges({
      absenceStudents: [],
      monthStudents: [],
    });
  }

  function handleSaveChanges() {
    if (changes.monthStudents.length === 0) changes.monthStudents = [...monthData.monthStudents];
    saveChanges(changes, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <div className={"relative space-y-10"}>
      {isPending && (
        <div className={"f absolute z-20 flex h-full w-full items-center justify-center rounded bg-white opacity-75"}>
          <span className={"text-2xl"}>جاري التعديل</span>
        </div>
      )}
      <div className={"overflow-x-auto"}>
        <div className={"grid min-w-[500px] select-none grid-cols-[auto_1fr_auto_auto] gap-5 overflow-x-auto"}>
          <Table className={"mt-2"}>
            <TableHead>
              <TableHeadCell>اسم الطالب</TableHeadCell>
              <TableHeadCell>الدفع</TableHeadCell>
            </TableHead>
            <TableBody>
              {monthData?.monthStudents.map((student) => {
                const findInChanges = changes.monthStudents.find((st) => st.studentId === student.studentId)?.pay;
                const toggled = findInChanges !== undefined ? findInChanges : student.pay;
                return (
                  <TableRow key={student.studentId}>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>
                      <div className={"flex justify-center"}>
                        <Icon isToggled={toggled} onClick={() => handlePayStudent(student)} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className={"flex rotate-180 overflow-x-auto rounded-lg"}>
            <Table className={"rotate-180 self-end"}>
              <TableHead>
                {monthData?.days.map((day) => (
                  <TableHeadCell key={day.id}>
                    <div className={"flex items-center justify-center gap-4"}>
                      <span>{format(new Date(day.date), "yyyy/MM/dd")}</span>
                      <Modal.Trigger id={day.id}>
                        <Trash className={"cursor-pointer"} />
                      </Modal.Trigger>
                      <Modal.Content id={day.id} className={"!h-fit !w-fit"}>
                        <AlertWindow title={"هل انت متأكد من حذف اليوم؟"} description={" "} onConfirm={() => confirmDelete(day.id)} />
                      </Modal.Content>
                    </div>
                  </TableHeadCell>
                ))}
              </TableHead>
              <TableBody>
                {monthData?.monthStudents.map((student, i) => (
                  <TableRow key={student.studentId}>
                    {monthData?.days.map((day) => {
                      const findInChanges = changes.absenceStudents.find((st) => st.studentId === student.studentId && st.dayId === day.id)?.attended;
                      const toggled = findInChanges !== undefined ? findInChanges : day.studentAbsences[i].attended;
                      return (
                        <TableCell key={day.id}>
                          <div className="flex justify-center">
                            <Icon isToggled={toggled} onClick={() => handleAbsenceStudent(day.id, student, day.studentAbsences[i].attended)} />
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <AddSession />
          <Table className={"mt-2"}>
            <TableHead>
              <TableHeadCell> اجمالي</TableHeadCell>
            </TableHead>
            <TableBody>
              {monthData?.monthStudents.map((student, i) => {
                const total = monthData.days.reduce((acc, day) => {
                  return acc + (day.studentAbsences[i].attended ? 1 : 0);
                }, 0);
                return (
                  <TableRow key={student.studentId}>
                    <TableCell align={"center"}>{total}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      {(changes.monthStudents.length > 0 || changes.absenceStudents.length > 0) && (
        <div className={"flex justify-end gap-10"}>
          <Button type={"normal"} className={"w-40 border text-black shadow"} onClick={reset}>
            إلغاء
          </Button>
          <Button type={"Secondary"} className={"w-40"} onClick={() => handleSaveChanges()}>
            حفظ التغييرات
          </Button>
        </div>
      )}
    </div>
  );
}

export default MonthsTable;
