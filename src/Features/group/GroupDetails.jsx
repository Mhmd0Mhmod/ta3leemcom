import { useSearchParams } from "react-router-dom";
import { FakeGroups, LEVELS } from "../../config.js";
import { useState } from "react";

function GroupDetails({}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const groupID = searchParams.get("groupID");
  const group = FakeGroups.find(el => el.id == groupID)
  const [groupName,setGroupName] = useState(group.name)
  const [level , setLevel] = useState(LEVELS.levels[0])
  const [subLevel , setSubLevel] = useState(LEVELS.primary[0])
  if (!group) return null;
  return <>
    <div>
              <h3 className="text-3xl font-almaria-bold mt-6"> المجموعة</h3>
              <div className="flex gap-6 mt-6 mb-8">
                <button className={`bg-[#0884A2] text-white rounded-lg w-28 h-10 text-xl`}
                  onClick={()=>setSearchParams({tab:"editGroup" ,groupID})}
                >تعديل</button>
                <button className={`bg-[#F54547] text-white rounded-lg w-28 h-10 text-xl`}>حذف</button>
              </div>
              <form action="">
                <h3 className="text-lg font-almaria-bold mb-4"> اسم المجموعة</h3>
                <input type="text" className="bg-[#EFEFEF] w-[43.75rem] h-10 p-2" value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
                <div className="flex gap-10 mt-10">
                  <div>
                    <h3 className="text-lg font-almaria-bold mt-8 mb-4">المرحلة الدراسية</h3>
                    <input type="text" className="bg-[#EFEFEF] w-52 h-10 p-2" value={level} onChange={(e)=>setLevel(e.target.value)}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-almaria-bold mt-8 mb-4"> الصف الدراسي</h3>
                    <input type="text" className="bg-[#EFEFEF] w-52 h-10 p-2" value={subLevel} onChange={(e)=>setSubLevel(e.target.value)}/>
                  </div>
                </div>
              </form>
            </div>
  </>;
}

export default GroupDetails;
