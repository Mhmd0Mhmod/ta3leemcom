import { useSearchParams } from "react-router-dom";
import Heading from "./ui/Heading";
import Button from "./ui/Button";

function AddOnlineTest() {
 const [serchParams, setSearchParams] = useSearchParams();

 const backToLevel = () => {
  setSearchParams({ tab: "level" });
 };

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
     onClick={() => setSearchParams({ tab: "level", level: "primary" })}
    >
     <span>الابتدائي</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button className="flex gap-1">
     <span>الصف الاول الابتدائي </span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <button className="flex gap-1">
     <span> مجموعة ج</span>
     <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
    </button>
    <div className="flex gap-1 font-almaria-bold">
     <span>الاختبارات</span>
    </div>
   </div>
   <Button type="Secondary" icon={<img src="Icons/plus.svg" />}>
    اضافة اختبار
   </Button>
   <div className="flex gap-4 mt-12 mb-6 font-almaria-bold items-center">
    <div className="flex gap-5 bg-white p-2 w-[30rem]">
     <img src="Icons/search_icon.svg" alt="search" />
     <input type="text" placeholder="اسم الاختبار" className="w-full" />
    </div>
    <Button
     type="Secondary"
     className={"bg-accent-900 !text-black font-almaria-light"}
    >
     بحث
    </Button>
    <Button
     type="Secondary"
     className={"!bg-accent-900"}
     icon={<img src="Icons/calender.svg" alt="date" />}
    >
     <div className="flex gap-2 !text-black font-almaria-light">
      <span> تصفية بالتاريخ</span>
      <img
       src="Icons/breadcrumb_arrow.svg"
       alt="arrow"
       className="-rotate-90 "
      />
     </div>
    </Button>
    <Button type="Secondary" className={"!bg-accent-900"}>
     <div className="flex gap-2 !text-black font-almaria-light">
      <span> نوع الاختبار</span>
      <img
       src="Icons/breadcrumb_arrow.svg"
       alt="arrow"
       className="-rotate-90 "
      />
     </div>
    </Button>
    <button className="text-secondary ">إلغاء الكل</button>
   </div>
   <div className="my-12">
    <table className="min-w-full bg-accent-1000  border-collapse border-spacing-2  rounded-lg text-center">
     <thead>
      <tr>
       <th className="px-6 py-3 text-center text-black bg-accent-1000 rounded-tr-lg border-l border-[#D9D9D9]">
        اسم الاختبار
       </th>
       <th className="px-6 py-3 text-center text-black bg-accent-1000 border-l border-[#D9D9D9]">
        نوع الاختبار
       </th>
       <th className="px-6 py-3 text-center text-black bg-accent-1000 rounded-tl-lg">
        التاريخ
       </th>
      </tr>
     </thead>
     <tbody>
      {[1, 2, 3, 4].map((row) => (
       <tr key={row}>
        <td className="px-6 py-4 bg-white flex gap-4 border-l border-t border-[#D9D9D9]">
         <img src="Icons/edit_icon.svg" alt="" />
         <span>اختبار علي الماشي</span>
         <button className="mr-auto">
          <img src="Icons/trash_icon.svg" alt="delete" />
         </button>
        </td>
        <td className="px-6 py-4 bg-white border-l border-t border-[#D9D9D9]">
         اونلاين
        </td>
        <td className="px-6 py-4 bg-white border-t border-[#D9D9D9]">
         12/1/2024
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}

export default AddOnlineTest;
