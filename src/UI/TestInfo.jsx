import LevelIcon from "/public/Icons/level_icon.svg";
import GroupIcon from "/public/Icons/group_icon.svg";
import QuestionIcon from "/public/Icons/question_icon.svg";
import FlagIcon from "/public/Icons/flag_icon.svg";
import PounsIcon from "/public/Icons/bouns_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../Reducers/testReducer";
import { useGroups } from "../Features/Dashboard/useGroups";
import { useParams } from "react-router-dom";
import { useLevels } from "../Features/Dashboard/useLevels";
import Loading from "./Loading";

function TestInfo() {
  const dispatch = useDispatch();
  const { levelYearId, groupsId } = useParams();
  const test = useSelector((state) => state.test);
  const { groups: allGroups, isLoading } = useGroups();
  const { levels } = useLevels();
  if (isLoading) return <Loading />;
  const groups = allGroups?.filter((group) => groupsId.includes(group.id));
  const allLevels = Object.values(levels).flat();
  const levelName = allLevels.find((level) => level.id === +levelYearId)?.name;
  const { name, questions, mark, bonus } = test;
  const onChange = (e) => {
    dispatch(setTitle(e.target.value));
  };

  return (
    <div className={"space-y-4"}>
      <input className={"w-full rounded-md border border-gray-300 p-2"} placeholder={"اسم الاختبار"} value={name} onChange={onChange} />
      <div className={"grid grid-cols-3 grid-rows-2 gap-6"}>
        <span className={"flex items-center gap-2"}>
          <LevelIcon />
          <span>{levelName}</span>
        </span>
        <div>
          <span className={"peer flex items-center gap-2 duration-500"}>
            <GroupIcon />
            <span>{"المجموعات"}</span>
          </span>
          <ul className={"absolute hidden flex-col divide-y-2 divide-gray-300 rounded-md bg-gray-200 p-2 shadow-2xl peer-hover:flex"}>
            {groups.map((group) => (
              <li key={group.id}>{group.name}</li>
            ))}
          </ul>
        </div>
        <span className={"flex items-center gap-2"}>
          <QuestionIcon />
          <span>
            {questions.length} {"سؤال"}
          </span>
        </span>
        <span className={"flex items-center gap-2"}>
          <FlagIcon />
          <span>{mark} درجه</span>
        </span>
        <span className={"flex items-center gap-2"}>
          <PounsIcon />
          <span>{bonus} بونص</span>
        </span>
      </div>
    </div>
  );
}

export default TestInfo;
