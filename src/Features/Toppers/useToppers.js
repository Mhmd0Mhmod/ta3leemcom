import { useParams } from "react-router-dom";
import { getToppers } from "./helpers";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export function useToppers() {
  const { groupsId } = useParams();

  const groupsIds = groupsId.split(",");
  const token = useAuthHeader();
  const {
    data: toppers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["toppers", ...groupsIds],
    queryFn: () => getToppers({ groupsIds, token }),
  });
  return { toppers, isLoading, error };
}
