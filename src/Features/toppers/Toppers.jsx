import {useSearchParams} from "react-router-dom";
import {FakeGroups} from "../../config.js";
import Confetti from "react-confetti";
import HeadingLevelsPages from "../../UI-Global/HeadingLevelsPages.jsx";
import {useEffect, useState} from "react";
import {useWindowSize} from "react-use";
import PropTypes from "prop-types";

Toppers.propTypes = {
    groupsId: PropTypes.arrayOf(PropTypes.number).isRequired,
    students: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
    backToLevels: PropTypes.bool,
};

function Toppers({groupsId, students, backToLevels = true}) {
    const [animation, setAnimation] = useState(true);
    const toppers = students?.filter((el) => groupsId.includes(el.groupId)) || FakeGroups.filter((el) => groupsId.includes(el.id)).map(el=>el.students).flat().slice(10);
    console.log(toppers)
    const style = {
        0: {
            text: "!bg-[#8F2222] text-white",
            number: "bg-gradient-to-r from-[#FFD700] to-[#FF6A00] text-white !border-[#8F2222]"
        },
        1: {
            text: "!bg-[#616E7C] text-white",
            number: "!bg-[#869DB5] text-white !border-[#616E7C]"
        },
        2: {
            text: "!bg-[#EE943C] text-white",
            number: "!bg-[#B46300] text-white !border-[#EE943C]"
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimation(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Confetti height={useWindowSize().height} numberOfPieces={2000} tweenDuration={5000} recycle={animation}/>
            <div className={"flex flex-col gap-6 w-[687px] m-auto text-center"}>
                <HeadingLevelsPages title={"المتفوقون"} backToLevels={backToLevels}/>
            </div>
            <div className={"flex flex-col w-[559px] m-auto font-almaria-bold  "}>
                {toppers.map((el, index) =>
                    <div className={`flex  rounded items-center  relative`} key={el.id}>
                        <div className={`relative`}>
                            <div className={"rounded-full border-4 border-[#F5F7F9] "}>
                                <span
                                    className={`w-10 h-10 p-7 text-xl rounded-full border-8 flex items-center justify-center bg bg-white border-[#C6C6C6] ${style[index]?.number}`}>{index + 1}</span>
                            </div>
                        </div>
                        <h3 className={`text-xl text-center rounded-[11px] -mr-5 p-4  w-full bg-[#C6C6C6] ${style[index]?.text}`}>{el.name}</h3>
                    </div>
                )}
            </div>
        </>
    );
}


export default Toppers;