import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { constraints } from "../config";

const TESTS = [];

function AddOnlineTest() {
 const [searchParams, setSearchParams] = useSearchParams();
 const [addTestUl, setAddTestUl] = useState(false);
 const [filterByDateUl, setFilterByDateUl] = useState(false);
 const [filterByTestTypeUl, setFilterByTestTypeUl] = useState(false);
 const [tests, setTests] = useState(TESTS);
 const [search, setSearch] = useState("");
 const backToLevel = () => {
  setSearchParams({ tab: "level", level: "primary" });
 };

 console.log(searchParams.get("group"));

 const formatDate = (date) => {
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
 };
 const today = new Date();

 // Yesterday's date
 const yesterday = new Date();
 yesterday.setDate(today.getDate() - 1);

 // A week ago
 const aWeekAgo = new Date();
 aWeekAgo.setDate(today.getDate() - 7);

 return (
  <div className="px-12 py-16">
   <button className="flex gap-1" onClick={backToLevel}>
    <img src="Icons/rev_arrow.svg" alt="" />
    <Heading as={"h3"} className={"text-secondary underline font-almaria-bold"}>
     العوده الي المراحل الدراسية
    </Heading>
   </button>
   <Heading as={"h1"} className={"my-6 text-black font-almaria-bold"}>
    الاختبارات
   </Heading>
   <hr className="w-[70%]" />
   <div className="flex gap-2 mt-4 mb-12 font-almaria-light">
    <button
     className="flex gap-1"
     onClick={() => setSearchParams({ tab: "level" })}
    >
     <span>المراحل الدراسية</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button
     className="flex gap-1"
     onClick={() =>
      setSearchParams({ tab: "level", level: searchParams.get("level") })
     }
    >
     <span>{constraints[searchParams.get("level")].text}</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button className="flex gap-1">
     <span>
      {
       constraints[searchParams.get("level")].content[
        +searchParams.get("subLevel")
       ]
      }
     </span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button className="flex gap-1">
     <span>{searchParams.get("group").replaceAll("_", " / ")}</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <div className="flex gap-1">
     <span>الاختبارات</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </div>
    <div className="flex gap-1 font-almaria-bold">
     <span>اضافة اختبار</span>
    </div>
   </div>
   <div className="w-full md:w-[85%] lg:w-[70%] p-4 rounded-lg mx-auto bg-white">
    
   </div>
  </div>
 );
}

export default AddOnlineTest;
