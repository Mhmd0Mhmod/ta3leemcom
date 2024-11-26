import Search from "./Search.jsx";
import { useEffect, useState } from "react";
import { useStudents } from "../Features/TeacherStudents/useStudents.js";
import { useNavigate } from "react-router-dom";
import { Table, TableHead, TableRow, TableCell, TableHeadCell } from "./Table.jsx";
import EditIcon from "/public/Icons/edit_icon.svg";
import DeleteIcon from "/public/Icons/trash_icon.svg";
import Sort from "/public/Icons/sort.svg";
import Loading from "./Loading.jsx";
import Modal from "../Context/Modal.jsx";
import AlertWindow from "./AlertWindow.jsx";

function StudentsGroupsTable() {
  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState(false);
  const { students, isLoading, error } = useStudents();
  const navigate = useNavigate();
  let [editedStudents, setEditedStudents] = useState(students || []);
  useEffect(() => {
    setEditedStudents(students?.filter((student) => student.name.toLowerCase().includes(search.toLowerCase())));
  }, [search, students]);
  if (isLoading) return <Loading />;

  function sortStudent() {
    setSorted(!sorted);
    if (sorted) {
      setEditedStudents([...editedStudents].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setEditedStudents([...editedStudents].sort((a, b) => b.name.localeCompare(a.name)));
    }
  }

  const handleDelete = (id) => {
    console.log(`Delete student with ID: ${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/TDashboard/student/${id}/edit`);
  };
  const showStudent = (id) => {
    navigate(`/TDashboard/student/${id}`);
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
                    <Modal.Trigger id={student.id}>
                      <DeleteIcon />
                    </Modal.Trigger>
                    <Modal.Content id={student.id}>
                      <AlertWindow title={"هل انت متأكد من حذف الطالب؟"} description={" "} onConfirm={() => handleDelete(student.id)} />
                    </Modal.Content>
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
