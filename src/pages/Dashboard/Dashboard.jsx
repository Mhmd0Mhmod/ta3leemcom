import TeacherDashboard from '@/pages/Dashboard/subpages/TeacherDashboard/TeacherDashboard.jsx';
import StudentDashboard from '@/pages/Dashboard/subpages/StudentDashboard/StudentDashboard.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchLevels } from '@/lib/helpers.js';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const auth = useAuthUser();

  // console.log(auth);

  if (!auth) {
    return <Navigate to="/home?mr=login" />;
    // return null;
  }
  const isTeacher = auth.role === 'Teacher';
  return <LevelsProvider>{isTeacher ? <TeacherDashboard /> : <StudentDashboard />}</LevelsProvider>;
}

const LevelsContext = createContext();

function LevelsProvider({ children }) {
  const [levels, setLevels] = useState({});
  const [mainLevels, setMainLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [groupsOfSelectedlevel, setGroupsOfSelectedlevel] = useState([]);
  const [allGroups, setAllGroups] = useState({});
  const user = useAuthUser();
  // console.log(allGroups);

  function fetchingDashboard() {
    setLoading(true);
    fetchLevels(user.teacherId)
      .then((res) => {
        setMainLevels(
          res.data?.map((el) => {
            return {
              id: el.levelId,
              name: el.levelNames,
            };
          }),
        );
        setLevels(
          res.data.reduce((acc, level) => {
            acc[level.levelId] = level.levelYears.map((year) => ({
              id: year.levelYearId,
              name: year.levelYearName,
            }));
            return acc;
          }, {}),
        );
        setAllGroups(
          res.data.reduce((acc, level) => {
            level.levelYears.forEach((year) => {
              acc[year.levelYearId] = year.levelGroups;
            });
            return acc;
          }, {}),
        );
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
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
  return (
    <LevelsContext.Provider
      value={{
        levels,
        mainLevels,
        error,
        loading,
        selectYearIdFunc: setSelectedLevel,
        groupsOfSelectedlevel,
        fetchingDashboard,
      }}
    >
      {children}
    </LevelsContext.Provider>
  );
}

export function useLevels() {
  return useContext(LevelsContext);
}
