export function convertArabicMonthAndYearToDate(arabic_month, year) {
  const months_map = {
    يناير: 0,
    فبراير: 1,
    مارس: 2,
    أبريل: 3,
    مايو: 4,
    يونيو: 5,
    يوليو: 6,
    أغسطس: 7,
    سبتمبر: 8,
    أكتوبر: 9,
    نوفمبر: 10,
    ديسمبر: 11,
  };

  const month = months_map[arabic_month];
  if (month === undefined) {
    throw new Error("Invalid Arabic month name");
  }

  const date = new Date(year, month, 1); // Day is set to 1
  return date;
}

// Levels
export const MainLevels = [
  {
    id: 1,
    name: "المرحله الابتدائيه",
  },
  {
    id: 2,
    name: "المرحله الاعداديه",
  },
  {
    id: 3,
    name: "المرحله الثانويه",
  },
];

export const translateToArabic = (english) => {
  const lowerCase = english.toLowerCase();
  const map = {
    primary: "المرحله الابتدائيه",
    middle: "المرحله الاعداديه",
    high: "المرحله الثانويه",
    online: "اونلاين",
    offline: "اوفلاين",
    ended: "انتهي",
    started: "جاري",
    solved: "تم الحل",
    "not solved": "لم يتم الحل",
    send: "ارسال",
    delete: "حذف",
    edit: "تعديل",
    test: "اختبار",
    training: "تدريب",
    question: "سؤال",
    answer: "اجابه",
    true: "صح",
    false: "خطأ",
    single: "اختيار واحد",
    multiple: "اختيارات متعدده",
    text: "نص",
    image: "صوره",
  };

  return map[lowerCase];
};
