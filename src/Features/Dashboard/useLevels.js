import { useQuery } from "@tanstack/react-query";
import { fetchLevels } from "./helpers.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function UseLevels() {
  const Authorization = useAuthHeader();
  const {
    data: levels,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["levels"],
    queryFn: () => fetchLevels(Authorization),
  });
  return { levels, isLoading, error };
}

export default UseLevels;
