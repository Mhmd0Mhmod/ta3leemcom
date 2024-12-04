const Table = ({ className, children }) => (
  <>
    <table className={`relative min-w-full rounded-lg bg-white shadow-md ${className}`}>{children}</table>
  </>
);

const TableHead = ({ className, children }) => (
  <thead className={`bg-gray-100 ${className}`}>
    <tr>{children}</tr>
  </thead>
);

const TableRow = ({ children, className }) => <tr className={`border-b last:border-none hover:bg-gray-50 ${className}`}>{children}</tr>;

const TableCell = ({ children, colSpan, align = "left", className, ...props }) => (
  <td colSpan={colSpan} className={`px-6 py-3 text-${align} text-gray-700 ${className}`} {...props}>
    {children}
  </td>
);
const TableHeadCell = ({ colSpan, className, children }) => (
  <th colSpan={colSpan} className={`${className} px-6 py-3 text-gray-700`}>
    {children}
  </th>
);
const TableBody = ({ children }) => <tbody>{children}</tbody>;

export { Table, TableHead, TableRow, TableCell, TableBody, TableHeadCell };
