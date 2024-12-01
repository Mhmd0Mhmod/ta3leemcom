import { Link, useParams } from "react-router-dom";
import { useGroups } from "../Features/Dashboard/useGroups.js";
import Loading from "./Loading.jsx";
import Trash from "../../public/Icons/recyclePin.svg";
import Edit from "../../public/Icons/editPen.svg";
import Eye from "../../public/Icons/eye.svg";
import Heading from "./Heading.jsx";
import Arrow from "/public/Icons/arrow_in_levels.svg";
import Button from "./Button.jsx";
import Modal from "../Context/Modal.jsx";
import AlertWindow from "./AlertWindow.jsx";
import { useDeleteGroup } from "../Features/Dashboard/useDeleteGroup.js";
import toast from "react-hot-toast";

function GroupsList({ value, onChange, selectAll }) {
  const { groups, isLoading, error } = useGroups();
  const { deleteGroup, isPending } = useDeleteGroup();
  function handleDelete(id) {
    deleteGroup(id, {
      onSuccess: () => {
        toast.success("تم حذف المجموعة بنجاح");
      },
      onError: () => {
        toast.error("حدث خطأ أثناء حذف المجموعة");
      },
    });
  }

  return (
    <div className={"flex flex-col pr-10"}>
      <div className={"flex gap-2"}>
        <Heading as={"h1"} className={"font-Almaria-bold text-xl"}>
          المجموعات
        </Heading>
        <Arrow />
      </div>
      <div className={"max-h-64 overflow-y-auto rounded-xl bg-white p-5"}>
        {isLoading && <Loading />}
        <ul className={"flex flex-col gap-5"}>
          {!isLoading && groups?.length === 0 && (
            <li className="flex items-center justify-between gap-4">
              <span>لا يوجد مجموعات</span>
              <Link to="/TDashboard/group/add" className="flex items-center gap-2 rounded-xl bg-[#0884A2] px-2 py-1 text-white">
                <span>اضافة مجموعة</span>
              </Link>
            </li>
          )}
          {!isLoading &&
            groups?.map((group) => (
              <li
                key={group.id}
                onClick={() => onChange(group.id)}
                className={`font-Almaria-bold flex cursor-pointer items-center gap-2 rounded-xl border border-sky-200 p-2 hover:bg-Secondary-100 ${value.includes(group.id) ? "bg-Secondary-100 text-white" : ""}`}
              >
                <Modal.Trigger id={`delete-${group.id}`}>
                  <Trash />
                </Modal.Trigger>
                <Modal.Content id={`delete-${group.id}`} className={"p-5"}>
                  <AlertWindow title={"حذف المجموعة"} description={"هل انت متأكد من حذف المجموعة؟"} onConfirm={() => handleDelete(group.id)} />
                </Modal.Content>
                <Link to={`/TDashboard/group/${group.id}/edit`}>
                  <Edit />
                </Link>
                <span className={"flex-1 text-center"}>{group.name}</span>
                <Link to={`/TDashboard/group/${group.id}`}>
                  <Eye />
                </Link>
              </li>
            ))}
        </ul>
      </div>
      {!isLoading && groups?.length > 0 && (
        <Button type={"light"} className={"text-md mt-5 duration-300 hover:bg-Secondary-100 hover:text-white"} onClick={() => selectAll(groups.map((group) => group.id))}>
          تحديد كل المجموعات
        </Button>
      )}
    </div>
  );
}

export default GroupsList;
