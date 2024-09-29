import TeacherDashboard from '@/pages/Dashboard/subpages/TeacherDashboard/TeacherDashboard.jsx';
import StudentDashboard from '@/pages/Dashboard/subpages/StudentDashboard/StudentDashboard.jsx';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {createContext, useContext, useEffect, useState} from "react";
import {fetchLevels} from "@/lib/helpers.js";

export default function Dashboard() {
    const auth = useAuthUser();
    const isTeacher = auth.role === 'Teacher';
    return <LevelsProvider>
        {isTeacher ? <TeacherDashboard/> : <StudentDashboard/>}
    </LevelsProvider>
}

const LevelsContext = createContext();

function LevelsProvider({children}) {
    const [levels, setLevels] = useState([]);
    const [mainLevels, setMainLevels] = useState([]);
    useEffect(() => {
        fetchLevels().then(res => {
            const dataMainLevel = res.data.map(el => {
                switch (el.levelId) {
                    case 1 :
                        return {
                            levelId: 1,
                            name: 'المرحله الابتدائيه'
                        }
                    case 2 :
                        return {
                            levelId: 2,
                            name: 'المرحله الاعداديه'
                        }
                    case 3 :
                        return {
                            levelId: 3,
                            name: 'المرحله الثانويه'
                        }
                }
            })
            setLevels([...res.data]);
            const filtered = [];
            dataMainLevel.forEach(el => {
                if (!filtered.find(item => item.levelId === el.levelId)) {
                    filtered.push(el);
                }
            })
            setMainLevels([...filtered]);
        });
    }, []);
    return (
        <LevelsContext.Provider value={[levels, mainLevels]}>
            {children}
        </LevelsContext.Provider>
    );
}

export function useLevels() {
    return useContext(LevelsContext);
}
