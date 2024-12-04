import { Link } from "react-router-dom";
import Heading from "./Heading";
import Question from "/public/Icons/question_icon.svg";
import Bouns from "/public/Icons/bouns_icon.svg";
import Point from "/public/Icons/flag_icon.svg";
import { format, formatDate } from "date-fns";
import { translateToArabicDate } from "../lib/lib.js";

function CurrentTest({ test }) {
  return (
    <div className="flex flex-grow flex-col items-center justify-between gap-8 rounded-md bg-white p-8 sm:flex-row">
      <div className="flex flex-col justify-between gap-8">
        <div className="flex items-center justify-between gap-5">
          <Heading as={"h4"}>{test.title}</Heading>
          {test.quizStatus === "Started" ? (
            <Link to={`/SDashboard/test/${test.quizId}`} className="rounded-md bg-Secondary-500 px-4 py-2 text-white">
              بدأ الاختبار
            </Link>
          ) : (
            <span className="rounded-md bg-gray-500 px-4 py-2 text-white">لم يبدأ بعد</span>
          )}
        </div>
        <div className={"flex gap-3 text-gray-600"}>
          <Question />
          <span>{test.mandatoryQuestionCount}</span>
          <span>سؤال</span>
          <Bouns />
          <span>{test.optionalQuestionCount || 0}</span>
          <span>بونص</span>
          <Point />
          <span>{test.totalMark}</span>
          <span>درجة</span>
        </div>
      </div>
      <div className={"grid grid-cols-2 gap-2 text-center"}>
        <span>تاريخ الاختبار</span>
        <span className={"rounded bg-gray-200 px-4 py-2"}>{translateToArabicDate(test.startDate)}</span>

        <span>وقت الاختبار</span>
        <span
          className={"rounded bg-gray-200 px-4 py-2"}
          style={{
            direction: "ltr",
          }}
        >
          {format(test.startDate, "hh:mm a")}
        </span>

        <span>مدة الاختبار</span>
        <span className={"rounded bg-gray-200 px-4 py-2"}>{test.duration}</span>
      </div>
    </div>
  );
}
export default CurrentTest;
