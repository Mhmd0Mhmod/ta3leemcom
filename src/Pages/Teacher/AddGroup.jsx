import Heading from "../../UI/Heading.jsx";
import { useForm } from "react-hook-form";
import Group from "../../../public/Icons/group.svg";
import Dropdown from "../../Context/DropDownList.jsx";
import Button from "/src/UI/Button.jsx";
import DropDownList from "./DropDownList.jsx";
import { useLevels } from "../../Features/Dashboard/useLevels.js";
import { useAddGroup } from "../../Features/Dashboard/useAddGroup.js";
import toast from "react-hot-toast";
import { useEffect } from "react";

function AddGroup() {
  const { register, formState, handleSubmit, watch, setValue, reset } = useForm();
  const { errors } = formState;
  const mainLevelId = watch("mainLevelId");
  const levelYearId = watch("levelYearId");
  const groupId = watch("groupId");
  const { levels, isLoading, error } = useLevels();
  const { addGroup, isLoading: adding } = useAddGroup();
  useEffect(() => {
    setValue("levelYearId", null);
  }, [mainLevelId]);
  const onSubmit = (data) => {
    const bodyData = { name: data.name, levelYearId: levelYearId };
    addGroup(bodyData, {
      onSuccess: () => {
        reset();
        toast.success("تم اضافة المجموعه بنجاح");
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
              })}
            />
          </div>
          <span className={"text-md text-red-500"}>{errors?.name?.message}</span>
        </div>
        <div className={"flex flex-col gap-16 md:flex-row xl:gap-28"}>
          <DropDownList
            label={"المرحله الدراسيه"}
            value={mainLevelId}
            options={[
              {
                id: 1,
                name: "المرحله الابتدائيه",
              },
              {
                id: 2,
                name: "المرحله الاعداديه",
              },
              {
                id: 3,
                name: "المرحله الثانويه",
              },
            ]}
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
              value={levelYearId}
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
          <Button type={"outlinePrimary"} className={"px-10 text-xl disabled:bg-red-200"} disabled={adding || isLoading}>
            اضافة
          </Button>
        </div>
      </form>
    </>
  );
}

export default AddGroup;
