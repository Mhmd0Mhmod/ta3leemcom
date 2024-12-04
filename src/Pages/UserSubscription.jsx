import { Link } from "react-router-dom";
import Heading from "../UI/Heading";
import Poster from "/public/Icons/ProfileSubscription.svg";
import SideImage from "/public/Icons/SideImage.svg";
function UserSubscription() {
  return (
    <>
      <div className="whitespace-nowrap font-cairo">
        <Heading as={"h2"}>الاشتراك الحالي</Heading>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="w-1/2 space-y-10">
            <div className="flex justify-between gap-10">
              <Heading as={"h3"}>الخطة الحالية</Heading>
              <p className="flex flex-grow items-center rounded-md bg-gray-200 px-4 py-2">الباقة الأساسية</p>
            </div>
            <div className="flex gap-4">
              <SideImage />
              <div className="space-y-10">
                <div className="item flex flex-col gap-7">
                  <Heading as={"h3"}>تاريخ بدء الاشتراك</Heading>
                  <div className="flex flex-grow items-center rounded-md bg-gray-200 px-4 py-2">01/10/2024</div>
                </div>
                <div className="flex flex-col gap-7">
                  <Heading as={"h3"}>تاريخ الانتهاء</Heading>
                  <div className="flex flex-grow items-center rounded-md bg-gray-200 px-4 py-2">1/11/2024</div>
                </div>
              </div>
            </div>
            <div>
              <Link className="rounded-md bg-Secondary-500 px-4 py-2 text-white" to="upgrade">
                ترقية الاشتراك
              </Link>
            </div>
          </div>

          <Poster />
        </div>
      </div>
    </>
  );
}
export default UserSubscription;
