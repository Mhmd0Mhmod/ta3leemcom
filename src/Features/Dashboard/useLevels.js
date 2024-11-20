import { useQuery } from "@tanstack/react-query";
import { fetchLevels } from "./helpers.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function useLevels() {
  const token = useAuthHeader();
  const {
    data: levels,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["levels"],
    queryFn: () => fetchLevels(token),
  });
  return { levels, isLoading, error };
}

export { useLevels };
