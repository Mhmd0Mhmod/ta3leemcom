import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "../../Hooks/useCookies.js";
import { useEffect } from "react";

export function useUser() {
  const queryClient = useQueryClient();
  const { get } = useCookies();
  if (get("user")) {
    if (!queryClient.getQueryData(["user"])) {
      queryClient.setQueryData(["user"], JSON.parse(get("user")));
    }
    return JSON.parse(get("user"));
  }

  return queryClient.getQueryData(["user"]);
}
