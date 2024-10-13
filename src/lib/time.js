export function formatTimeUnit(value) {
  return value.toString().padStart(2, '0');
}

export function convertTo12HourFormat(hour, minute, day) {
  const isPM = hour >= 12;
  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for midnight, and 13+ to 1-11 for PM
  const mode = isPM ? 'PM' : 'AM';

  const result = {
    hour: formatTimeUnit(formattedHour),
    minute: formatTimeUnit(minute),
    mode,
  };

  if (typeof day === 'number') {
    let totalMinutes = hour * 60 + minute;
    let duration;

    if (totalMinutes < 60) {
      duration = `${totalMinutes} دقيقة`;
    } else if (totalMinutes === 60) {
      duration = 'ساعة';
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (hours === 1) {
        duration = minutes > 0 ? `ساعة و ${minutes} دقيقة` : `ساعة`;
      } else if (hours === 2) {
        duration = minutes > 0 ? `ساعتان و ${minutes} دقيقة` : `ساعتان`;
      } else {
        duration = minutes > 0 ? `${hours} ساعات و ${minutes} دقيقة` : `${hours} ساعات`;
      }
    }

    result.day = day;
    result.duration = duration;
  }

  return result;
}
export function parseISODateString(isoString) {
  const date = new Date(isoString);
  if (isNaN(date)) {
    throw new Error('Invalid ISO date string');
  }
  const day = formatTimeUnit(date.getDate());
  const month = formatTimeUnit(date.getMonth() + 1); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
export function parseISOTimeString(isoString) {
  const date = new Date(isoString);
  if (isNaN(date)) {
    throw new Error('Invalid ISO date string');
  }
  const hour = date.getHours();
  const minute = formatTimeUnit(date.getMinutes());
  const isPM = hour >= 12;
  const formattedHour = formatTimeUnit(hour % 12 || 12); // Convert 0 to 12 for midnight, and 13+ to 1-11 for PM
  const mode = isPM ? 'PM' : 'AM';

  return `${formattedHour}:${minute} ${mode}`;
}
export function durationToArabic(duration) {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);

  let arabicDuration;
  if (totalMinutes < 60) {
    arabicDuration = `${totalMinutes} دقيقة`;
  } else if (totalMinutes === 60) {
    arabicDuration = 'ساعة';
  } else {
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    if (totalHours === 1) {
      arabicDuration = remainingMinutes > 0 ? `ساعة و ${Math.round(remainingMinutes)} دقيقة` : `ساعة`;
    } else if (totalHours === 2) {
      arabicDuration = remainingMinutes > 0 ? `ساعتان و ${Math.round(remainingMinutes)} دقيقة` : `ساعتان`;
    } else {
      arabicDuration = remainingMinutes > 0 ? `${Math.round(totalHours)} ساعات و ${Math.round(remainingMinutes)} دقيقة` : `${Math.round(totalHours)} ساعات`;
    }
  }

  return arabicDuration;
}
