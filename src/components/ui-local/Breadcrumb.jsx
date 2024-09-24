import {constraints} from "../../config.js";
import {useSearchParams} from "react-router-dom";
import Arrow from "../../../public/Icons/breadcrumb_arrow.svg";

function Breadcrumb({page}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const level = searchParams.get("level") || "";
    const subLevel = searchParams.get("subLevel") || ""
    const groups = searchParams.get("group")?.split("_") || "";
    if (level && subLevel && groups) return (
        <div className="flex gap-2 mb-12 font-almaria-light">
            <button className="flex gap-1" onClick={() => setSearchParams({tab: "level"})}>
                <span>المراحل الدراسية</span>
                <Arrow/>
            </button>
            <button className="flex gap-1"
                    onClick={() => setSearchParams({tab: "level", level: searchParams.get("level")})}>
                <span>{constraints[searchParams.get("level")].text}</span>
                <Arrow/>
            </button>
            <button className="flex gap-1">
                <span>{constraints[level].content[+subLevel]}</span>
                <Arrow/>
            </button>
            <button className="flex gap-1">
                <span>{groups.join(" / ")}</span>
                <Arrow/>
            </button>
            <div className="flex gap-1 font-almaria-bold">
                <span>{page} </span>
            </div>
        </div>);
    return null;
}

export default Breadcrumb;