import {createContext, useContext, useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {fetchLevels} from "@/lib/helpers.js";

const LevelsContext = createContext();

export function LevelsProvider({children}) {
    const [levels, setLevels] = useState({});
    const [mainLevels, setMainLevels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedLevel, setSelectedLevel] = useState([]);
    const [groupsOfSelectedlevel, setGroupsOfSelectedlevel] = useState([]);
    const [allGroups, setAllGroups] = useState({});
    const user = useAuthUser();

    function fetchingDashboard() {
        setLoading(true);
        fetchLevels(user.teacherId).then(res => {
                setMainLevels(res.data?.map(el => {
                    return {
                        id: el.levelId,
                        name: el.levelNames
                    }
                }));
                setLevels(res.data.reduce((acc, level) => {
                    acc[level.levelId] = level.levelYears.map(year => ({
                        id: year.levelYearId,
                        name: year.levelYearName
                    }));
                    return acc;
                }, {}))
                setAllGroups(res.data.reduce((acc, level) => {
                    level.levelYears.forEach(year => {
                        acc[year.levelYearId] = year.levelGroups;
                    });
                    return acc;
                }, {}));
            }
        ).catch(err => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchingDashboard();
    }, []);
    useEffect(() => {
        if (!allGroups[selectedLevel]) return;
        setGroupsOfSelectedlevel([...allGroups[selectedLevel]]);
    }, [selectedLevel, allGroups]);
    return (<LevelsContext.Provider value={{
        levels, mainLevels, error, loading, selectYearIdFunc: setSelectedLevel, groupsOfSelectedlevel
        , fetchingDashboard
    }}>
        {children}
    </LevelsContext.Provider>)
}

export function useLevels() {
    return useContext(LevelsContext);
}
