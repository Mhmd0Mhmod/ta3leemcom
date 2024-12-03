const TestDuration = ({ register, timeDuration }) => {
  return (
    <div className={"space-y-4 p-2 text-sm"}>
      <div className={"grid grid-cols-3 gap-4"}>
        <div className={"flex flex-col items-center gap-2"}>
          <label htmlFor={"minute"}>الدقائق</label>
          <input
            type={"number"}
            defaultValue={Number(timeDuration.minute) || 0}
            min={0}
            max={59}
            id={"minute"}
            {...register("minute")}
            className={"w-10 rounded-lg bg-gray-200 p-1 text-sm"}
          />
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <label htmlFor={"hours"}>الساعات</label>
          <input
            type={"number"}
            defaultValue={Number(timeDuration.hours) || 0}
            min={0}
            max={12}
            id={"hours"}
            {...register("hours")}
            className={"w-10 rounded-lg bg-gray-200 p-1 text-sm"}
          />
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <label htmlFor={"days"}>الأيام</label>
          <input
            type={"number"}
            defaultValue={Number(timeDuration.days) || 0}
            min={0}
            max={7}
            id={"days"}
            {...register("days")}
            className={"w-10 rounded-lg bg-gray-200 p-1 text-sm"}
          />
        </div>
      </div>
    </div>
  );
};

export default TestDuration;
