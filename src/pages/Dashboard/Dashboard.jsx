import TeacherDashboard from '@/pages/Dashboard/subpages/TeacherDashboard/TeacherDashboard.jsx';
import StudentDashboard from '@/pages/Dashboard/subpages/StudentDashboard/StudentDashboard.jsx';

export default function Dashboard() {
  const isTeacher = true;

  if (isTeacher) return <TeacherDashboard />;
  return <StudentDashboard />;
}
