import { Button } from './ui/button';

export default function PickTime({ PopoverClose, timeStartString, timeStart, setTimeStart, MINS, HOURS }) {
  const toggleAMPM = (mode) => {
    // if (timeStart.mode === mode) return;
    setTimeStart({ ...timeStart, mode });
  };

  // console.log(timeStart);

  return (
    <div className="flex flex-col gap-2 rounded-lg">
      <div className="ltr rounded-lg bg-accent-l-200 py-4 text-center font-almaria-bold text-2xl text-black">
        <span>
          {timeStartString.hour}:{timeStartString.minute} {timeStart.mode}
        </span>
      </div>
      <div className="flex gap-2 rounded-lg border p-2">
        <div className="flex-1 text-center">
          <p className="my-4 font-almaria-bold">الدقيقة</p>
          <div className="ltr grid grid-cols-3 gap-1">
            {MINS.map((minute) => (
              <Button variant="icon" key={minute.value} onClick={() => setTimeStart({ ...timeStart, minute: minute.value })} className={`rounded-md bg-accent-l-1100 ${timeStart.minute === minute.value ? 'bg-secondary-l text-white' : ''}`}>
                {minute.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-12 block w-[2px] bg-accent-l-50"></div>
        <div className="flex-1 text-center">
          <p className="my-4 font-almaria-bold">الساعة</p>
          <div className="ltr grid grid-cols-3 gap-1">
            {HOURS.map((hour) => (
              <Button
                variant="icon"
                key={hour.value}
                onClick={() =>
                  setTimeStart({
                    ...timeStart,
                    hour: hour.value,
                  })
                }
                className={`rounded-md bg-accent-l-1100 ${timeStart.hour === hour.value ? 'bg-secondary-l text-white' : ''}`}
              >
                {hour.value}
              </Button>
            ))}
            <div className="col-span-3 flex gap-3">
              {['AM', 'PM'].map((mode) => (
                <Button key={mode} variant="ghost" onClick={() => toggleAMPM(mode)} className={`mt-2 flex-1 bg-accent-l-1100 ${timeStart.mode === mode ? 'bg-secondary-l text-white hover:bg-secondary-l' : 'hover:bg-accent-l-1100'}`}>
                  {mode}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <PopoverClose className="flex-1 rounded-lg bg-secondary-l">
          <Button variant="ghost" className="w-full text-white hover:bg-secondary-l">
            حفظ
          </Button>
        </PopoverClose>

        <PopoverClose className="flex-1 rounded-lg bg-accent-l-1200">
          <Button variant="ghost" className="w-full text-[#878787] hover:bg-accent-l-1200">
            الغاء
          </Button>
        </PopoverClose>
      </div>
    </div>
  );
}
