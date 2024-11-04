function FooterColumn({ title, className, children }) {
  return (
    <div className={`mt-14 ${className}`}>
      <h3 className={"text-2xl mb-4 "}>{title}</h3>
      {children}
    </div>
  );
}

function Description({ children }) {
  return <p className={"flex-grow"}>{children}</p>;
};

function List({ className, children }) {
  console.log(children);
  return <ul className={`text-gray-600 space-y-4 ${className}`}>{children.map((child, index) => <li key={index}>{child}</li>)}</ul>;
}

FooterColumn.Description = Description;
FooterColumn.List = List;
export default FooterColumn;