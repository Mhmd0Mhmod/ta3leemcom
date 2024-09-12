import PropTypes from 'prop-types';
import Menu from "../../../public/Icons/menu.svg";
import {Fragment, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

function AsideDashboard({tabs, opened, setOpened}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || tabs[0]?.tab;
    const handleTabClick = (tab) => {
        setSearchParams({tab});
    };
    useEffect(() => {
        if (!searchParams.get("tab")) {
            setSearchParams({tab: tabs[0]?.tab});
        }
    }, [searchParams, setSearchParams]);


    return (
        <div className={`p-2.5 bg-gray-100 rounded ${opened ? "w-[320px]" : "w-fit"} self-start`}>
            <div className={`flex ${opened ? " justify-end" : "justify-center"}`}>
                <Menu className={`w-9 ${opened ? "" : "rotate-Y-180"} transition duration-100 `}
                      onClick={() => setOpened((open) => !open)}/>
            </div>
            <ul className={"flex gap-2 flex-col font-cairo text-xl mt-2 "}>
                {tabs?.map((tab, idx) => (

                    <Fragment key={idx}>{tab.Details ?
                        <Fragment>{tab.Details}</Fragment> :
                        <li onClick={() => handleTabClick(tab.tab)}
                            className={`rounded p-2.5 flex items-center gap-[18px] cursor-pointer hover:bg-[#b4d3e0] duration-300 ${activeTab === tab.tab ? "active" : ""}`}>
                            <tab.icon className={`${!opened ? "m-auto" : ''}`}/>
                            <span className={`${!opened ? "hidden" : ""}`}>{tab.name}</span>
                        </li>
                    }
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}

//

export default AsideDashboard;