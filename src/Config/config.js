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

export function print(id) {
  const printableElement = document.getElementById(id);
  const printWindow = window.open("", "_blank");

  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(`
      <html dir="rtl">
        <head>
          <title>Print</title>
          <!-- Include TailwindCSS from CDN -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">

          <!-- Include your custom print styles -->
          <link rel="stylesheet" href="/style/print.css">
          <link rel="stylesheet" href="/../src/Styles/index.css">
          <link rel="stylesheet" href="/../src/Styles/fonts.css">
          <style>
            /* Add additional inline styles for debugging */
            body {
              font-family: Arial, sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              /* Debug visibility if needed */
              .hidden { display: none; }
            }
          </style>
        </head>
        <body>${printableElement.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();

    // Ensure CSS is loaded before printing
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }
}
