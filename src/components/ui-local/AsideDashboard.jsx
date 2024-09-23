import PropTypes from 'prop-types';
import Menu from "../../../public/Icons/menu.svg";
import {Fragment, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";

function AsideDashboard({tabs, opened , setOpened}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || tabs[0]?.tab;
    const handleTabClick = (tab) => {
        setSearchParams({tab});
    };
    useEffect(() => {
        if (!searchParams.get("tab")) {
            setSearchParams({tab: tabs[0]?.tab});
        }
    }, [searchParams, setSearchParams, tabs]);

    return (

        <ul className={"flex gap-2 flex-col font-cairo text-xl mt-2 "}>
            {tabs?.map((tab, idx) => (
                <Fragment key={idx + tabs.length}>
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>
                                {tab.Details ?
                                    <Fragment>{tab.Details}</Fragment> :
                                    <li onClick={() => handleTabClick(tab.tab)}
                                        className={`rounded p-2.5 flex items-center gap-[18px] cursor-pointer hover:bg-[#b4d3e0] duration-300 ${activeTab === tab.tab ? "active" : ""}`}>
                                        <tab.icon className={`${!opened ? "m-auto" : ''}`}/>
                                        <span className={`${!opened ? "hidden" : ""}`}>{tab.name}</span>
                                    </li>
                                }
                            </TooltipTrigger>
                            {
                                !opened &&
                                <TooltipContent side={"left"}>{tab.name}</TooltipContent>
                            }
                        </Tooltip>
                    </TooltipProvider>
                </Fragment>
            ))}
        </ul>
    );
}

AsideDashboard.propTypes = {
    tabs: PropTypes.array.isRequired,
    opened: PropTypes.bool.isRequired,
    setOpened: PropTypes.func.isRequired,
    className: PropTypes.string
};


export default AsideDashboard;