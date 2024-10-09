import { getAttendance, getTests, getToppers } from '@/Context/StudentDashboard/helpers';
import { Spinner } from '@/UI-Global/Spinner';
import { createContext, useContext, useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import toast from 'react-hot-toast';
const StudentContext = createContext();
function StudentProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [studentToppers, setStudentToppers] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const student = useAuthUser();

  useEffect(() => {
    setLoading(true);
    getToppers(student.groupId)
      .then((res) => {
        setStudentToppers(res);
      })
      .catch((err) => {
        toast.error('حدث خطأ ما');
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [student.groupId]);
  useEffect(() => {
    setLoading(true);
    getAttendance(student.studentId)
      .then((res) => {
        setStudentAttendance(res);
      })
      .catch((err) => {
        toast.error('حدث خطأ ما');
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [student.studentId]);
  return (
    <StudentContext.Provider
      value={{
        loading,
        error,
        studentToppers,
        studentAttendance,
      }}
    >
      {loading && <Spinner />}
      {children}
    </StudentContext.Provider>
  );
}
function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
export { StudentProvider, useStudent };
