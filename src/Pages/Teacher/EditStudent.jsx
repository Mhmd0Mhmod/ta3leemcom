import Heading from "../../UI/Heading.jsx";
import { useForm } from "react-hook-form";
import Profile from "/public/Icons/profile.svg";
import Dropdown from "../../Context/DropDownList.jsx";
import Button from "/src/UI/Button.jsx";
import { useLevels } from "../../Features/Dashboard/useLevels.js";
import DropDownList from "./DropDownList.jsx";
import { useGroups } from "../../Features/Dashboard/useGroups.js";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useStudent } from "../../Features/Dashboard/useStudent.js";
import { MainLevels } from "../../Config/config.js";
import Loading from "../../UI/Loading.jsx";
import { useEditStudent } from "../../Features/Dashboard/useEditStudent.js";

function EditStudent() {
  const { register, formState, handleSubmit, watch, setValue } = useForm();
  const { errors } = formState;

  const { levels, isLoading } = useLevels();
  const { student, isLoading: isFetching } = useStudent();
  const { editStudent, isPending: isEditing } = useEditStudent();
  const { mainLevelId, levelYearId, groupId } = watch();
  const { groups } = useGroups(levelYearId);
  useEffect(() => {
    setValue("mainLevelId", student?.levelId || null);
    setValue("levelYearId", student?.levelYearId || null);
    setValue("groupId", student?.groupId || null);
  }, [student, setValue]);

  function setGroupId(value) {
    setValue("groupId", value);
  }
  if (isFetching) return <Loading />;

  const onSubmit = (data) => {
    if (!groupId) {
      return toast.error("يجب اختيار المجموعه");
    }
    const bodyData = { name: data.name, groupId: groupId };
    editStudent(bodyData, {
      onSuccess: () => {
        toast.success("تم تعديل الطالب بنجاح");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <>
      <Heading className={"text-center !text-4xl"}>تعديل بيانات الطالب</Heading>
      <form className={"mt-16 space-y-4"} onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex w-3/4 flex-col gap-4"}>
          <label htmlFor={"name"} className={"font-Almarai-bold text-xl"}>
            الاسم الرباعي
          </label>
          <div className={"w flex items-center gap-6 overflow-hidden rounded-2xl border-2 border-gray-400 bg-white px-4 text-gray-600"}>
            <Profile className={"w-6"} />
            <input
              type="text"
              className={"h-20 flex-grow text-xl focus:outline-none"}
              {...register("name", {
                value: student?.name,
                required: {
                  value: true,
                  message: "الاسم مطلوب",
                },
                validate: (value) => value.split(" ").length >= 3 || "الاسم يجب ان يحتوي علي ثلاث كلمات علي الاقل",
              })}
            />
          </div>
          <span className={"text-md text-red-500"}>{errors?.name?.message}</span>
        </div>
        <div className={"flex flex-col gap-16 md:flex-row xl:gap-28"}>
          <DropDownList
            label={"المرحله الدراسيه"}
            options={MainLevels}
            value={MainLevels.find((item) => item.id === (mainLevelId || student))?.name || "اختر المرحله الدراسيه"}
            render={(item) => (
              <Dropdown.Item key={item.id} text={item.name} onClick={() => setValue("mainLevelId", item.id)}>
                {item.name}
              </Dropdown.Item>
            )}
          />

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
          </div>
          <div className={"flex flex-col gap-4"}>
            <DropDownList
              label={"اختر المجموعه"}
              options={groups}
              value={groups?.find((item) => item.id === groupId)?.name || "اختر المجموعه"}
              render={(item) => (
                <Dropdown.Item key={item.id} text={item.name} onClick={() => setGroupId(item.id)}>
                  {item.name}
                </Dropdown.Item>
              )}
            />
            <span className={"text-md text-red-500"}>{errors?.groupId?.message}</span>
          </div>
        </div>
        <div className={"!mt-52 text-center"}>
          <Button type={"outlinePrimary"} className={"px-10 text-xl"} disabled={isLoading || isFetching || isEditing}>
            {isEditing ? "جاري التعديل..." : "تعديل"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditStudent;
