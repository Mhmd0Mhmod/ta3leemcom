export default function Heading({ as, children, className = '', onClick }) {
  switch (as) {
    case 'h1':
      return (
        <h1 className={`text-4xl ${className}`} onClick={onClick}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={`text-2xl ${className}`} onClick={onClick}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={`text-xl ${className}`} onClick={onClick}>
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4 className={`text-lg ${className}`} onClick={onClick}>
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5 className={`text-base ${className}`} onClick={onClick}>
          {children}
        </h5>
      );
    case 'h6':
      return (
        <h6 className={`text-sm ${className}`} onClick={onClick}>
          {children}
        </h6>
      );
  }
}
