import { addGroup as addGroupAPI } from "./helpers.js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export function useAddGroup() {
  const token = useAuthHeader() || null;

  const { teacherId } = useAuthUser() || {};
  const { mutate: addGroup, isLoading } = useMutation({
    mutationFn: (bodyData) => addGroupAPI(token, { ...bodyData, teacherId }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addGroup, isLoading };
}
