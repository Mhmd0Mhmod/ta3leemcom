import TeacherDashboard from '@/pages/Dashboard/subpages/TeacherDashboard/TeacherDashboard.jsx';
import StudentDashboard from '@/pages/Dashboard/subpages/StudentDashboard/StudentDashboard.jsx';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Navigate } from 'react-router-dom';
import { TeacherProvider } from '@/Context/TeacherDashboard/TeacherProvider';
import { StudentProvider } from '@/Context/StudentDashboard/StudentProvider';
export default function Dashboard() {
  const auth = useAuthUser();

  if (!auth) {
    return <Navigate to="/home?mr=login" />;
    // return null;
  }
  const isTeacher = auth.role === 'Teacher';

  if (isTeacher)
    return (
      <TeacherProvider>
        <TeacherDashboard />
      </TeacherProvider>
    );
  return (
    <StudentProvider>
      <StudentDashboard />
    </StudentProvider>
  );
}
