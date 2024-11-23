import Heading from "../../UI/Heading.jsx";
import DropDownList from "./DropDownList.jsx";
import { MainLevels } from "../../Config/config.js";
import Dropdown from "../../Context/DropDownList.jsx";
import Button from "../../UI/Button.jsx";
import { useForm } from "react-hook-form";
import { useLevels } from "../../Features/Dashboard/useLevels.js";
import Group from "../../../public/Icons/group.svg";
import { useGroup } from "../../Features/Dashboard/useGroup.js";
import { useEditGroup } from "../../Features/Dashboard/useEditGroup.js";
import Loading from "../../UI/Loading.jsx";
import { useEffect } from "react";
import toast from "react-hot-toast";

function EditGroup() {
  const { register, formState, handleSubmit, watch, setValue } = useForm();
  const { errors } = formState;
  const { mainLevelId, levelYearId } = watch();
  const { levels, isLoading, error } = useLevels();
  const { group, isPending, error: groupError } = useGroup();
  const { editGroup, isPending: editing, error: editingError } = useEditGroup();
  useEffect(() => {
    setValue("mainLevelId", group?.levelId);
    setValue("levelYearId", group?.levelYearId);
    setValue("name", group?.name);
  }, [group, setValue]);
  if (isPending) return <Loading />;
  const onSubmit = (data) => {
    const bodyData = { name: data.name, levelYearId };
    editGroup(bodyData, {
      onSuccess: () => {
        toast.success("تم تعديل المجموعه بنجاح");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <>
      <Heading className={"text-center !text-4xl"}>بيانات المجموعه</Heading>
      <form className={"mt-16 space-y-4"} onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex w-3/4 flex-col gap-4"}>
          <label htmlFor={"name"} className={"font-Almarai-bold text-xl"}>
            الاسم المجموعه
          </label>
          <div className={"w flex items-center gap-6 overflow-hidden rounded-2xl border-2 border-gray-400 bg-white px-4 text-gray-600"}>
            <Group className={"w-6"} />
            <input
              type="text"
              className={"h-20 flex-grow text-xl focus:outline-none"}
              {...register("name", {
                required: {
                  value: true,
                  message: "الاسم مطلوب",
                },
                value: group?.name,
              })}
            />
          </div>
          <span className={"text-md text-red-500"}>{errors?.name?.message}</span>
        </div>
        <div className={"flex flex-col gap-16 md:flex-row xl:gap-28"}>
          <DropDownList
            label={"المرحله الدراسيه"}
            options={MainLevels}
            value={MainLevels.find((item) => item.id === mainLevelId)?.name || "اختر المرحله الدراسيه"}
            render={(item) => (
              <Dropdown.Item key={item.id} text={item.name} onClick={() => setValue("mainLevelId", item.id)}>
                {item.name}
              </Dropdown.Item>
            )}
          />
          <span className={"text-md text-red-500"}>{errors?.mainLevelId?.message}</span>
          <div className={"flex flex-col gap-4"}>
            <DropDownList
              label={"الصف الدراسي"}
              options={levels?.[mainLevelId]}
              value={levels?.[mainLevelId]?.find((item) => item.id === levelYearId)?.name || "اختر الصف الدراسي"}
              render={(item) => (
                <Dropdown.Item key={item.id} text={item.name} onClick={() => setValue("levelYearId", item.id)}>
                  {item.name}
                </Dropdown.Item>
              )}
            />
            <span className={"text-md text-red-500"}>{errors?.levelYearId?.message}</span>
          </div>
        </div>
        <div className={"!mt-52 text-center"}>
          <Button type={"outlinePrimary"} className={"px-10 text-xl disabled:bg-red-200"} disabled={editing || isLoading}>
            {editing ? "جاري التعديل" : "تعديل"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditGroup;
