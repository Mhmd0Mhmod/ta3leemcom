import {useSearchParams} from "react-router-dom";
import AddOnlineTest from "./AddOnlineTest.jsx";
import AddOfflineTest from "./AddOfflineTest.jsx";

function Test() {
    const [searchParams, setSearchParams] = useSearchParams();
    const test = searchParams.get("test");
    switch (test) {
        case "online":
            return <AddOnlineTest/>;
        case "offline":
            return <AddOfflineTest/>;
        default:
            return null;
    }
}

export default Test;