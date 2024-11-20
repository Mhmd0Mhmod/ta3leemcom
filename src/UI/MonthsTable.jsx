import React, { useState, useRef } from "react";
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

const Icon = ToggleIcon({ IconTrue: Paid, IconFalse: NotPaid });

function MonthsTable() {
  const { monthData, isLoading, error } = useMonthData();
  const { deleteSession } = useDeleteSession();
  if (isLoading) return <Loading />;

  function confirmDelete(id) {
    deleteSession(id);
  }

  return (
    <div className={"grid min-w-[500px] select-none grid-cols-[auto_1fr_auto_auto] gap-5"}>
      <Table className={"mt-2"}>
        <TableHead>
          <TableHeadCell>اسم الطالب</TableHeadCell>
          <TableHeadCell>الدفع</TableHeadCell>
        </TableHead>
        <TableBody>
          {monthData?.monthStudents.map((student) => (
            <TableRow key={student.studentId}>
              <TableCell>{student.studentName}</TableCell>
              <TableCell>
                <div className={"flex justify-center"}>
                  <Icon isToggled={student.pay} />
                </div>
              </TableCell>
            </TableRow>
          ))}
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
                {monthData?.days.map((day) => (
                  <TableCell key={day.id}>
                    <div className="flex justify-center">
                      <Icon isToggled={day.studentAbsences[i].attended} />
                    </div>
                  </TableCell>
                ))}
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
  );
}

export default MonthsTable;
