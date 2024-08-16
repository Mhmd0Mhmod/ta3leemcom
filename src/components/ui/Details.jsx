import Icon from "./Icon.jsx";
import {useSearchParams} from "react-router-dom";

function Details({summary, icon, listIcon = true, listItems = [], tabName = [], opend, children}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab");

    function handleOpen(e) {
        if (!opend) {
            e.preventDefault();
        }
    }

    return (
        <details open={opend ? "" : false} onClick={handleOpen}>
            <summary className={"flex items-center gap-1 mb-2"}>
                <Icon src={icon}/>
                <span className={`${!opend ? "hidden" : ""}`}>{summary}</span>
            </summary>
            {listItems.length &&
                <ul className={"flex flex-col gap-2 "}>
                    {listItems.map((item, index) =>

                        <li onClick={() => setSearchParams({tab: tabName[index]})} key={tabName[index]}
                            className={`rounded p-2.5 pr-7 cursor-pointer flex gap-2 items-center text-[#757474] ${activeTab === tabName[index] ? "active" : ""}`}>
                            {listIcon && <span className={"inline-block w-1 h-1 bg-[#757474]"}></span>}
                            <span className={`${!opend ? "hidden" : ""}`}>{item}</span>
                        </li>
                    )}
                </ul>}
            {children}
        </details>
    );
}

export default Details;