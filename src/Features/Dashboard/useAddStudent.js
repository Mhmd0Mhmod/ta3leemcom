import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStudent as addStudentAPI } from "./helpers.js";
import toast from "react-hot-toast";

export function useAddStudent() {
  const queryClient = useQueryClient();
  const { token } = queryClient.getQueryData(["user"]);
  const { mutate: addStudent, isPending } = useMutation({
    mutationFn: (bodyData) => addStudentAPI(token, bodyData),
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addStudent, isLoading: isPending };
}
