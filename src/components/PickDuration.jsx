import { Button } from "./ui/button";

export default function PickDuration({
 PopoverClose,
 timeDurationString,
 timeDuration,
 setTimeDuration,
 MINS,
 HOURS,
}) {
 const toggleAMPM = (mode) => {
  if (timeDuration.mode === mode) return;

  const newHour =
   mode === "PM" && timeDuration.hour < 12
    ? timeDuration.hour + 12
    : mode === "AM" && timeDuration.hour >= 12
    ? timeDuration.hour - 12
    : timeDuration.hour;

  setTimeDuration({ ...timeDuration, hour: newHour, mode });
 };

 return (
  <div className="flex flex-col gap-2 rounded-lg">
   <div className="text-center text-black font-almaria-bold text-2xl bg-accent-l-200 rounded-lg py-4">
    <div className="flex items-center gap-2 justify-center ">
     <div>
      <p className="text-4xl">{timeDurationString.mode}</p>
     </div>
     <div>
      <p className="text-3xl flex items-start justify-center gap-4">
       <div>
        <p>{timeDuration.minute}</p>
        <p className="text-sm">دقيقة</p>
       </div>
       <p className="text-5xl">:</p>
      </p>
     </div>
     <div>
      <div>
       <p className="text-3xl ">{timeDuration.hour}</p>
       <p className="text-sm">
        {timeDuration.hour === 1
         ? "ساعة "
         : timeDuration.hour === 2
         ? "ساعتان"
         : `ساعات`}
       </p>
      </div>
     </div>

     <div>
      <p className="text-3xl flex items-start justify-center gap-4">
       <p className="text-5xl">:</p>
       <div>
        <p>{timeDuration.day}</p>
        <p className="text-sm">يوم</p>
       </div>
      </p>
     </div>
    </div>
   </div>
   <div className="flex gap-4 border rounded-lg p-2">
    <div className="text-center flex-1">
     <p className="font-almaria-bold my-4">الدقيقة</p>
     <div className="grid grid-cols-3 gap-1 ltr">
      {MINS.map((minute) => (
       <Button
        variant="icon"
        key={minute.value}
        onClick={() =>
         setTimeDuration({ ...timeDuration, minute: minute.value })
        }
        className={`rounded-md bg-accent-l-1100 ${
         timeDuration.minute === minute.value ? "bg-secondary-l text-white" : ""
        }`}
       >
        {minute.label}
       </Button>
      ))}
     </div>
    </div>
    <div className="block w-[2px] mt-12 bg-accent-l-50"></div>
    <div className="text-center flex-1">
     <p className="font-almaria-bold my-4">الساعة</p>
     <div className="grid grid-cols-3 gap-1 ltr">
      {HOURS.map((hour) => (
       <Button
        variant="icon"
        key={hour.value}
        onClick={() =>
         setTimeDuration({
          ...timeDuration,
          hour: (hour.value % 12) + (timeDuration.mode === "PM" ? 12 : 0),
         })
        }
        className={`rounded-md bg-accent-l-1100 ${
         timeDuration.hour % 12 === hour.value % 12
          ? "bg-secondary-l text-white"
          : ""
        }`}
       >
        {hour.value}
       </Button>
      ))}
      <div className="flex col-span-3 gap-3">
       {["AM", "PM"].map((mode) => (
        <Button
         key={mode}
         variant="ghost"
         onClick={() => toggleAMPM(mode)}
         className={`bg-accent-l-1100 flex-1 mt-2 ${
          timeDuration.mode === mode
           ? "bg-secondary-l text-white hover:bg-secondary-l"
           : "hover:bg-accent-l-1100"
         }`}
        >
         {mode}
        </Button>
       ))}
      </div>
     </div>
    </div>
    <div className="block w-[2px] mt-12 bg-accent-l-50"></div>
    <div className="text-center flex-1">
     <p className="font-almaria-bold my-4">اليوم</p>
     <div className="grid grid-cols-3 gap-1 ltr">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((day) => (
       <Button
        variant="icon"
        key={day}
        onClick={() => setTimeDuration({ ...timeDuration, day: day })}
        className={`rounded-md bg-accent-l-1100 ${
         timeDuration.day === day ? "bg-secondary-l text-white" : ""
        }`}
       >
        {day}
       </Button>
      ))}
     </div>
    </div>
   </div>
   <div className="flex gap-4">
    <PopoverClose className="bg-secondary-l flex-1 rounded-lg">
     <Button
      variant="ghost"
      className="w-full hover:bg-secondary-l text-white "
     >
      حفظ
     </Button>
    </PopoverClose>

    <PopoverClose className="bg-accent-l-1200 flex-1 rounded-lg">
     <Button
      variant="ghost"
      className="w-full hover:bg-accent-l-1200 text-[#878787] "
     >
      الغاء
     </Button>
    </PopoverClose>
   </div>
  </div>
 );
}
