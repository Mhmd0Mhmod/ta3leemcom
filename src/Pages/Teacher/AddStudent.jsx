import Heading from "../../UI/Heading.jsx";
import { useForm } from "react-hook-form";
import Profile from "/public/Icons/profile.svg";
import Dropdown from "../../Context/DropDownList.jsx";
import Button from "/src/UI/Button.jsx";
import { useLevels } from "../../Features/Dashboard/useLevels.js";
import DropDownList from "./DropDownList.jsx";
import { useGroups } from "../../Features/Dashboard/useGroups.js";
import { useAddStudent } from "../../Features/Dashboard/useAddStudent.js";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Alert from "../../UI/Alert.jsx";
import { Link } from "react-router-dom";
import { MainLevels } from "../../Config/config.js";
import { useEditStudent } from "../../Features/Dashboard/useEditStudent.js";

function AddStudent({ studentToEdit }) {
  const { id: studentId } = studentToEdit || {};
  const { register, formState, reset, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: studentToEdit?.name || "",
      mainLevelId: studentToEdit?.levelId || null,
      levelYearId: studentToEdit?.levelYearId || undefined,
      groupId: studentToEdit?.groupId || null,
    },
  });
  const { errors } = formState;
  const { mainLevelId, levelYearId, groupId } = watch();

  const { groups } = useGroups(levelYearId);
  const { levels, isLoading, error } = useLevels();
  const { editStudent, isPending: isEditing } = useEditStudent();
  const { addStudent, isLoading: adding } = useAddStudent();
  useEffect(() => {
    if (studentToEdit) {
      setValue("name", studentToEdit.name);
      setValue("mainLevelId", studentToEdit.levelId);
      setValue("levelYearId", studentToEdit.levelYearId);
      setValue("groupId", studentToEdit.groupId);
    }
  }, [studentToEdit, setValue]);
  useEffect(() => {
    const level = levels?.[mainLevelId]?.find((item) => item?.id === levelYearId);
    if (!level) {
      setValue("levelYearId", null);
      setValue("groupId", null);
    }
  }, [levels, mainLevelId, levelYearId, setValue]);
  useEffect(() => {
    const group = groups?.find((item) => item?.id === groupId);
    if (group && group?.levelYearId !== levelYearId) {
      setValue("groupId", null);
    }
  }, [mainLevelId, groups, groupId, levelYearId, setValue]);

  const [id, setId] = useState(null);
  const [type, setType] = useState(null);
  const onSubmit = (data) => {
    if (!groupId) {
      return toast.error("يجب اختيار المجموعه");
    }

    const bodyData = { name: data.name, groupId: groupId };
    if (studentId) {
      editStudent(bodyData, {
        onSuccess: (data) => {
          toast.success("تم تعديل الطالب بنجاح");
        },
        onError: (error) => {
          toast.error("حدث خطأ ما");
        },
      });
    } else {
      addStudent(bodyData, {
        onSuccess: (data) => {
          setId(data.id);
          setType("success");
          reset();
          toast.success("تم اضافة الطالب بنجاح");
        },
        onError: () => {
          setType("error");
          toast.error(error.message);
        },
      });
    }
  };
  return (
    <>
      <Heading className={"text-center !text-4xl"}>{studentId ? "تعديل بيانات الطالب" : "اضافة طالب جديد"}</Heading>
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
            value={MainLevels.find((item) => item.id === mainLevelId)?.name || "اختر المرحله الدراسيه"}
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
                <Dropdown.Item key={item.id} text={item.name} onClick={() => setValue("groupId", item.id)}>
                  {item.name}
                </Dropdown.Item>
              )}
            />
            <span className={"text-md text-red-500"}>{errors?.groupId?.message}</span>
          </div>
        </div>
        <div className={"!mt-52 text-center"}>
          <Button type={"outlinePrimary"} className={"px-10 text-xl"} disabled={isLoading || adding || isEditing}>
            اضافة
          </Button>
        </div>
      </form>
      <Alert type={type}>
        <Alert.Success>
          <p>تم اضافة الطالب بنجاح</p>
          <Link to={`/TDashboard/student/${id}`} className={"underline"}>
            عرض
          </Link>
          <Link to={`/TDashboard/student/${id}/edit`} className={"underline"}>
            تعديل
          </Link>
        </Alert.Success>
        <Alert.Error>
          <p>حدث خطأ ما</p>
        </Alert.Error>
      </Alert>
    </>
  );
}

export default AddStudent;
