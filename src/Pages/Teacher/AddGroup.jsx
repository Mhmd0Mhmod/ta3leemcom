import Heading from "../../UI/Heading.jsx";
import { useForm } from "react-hook-form";
import Group from "../../../public/Icons/group.svg";
import Dropdown from "../../UI/DropDownList.jsx";
import Button from "/src/UI/Button.jsx";

function AddGroup() {
  const { register, formState, handleSubmit, watch, setValue } = useForm();
  const { errors } = formState;
  const groupId = watch("groupId");

  function setGroupId(value) {
    setValue("groupId", value);
  }

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Heading className={"text-center !text-4xl"}>بيانات الطالب</Heading>
      <form className={"mt-16 space-y-4"} onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex w-3/4 flex-col gap-4"}>
          <label htmlFor={"name"} className={"font-Almarai-bold text-xl"}>
            الاسم الرباعي
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
          <div className={"flex flex-col gap-4"}>
            <label htmlFor={"class"} className={"font-Almarai-bold text-lg"}>
              المرحله الدراسيه
            </label>
            <Dropdown>
              <Dropdown.Toggle placeholder={"المرحله الدراسيه"} />
              <Dropdown.Menu>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Dropdown.Item key={item} text={item} onClick={() => setValue("class", item)}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>{" "}
          <div className={"flex flex-col gap-4"}>
            <label htmlFor={"class"} className={"font-Almarai-bold text-lg"}>
              الصف الدراسي
            </label>
            <Dropdown>
              <Dropdown.Toggle placeholder={"المرحله الدراسيه"} />
              <Dropdown.Menu>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Dropdown.Item key={item} text={item} onClick={() => setValue("class", item)}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className={"!mt-52 text-center"}>
          <Button type={"outlinePrimary"} className={"px-10 text-xl"}>
            اضافة
          </Button>
        </div>
      </form>
    </>
  );
}

export default AddGroup;
