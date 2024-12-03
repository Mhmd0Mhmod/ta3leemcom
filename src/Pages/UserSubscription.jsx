import Heading from "../UI/Heading";

function UserSubscription() {
  return (
    <>
      <div className="ms-6 mt-10">
        <Heading as={"h3"} className={"flex items-center font-cairo-bold"}>
          الاشتراك الحالي
        </Heading>
        <div className="mt-12 flex gap-40">
          <div>
            <div className="flex gap-16">
              <Heading as={"h4"} className={"font-cairo-bold"}>
                الخطة الحالية
              </Heading>
              <div className="flex h-[2.5rem] w-[12.5rem] items-center rounded-md bg-[#EFEFEF] ps-2">الباقة الأساسية</div>
            </div>
            <div className="flex">
              {/* <SideImage className={"relative right-[-0.625rem] top-[5rem]"} /> */}
              <div>
                <div className="mt-20">
                  <Heading as={"h4"} className={"font-cairo-bold"}>
                    تاريخ بدء الاشتراك
                  </Heading>
                  <div className="mt-4 flex h-[2.5rem] w-[12.5rem] items-center rounded-md bg-[#EFEFEF] ps-2">01/10/2024</div>
                </div>

                <div className="mt-20">
                  <Heading as={"h4"} className={"font-cairo-bold"}>
                    تاريخ الانتهاء
                  </Heading>
                  <div className="mt-4 flex h-[2.5rem] w-[12.5rem] items-center rounded-md bg-[#EFEFEF] ps-2">1/11/2024</div>
                </div>
              </div>
            </div>
            <button className="ml-20 mt-12 h-[2.5rem] w-[6.875rem] rounded-lg bg-[#0884A2] font-cairo-bold text-white" onClick={null}>
              ترقية الاشتراك
            </button>
          </div>

          <div className="flex">{/* <Poster className={'relative top-[-4.375rem]'} /> */}</div>
        </div>
      </div>
    </>
  );
}
export default UserSubscription;
