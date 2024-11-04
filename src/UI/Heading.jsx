function Heading({ as = "h1", className, children, ...props }) {
  const Component = as;
  const styles = {
    h1: "text-4xl font-Almaria-bold",
    h2: "text-3xl font-Almaria-bold",
    h3: "text-2xl font-Almaria-bold",
    h4: "text-xl font-Almaria-bold",
    h5: "text-lg font-Almaria-bold",
    h6: "text-base font-Almaria-bold",
  };
  return (
    <Component className={`${styles[as]} ${className}`} {...props}>
      {children}
    </Component>
  );
}

export default Heading;
