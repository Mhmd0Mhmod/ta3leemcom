import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "./helpers.js";

function UseStage() {
  const { teacherId } = useAuthUser();
  const Authorization = useAuthUser();
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboardData({ Authorization, teacherId }),
  });
  return { data, isLoading, error };
}

export default UseStage;
