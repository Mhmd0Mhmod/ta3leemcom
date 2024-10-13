export default function Button({ children, type = 'primary', className, icon = false, iconStyle, circle = false, onClick, disabled }) {
  let style = `rounded-lg  px-6 py-2 text-2xl min-w-40 border border-primary-l ${className} font-almaria `;

  if (type === 'primary') {
    if (icon) {
      return (
        <button disabled={disabled} onClick={onClick} className={`flex gap-1 bg-primary-l px-2 text-white disabled:cursor-not-allowed ${style}`}>
          <span className={iconStyle}>{icon}</span>
          <span>{children}</span>
        </button>
      );
    }
    return (
      <button disabled={disabled} onClick={onClick} className={`bg-primary-l text-white disabled:cursor-not-allowed ${style}`}>
        {children}
      </button>
    );
  }
  if (type === 'outline') {
    if (icon) {
      return (
        <button disabled={disabled} onClick={onClick} className={`py- flex items-center gap-2 rounded-lg border border-accent-l-400 px-2 text-accent-l-400 disabled:cursor-not-allowed ${className} `}>
          <span>{children}</span>
          <span className={iconStyle}>{icon}</span>
        </button>
      );
    }
    return (
      <button disabled={disabled} onClick={onClick} className={`border-primary-ldisabled:cursor-not-allowed border text-primary-l transition-all duration-500 hover:bg-primary hover:text-white ${style}`}>
        {children}
      </button>
    );
  }
  if (type === 'outlineSecondary') {
    return (
      <button disabled={disabled} onClick={onClick} className={`min-w-40 rounded-lg px-6 py-2 text-2xl transition-all duration-500 disabled:cursor-not-allowed ${className}`}>
        {children}
      </button>
    );
  }
  if (type === 'Secondary') {
    if (icon) {
      return (
        <button disabled={disabled} onClick={onClick} className={`flex items-center justify-between gap-4 border-none bg-secondary px-[12px] text-white disabled:cursor-not-allowed ${style}`}>
          <span className={iconStyle}>{icon}</span>
          <span className="mx-2">{children}</span>
        </button>
      );
    }
    return (
      <button disabled={disabled} onClick={onClick} className={`border-0 bg-[#0462CF] text-white disabled:cursor-not-allowed ${style}`}>
        {children}
      </button>
    );
  }
  if (type === 'ghost') {
    return (
      <button disabled={disabled} onClick={onClick} className={`text-primary-l disabled:cursor-not-allowed ${style} `}>
        {children}
      </button>
    );
  }
  if (type === 'normal') {
    return (
      <button disabled={disabled} onClick={onClick} className={`border-secondary-l text-secondary-l disabled:cursor-not-allowed ${circle ? 'rounded-[50px]' : 'rounded-xl'} ${style} font-almaria`}>
        {children}
      </button>
    );
  }
  if (type === 'store') {
    return (
      <button disabled={disabled} onClick={onClick} className={`flex h-[83px] w-[239px] items-center justify-center gap-12 rounded-[7px] border-[1px] border-[#CCCCCC] bg-[#F4F4F4] px-[10px] py-[14px] font-cairo text-[15px] shadow-xl disabled:cursor-not-allowed`}>
        <span>{children}</span>
        <img src={icon} alt="" />
      </button>
    );
  }
  if (type === 'icon') {
    return (
      <button disabled={disabled} onClick={onClick} className={`rounded-md border border-accent-l-50 p-1 disabled:cursor-not-allowed ${className} hover:bg-accent-1200 transition-all duration-300`}>
        <span>{children}</span>
      </button>
    );
  }
}
