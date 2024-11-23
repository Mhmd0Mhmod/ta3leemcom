export function getYearMonths() {
  let months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(0, i);
    return {
      id: i,
      name: new Intl.DateTimeFormat("ar", { month: "long" }).format(date),
      year: new Date().getFullYear(),
    };
  });
  return [...months];
}
export const formatMonthInArabic = (year, month) => {
  const date = new Date(`${year}-${month}-01`);
  return new Intl.DateTimeFormat("ar-EG", { month: "long" }).format(date);
};
