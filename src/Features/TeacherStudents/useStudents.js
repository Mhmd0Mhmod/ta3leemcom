import { useParams } from "react-router-dom";
import { getStudents } from "./helpers.js";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../Context/UserProvider.jsx";

export function useStudents() {
  const { groupsId } = useParams();
  const groupsIds = groupsId.split(",");
  const { useUser } = useUserContext();
  const { token } = useUser();

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
