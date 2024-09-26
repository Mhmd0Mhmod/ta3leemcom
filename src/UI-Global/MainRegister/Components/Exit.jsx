import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import  ExitIcon from '/public/Icons/exit.svg';
function Exit() {
  const[searchParma,setSearchParmas]=useSearchParams();
 return (
   <ExitIcon
     alt={'exitIcon'}
     className={'cursor-pointer'}
     onClick={(e) => {
       e.preventDefault();
       setSearchParmas({});
     }}
   />
 );}

export default Exit;