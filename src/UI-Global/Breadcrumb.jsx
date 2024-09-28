import { constraints } from '../config.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Arrow from '../../public/Icons/breadcrumb_arrow.svg';

function Breadcrumb({ page }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get('level') || '';
  const subLevel = searchParams.get('subLevel') || '';
  const groups = searchParams.get('group')?.split('_') || '';
  const navigate = useNavigate();
  if (level && subLevel && groups)
    return (
      <div className="my-3 mb-12 flex cursor-pointer gap-2 font-almaria-light" onClick={() => navigate('/dashboard/level?level=' + level)}>
        <button className="flex gap-1">
          <span>المراحل الدراسية</span>
          <Arrow />
        </button>
        <button className="flex gap-1">
          <span>{constraints[searchParams.get('level')].text}</span>
          <Arrow />
        </button>
        <button className="flex gap-1">
          <span>{constraints[level].content[+subLevel]}</span>
          <Arrow />
        </button>
        <button className="flex gap-1">
          <span>{groups.join(' / ')}</span>
          <Arrow />
        </button>
        <div className="flex gap-1 font-almaria-bold">
          <span>{page} </span>
        </div>
      </div>
    );
  return null;
}

export default Breadcrumb;
