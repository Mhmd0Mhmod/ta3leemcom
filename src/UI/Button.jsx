// Button.defaultValues = {
//   type: 'primary',
//   className: '',
//   icon: null,
//   children: null,
// }

function Button({ type, children, formType, ...props }) {
  const typeClassMap = {
    primary: "btn-primary",
    blue: "btn-blue",
    Secondary: "btn-Secondary-500",
    danger: "btn-danger",
    success: "btn-success",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light text-black",
    dark: "btn-dark",
    outlinePrimary: "btn-outline-primary border border-primary",
    outlineBlue: "btn-outline-blue",
    transparent: "btn-transparent",
    normal: "btn-normal",
  };

  props.className += ` btn ${typeClassMap[type] || "btn-primary"}`;

  return (
    <button {...props} type={formType}>
      {children}
    </button>
  );
}

export default Button;
