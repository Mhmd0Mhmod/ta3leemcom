import { Link } from "react-router-dom";
import Heading from "./Heading";
import TestSent from "/public/Icons/test_sent_icon.svg";

function SubmittedQuiz() {
  return (
    <div className="flex flex-col items-center py-32">
      <TestSent className="mx-auto" />
      <Heading as={"h2"} className={"font-almaria-bold my-6 text-black"}>
        لقد تم إرسال إجاباتك بنجاح.
      </Heading>
      <p className="mb-8 mt-4 text-lg">شكراً لك على إرسال إجاباتك. </p>
      <div className="flex items-center gap-3 font-Almarai-bold text-xl">
        <Link to={"answers"} replace={true} className="rounded-md border border-Secondary-500 bg-white px-7 py-2 text-Secondary-500">
          النتيجة
        </Link>
        <Link to={-1} replace={true} className="text-Secondary-500">
          عوده للاختبارات
        </Link>
      </div>
    </div>
  );
}
export default SubmittedQuiz;
