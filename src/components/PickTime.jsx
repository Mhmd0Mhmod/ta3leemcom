import { Button } from "./ui/Button";

export default function PickTime({
 PopoverClose,
 timeStartString,
 timeStart,
 setTimeStart,
 MINS,
 HOURS,
}) {
 const toggleAMPM = (mode) => {
  if (timeStart.mode === mode) return;

  const newHour =
   mode === "PM" && timeStart.hour < 12
    ? timeStart.hour + 12
    : mode === "AM" && timeStart.hour >= 12
    ? timeStart.hour - 12
    : timeStart.hour;

  setTimeStart({ ...timeStart, hour: newHour, mode });
 };

 return (
  <div className="flex flex-col gap-2 rounded-lg">
   <div className="text-center text-black font-almaria-bold text-2xl ltr bg-accent-l-200 rounded-lg py-4">
    <span>
     {timeStartString.hour}:{timeStartString.minute} {timeStartString.mode}
    </span>
   </div>
   <div className="flex gap-2 border rounded-lg p-2">
    <div className="text-center flex-1">
     <p className="font-almaria-bold my-4">الدقيقة</p>
     <div className="grid grid-cols-3 gap-1 ltr">
      {MINS.map((minute) => (
       <Button
        variant="icon"
        key={minute.value}
        onClick={() => setTimeStart({ ...timeStart, minute: minute.value })}
        className={`rounded-md bg-accent-l-1100 ${
         timeStart.minute === minute.value ? "bg-secondary-l text-white" : ""
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
         setTimeStart({
          ...timeStart,
          hour: (hour.value % 12) + (timeStart.mode === "PM" ? 12 : 0),
         })
        }
        className={`rounded-md bg-accent-l-1100 ${
         timeStart.hour % 12 === hour.value % 12
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
          timeStart.mode === mode
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
