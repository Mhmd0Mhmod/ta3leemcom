import { getAttendance, getTests, getToppers } from '@/Features/student/helpers';
import { createContext, useContext, useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import toast from 'react-hot-toast';
const StudentContext = createContext();
function StudentProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [studentTests, setStudentTests] = useState([]);
  const [studentToppers, setStudentToppers] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const student = useAuthUser();
  useEffect(() => {
    setLoading(true);
    try {
      getTests().then((res) => {
        setStudentTests(res);
      });
      getToppers(student.id).then((res) => {
        setStudentToppers(res);
      });
      getAttendance().then((res) => {
        setStudentAttendance(res);
      });
    } catch (error) {
      toast.error('حدث خطأ ما');
      setError(error);
    }
  }, []);
  return (
    <StudentContext.Provider
      value={{
        loading,
        error,
        studentTests,
        studentToppers,
        studentAttendance,
      }}
    >
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
