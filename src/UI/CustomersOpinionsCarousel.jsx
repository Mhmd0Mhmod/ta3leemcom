import Arrow from "../../public/Icons/arrow-white.svg";
import CustomersOpinionsCarouselOpinion from "./CustomersOpinionsCarouselOpinion.jsx";
import Carousel from "./Carousel.jsx";
import { useQuery } from "@tanstack/react-query";
import { getOpinions } from "../Features/Opinion/apiOpinion.js";

const Opinions = [
  {
    message: "أراء العملاء",
    stars: 5,
    role: "Teacher",
    name: "محمد",
  },
  {
    message: "أراء العملاء",
    stars: 2,
    role: "Teacher",
    name: "احمد",
  },
  {
    message: "أراء العملاء",
    stars: 1,
    role: "Teacher",
    name: "علي",
  },
];

function CustomersOpinionsCarousel({ opinionClassName }) {
  const { data: opinions = [] } = useQuery({
    queryKey: ["opinions"],
    queryFn: getOpinions,
  });
  return (
    <Carousel length={opinions.length} containerClassName={"grid grid-cols-[auto_1fr_auto] gap-4 grid-rows-[1fr_auto] gap-y-10 "}>
      <Carousel.RightButton>
        <Arrow className={"w-20"} />
      </Carousel.RightButton>
      <div className={"overflow-hidden"}>
        <Carousel.Items>
          {opinions.map((opinion, index) => (
            <CustomersOpinionsCarouselOpinion key={index} opinion={opinion} className={opinionClassName} />
          ))}
        </Carousel.Items>
      </div>
      <Carousel.LeftButton>
        <Arrow className={"w-20 rotate-180"} />
      </Carousel.LeftButton>

      <Carousel.Dotes
        DotesClassName={"mx-2 h-5 cursor-pointer rounded-full"}
        activeStyle={"bg-gray-700 w-5"}
        notActiveStyle={"bg-gray-300 w-5"}
        containerClassName={"col-span-full"}
      />
    </Carousel>
  );
}

export default CustomersOpinionsCarousel;
