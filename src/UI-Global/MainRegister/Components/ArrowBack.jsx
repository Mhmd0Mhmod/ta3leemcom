import  Arrow from '/public/Icons/arrow-back.svg'
import { useNavigate } from 'react-router-dom';
import { handleBack } from '@/lib/helpers.js';

function ArrowBack() {
 return (
  <Arrow onClick={handleBack} />
 );}

export default ArrowBack;