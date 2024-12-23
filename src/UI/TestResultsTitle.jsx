import Image from "/public/imgs/icon-business-target-project-tasks-list-time.png";
import { useTestDesc } from "../Features/TestResults/useTestDesc";
import Loading from "./Loading";
import Heading from "./Heading";
import StudentsIcon from "/public/Icons/students_white_icon.svg";
import { HiOutlineChartPie } from "react-icons/hi";
import QuestionsIcon from "/public/Icons/question_white_icon.svg";
import Bouns from "/public/Icons/bouns_white_icon.svg";
import Flag from "/public/Icons/flag_white_icon.svg";
import { Link, useLocation } from "react-router-dom";
import { LiaUserTimesSolid } from "react-icons/lia";
import { LucideClipboardList } from "lucide-react";
function TestResultsTitle() {
  const { testDesc, isLoading, error } = useTestDesc();
  const pathName = useLocation().pathname.split("/");
  const current = pathName.pop();
  if (isLoading) return <Loading />;
  const { bounce, title, numQuestions, numStuedntsNotSolveQuiz, numStuedntsSolveQuiz, mark } = testDesc;

  return (
    <div className="flex items-center whitespace-nowrap rounded-md bg-Secondary-500 px-2 py-4 text-white shadow-md">
      <div className="max-w-64 opacity-20">
        <img src={Image} alt="Test Results" className="w-full" />
      </div>
      <div className="flex flex-grow flex-col items-center justify-evenly gap-4">
        <Heading as="h2">{title}</Heading>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              title: "طالب",
              value: numStuedntsSolveQuiz + numStuedntsNotSolveQuiz,
              Icon: StudentsIcon,
            },
            {
              title: "طالب لم يشارك",
              value: numStuedntsNotSolveQuiz,
              Icon: LiaUserTimesSolid,
            },
            {
              title: "سؤال",
              value: numQuestions,
              Icon: QuestionsIcon,
            },
            {
              title: "بونص",
              value: bounce,
              Icon: Bouns,
            },
            {
              title: "درجه",
              value: mark,
              Icon: Flag,
            },
          ].map(({ title, value, Icon }, i) => {
            return (
              <div className="flex items-center gap-2" key={`${title}-${i}`}>
                <Icon className="w-10" />
                <span className="mx-1">{value}</span>
                <span>{title}</span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          {[
            {
              to: "students-not-attempted",
              Icon: LiaUserTimesSolid,
              title: "الطلاب الغير مشاركين",
            },
            {
              to: "students-result",
              Icon: LucideClipboardList,
              title: "النتائج",
            },
            {
              to: "statistics",
              Icon: HiOutlineChartPie,
              title: "الاحصائيات",
            },
          ].map(({ to, Icon, title }, i) => {
            return (
              <Link
                to={`${pathName.join("/")}/${to}`}
                key={`${to}-${i}`}
                className={`flex items-center gap-2 rounded-md px-2 py-1 text-white ${current === to ? "bg-black text-white" : "bg-white !text-black"} `}
              >
                <Icon alt={title} />
                <span>{title}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="max-w-64 opacity-20">
        <img src={Image} alt="Test Results" className="w-full" />
      </div>
    </div>
  );
}
export default TestResultsTitle;
