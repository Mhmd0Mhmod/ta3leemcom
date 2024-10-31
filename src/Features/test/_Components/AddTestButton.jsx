import { Button } from '/src/components/ui/button.jsx';
import Plus from '/public/Icons/plus.svg';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddTestButton() {
  const { groupsId } = useParams();
  const [opeList, setOpeList] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Button variant="ghost" size="lg" className={'relative flex gap-4 bg-secondary-l px-4 py-7 font-almaria text-2xl text-white hover:bg-secondary-l hover:text-white'} onClick={() => setOpeList((prev) => !prev)}>
        <Plus />
        <span>اضافة اختبار</span>
        <div className={`absolute -left-36 top-0 mt-4 w-32 text-black opacity-0 transition-all duration-300 ${opeList ? 'opacity-100' : 'pointer-events-none'}`}>
          <ul
            onClick={(event) => event.stopPropagation()} // Prevent click event from propagating
            className="flex flex-col gap-1 font-almaria text-lg"
          >
            <li
              className="rounded-xl border bg-white px-2 py-1 duration-300 hover:bg-gray-300"
              onClick={() => {
                navigate(`/dashboard/level/test/${groupsId}/createOnline`);
              }}
            >
              اونلاين
            </li>
            <li
              className="rounded-xl border bg-white px-2 py-1 duration-300 hover:bg-gray-300"
              onClick={() => {
                navigate(`/dashboard/level/test/${groupsId}/createOffline`);
              }}
            >
              اوفلاين
            </li>
          </ul>
        </div>
      </Button>
    </>
  );
}
export default AddTestButton;
