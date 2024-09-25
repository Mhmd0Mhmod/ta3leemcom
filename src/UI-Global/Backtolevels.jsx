import Heading from "./Heading.jsx";
import { useSearchParams } from "react-router-dom";
import Arrow from "../../public/Icons/rev_arrow.svg";
function Backtolevels() {
 const [searchParams, setSearchParams] = useSearchParams();
 const level = searchParams.get("level");
 const backToLevel = () => {
  setSearchParams({ tab: "level", level });
 };

 return (
  <button className="flex gap-1" onClick={backToLevel}>
   <Arrow/>
   <Heading
    as={"h3"}
    className={"text-secondary-l underline font-almaria-bold"}
   >
    العوده الي المراحل الدراسية
   </Heading>
  </button>
 );
}

export default Backtolevels;