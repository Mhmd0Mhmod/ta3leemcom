import PopUp from '@/UI-Global/PopUp';
import { Ban, CircleCheckBig, TriangleAlert, X } from 'lucide-react';
import { useEffect } from 'react';

const Alert = ({ type = 'success', title, children, open, setOpen, className, navigate  ,edit }) => {
  const colors = {
    success: 'border-[#76D8A3] bg-[#F2FFF7] text-[#2DC071]',
    error: 'border-[#DF1E1E] bg-[#FFDEDE] text-[#E0232E]  ',
    warning: 'bg-[#FFF6EF] text-[#E77C40]  border-[#E77C40]',
  };

  // useEffect(() => {
  //   if (open) {
  //     setTimeout(() => {
  //       setOpen(false);
  //     }, 7000);
  //   }
  // }, [open]);

  return (
    <PopUp className={`${open ? 'right-5 opacity-100' : 'pointer-events-none -right-full opacity-0'} ${colors[type]} absolute bottom-5 z-[999] flex w-[500px] max-w-full items-center gap-5 rounded-sm duration-500 ${className}`}>
      <span>{type === 'error' ? <Ban /> : type === 'success' ? <CircleCheckBig /> : type === 'warning' ? <TriangleAlert /> : null}</span>
      <p className="me-auto text-lg font-bold">{children ?? title}</p>
      {navigate && (
        <button
          className="border-b border-black"
          onClick={() => {
            navigate();
            setOpen(false);
          }}
        >
          عرض
        </button>
        

      )}
         {edit && (
        <button
          className="border-b border-black text-zinc-700"
          onClick={() => {
            edit();
            setOpen(false);
          }}
        >
          تعديل
        </button>
        

      )}
      
      <span className="cursor-pointer" onClick={() => setOpen(false)}>
        <X size="25px" className={`rounded-full border p-1 text-lg ${colors[type]}`} />
      </span>
    </PopUp>
  );
};

export default Alert;