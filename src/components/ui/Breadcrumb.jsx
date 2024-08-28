import {constraints} from "../../config.js";
import {useSearchParams} from "react-router-dom";

function Breadcrumb({page}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const level = searchParams.get("level");
    const subLevel = searchParams.get("subLevel");
    const groups = searchParams.get("group").split("_");
    return (
        <div className="flex gap-2 mb-12 font-almaria-light">
            <button className="flex gap-1" onClick={() => setSearchParams({tab: "level"})}>
                <span>المراحل الدراسية</span>
                <img src="Icons/breadcrumb_arrow.svg" alt="arrow"/>
            </button>
            <button className="flex gap-1"
                    onClick={() => setSearchParams({tab: "level", level: searchParams.get("level")})}>
                <span>{constraints[searchParams.get("level")].text}</span>
                <img src="Icons/breadcrumb_arrow.svg" alt="arrow"/>
            </button>
            <button className="flex gap-1">
                <span>{constraints[level].content[+subLevel]}</span>
                <img src="Icons/breadcrumb_arrow.svg" alt="arrow"/>
            </button>
            <button className="flex gap-1">
                <span>{groups.join(" / ")}</span>
                <img src="Icons/breadcrumb_arrow.svg" alt="arrow"/>
            </button>
            <div className="flex gap-1 font-almaria-bold">
                <span>{page} </span>
            </div>
        </div>);
}

export default Breadcrumb;