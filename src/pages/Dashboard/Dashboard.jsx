import TeacherDashboard from '@/pages/Dashboard/subpages/TeacherDashboard/TeacherDashboard.jsx';
import StudentDashboard from '@/pages/Dashboard/subpages/StudentDashboard/StudentDashboard.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { LevelsProvider } from '@/Context/LevelContext.jsx';

export default function Dashboard() {
  const auth = useAuthUser();
  const isTeacher = auth.role === 'Teacher';
  return <LevelsProvider>{isTeacher ? <TeacherDashboard /> : <StudentDashboard />}</LevelsProvider>;
}
