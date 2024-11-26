import LevelIcon from "/public/Icons/level_icon.svg";
import GroupIcon from "/public/Icons/group_icon.svg";
import QuestionIcon from "/public/Icons/question_icon.svg";
import FlagIcon from "/public/Icons/flag_icon.svg";
import PounsIcon from "/public/Icons/bouns_icon.svg";

function TestInfo() {
  return (
    <div className={"space-y-4"}>
      <input className={"w-full rounded-md border border-gray-300 p-2"} placeholder={"اسم الاختبار"} />
      <div className={"grid grid-cols-3 grid-rows-2 gap-4"}>
        <span className={"flex items-center gap-2"}>
          <LevelIcon />
          <span>{"المستوى"}</span>
        </span>
        <span className={"flex items-center gap-2"}>
          <GroupIcon />
          <span>{"المجموعة"}</span>
        </span>
        <span className={"flex items-center gap-2"}>
          <QuestionIcon />
          <span>{"عدد الأسئلة"}</span>
        </span>{" "}
        <span className={"flex items-center gap-2"}>
          <FlagIcon />
          <span>{"درجه"}</span>
        </span>
        <span className={"flex items-center gap-2"}>
          <PounsIcon />
          <span>{"بونص"}</span>
        </span>
      </div>
    </div>
  );
}

export default TestInfo;
