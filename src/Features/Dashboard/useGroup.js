import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGroup } from "./helpers.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const useGroup = () => {
  const { groupId } = useParams();
  const token = useAuthHeader();
  const { data, isLoading, error } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroup(token, groupId),
  });
  return { group: data, isLoading, error };
};
