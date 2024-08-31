import Heading from "./Heading.jsx";
import {useSearchParams} from "react-router-dom";

function Backtolevels() {
    const [searchParams, setSearchParams] = useSearchParams();
    const level = searchParams.get("level");
    const backToLevel = () => {
        setSearchParams({tab: "level", level});
    };

    return (
        <button className="flex gap-1 self-start" onClick={backToLevel}>
            <img src="Icons/rev_arrow.svg" alt=""/>
            <Heading as={"h3"} className={"text-secondary underline font-almaria-bold"}>
                العوده الي المراحل الدراسية
            </Heading>
        </button>
    );
}

export default Backtolevels;