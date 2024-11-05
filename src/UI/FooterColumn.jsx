function FooterColumn({ title, className, children }) {
  return (
    <div className={`mt-14 ${className}`}>
      <h3 className={"mb-4 text-2xl"}>{title}</h3>
      {children}
    </div>
  );
}

function Description({ children }) {
  return <p className={"flex-grow"}>{children}</p>;
}

function List({ className, children }) {
  return (
    <ul className={`space-y-4 text-gray-600 ${className}`}>
      {children.map((child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
}

FooterColumn.Description = Description;
FooterColumn.List = List;
export default FooterColumn;
