import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "./useCookies.js";
import { useEffect } from "react";

export function useUser() {
  const queryClient = useQueryClient();
  const { get } = useCookies();
  const user = queryClient.getQueryData(["user"]);
  useEffect(() => {
    if (get("user") && !user) {
      queryClient.setQueryData(["user"], JSON.parse(get("user")));
    }
    if (!get("user") && user) {
      queryClient.setQueryData(["user"], null);
    }
    if (!get("user") && !user) {
      queryClient.setQueryData(["user"], null);
    }
  }, [get("user"), user, queryClient]);
  if (get("user")) {
    if (!queryClient.getQueryData(["user"])) {
      queryClient.setQueryData(["user"], JSON.parse(get("user")));
    }
    return JSON.parse(get("user"));
  }

  return queryClient.getQueryData(["user"]);
}
