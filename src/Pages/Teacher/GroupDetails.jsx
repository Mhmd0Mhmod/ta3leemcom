import Heading from "../../UI/Heading.jsx";
import Button from "../../UI/Button.jsx";
import Modal from "../../Context/Modal.jsx";
import AlertWindow from "../../UI/AlertWindow.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useGroup } from "../../Features/Dashboard/useGroup.js";
import Loading from "../../UI/Loading.jsx";
import { useDeleteGroup } from "../../Features/Dashboard/useDeleteGroup.js";

function GroupDetails() {
  const { group, isLoading, error } = useGroup();
  const { deleteGroup } = useDeleteGroup();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  }
  const { name, levelName, levelYearName } = group || {};

  function handleDelete() {
    deleteGroup(null, {
      onSuccess: () => {
        navigate("/TDashboard/group/add");
      },
    });
  }

  return (
    <div className={"space-y-5"}>
      <Heading as={"h2"} className="font-Almarai-bold">
        بيانات المجموعه
      </Heading>
      <hr />
      <div className={"relative z-10 flex gap-5"}>
        <Link to="edit" className={"flex items-center justify-center rounded bg-Secondary-500 px-4 text-white"}>
          تعديل
        </Link>
        <Modal.Trigger id={"deleteGroup"}>
          <Button>حذف</Button>
        </Modal.Trigger>
        <Modal.Content id={"deleteGroup"}>
          <AlertWindow title={` حذف المجموعه ` + name} onConfirm={handleDelete} />
        </Modal.Content>
      </div>

      <div className={"w-1/2 space-y-8 lg:order-none"}>
        <h3 className="font-almaria-bold mb-4 text-lg">اسم المجموعه</h3>
        <p className="w-full rounded-lg bg-gray-200 p-2 text-xl">{name}</p>

        <div className={"w-full"}>
          <h3 className="font-almaria-bold mb-4 mt-8 text-lg">المرحلة الدراسية</h3>
          <p className="rounded-lg bg-gray-200 p-2 text-xl">{levelName}</p>
        </div>
        <div className={"w-full"}>
          <h3 className="font-almaria-bold mb-4 mt-8 text-lg"> الصف الدراسي</h3>
          <p className="rounded-lg bg-gray-200 p-2 text-xl">{levelYearName}</p>
        </div>
      </div>
    </div>
  );
}

export default GroupDetails;
