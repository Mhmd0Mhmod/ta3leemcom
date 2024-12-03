import { useGroup } from "../../Features/Dashboard/useGroup.js";
import Loading from "../../UI/Loading.jsx";
import AddGroup from "./AddGroup.jsx";

function EditGroup() {
  const { group, isPending, error: groupError } = useGroup();
  if (isPending) return <Loading />;
  return <AddGroup groupToEdit={group} />;
}

export default EditGroup;
