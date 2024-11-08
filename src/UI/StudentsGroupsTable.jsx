import Search from "./Search.jsx";
import { useEffect, useState } from "react";
import { useStudents } from "../Features/TeacherStudents/useStudents.js";
import { useNavigate } from "react-router-dom";
import { Table, TableHead, TableRow, TableCell, TableHeadCell } from "./Table.jsx";
import EditIcon from "/public/Icons/edit_icon.svg";
import DeleteIcon from "/public/Icons/trash_icon.svg";
import Sort from "/public/Icons/sort.svg";
import Loading from "./Loading.jsx";

function StudentsGroupsTable() {
  const [search, setSearch] = useState("");
  const { students, isLoading, error } = useStudents();
  const navigate = useNavigate();
  let editedStudents = students;
  useEffect(() => {
    editedStudents = students?.filter((student) => student.name.includes(search));
  }, [search, students]);
  if (isLoading) return <Loading />;

  function sortStudent() {
    editedStudents = students.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleDelete = (id) => {
    console.log(`Delete student with ID: ${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/TDashboard/student/${id}/edit`);
  };
  const showStudent = (id) => {
    navigate(`/TDashboard/student/${id}/details`);
  };
  return (
    <>
      <div className={"flex items-center justify-between gap-10 sm:gap-40"}>
        <Search search={search} setSearch={setSearch} placeholder={"اسم الطالب"} className={"flex-grow"} />
        <div className={"font-Almaria rounded bg-accent-900 px-6 py-4 !text-black xl:text-xl"}>
          <span>عدد الطلاب :</span>
          <span className={"font-Almaria-bold"}>{" " + students?.length}</span>
        </div>
      </div>
      <div className="max-h-screen w-full overflow-x-auto xl:w-3/4">
        <Table>
          <TableHead className={"sticky top-0"}>
            <TableHeadCell className={"flex items-center justify-center gap-4"}>
              <span> اسم الطالب</span>
              <Sort onClick={sortStudent} />
            </TableHeadCell>
          </TableHead>
          <tbody>
            {editedStudents?.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell align="center">
                  <div className="flex items-center justify-between">
                    <EditIcon onClick={() => handleEdit(student.id)} alt="Edit" />
                    <span onClick={() => showStudent(student.id)}>{`${index + 1}. ${student.name}`}</span>
                    <DeleteIcon onClick={() => handleDelete(student.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default StudentsGroupsTable;
