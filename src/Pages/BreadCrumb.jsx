import { Link, useLocation, useParams } from "react-router-dom";
import Arrow from "/public/Icons/breadcrumb_arrow.svg";
import { Fragment } from "react";

const translate = {
  TDashboard: "المراحل الدراسيه",
  student: "الطلاب",
  add: "اضافة",
  group: "المجموعات",
  level: "المراحل",
  test: "الاختبارات",
  result: "النتائج",
  question: "الاسئله",
  edit: "تعديل",
  delete: "حذف",
  subject: "المواد",
  teacher: "المعلمين",
  course: "الدورات",
  students: "الطلاب",
  tests: "الاختبارات",
};

function BreadCrumb() {
  const path = useLocation().pathname;
  const paths = path.split("/").filter((p) => p?.split(",").length === 1 && !Number.isSafeInteger(+p) && p !== "");
  return (
    <div className={"flex items-center gap-2"}>
      {paths.map((p, i) => {
        return (
          <Fragment key={i}>
            <span className={"text-gray-600"}>{translate[p]}</span>
            {i !== paths.length - 1 && <Arrow />}
          </Fragment>
        );
      })}
    </div>
  );
}

export default BreadCrumb;
