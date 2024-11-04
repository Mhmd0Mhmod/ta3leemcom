import Heading from "./Heading.jsx";
import CustomersOpinionsCarousel from "./CustomersOpinionsCarousel.jsx";
function CustomersOpinions() {
  return (
    <div className="bg-gray-25 mx-auto p-4 text-center">
      <Heading as={"h4"} className={"my-4 text-secondary"}>
        ماذا يقول عملائنا
      </Heading>
      <Heading as={"h1"}>ملاحظات المستخدمين</Heading>
      <span className="my-6 mr-[32%] block h-1 w-44 bg-secondary"></span>
      <CustomersOpinionsCarousel />
    </div>
  );
}

export default CustomersOpinions;
