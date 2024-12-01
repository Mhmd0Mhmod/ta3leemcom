import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { getStudentAttendance as studentAttendanceAPI } from "./helpers";

function useStudentAttendance() {
  const token = useAuthHeader();
  const { studentId } = useAuthUser();
  const {
    data: attendance,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentAttendance", studentId],
    queryFn: () => studentAttendanceAPI(studentId, token),
  });
  return {
    attendance,
    isLoading,
    error,
  };
}
export { useStudentAttendance };
