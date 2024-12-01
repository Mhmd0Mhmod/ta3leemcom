const TestDuration = ({ register }) => {
  return (
    <div className={"space-y-4 p-2 text-sm"}>
      <div className={"grid grid-cols-3 gap-4"}>
        <div className={"flex flex-col items-center gap-2"}>
          <label htmlFor={"minutes"}>الدقائق</label>
          <input type={"number"} defaultValue={0} id={"minutes"} {...register("minutes")} className={"w-10 rounded-lg bg-gray-200 p-1 text-sm"} />
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <label htmlFor={"hours"}>الساعات</label>
          <input type={"number"} defaultValue={0} id={"hours"} {...register("hours")} className={"w-10 rounded-lg bg-gray-200 p-1 text-sm"} />
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <label htmlFor={"days"}>الأيام</label>
          <input type={"number"} defaultValue={0} id={"days"} {...register("days")} className={"w-10 rounded-lg bg-gray-200 p-1 text-sm"} />
        </div>
      </div>
    </div>
  );
};

export default TestDuration;