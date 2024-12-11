import ID from "/public/imgs/id.png";
import Heading from "./Heading.jsx";

function StudentId({ student }) {
  const { name, groupName, levelName, levelYearName, code } = student || {};
  return (
    <div id="studentDetails" className={"print-full relative -mt-20 flex flex-col"}>
      <img src={ID} alt="Id" className={"w-full"} />
      {/*<Profile alt="profile" className={"absolute"} />*/}
      <div className="rounded-b-md border-2 border-t-0 border-gray-500 bg-gray-200 bg-cover bg-center bg-no-repeat p-4 text-lg">
        <div className={"mb-5"}>
          <h2 className="text-center">كود الطالب</h2>
          <p className="text-center text-lg text-gray-500">{code}</p>
        </div>
        <div className={"grid grid-cols-2"}>
          <Heading as={"h4"} className="">
            الاسم
          </Heading>
          <p className="text-md text-[#979797]">{name}</p>

          <Heading as={"h4"} className="">
            المجموعة
          </Heading>

          <p className="text-md text-[#979797]">{groupName}</p>

          <Heading as={"h4"} className="">
            المرحلة الدراسية
          </Heading>

          <p className="text-md text-[#979797]">{levelName}</p>

          <Heading as={"h4"} className="">
            الصف الدراسي
          </Heading>

          <p className="text-md text-[#979797]">{levelYearName}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentId;
