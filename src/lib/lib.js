export function getYearMonths() {
  let months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(0, i);
    return {
      name: new Intl.DateTimeFormat("ar", { month: "long" }).format(date),
      year: new Date().getFullYear(),
    };
  });
  return [...months];
}
