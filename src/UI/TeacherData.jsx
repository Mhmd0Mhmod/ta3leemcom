import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import Heading from "./Heading";

function TeacherData() {
  const teacher = useAuthUser() || {};
  const { name, email, phone } = teacher || {};
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <ProfileImage />
        <div>
          <Link to={"edit"} className="rounded-lg bg-[#0884A2] px-10 py-2 font-cairo-bold text-white">
            تعديل
          </Link>
        </div>
      </div>
      <div className="grid w-3/4 gap-16">
        <div className="col-span-2 space-y-5">
          <Heading as="h3">الاسم الكامل</Heading>
          <ptes>{name}</ptes>
        </div>
        <div className="col-span-2 space-y-5 md:col-auto">
          <Heading as="h3">رقم الهاتف</Heading>
          <p className="rounded-md bg-gray-200 p-4 text-lg">{phone || "لا يوجد"}</p>
        </div>
        <div className="col-span-2 space-y-5 md:col-auto">
          <Heading as="h3">البريد الالكتروني</Heading>
          <p className="rounded-md bg-gray-200 p-4 text-lg">{email}</p>
        </div>
      </div>
    </div>
  );
}
export default TeacherData;
