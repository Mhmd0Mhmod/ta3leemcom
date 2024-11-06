import SmallGoldenStar from "/public/Icons/smallgoldstar.svg";
import QuationMark from "/public/Icons/quotation-mark.svg";

function CustomersOpinionsCarouselOpinion({ opinion, className }) {
  const { stars, message, name, userRole } = opinion;
  return (
    <div className={`m-auto flex h-[40rem] w-full items-center sm:w-3/4 xl:w-1/2 ${className}`}>
      <div className={"flex w-full flex-col items-center rounded-xl bg-white pb-8 shadow-md sm:shadow-2xl"}>
        <div className="relative flex h-96 flex-col items-center justify-center self-stretch rounded-2xl bg-white p-8 shadow-md sm:shadow-2xl">
          <div className="rotate-180 self-end">
            <QuationMark className={"w-10 md:w-20"} />
          </div>
          <p className="h-full w-full overflow-auto text-justify text-lg text-cyan-700">{message}</p>
          <div className="self-start">
            <QuationMark className={"w-10 md:w-20"} />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex flex-row-reverse items-center">
            {[1, 2, 3, 4, 5].map((index) => (
              <SmallGoldenStar key={index} fill={index <= stars ? "#FFA033" : "none"} />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-75 font-Almarai-bold">{name}</p>
          <p className="text-gray-75 font-Almarai-light">{userRole}</p>
        </div>
      </div>
    </div>
  );
}

export default CustomersOpinionsCarouselOpinion;
