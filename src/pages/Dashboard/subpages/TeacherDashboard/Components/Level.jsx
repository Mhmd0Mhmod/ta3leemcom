import {useSearchParams} from 'react-router-dom';
import {FakeGroups} from '../../../../../config.js';
import {useEffect, useState} from 'react';
import Heading from '../../../../../UI-Global/Heading.jsx';
import Arrow from '../../../../../../public/Icons/arrow_in_levels.svg';
import Eye from '../../../../../../public/Icons/eye.svg';
import Edit from '../../../../../../public/Icons/editPen.svg';
import Trash from '../../../../../../public/Icons/recyclePin.svg';
import Tests from '../../../../../../public/Icons/tests.svg';
import Students from '../../../../../../public/Icons/students.svg';
import Toppers from '../../../../../../public/Icons/toppers.svg';
import Monthes from '../../../../../../public/Icons/monthes.svg';
import {useLevels} from "@/pages/Dashboard/Dashboard.jsx";

function Test() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedGroups, setSelectedGroups] = useState([FakeGroups[0]]);

    let mainLevel = searchParams.get('level');
    let [levels] = useLevels();
    levels = levels.filter(el => el.levelId === Number(mainLevel));
    const subLevel = searchParams.get('subLevel') || 0;
    console.log(levels)
    const handleGroupClick = (group) => {
        if (selectedGroups.includes(group)) {
            setSelectedGroups((prevGroups) => prevGroups.filter((prevGroup) => prevGroup !== group));
            return;
        }
        setSelectedGroups((prevGroups) => [...prevGroups, group]);
    };
    useEffect(() => {
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            subLevel: levels[0]?.id
        })
    }, [mainLevel])
    const moveTo = (tab) => {
        const groups = selectedGroups
            .map((group) => group.name)
            .join(',')
            .replaceAll(',', '_');
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            tab,
            subLevel: subLevel,
            group: groups,
        });
    };

    return (
        <div className={'flex flex-col gap-10 font-almaria'}>
            <div className={'w-fit rounded bg-white p-5 shadow-[9px_5px_9.1px_4px_#0884A23D]'}>
                <ul className={'flex gap-10'}>
                    {levels?.map((level, i) => (
                        <li
                            key={i}
                            className={`relative cursor-pointer p-1 ${levels.findIndex(el => el.id === Number(subLevel)) === i ? 'halfunderline' : ''}`}
                            onClick={() => {
                                setSearchParams({
                                    ...Object.fromEntries(searchParams.entries()),
                                    subLevel: level.id,
                                });
                            }}
                        >
                            {level.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={'flex gap-[10%]'}>
                <div className={'flex flex-col pr-10'}>
                    <div className={'flex gap-2'}>
                        <Heading as={'h1'} className={'font-almaria-bold text-[24px]'}>
                            المجموعات
                        </Heading>
                        <Arrow/>
                    </div>
                    <div className={'h-fit max-h-64 overflow-y-auto rounded-xl bg-white p-5'}>
                        <ul className={'flex flex-col gap-5'}>
                            {FakeGroups.map((group) => (
                                <li key={group.id}
                                    className={`flex cursor-pointer gap-2 overflow-hidden rounded-xl border border-[#0884A24D] p-2 font-almaria-bold ${selectedGroups.includes(group) ? 'bg-[#68ABBB]' : ''}`}
                                    onClick={() => handleGroupClick(group)}>
                                    <Trash/>
                                    <Edit/>
                                    <span className={'flex-1 text-center'}>{group.name}</span>
                                    <Eye/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={'mt-16 grid flex-1 grid-cols-2 grid-rows-2 gap-7 self-center'}>
                    {[
                        {name: 'الاختبارات', Icon: Tests, tab: 'test'},
                        {name: 'الطلاب', Icon: Students, tab: 'students'},
                        {name: 'الاشهور', Icon: Monthes, tab: 'months'},
                        {name: 'الاوائل', Icon: Toppers, tab: 'toppers'},
                    ].map((item, i) => (
                        <button key={i} onClick={() => moveTo(item.tab)}
                                className={'flex cursor-pointer flex-col items-center gap-5'}>
                            <div className={'relative'}>
                                <item.Icon/>
                                <span
                                    className={'absolute left-0 top-0 h-full w-full rounded-full hover:bg-[#00000033]'}></span>
                            </div>
                            <span className={'font-almaria-bold text-xl'}>{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Test;