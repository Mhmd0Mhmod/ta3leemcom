import { useParams, useSearchParams } from 'react-router-dom';
import { FakeGroups, LEVELS } from '../../config.js';
import { useState } from 'react';

function GroupDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = useParams();
  console.log(param);

  const { id: groupID } = useParams();

  const group = FakeGroups.find((el) => el.id == groupID);
  const [groupName, setGroupName] = useState(group.name);
  const [level, setLevel] = useState(LEVELS.levels[0]);
  const [subLevel, setSubLevel] = useState(LEVELS.primary[0]);
  if (!group) return null;
  return (
    <>
      <div>
        <h3 className="mt-6 font-almaria-bold text-3xl"> المجموعة</h3>
        <div className="mb-8 mt-6 flex gap-6">
          <button className={`h-10 w-28 rounded-lg bg-[#0884A2] text-xl text-white`} onClick={() => setSearchParams({ tab: 'editGroup', groupID })}>
            تعديل
          </button>
          <button className={`h-10 w-28 rounded-lg bg-[#F54547] text-xl text-white`}>حذف</button>
        </div>
        <form action="">
          <h3 className="mb-4 font-almaria-bold text-lg"> اسم المجموعة</h3>
          <input type="text" className="h-10 w-[43.75rem] bg-[#EFEFEF] p-2" disabled value={groupName} />
          <div className="mt-10 flex gap-10">
            <div>
              <h3 className="mb-4 mt-8 font-almaria-bold text-lg">المرحلة الدراسية</h3>
              <input type="text" className="h-10 w-52 bg-[#EFEFEF] p-2" value={level} />
            </div>
            <div>
              <h3 className="mb-4 mt-8 font-almaria-bold text-lg"> الصف الدراسي</h3>
              <input type="text" className="h-10 w-52 bg-[#EFEFEF] p-2" value={subLevel} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default GroupDetails;
