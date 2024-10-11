import { Button } from './ui/button';

export default function PickDuration({ PopoverClose, timeDurationString, timeDuration, setTimeDuration, MINS, HOURS }) {
  const toggleAMPM = (mode) => {
    if (timeDuration.mode === mode) return;

    setTimeDuration({ ...timeDuration, mode });
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg">
      <div className="rounded-lg bg-accent-l-200 py-4 text-center font-almaria-bold text-2xl text-black">
        <div className="flex items-center justify-center gap-2">
          <div>
            <p className="text-4xl">{timeDuration.mode}</p>
          </div>
          <div>
            <p className="flex items-start justify-center gap-4 text-3xl">
              <div>
                <p>{timeDuration.minute}</p>
                <p className="text-sm">دقيقة</p>
              </div>
              <p className="text-5xl">:</p>
            </p>
          </div>
          <div>
            <div>
              <p className="text-3xl">{timeDuration.hour}</p>
              <p className="text-sm">{timeDuration.hour === 1 ? 'ساعة ' : timeDuration.hour === 2 ? 'ساعتان' : `ساعات`}</p>
            </div>
          </div>

          <div>
            <p className="flex items-start justify-center gap-4 text-3xl">
              <p className="text-5xl">:</p>
              <div>
                <p>{timeDuration.day}</p>
                <p className="text-sm">يوم</p>
              </div>
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 rounded-lg border p-2">
        <div className="flex-1 text-center">
          <p className="my-4 font-almaria-bold">الدقيقة</p>
          <div className="ltr grid grid-cols-3 gap-1">
            {MINS.map((minute) => (
              <Button variant="icon" key={minute.value} onClick={() => setTimeDuration({ ...timeDuration, minute: minute.value })} className={`rounded-md bg-accent-l-1100 ${timeDuration.minute === minute.value ? 'bg-secondary-l text-white' : ''}`}>
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
                  setTimeDuration({
                    ...timeDuration,
                    hour: hour.value,
                  })
                }
                className={`rounded-md bg-accent-l-1100 ${timeDuration.hour === hour.value ? 'bg-secondary-l text-white' : ''}`}
              >
                {hour.value}
              </Button>
            ))}
            <div className="col-span-3 flex gap-3">
              {['AM', 'PM'].map((mode) => (
                <Button key={mode} variant="ghost" onClick={() => toggleAMPM(mode)} className={`mt-2 flex-1 bg-accent-l-1100 ${timeDuration.mode === mode ? 'bg-secondary-l text-white hover:bg-secondary-l' : 'hover:bg-accent-l-1100'}`}>
                  {mode}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 block w-[2px] bg-accent-l-50"></div>
        <div className="flex-1 text-center">
          <p className="my-4 font-almaria-bold">اليوم</p>
          <div className="ltr grid grid-cols-3 gap-1">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((day) => (
              <Button variant="icon" key={day} onClick={() => setTimeDuration({ ...timeDuration, day: day })} className={`rounded-md bg-accent-l-1100 ${timeDuration.day === day ? 'bg-secondary-l text-white' : ''}`}>
                {day}
              </Button>
            ))}
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
