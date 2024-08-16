import {useSearchParams} from "react-router-dom";
import PrimaryLevel from "./PrimaryLevel.jsx";
import MiddleLevel from "./MiddleLevel.jsx";
import HighLevel from "./HighLevel.jsx";

function Test() {
    const [searchParams, setSearchParams] = useSearchParams();
    const level = searchParams.get("level");
    switch (level) {
        case "primary":
            return <PrimaryLevel/>;
        case "middle":
            return <MiddleLevel/>;
        case "high":
            return <HighLevel/>;
        default:
            return null;
    }
}

export default Test;