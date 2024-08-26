import Icon from "./Icon.jsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Details({className, summary, icon, listIcon = true, listItems = [], tabName = [], param, opend, children}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get(param);
    const [showList, setShowList] = useState(false);
    useEffect(() => {
        if (opend) setShowList(false);
    }, [opend]);

    function handleOpen(e) {
        if (!opend) {
            e.preventDefault();
            setShowList((prev) => !prev);
        }
    }

    return (
        <div className="relative">
            <details open={opend ? "" : false} onClick={handleOpen}>
                <summary className={"flex items-center gap-1 mb-2 " + className}>
                    <Icon src={icon}/>
                    <span className={`${!opend ? "hidden" : ""}`}>{summary}</span>
                </summary>
                {!showList && (
                    <ul className={"flex flex-col gap-2 "}>
                        {listItems.map((item, index) => (
                            <li
                                onClick={() => setSearchParams({tab: param, [param]: tabName[index]})}
                                key={tabName[index]}
                                className={`rounded p-2.5 pr-7 cursor-pointer flex gap-2 items-center text-[#757474] hover:bg-[#b4d3e0] duration-300 ${
                                    activeTab === tabName[index] ? "active" : ""
                                }`}
                            >
                                {listIcon && <span className={"inline-block w-1 h-1 bg-[#757474]"}></span>}
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}
                {children}
            </details>
            {showList && (
                <ul className={"absolute top-0 w-[110px] -left-[120px] bg-white rounded-[7px] shadow-lg z-10 text-[14px]"}>
                    {listItems.map((item, index) => (
                        <li
                            onClick={() => setSearchParams({tab: param, [param]: tabName[index]})}
                            key={tabName[index]}
                            className={`rounded p-1 pl-4  cursor-pointer  hover:bg-[#D7D7D7] duration-300 ${
                                activeTab === tabName[index] ? "active" : ""
                            }`}
                        >
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Details;