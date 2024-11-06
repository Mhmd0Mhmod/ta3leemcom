import Heading from "./Heading.jsx";
import CustomersOpinionsCarousel from "./CustomersOpinionsCarousel.jsx";
function CustomersOpinions() {
  return (
    <div className="mx-auto bg-gray-25 p-4 text-center">
      <Heading as={"h4"} className={"text-Secondary-500 my-4"}>
        ماذا يقول عملائنا
      </Heading>
      <Heading as={"h1"}>ملاحظات المستخدمين</Heading>
      <span className="bg-Secondary-500 my-6 mr-[32%] block h-1 w-44"></span>
      <CustomersOpinionsCarousel />
    </div>
  );
}

export default CustomersOpinions;
