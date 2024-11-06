// Button.defaultValues = {
//   type: 'primary',
//   className: '',
//   icon: null,
//   children: null,
// }

function Button({ type, children, ...props }) {
  const typeClassMap = {
    primary: "btn-primary",
    Secondary: "btn-Secondary-500",
    danger: "btn-danger",
    success: "btn-success",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light text-black",
    dark: "btn-dark",
    outlinePrimary: "btn-outline-primary border border-primary",
    transparent: "btn-transparent",
    normal: "btn-normal",
  };

  props.className += ` btn ${typeClassMap[type] || "btn-primary"}`;

  return <button {...props}>{children}</button>;
}

export default Button;
