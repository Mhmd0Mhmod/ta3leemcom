import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, setAllRead as setAllReadAPI } from "./helpers.js";
import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import toast from "react-hot-toast";
function useNotifications() {
  const token = useAuthHeader() || null;
  const { teacherId } = useAuthUser() || {};
  const queryClient = useQueryClient();
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(token, teacherId),
    enabled: !!token && !!teacherId,
  });
  const { mutate: setAllRead } = useMutation({
    mutationFn: () => setAllReadAPI(teacherId),
    onSuccess: () => {
      queryClient.refetchQueries(["notifications"]);
    },
  });

  return {
    setAllRead,
    notifications: notifications ? [...notifications].reverse() : [],
    isLoading,
    error,
  };
}

export { useNotifications };
