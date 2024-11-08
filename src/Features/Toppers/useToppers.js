import { useParams } from "react-router-dom";
import { getToppers } from "./helpers";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../Context/UserProvider";

export function useToppers() {
  const { groupsId } = useParams();

  const groupsIds = groupsId.split(",");
  const { useUser } = useUserContext();
  const { token } = useUser();
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
