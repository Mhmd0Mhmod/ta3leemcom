import { useParams } from "react-router-dom";
import { getStudents } from "./helpers.js";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export function useStudents() {
  const { groupsId } = useParams();
  const groupsIds = groupsId.split(",");
  const token = useAuthHeader() || null;

  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students", ...groupsIds],
    queryFn: () => getStudents({ groupsIds, token }),
  });

  return { students, isLoading, error };
}
