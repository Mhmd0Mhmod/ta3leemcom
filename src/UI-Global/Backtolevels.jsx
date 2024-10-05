import Heading from './Heading.jsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Arrow from '../../public/Icons/rev_arrow.svg';
function Backtolevels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const backToLevel = () => {
    navigate(`/dashboard/level?level=${searchParams.get('level')}`);
  };

  return (
    <button className="flex gap-1" onClick={backToLevel}>
      <Arrow />
      <Heading as={'h3'} className={'font-almaria-bold text-secondary-l underline'}>
        العوده الي المراحل الدراسية
      </Heading>
    </button>
  );
}

export default Backtolevels;
