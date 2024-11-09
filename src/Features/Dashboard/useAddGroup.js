import { addGroup as addGroupAPI } from "./helpers.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddGroup() {
  const queryClient = useQueryClient();
  const { token, teacherId } = queryClient.getQueryData(["user"]);
  const { mutate: addGroup, isLoading } = useMutation({
    mutationFn: (bodyData) => addGroupAPI(token, { ...bodyData, teacherId }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addGroup, isLoading };
}
