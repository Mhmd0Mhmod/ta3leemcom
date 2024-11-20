import { useMutation } from "@tanstack/react-query";
import { addStudent as addStudentAPI } from "./helpers.js";
import toast from "react-hot-toast";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export function useAddStudent() {
  const token = useAuthHeader();
  const { mutate: addStudent, isPending } = useMutation({
    mutationFn: (bodyData) => addStudentAPI(token, bodyData),
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addStudent, isLoading: isPending };
}
