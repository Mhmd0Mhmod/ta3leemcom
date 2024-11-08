import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function FilterByTestType() {
  const { register, watch, setValue } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = watch("type", null);
  useEffect(() => {
    if (type) {
      searchParams.set("type", type);
      setSearchParams(searchParams);
    }
  }, [type, setSearchParams, searchParams]);

  function handleReset() {
    searchParams.delete("type");
    setValue("type", null);
    setSearchParams(searchParams);
  }

  return (
    <div className={"flex w-40 flex-col gap-4 bg-white p-4"}>
      <label className={"border px-4 py-2"} htmlFor={"online"}>
        اونلاين
      </label>
      <input className={"hidden"} type={"radio"} value={"online"} id={"online"} {...register("type")} />

      <label className={"border px-4 py-2"} htmlFor={"offline"}>
        اوفلاين
      </label>
      <input type={"radio"} value={"offline"} className={"hidden"} id={"offline"} {...register("type")} />
      <span className={"cursor-pointer text-Secondary-500 underline"} onClick={handleReset}>
        الغاء
      </span>
    </div>
  );
}

export default FilterByTestType;
