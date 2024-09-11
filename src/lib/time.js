export function formatTimeUnit(value) {
 return value.toString().padStart(2, "0");
}

export function convertTo12HourFormat(hour, minute, day) {
 const isPM = hour >= 12;
 const formattedHour = hour % 12 || 12; // Convert 0 to 12 for midnight, and 13+ to 1-11 for PM
 const mode = isPM ? "PM" : "AM";

 const result = {
  hour: formatTimeUnit(formattedHour),
  minute: formatTimeUnit(minute),
  mode,
 };

 if (typeof day === "number") {
  let totalMinutes = hour * 60 + minute;
  let duration;

  if (totalMinutes < 60) {
   duration = `${totalMinutes} دقيقة`;
  } else if (totalMinutes === 60) {
   duration = "ساعة واحدة";
  } else {
   const hours = Math.floor(totalMinutes / 60);
   const minutes = totalMinutes % 60;

   if (hours === 1) {
    duration = minutes > 0 ? `ساعة واحدة و ${minutes} دقيقة` : `ساعة واحدة`;
   } else if (hours === 2) {
    duration = minutes > 0 ? `ساعتان و ${minutes} دقيقة` : `ساعتان`;
   } else {
    duration =
     minutes > 0 ? `${hours} ساعات و ${minutes} دقيقة` : `${hours} ساعات`;
   }
  }

  result.day = day;
  result.duration = duration;
 }

 return result;
}
